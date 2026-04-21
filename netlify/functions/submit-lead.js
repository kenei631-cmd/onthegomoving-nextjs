/**
 * Netlify Function: submit-lead
 * Receives form data, calls the SuperMove webhook, and returns success/failure.
 * The SuperMove webhook URL is kept server-side via SUPERMOVE_WEBHOOK_URL env var.
 */

function getSupermoveJobType(moveType) {
  const t = (moveType ?? "").toLowerCase();
  if (t.includes("commercial") || t.includes("office") || t.includes("business")) {
    return { projectType: "commercial-move", jobType: "commercial-move-move" };
  }
  if (t.includes("long") || t.includes("interstate") || t.includes("out of state")) {
    return { projectType: "long-distance-move", jobType: "long-distance-move-move" };
  }
  return { projectType: "local-move", jobType: "local-move-move" };
}

function buildSupermovePayload(lead) {
  const { projectType, jobType } = getSupermoveJobType(lead.moveType);

  let projectSize = "";
  if (lead.moveType === "commercial") {
    // For commercial, use square footage as the project size if provided
    projectSize = lead.squareFeet ? `${lead.squareFeet} sq ft` : "Commercial";
  } else if (lead.moveSize) {
    projectSize = lead.moveSize;
  }

  const noteLines = [
    lead.wantsStorage ? "Interested in storage" : "",
    lead.squareFeet ? `Square feet: ${lead.squareFeet}` : "",
    lead.sourceLabel ? `Source: ${lead.sourceLabel}` : "",
  ].filter(Boolean);

  return {
    project_type: projectType,
    client: {
      primary_contact: {
        full_name: lead.fullName,
        email: lead.email,
        phone_number: (lead.phone || "").replace(/\D/g, ""),
      },
    },
    jobs: [
      {
        job_type: jobType,
        date: lead.moveDate ?? "",
        locations: [
          ...(lead.fromZip ? [{ address: lead.fromZip }] : []),
          ...(lead.toZip ? [{ address: lead.toZip }] : []),
        ],
        note_from_customer: noteLines.join(" | "),
      },
    ],
    referral_source: "Custom Website via A Supermove-Managed Integration",
    tags: ["WEBSITE_LEAD"],
    values: { PROJECT_SIZE: projectSize },
  };
}

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let lead;
  try {
    lead = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  // Basic validation
  if (!lead.fullName || !lead.phone || !lead.email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Name, phone, and email are required" }),
    };
  }

  const webhookUrl = process.env.SUPERMOVE_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[submit-lead] SUPERMOVE_WEBHOOK_URL not configured");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Webhook not configured" }),
    };
  }

  const payload = buildSupermovePayload(lead);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
        "User-Agent": "Zapier",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });

    const responseText = await response.text();
    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    } else {
      console.error("[submit-lead] SuperMove error:", response.status, responseText);
      return {
        statusCode: 200, // Return 200 to client so form still shows success
        body: JSON.stringify({ success: true, webhookStatus: "failed" }),
      };
    }
  } catch (err) {
    console.error("[submit-lead] SuperMove fetch failed:", err);
    return {
      statusCode: 200, // Return 200 to client so form still shows success
      body: JSON.stringify({ success: true, webhookStatus: "failed" }),
    };
  }
};
