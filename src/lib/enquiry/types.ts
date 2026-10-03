/** A validated enquiry, ready to deliver. */
export type Enquiry = {
  name: string;
  phone: string;
  email: string;
  arrival?: string;
  departure?: string;
  guests?: string;
  message?: string;
  /** When the enquiry was received, ISO 8601. */
  receivedAt: string;
};

/**
 * Anywhere an enquiry can be sent. Add a channel by implementing this and
 * registering it in ./index.ts — email, WhatsApp, a CRM or a database all fit
 * the same shape, and nothing else in the app has to change.
 */
export type EnquiryChannel = {
  name: string;
  /** Whether this channel has everything it needs to run. */
  isConfigured(): boolean;
  /**
   * Whether delivering through this channel actually puts the enquiry in
   * front of a person. The log channel runs fine and notifies nobody — the
   * form has to be able to tell the guest the difference.
   */
  notifiesOwner: boolean;
  deliver(enquiry: Enquiry): Promise<void>;
};

/**
 * The five outcomes the form must be able to describe. The UI says something
 * different, and truthful, for each.
 */
export type EnquiryStatus =
  /** 1. Validation failed — nothing was accepted. */
  | "invalid"
  /** 2 + 3. Accepted and a person has been notified. */
  | "delivered"
  /** 2 only. Accepted and recorded, but no one has been notified. */
  | "recorded_not_delivered"
  /** 4. The channel was configured, tried, and failed. */
  | "delivery_failed"
  /** 5. A channel is selected but is missing its configuration. */
  | "channel_not_configured";

export type ValidationResult =
  | { ok: true; enquiry: Enquiry }
  | { ok: false; error: string };

export type DeliveryResult = {
  status: Exclude<EnquiryStatus, "invalid">;
  channel: string;
};
