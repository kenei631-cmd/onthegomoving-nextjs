import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import { ENV } from "../_core/env";
import { getLeadById, getLeads, insertLead, updateLeadWebhookStatus } from "../db";

/**
 * Maps our internal move_type string to the SuperMove job_type identifier.
 */
function getSupermoveJobType(moveType?: string | null): { projectType: string; jobType: string } {
  const t = (moveType ?? "").toLowerCase();
  if (t.includes("commercial") || t.includes("office") || t.includes("business")) {
    return { projectType: "commercial-move", jobType: "commercial-move-move" };
  }
  if (t.includes("long") || t.includes("interstate") || t.includes("out of state")) {
    return { projectType: "long-distance-move", jobType: "long-distance-move-move" };
  }
  return { projectType: "local-move", jobType: "local-move-move" };
}

/**
 * Builds the SuperMove Developer API payload from our lead data.
 */
function buildSupermovePayload(lead: {
  fullName: string;
  phone: string;
  email: string;
  moveDate?: string | null;
  moveType?: string | null;
  fromZip?: string | null;
  toZip?: string | null;
  wantsStorage?: boolean | number | null;
  sourcePage?: string | null;
  sourceLabel?: string | null;
}) {
  const { projectType, jobType } = getSupermoveJobType(lead.moveType);

  const payload: Record<string, unknown> = {
    project_type: projectType,
    client: {
      primary_contact: {
        full_name: lead.fullName,
        email: lead.email,
        phone_number: lead.phone.replace(/\D/g, ""),
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
        note_from_customer: [
          lead.wantsStorage ? "Interested in storage" : "",
          lead.sourceLabel ? `Source: ${lead.sourceLabel}` : "",
        ]
          .filter(Boolean)
          .join(" | "),
      },
    ],
    referral_source: "Custom Website via A Supermove-Managed Integration",
    tags: ["WEBSITE_LEAD"],
  };

  if (lead.moveType) {
    payload.values = { PROJECT_SIZE: lead.moveType };
  }

  return payload;
}

export const leadsRouter = router({
  /**
   * Public mutation — any visitor can submit the quote form.
   * 1. Saves lead to MySQL immediately.
   * 2. Posts directly to SuperMove Developer API.
   * 3. Updates webhookStatus to "synced" or "failed".
   */
  submit: publicProcedure
    .input(
      z.object({
        fullName: z.string().min(1, "Name is required"),
        phone: z.string().min(7, "Phone is required"),
        email: z.string().email("Valid email is required"),
        moveDate: z.string().optional(),
        moveType: z.string().optional(),
        fromZip: z.string().optional(),
        toZip: z.string().optional(),
        wantsStorage: z.boolean().optional().default(false),
        sourcePage: z.string().optional(),
        sourceLabel: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const leadId = await insertLead({
        fullName: input.fullName,
        phone: input.phone,
        email: input.email,
        moveDate: input.moveDate ?? null,
        moveType: input.moveType ?? null,
        fromZip: input.fromZip ?? null,
        toZip: input.toZip ?? null,
        wantsStorage: input.wantsStorage ? 1 : 0,
        sourcePage: input.sourcePage ?? null,
        sourceLabel: input.sourceLabel ?? null,
        webhookStatus: "pending",
      });

      let webhookStatus: "synced" | "failed" = "failed";
      let webhookError: string | undefined;

      const webhookUrl = ENV.supermoveWebhookUrl;
      if (!webhookUrl) {
        webhookError = "SUPERMOVE_WEBHOOK_URL not configured";
        console.error("[Leads]", webhookError);
      } else {
        try {
          const payload = buildSupermovePayload(input);
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
            webhookStatus = "synced";
          } else {
            webhookError = `HTTP ${response.status}: ${responseText}`;
            console.error("[Leads] SuperMove webhook error:", webhookError);
          }
        } catch (err) {
          webhookError = err instanceof Error ? err.message : String(err);
          console.error("[Leads] SuperMove webhook failed:", webhookError);
        }
      }

      if (leadId) {
        await updateLeadWebhookStatus(leadId, webhookStatus, webhookError);
      }

      return { success: true, leadId, webhookStatus };
    }),

  /**
   * Admin-only mutation — re-fires the SuperMove webhook for a single lead.
   */
  retryWebhook: adminProcedure
    .input(z.object({ leadId: z.number() }))
    .mutation(async ({ input }) => {
      const lead = await getLeadById(input.leadId);
      if (!lead) throw new Error(`Lead ${input.leadId} not found`);

      let webhookStatus: "synced" | "failed" = "failed";
      let webhookError: string | undefined;

      const webhookUrl = ENV.supermoveWebhookUrl;
      if (!webhookUrl) {
        webhookError = "SUPERMOVE_WEBHOOK_URL not configured";
      } else {
        try {
          const payload = buildSupermovePayload({
            fullName: lead.fullName,
            phone: lead.phone,
            email: lead.email,
            moveDate: lead.moveDate,
            moveType: lead.moveType,
            fromZip: lead.fromZip,
            toZip: lead.toZip,
            wantsStorage: lead.wantsStorage,
            sourcePage: lead.sourcePage,
            sourceLabel: lead.sourceLabel,
          });

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
            webhookStatus = "synced";
          } else {
            webhookError = `HTTP ${response.status}: ${responseText}`;
          }
        } catch (err) {
          webhookError = err instanceof Error ? err.message : String(err);
        }
      }

      await updateLeadWebhookStatus(input.leadId, webhookStatus, webhookError);
      return { success: webhookStatus === "synced", webhookStatus };
    }),

  /**
   * Admin-only query — returns all leads for the dashboard.
   */
  getAll: adminProcedure
    .input(z.object({ limit: z.number().optional().default(200) }))
    .query(async ({ input }) => {
      return getLeads(input.limit);
    }),
});
