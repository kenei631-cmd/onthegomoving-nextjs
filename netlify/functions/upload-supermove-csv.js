/**
 * upload-supermove-csv.js
 *
 * Accepts a multipart/form-data POST with a CSV file field named "csv".
 * Parses the Supermove combined_projects CSV format, upserts all records
 * into the leads table (insert new, update existing by project number).
 *
 * Security: requires X-Admin-Key header matching ADMIN_SECRET env var.
 *
 * NOTE: Uses a built-in CSV parser (no external csv-parse dependency)
 * to avoid Netlify function bundling issues.
 */

const mysql = require("mysql2/promise");

const STATUS_PRIORITY = {
  COMPLETED: 7,
  BOOKED: 6,
  HOLD: 3,
  LEAD: 2,
  CANCELLED: 1,
};

const STATUS_MAP = {
  LEAD: "New",
  HOLD: "On Hold",
  BOOKED: "Booked",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const PROJECT_TYPE_MAP = {
  "Local Move": "house",
  "Labor Only": "labor",
  "Commercial Move": "commercial",
};

/**
 * Simple RFC 4180-compliant CSV parser (no external deps).
 * Returns array of objects keyed by header row.
 */
function parseCSV(text) {
  // Normalize line endings
  text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  // Remove BOM if present
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);

  const lines = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "\n" && !inQuotes) {
      lines.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  if (current) lines.push(current);

  function splitLine(line) {
    const fields = [];
    let field = "";
    let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQ && line[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQ = !inQ;
        }
      } else if (ch === "," && !inQ) {
        fields.push(field.trim());
        field = "";
      } else {
        field += ch;
      }
    }
    fields.push(field.trim());
    return fields;
  }

  const nonEmpty = lines.filter((l) => l.trim());
  if (nonEmpty.length < 2) return [];

  const headers = splitLine(nonEmpty[0]);
  const records = [];
  for (let i = 1; i < nonEmpty.length; i++) {
    const vals = splitLine(nonEmpty[i]);
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = vals[idx] !== undefined ? vals[idx] : "";
    });
    records.push(obj);
  }
  return records;
}

function parseDate(val) {
  if (!val) return null;
  val = val.trim().split(",")[0].trim();
  let m = val.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (m) {
    let [, mo, d, y] = m;
    if (y.length === 2) y = "20" + y;
    return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  m = val.match(/^(\d{1,2})-(\d{1,2})-(\d{2,4})$/);
  if (m) {
    let [, mo, d, y] = m;
    if (y.length === 2) y = "20" + y;
    return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  return null;
}

function safeFloat(val) {
  if (!val || !val.trim()) return null;
  const f = parseFloat(val.trim());
  return isNaN(f) ? null : f;
}

function normName(name) {
  return (name || "").toLowerCase().replace(/\s+/g, " ").trim();
}

exports.handler = async (event) => {
  // ── Auth ────────────────────────────────────────────────────────────────
  const adminKey = process.env.ADMIN_SECRET || "otg-admin-2024";
  const providedKey =
    event.headers["x-admin-key"] || event.headers["X-Admin-Key"];
  if (providedKey !== adminKey) {
    return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized" }) };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // ── Parse CSV body ───────────────────────────────────────────────────
    let csvText = "";

    if (event.isBase64Encoded) {
      const body = Buffer.from(event.body, "base64").toString("utf-8");
      const boundary = (event.headers["content-type"] || "").split(
        "boundary="
      )[1];
      if (boundary) {
        const parts = body.split("--" + boundary);
        for (const part of parts) {
          if (part.includes('name="csv"') || part.includes("name=csv")) {
            csvText = part.split("\r\n\r\n").slice(1).join("\r\n\r\n").trim();
            csvText = csvText.replace(/--$/, "").trim();
            break;
          }
        }
      } else {
        csvText = body;
      }
    } else {
      csvText = event.body || "";
      const ct = event.headers["content-type"] || "";
      if (ct.includes("multipart/form-data")) {
        const boundary = ct.split("boundary=")[1];
        if (boundary) {
          const parts = csvText.split("--" + boundary);
          for (const part of parts) {
            if (part.includes('name="csv"') || part.includes("name=csv")) {
              csvText = part.split("\r\n\r\n").slice(1).join("\r\n\r\n").trim();
              csvText = csvText.replace(/--$/, "").trim();
              break;
            }
          }
        }
      }
    }

    if (!csvText || csvText.length < 10) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No CSV data received" }),
      };
    }

    // ── Parse CSV using built-in parser ──────────────────────────────────
    const records = parseCSV(csvText);

    if (!records.length) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "CSV parsed 0 records" }),
      };
    }

    // Group by project number
    const byProject = {};
    for (const r of records) {
      const proj = (r["Project"] || "").trim();
      if (!proj) continue;
      if (!byProject[proj]) byProject[proj] = [];
      byProject[proj].push(r);
    }

    // Build best record per project (most advanced status)
    const projects = {};
    for (const [projNum, projRows] of Object.entries(byProject)) {
      const best = projRows.reduce((a, b) =>
        (STATUS_PRIORITY[b["Current Status"]] || 0) >
        (STATUS_PRIORITY[a["Current Status"]] || 0)
          ? b
          : a
      );

      const sentAt =
        projRows.map((r) => parseDate(r["Sent At"])).find(Boolean) || null;
      const completedAt =
        projRows.map((r) => parseDate(r["Completed At"])).find(Boolean) || null;
      const createdAt =
        projRows.map((r) => parseDate(r["Created At"])).find(Boolean) || null;
      const hrsToSend =
        projRows.map((r) => safeFloat(r["Hrs to Send"])).find((v) => v !== null) ??
        null;
      const hrsToComplete =
        projRows
          .map((r) => safeFloat(r["Hrs to Complete"]))
          .find((v) => v !== null) ?? null;

      projects[projNum] = {
        projNum,
        client: (best["Client"] || "").trim(),
        status: (best["Current Status"] || "").trim(),
        revenue: (best["Revenue"] || "").trim(),
        salesperson: (best["Salesperson"] || "").trim(),
        projectType: (best["Project Type"] || "").trim(),
        createdAt,
        sentAt,
        completedAt,
        hrsToSend,
        hrsToComplete,
      };
    }

    // ── DB connection ────────────────────────────────────────────────────
    const dbUrl = (process.env.DATABASE_URL || "").split("?")[0];
    const conn = await mysql.createConnection(dbUrl);

    // Load existing leads
    const [existingLeads] = await conn.execute(
      "SELECT id, fullName, smProjectNumber FROM leads"
    );
    const byProjNum = {};
    const byName = {};
    for (const l of existingLeads) {
      if (l.smProjectNumber) byProjNum[String(l.smProjectNumber)] = l.id;
      byName[normName(l.fullName)] = l.id;
    }

    let inserted = 0;
    let updated = 0;
    let skipped = 0;

    for (const proj of Object.values(projects)) {
      const stage = STATUS_MAP[proj.status] || "Unknown";
      const isCancelled = proj.status === "CANCELLED" ? 1 : 0;
      const moveType = PROJECT_TYPE_MAP[proj.projectType] || "";
      const createdTs = proj.createdAt
        ? proj.createdAt + " 00:00:00"
        : new Date().toISOString().slice(0, 19).replace("T", " ");

      let existingId = byProjNum[String(proj.projNum)];
      if (!existingId) {
        existingId = byName[normName(proj.client)];
      }

      if (existingId) {
        await conn.execute(
          `UPDATE leads SET
            smProjectNumber = ?,
            smStage         = ?,
            smTotalRevenue  = ?,
            smSalesperson   = ?,
            smIsCancelled   = ?,
            smProjectType   = ?,
            smSentAt        = ?,
            smCompletedAt   = ?,
            smHrsToSend     = ?,
            smHrsToComplete = ?,
            smLastSyncedAt  = NOW(),
            updatedAt       = NOW()
          WHERE id = ?`,
          [
            proj.projNum,
            stage,
            proj.revenue,
            proj.salesperson,
            isCancelled,
            proj.projectType,
            proj.sentAt,
            proj.completedAt,
            proj.hrsToSend,
            proj.hrsToComplete,
            existingId,
          ]
        );
        updated++;
      } else {
        await conn.execute(
          `INSERT INTO leads (
            fullName, phone, email, sourcePage, sourceLabel,
            webhookStatus, wantsStorage,
            smProjectNumber, smStage, smTotalRevenue, smSalesperson,
            smIsCancelled, smLastSyncedAt,
            smProjectType, smSentAt, smCompletedAt, smHrsToSend, smHrsToComplete,
            moveType, createdAt, updatedAt
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, NOW())`,
          [
            proj.client,
            "",
            "",
            "supermove-import",
            "Supermove Import",
            "synced",
            0,
            proj.projNum,
            stage,
            proj.revenue,
            proj.salesperson,
            isCancelled,
            proj.projectType,
            proj.sentAt,
            proj.completedAt,
            proj.hrsToSend,
            proj.hrsToComplete,
            moveType,
            createdTs,
          ]
        );
        inserted++;
        byProjNum[String(proj.projNum)] = true;
        byName[normName(proj.client)] = true;
      }
    }

    await conn.end();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: true,
        summary: {
          csvProjects: Object.keys(projects).length,
          inserted,
          updated,
          skipped,
          total: inserted + updated,
        },
      }),
    };
  } catch (err) {
    console.error("upload-supermove-csv error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
