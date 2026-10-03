import type { Enquiry, EnquiryChannel } from "./types";

/* ==========================================================================
   DELIVERY CHANNELS
   --------------------------------------------------------------------------
   Each channel is self-contained. To add one — WhatsApp Business, a CRM, a
   database — write an object with the same three members and register it in
   ./index.ts. No component, route or form code changes.
   ========================================================================== */

/**
 * The default. Writes the enquiry to the server log and notifies nobody.
 * Correct for development; never correct for production.
 */
export const logChannel: EnquiryChannel = {
  name: "log",
  isConfigured: () => true,
  /* Runs perfectly and reaches nobody. The form must say so. */
  notifiesOwner: false,
  async deliver(enquiry: Enquiry) {
    console.info("[enquiry]", JSON.stringify(enquiry, null, 2));
  },
};

/**
 * Email delivery.
 *
 * Intentionally left unwired — it needs an account, a verified sender domain
 * and a key, none of which exist yet. It reports itself as unconfigured, so
 * selecting it without the environment variables fails loudly at startup
 * rather than silently dropping enquiries.
 *
 * To finish it: install a provider SDK, set the env vars below, and replace
 * the body of deliver(). With Resend that is roughly:
 *
 *   const { Resend } = await import("resend");
 *   await new Resend(process.env.RESEND_API_KEY).emails.send({
 *     from: process.env.ENQUIRY_FROM!,
 *     to: process.env.ENQUIRY_TO!,
 *     replyTo: enquiry.email,
 *     subject: `Enquiry — ${enquiry.name}`,
 *     text: format(enquiry),
 *   });
 */
export const emailChannel: EnquiryChannel = {
  name: "email",
  notifiesOwner: true,
  isConfigured: () =>
    Boolean(
      process.env.ENQUIRY_TO && process.env.ENQUIRY_FROM && process.env.RESEND_API_KEY,
    ),
  async deliver(enquiry: Enquiry) {
    throw new Error(
      `Email delivery is not implemented yet. Enquiry from ${enquiry.name} ` +
        `(${enquiry.email}) was NOT delivered. See src/lib/enquiry/channels.ts.`,
    );
  },
};

/** Plain-text rendering, useful for any channel that sends prose. */
export function format(enquiry: Enquiry): string {
  const line = (k: string, v?: string) => (v ? `${k}: ${v}\n` : "");
  return (
    line("Name", enquiry.name) +
    line("Phone", enquiry.phone) +
    line("Email", enquiry.email) +
    line("Arrival", enquiry.arrival) +
    line("Departure", enquiry.departure) +
    line("Guests", enquiry.guests) +
    line("Received", enquiry.receivedAt) +
    (enquiry.message ? `\n${enquiry.message}\n` : "")
  );
}
