import { BleedImage } from "./BleedImage";
import { plates } from "@/content/media";
import { site } from "@/content/site";
import { whatsappHref } from "@/content/owner";

/**
 * One photograph, one line, two ways to get in touch.
 *
 * The night shot is the only one that survives a wide crop: it is dark and
 * low in detail, so losing the top and bottom of the frame costs little and
 * the type reads cleanly over it.
 */
export function FinalCta() {
  const wa = whatsappHref();

  return (
    <section className="on-dark relative isolate flex min-h-[80svh] items-center text-ivory">
      <BleedImage plate={plates.night} scrim="full" className="-z-10" drift parallax={10} />

      <div className="shell py-28 text-center">
        <h2 className="t-statement reveal mx-auto max-w-[14ch]">
          Come away for a <span className="t-em">while</span>.
        </h2>
        <p className="t-lede reveal mx-auto mt-8 max-w-[34ch] text-ivory/85">
          Stay among {site.acreage} acres of cocoa and coffee in Wayanad.
        </p>

        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-1">
          <a href="#enquire" className="action">
            Enquire to stay
            <span aria-hidden="true" className="action__arrow">
              →
            </span>
          </a>
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="action text-ivory/75"
            >
              WhatsApp
              <span aria-hidden="true" className="action__arrow">
                →
              </span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
