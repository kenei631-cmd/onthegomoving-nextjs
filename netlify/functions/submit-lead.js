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

  // PROJECT_SIZE must be one of the valid SuperMove enum values:
  // 'Studio', '1 Bedroom', '2 Bedrooms', '3 Bedrooms', '4 Bedrooms',
  // '5 Bedrooms', '6+ Bedrooms', 'Commercial', '(none)'
  let projectSize = "(none)";
  if (lead.moveType === "commercial") {
    projectSize = "Commercial";
  } else if (lead.moveSize) {
    projectSize = lead.moveSize; // Already matches enum (Studio, 1 Bedroom, etc.)
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

/**
 * Submit to Netlify Forms so the submission appears in the Netlify dashboard
 * and triggers email notifications. Netlify Forms only captures native HTML
 * form POSTs, so we replicate that POST here from the server side.
 */
async function submitToNetlifyForms(lead, siteUrl) {
  try {
    const formData = new URLSearchParams();
    formData.append("form-name", "quote-request");
    formData.append("fullName", lead.fullName || "");
    formData.append("phone", lead.phone || "");
    formData.append("email", lead.email || "");
    formData.append("moveDate", lead.moveDate || "");
    formData.append("zipFrom", lead.fromZip || "");
    formData.append("zipTo", lead.toZip || "");
    formData.append("moveType", lead.moveType || "");
    formData.append("moveSize", lead.moveSize || "");
    formData.append("squareFeet", lead.squareFeet || "");
    formData.append("wantsStorage", lead.wantsStorage ? "yes" : "no");
    formData.append("sourcePage", lead.sourcePage || "");
    formData.append("sourceLabel", lead.sourceLabel || "");

    const netlifyFormsUrl = siteUrl || "https://on-the-go-moving.netlify.app";
    await fetch(netlifyFormsUrl + "/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
      signal: AbortSignal.timeout(8_000),
    });
  } catch (err) {
    // Non-fatal — SuperMove is the primary destination
    console.warn("[submit-lead] Netlify Forms submission failed:", err.message);
  }
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

  // Determine site URL for Netlify Forms POST (use deploy URL if available)
  const siteUrl = process.env.URL || process.env.DEPLOY_URL || "https://on-the-go-moving.netlify.app";

  const payload = buildSupermovePayload(lead);

  // Fire both in parallel — SuperMove webhook + Netlify Forms capture
  const [supermoveResult] = await Promise.allSettled([
    fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
        "User-Agent": "Zapier",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    }),
    submitToNetlifyForms(lead, siteUrl),
  ]);

  if (supermoveResult.status === "fulfilled" && supermoveResult.value.ok) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } else {
    const errMsg = supermoveResult.status === "rejected"
      ? supermoveResult.reason?.message
      : await supermoveResult.value?.text?.();
    console.error("[submit-lead] SuperMove error:", errMsg);
    return {
      statusCode: 200, // Return 200 to client so form still shows success
      body: JSON.stringify({ success: true, webhookStatus: "failed" }),
    };
  }
};
