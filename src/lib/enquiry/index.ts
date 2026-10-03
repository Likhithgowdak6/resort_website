import { ENQUIRY_CHANNEL } from "@/content/owner";
import { emailChannel, logChannel } from "./channels";
import type { DeliveryResult, Enquiry, EnquiryChannel } from "./types";

export { validateEnquiry } from "./validate";
export type { Enquiry, EnquiryStatus, DeliveryResult } from "./types";

const registry: Record<string, EnquiryChannel> = {
  log: logChannel,
  email: emailChannel,
};

/** The channel currently selected by configuration. */
export function activeChannel(): EnquiryChannel {
  return registry[ENQUIRY_CHANNEL] ?? logChannel;
}

/**
 * Hands an enquiry to the configured channel and reports exactly what
 * happened.
 *
 * This never throws for an unconfigured or non-notifying channel: the caller
 * needs the distinction so the guest can be told the truth. An enquiry that
 * silently disappears behind a "thank you" is the worst outcome available.
 */
export async function deliverEnquiry(enquiry: Enquiry): Promise<DeliveryResult> {
  const channel = activeChannel();

  if (!channel.isConfigured()) {
    console.error(
      `[enquiry] channel "${channel.name}" is selected but not configured — ` +
        `enquiry from ${enquiry.name} <${enquiry.email}> was NOT delivered.`,
    );
    return { status: "channel_not_configured", channel: channel.name };
  }

  try {
    await channel.deliver(enquiry);
  } catch (err) {
    console.error("[enquiry] delivery failed", err);
    return { status: "delivery_failed", channel: channel.name };
  }

  return {
    status: channel.notifiesOwner ? "delivered" : "recorded_not_delivered",
    channel: channel.name,
  };
}
