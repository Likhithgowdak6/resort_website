"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { PHONE_DISPLAY, telHref } from "@/content/owner";

/**
 * Navigation.
 *
 * The hero now puts ivory, not a photograph, behind the bar, so the old
 * light-over-image state has gone: the bar is simply ivory, and a hairline
 * draws itself once you have started reading. One fewer thing moving.
 */
export function Nav() {
  const [settled, setSettled] = useState(false);
  const tel = telHref();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSettled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the fullscreen menu, and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 bg-ivory transition-colors duration-700 ease-[var(--ease-estate)] ${
          settled ? "border-b border-[var(--rule)]" : "border-b border-transparent"
        }`}
      >
        <div className="shell flex items-center justify-between gap-6 py-5 lg:py-7">
          <a
            href="#top"
            className="t-plate flex min-h-11 flex-col justify-center leading-[1.25] tracking-[0.18em] whitespace-nowrap text-ink"
          >
            <span className="block">{site.wordmark[0]}</span>
            <span className="block">{site.wordmark[1]}</span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="link tap t-plate text-ink">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <a href="#enquire" className="action hidden sm:inline-flex">
              Enquire
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-panel"
              className="relative z-50 -mr-2 flex h-11 w-11 cursor-pointer items-center justify-center lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="flex w-6 flex-col gap-[6px]">
                <span
                  className="h-px w-full bg-ink transition-transform duration-500 ease-[var(--ease-estate)]"
                  style={{ transform: open ? "translateY(3.5px) rotate(13deg)" : "none" }}
                />
                <span
                  className="h-px w-full bg-ink transition-transform duration-500 ease-[var(--ease-estate)]"
                  style={{ transform: open ? "translateY(-3.5px) rotate(-13deg)" : "none" }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen menu — ivory, typographic, nothing else in it. */}
      <div id="menu-panel" hidden={!open} className="fixed inset-0 z-30 bg-ivory lg:hidden">
        <div className="shell flex h-full flex-col justify-between pt-28 pb-12">
          <nav aria-label="Mobile">
            <ul>
              {nav.map((item) => (
                <li key={item.href} className="border-b border-[var(--rule)]">
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="t-title block py-5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-2">
            <a href="#enquire" onClick={() => setOpen(false)} className="action">
              Enquire to stay
              <span aria-hidden="true" className="action__arrow">
                →
              </span>
            </a>
            {tel && (
              <a href={tel} className="t-plate tap">
                {PHONE_DISPLAY}
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
