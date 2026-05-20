// ============================================================
// ON THE GO MOVING — Netlify Function: delete-lead
// Deletes a lead by ID.
//   - If id is a numeric integer → delete from MySQL DB
//   - If id is a hex string (legacy Netlify Forms) → delete from Netlify Forms API
//
// POST /.netlify/functions/delete-lead?key=<ADMIN_KEY>&id=<ID>
// ============================================================
import mysql from "mysql2/promise";

const NETLIFY_API_TOKEN = process.env.NETLIFY_API_TOKEN || "nfp_TBPuSHsYiBk694ebCvcGUbXD8iDphJfQcfb5";
const ADMIN_KEY = process.env.ADMIN_DASHBOARD_KEY || "otgm-admin-2025";

export const handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "DELETE" && event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const providedKey = event.queryStringParameters?.key || "";
  if (providedKey !== ADMIN_KEY) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: "Unauthorized" }) };
  }

  // Get submission ID from query or body
  let submissionId = event.queryStringParameters?.id || "";
  if (!submissionId && event.body) {
    try {
      const body = JSON.parse(event.body);
      submissionId = body.id || "";
    } catch {}
  }

  if (!submissionId) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing submission id" }) };
  }

  // Determine if this is a MySQL integer ID or a legacy Netlify Forms hex ID
  const isDbId = /^\d+$/.test(String(submissionId));

  if (isDbId) {
    // ── Delete from MySQL ──────────────────────────────────────────────────
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: "DATABASE_URL not configured" }) };
    }
    let conn;
    try {
      conn = await mysql.createConnection(dbUrl);
      const [result] = await conn.execute(
        "DELETE FROM leads WHERE id = ?",
        [Number(submissionId)]
      );
      await conn.end();

      if (result.affectedRows === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: `Lead ${submissionId} not found in database` }),
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, id: submissionId, source: "db" }),
      };
    } catch (err) {
      console.error("[delete-lead] DB error:", err.message);
      try { if (conn) await conn.end(); } catch {}
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: `DB error: ${err.message}` }),
      };
    }
  } else {
    // ── Delete from Netlify Forms (legacy hex IDs) ─────────────────────────
    try {
      const url = `https://api.netlify.com/api/v1/submissions/${submissionId}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${NETLIFY_API_TOKEN}` },
      });

      if (response.status === 204 || response.status === 200) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true, id: submissionId, source: "netlify-forms" }),
        };
      }

      const text = await response.text();
      throw new Error(`Netlify API error: ${response.status} — ${text}`);
    } catch (err) {
      console.error("[delete-lead] Netlify Forms error:", err.message);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: err.message }),
      };
    }
  }
};
