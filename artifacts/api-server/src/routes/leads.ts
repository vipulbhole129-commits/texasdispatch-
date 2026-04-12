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
        const now = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });
        const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <div style="background: #f97316; padding: 24px 32px;">
      <h1 style="color: white; margin: 0; font-size: 22px;">New Free Pilot Signup</h1>
      <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0; font-size: 14px;">Texas Plumbing Dispatch &mdash; ${now} CT</p>
    </div>
    <div style="padding: 32px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px 0; color: #6b7280; font-size: 13px; width: 40%;">Full Name</td>
          <td style="padding: 12px 0; font-weight: bold; color: #111;">${parsed.data.firstName} ${parsed.data.lastName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px 0; color: #6b7280; font-size: 13px;">Company</td>
          <td style="padding: 12px 0; font-weight: bold; color: #111;">${parsed.data.company}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px 0; color: #6b7280; font-size: 13px;">Email</td>
          <td style="padding: 12px 0;"><a href="mailto:${parsed.data.email}" style="color: #f97316;">${parsed.data.email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px 0; color: #6b7280; font-size: 13px;">Phone</td>
          <td style="padding: 12px 0;"><a href="tel:${parsed.data.phone}" style="color: #f97316;">${parsed.data.phone}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px 0; color: #6b7280; font-size: 13px;">Service Area</td>
          <td style="padding: 12px 0; color: #111;">${parsed.data.serviceArea}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #6b7280; font-size: 13px;">Currently handling missed calls</td>
          <td style="padding: 12px 0; color: #111;">${parsed.data.missedCallsHandling}</td>
        </tr>
      </table>
      <div style="margin-top: 24px; padding: 16px; background: #fff7ed; border-left: 4px solid #f97316; border-radius: 4px;">
        <p style="margin: 0; font-size: 14px; color: #92400e;"><strong>Action Required:</strong> Contact this lead within 24 hours to set up their 72-hour free pilot. Reply to this email or call them directly.</p>
      </div>
    </div>
    <div style="padding: 16px 32px; background: #f9fafb; border-top: 1px solid #eee; text-align: center;">
      <p style="margin: 0; font-size: 12px; color: #9ca3af;">Texas Plumbing Dispatch &bull; vic@texasdispatch.site</p>
    </div>
  </div>
</body>
</html>`;

        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Texas Plumbing Dispatch <noreply@texasdispatch.site>",
            to: ["vic@texasdispatch.site"],
            reply_to: parsed.data.email,
            subject: `New Pilot Signup: ${parsed.data.company} (${parsed.data.serviceArea}) — ${parsed.data.firstName} ${parsed.data.lastName}`,
            html: htmlBody,
          }),
        });
        if (!emailRes.ok) {
          const errText = await emailRes.text();
          logger.error({ status: emailRes.status, body: errText }, "Resend API error");
        } else {
          logger.info({ to: "vic@texasdispatch.site", company: parsed.data.company }, "Lead email sent");
        }
      } catch (emailErr) {
        logger.error({ err: emailErr }, "Failed to send lead email notification");
      }
    } else {
      logger.info({ company: parsed.data.company }, "Lead saved (no RESEND_API_KEY configured — email skipped)");
    }

    res.status(201).json({ success: true, message: "Your free pilot has been activated! We will contact you within 24 hours." });
  } catch (err) {
    logger.error({ err }, "Failed to save lead");
    res.status(500).json({ error: "Failed to submit lead" });
  }
});

export default leadsRouter;
