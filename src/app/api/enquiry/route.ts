import { NextResponse } from "next/server";
import { deliverEnquiry, validateEnquiry } from "@/lib/enquiry";

/**
 * POST /api/enquiry
 *
 * Replies with the real outcome, never a flattering one:
 *
 *   400 invalid                 nothing was accepted
 *   200 delivered               accepted, and a person has been notified
 *   200 recorded_not_delivered  accepted, but nobody has been notified
 *   502 delivery_failed         the channel was tried and failed
 *   502 channel_not_configured  a channel is selected but incomplete
 *
 * The form renders a different, truthful message for each.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { status: "invalid", error: "Malformed request." },
      { status: 400 },
    );
  }

  // Honeypot: a person never fills this in. Answer as though it worked.
  if (typeof body.company === "string" && body.company.trim()) {
    return NextResponse.json({ status: "delivered" });
  }

  const result = validateEnquiry(body);
  if (!result.ok) {
    return NextResponse.json(
      { status: "invalid", error: result.error },
      { status: 400 },
    );
  }

  const outcome = await deliverEnquiry(result.enquiry);

  const httpStatus =
    outcome.status === "delivery_failed" || outcome.status === "channel_not_configured"
      ? 502
      : 200;

  return NextResponse.json({ status: outcome.status }, { status: httpStatus });
}
