import { Router } from "express";
import { db, leadsTable } from "@workspace/db";
import { SubmitLeadBody } from "@workspace/api-zod";
import { logger } from "../lib/logger";

const leadsRouter = Router();

leadsRouter.post("/leads", async (req, res) => {
  const parsed = SubmitLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  try {
    const [lead] = await db.insert(leadsTable).values(parsed.data).returning();

    // Send email notification via Resend if API key is configured
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const htmlBody = `
          <h2>New Lead - Texas Plumbing Dispatch</h2>
          <table border="1" cellpadding="8" style="border-collapse:collapse;">
            <tr><td><strong>Name</strong></td><td>${parsed.data.firstName} ${parsed.data.lastName}</td></tr>
            <tr><td><strong>Company</strong></td><td>${parsed.data.company}</td></tr>
            <tr><td><strong>Email</strong></td><td>${parsed.data.email}</td></tr>
            <tr><td><strong>Phone</strong></td><td>${parsed.data.phone}</td></tr>
            <tr><td><strong>Service Area</strong></td><td>${parsed.data.serviceArea}</td></tr>
            <tr><td><strong>Handling Missed Calls</strong></td><td>${parsed.data.missedCallsHandling}</td></tr>
          </table>
        `;

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Texas Plumbing Dispatch <noreply@texasdispatch.site>",
            to: ["vic@texasdispatch.site"],
            subject: `New Pilot Signup: ${parsed.data.company} - ${parsed.data.firstName} ${parsed.data.lastName}`,
            html: htmlBody,
          }),
        });
      } catch (emailErr) {
        logger.error({ err: emailErr }, "Failed to send lead email notification");
      }
    }

    res.status(201).json({ success: true, message: "Your free pilot has been activated! We will contact you within 24 hours." });
  } catch (err) {
    logger.error({ err }, "Failed to save lead");
    res.status(500).json({ error: "Failed to submit lead" });
  }
});

export default leadsRouter;
