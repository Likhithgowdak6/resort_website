import Image from "next/image";
import { plates, plateVars } from "@/content/media";
import { site } from "@/content/site";

/**
 * Arrival.
 *
 * Every photograph of this property is 3:4 portrait. Cropping one to fill a
 * landscape viewport throws away two thirds of the frame and upscales what
 * is left, so the hero holds the photograph at its own shape instead — a
 * tall slab of it against ivory, with the type given its own air. It also
 * means no scrim: the words sit on paper, not on a darkened photograph.
 *
 * On a phone the frame and the screen agree, so the photograph leads.
 */
export function Hero() {
  const plate = plates.arrival;

  return (
    <section
      id="top"
      className="flex min-h-[100svh] flex-col lg:grid lg:min-h-[100svh] lg:grid-cols-12 lg:items-stretch"
    >
      {/* The photograph. First on a phone, right-hand slab on a desktop.
          Stacked, it takes whatever height the words leave over, so the
          hero is exactly one screen at every width instead of relying on a
          fixed ratio that happens to fit some of them. */}
      {/* The hero runs on the same plate motion as everything else rather
          than a bespoke keyframe — so its settle replays on return, and the
          drift can never replace it. `settle` holds opacity at 1, so this
          (the LCP element) paints without waiting for JavaScript. */}
      <div
        className="relative order-1 min-h-[46svh] flex-1 pt-16 lg:order-2 lg:col-span-6 lg:flex-none lg:pt-0 xl:col-span-7"
        data-plate=""
        data-reveal="settle"
        data-drift="true"
      >
        <div
          className="plate__frame absolute inset-0 top-16 !aspect-auto lg:top-0"
          style={plateVars(plate)}
        >
          <div className="plate__field" aria-hidden="true" />
          {/* Inset past the frame so a few pixels of travel never show an edge. */}
          <div data-parallax="8" className="absolute inset-[-14px]">
            <Image
              src={plate.src}
              alt={plate.alt}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 55vw"
              quality={88}
              className="plate-img object-cover"
            />
          </div>
        </div>
      </div>

      {/* The words. */}
      {/* Vertical padding is tied to viewport height so the hero still
          resolves in one screen on a short laptop display. */}
      <div className="order-2 flex shrink-0 flex-col justify-center px-[var(--gutter)] py-7 lg:order-1 lg:col-span-6 lg:py-[clamp(3rem,7vh,6rem)] xl:col-span-5">
        <p className="t-eyebrow rise" style={{ animationDelay: "0.3s" }}>
          Wayanad · Kerala
        </p>

        <h1 className="t-hero mt-5 lg:mt-10">
          <span className="rise block" style={{ animationDelay: "0.42s" }}>
            Where the
          </span>
          <span className="rise block" style={{ animationDelay: "0.54s" }}>
            plantation <span className="t-em">slows</span>
          </span>
          <span className="rise block" style={{ animationDelay: "0.66s" }}>
            time.
          </span>
        </h1>

        <p
          className="t-lede rise mt-6 text-ink/75 lg:mt-10"
          style={{ animationDelay: "0.84s" }}
        >
          {site.tagline}
        </p>

        <div
          className="rise mt-8 flex flex-wrap items-center gap-x-10 gap-y-1 lg:mt-12"
          style={{ animationDelay: "0.96s" }}
        >
          <a href="#enquire" className="action">
            Enquire to stay
            <span aria-hidden="true" className="action__arrow">
              →
            </span>
          </a>
          <a href="#estate" className="action action--down text-ink/60">
            Explore the estate
            <span aria-hidden="true" className="action__arrow">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
