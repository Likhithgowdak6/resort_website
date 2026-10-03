import type { ValidationResult } from "./types";

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** Deliberately permissive — this guards delivery, not data quality. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates a raw submission.
 *
 * Messages are written to be read by a guest, not a developer: they say what
 * is wrong and what to do, and they never apologise.
 */
export function validateEnquiry(body: Record<string, unknown>): ValidationResult {
  const enquiry = {
    name: str(body.name),
    phone: str(body.phone),
    email: str(body.email),
    arrival: str(body.arrival) || undefined,
    departure: str(body.departure) || undefined,
    guests: str(body.guests) || undefined,
    message: str(body.message) || undefined,
    receivedAt: new Date().toISOString(),
  };

  const labels: Record<string, string> = {
    name: "a name",
    phone: "a phone number",
    email: "an email address",
  };
  const missing = (["name", "phone", "email"] as const).filter((k) => !enquiry[k]);
  if (missing.length > 0) {
    return {
      ok: false,
      error: `Please add ${missing.map((k) => labels[k]).join(", ")}.`,
    };
  }

  if (enquiry.name.length > 120) {
    return { ok: false, error: "That name is longer than we can store." };
  }

  if (!EMAIL_RE.test(enquiry.email)) {
    return { ok: false, error: "That email address does not look complete." };
  }

  if (enquiry.message && enquiry.message.length > 4000) {
    return { ok: false, error: "Please shorten the message a little." };
  }

  if (enquiry.arrival && enquiry.departure && enquiry.departure < enquiry.arrival) {
    return { ok: false, error: "The departure date falls before the arrival date." };
  }

  if (enquiry.guests) {
    const n = Number(enquiry.guests);
    if (!Number.isFinite(n) || n < 1 || n > 40) {
      return { ok: false, error: "Please give a number of guests between 1 and 40." };
    }
  }

  return { ok: true, enquiry };
}
