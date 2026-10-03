"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { EMAIL, PHONE_DISPLAY, mailHref, telHref, whatsappHref } from "@/content/owner";

type UiState = "idle" | "sending" | "done";

/**
 * The enquiry.
 *
 * Underline-only fields on parchment — a letterhead, not a dashboard. The
 * left column keeps the direct lines open for anyone who would rather not
 * fill in a form, and any channel the owner has not configured yet simply
 * does not appear.
 *
 * The reply is never flattering. "Sent" is only said when a person has
 * actually been notified; every other outcome says what really happened and
 * points at a channel that works.
 */
export function EnquirySection() {
  const [ui, setUi] = useState<UiState>("idle");
  const [note, setNote] = useState("");
  const [isProblem, setIsProblem] = useState(false);

  const wa = whatsappHref();
  const tel = telHref();
  const mail = mailHref();

  /** Where to send someone when the form could not do its job. */
  const fallback = mail
    ? `Please write to ${EMAIL}.`
    : wa
      ? "Please use the WhatsApp link alongside."
      : tel
        ? `Please call ${PHONE_DISPLAY}.`
        : "No direct contact is published on this site yet.";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setUi("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await res.json().catch(() => ({}))) as {
        status?: string;
        error?: string;
      };

      switch (payload.status) {
        case "delivered":
          setIsProblem(false);
          setNote(
            "Thank you. Your enquiry has reached us, and we will write back ourselves.",
          );
          form.reset();
          break;

        // Accepted and recorded, but the site cannot notify anyone yet.
        case "recorded_not_delivered":
          setIsProblem(true);
          setNote(
            `Your details were recorded, but this site's enquiry inbox is not connected yet, so no one has been notified. ${fallback}`,
          );
          break;

        case "delivery_failed":
        case "channel_not_configured":
          setIsProblem(true);
          setNote(`That did not reach us. ${fallback}`);
          break;

        case "invalid":
        default:
          setIsProblem(true);
          setNote(payload.error ?? `That did not send. ${fallback}`);
      }
    } catch {
      setIsProblem(true);
      setNote(`That did not send. ${fallback}`);
    } finally {
      setUi("done");
    }
  }

  return (
    <section id="enquire" className="section-y bg-parchment">
      <div className="shell grid12">
        {/* Left: the direct lines. */}
        <div className="col-span-full lg:col-span-4">
          <p className="t-eyebrow reveal">Enquire</p>
          <h2 className="t-statement reveal mt-8 max-w-[11ch]">
            Write to us.
          </h2>
          <p className="t-body reveal mt-8 text-ink/70">
            Tell us when you would like to come and how many of you there are.
            We will write back ourselves.
          </p>

          <dl className="reveal mt-12 border-t border-[var(--rule)]">
            {wa && (
              <Line term="WhatsApp">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="link tap">
                  {PHONE_DISPLAY ?? "Message us"}
                </a>
              </Line>
            )}
            {tel && (
              <Line term="Telephone">
                <a href={tel} className="link tap">
                  {PHONE_DISPLAY}
                </a>
              </Line>
            )}
            {mail && (
              <Line term="Email">
                <a href={mail} className="link tap">
                  {EMAIL}
                </a>
              </Line>
            )}
            <Line term="The estate">{site.region}</Line>
          </dl>
        </div>

        {/* Right: the form. */}
        <div className="col-span-full mt-20 lg:col-span-6 lg:col-start-7 lg:mt-0">
          <form onSubmit={onSubmit} className="reveal" aria-describedby="enq-status">
            <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
              <Field name="name" label="Name" autoComplete="name" required />
              <Field name="phone" label="Phone" type="tel" autoComplete="tel" required />
              <Field
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                required
                className="sm:col-span-2"
              />
              <Field name="arrival" label="Arrival" type="date" />
              <Field name="departure" label="Departure" type="date" />
              <Field
                name="guests"
                label="Guests"
                type="number"
                min={1}
                max={40}
                inputMode="numeric"
                className="sm:col-span-2"
              />
              <div className="sm:col-span-2">
                <label htmlFor="enq-message" className="t-plate block">
                  Message
                </label>
                <textarea
                  id="enq-message"
                  name="message"
                  rows={3}
                  className="field mt-2"
                  placeholder="Anything you would like us to know"
                />
              </div>
            </div>

            {/* Honeypot. Invisible to people, tempting to bots. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-px w-px opacity-0"
            />

            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
              <button
                type="submit"
                className="action action--solid"
                disabled={ui === "sending"}
              >
                {ui === "sending" ? "Sending…" : "Send enquiry"}
              </button>
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="action">
                  Or continue on WhatsApp
                  <span aria-hidden="true" className="action__arrow">
                    →
                  </span>
                </a>
              )}
            </div>

            <p
              id="enq-status"
              role="status"
              aria-live="polite"
              className="t-body mt-8 min-h-6 max-w-[52ch] text-sm"
              style={{ color: isProblem ? "#9C4221" : undefined }}
            >
              {note}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Line({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-6 border-b border-[var(--rule)] py-1">
      <dt className="t-plate w-28 shrink-0">{term}</dt>
      <dd className="text-sm">{children}</dd>
    </div>
  );
}

function Field({
  name,
  label,
  className = "",
  ...rest
}: {
  name: string;
  label: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `enq-${name}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="t-plate block">
        {label}
      </label>
      <input id={id} name={name} className="field mt-2" {...rest} />
    </div>
  );
}
