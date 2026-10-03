import { Plate } from "./Plate";
import { plates } from "@/content/media";
import { experiences } from "@/content/experiences";

/**
 * Days, without an itinerary.
 *
 * This used to swap a photograph as you scrolled through the six entries.
 * That needed six photographs of six different things; what exists is
 * architecture. So the device has gone and the list carries itself, with a
 * single photograph held beside it as an anchor rather than an illustration.
 *
 * It is now a server component — the scroll listener went with the swap.
 */
export function ExperienceSection() {
  return (
    <section id="experiences" className="section-y">
      <div className="shell">
        <div className="grid12">
          <p className="t-eyebrow reveal col-span-full mb-10 lg:col-span-2 lg:mb-0">
            Experiences
          </p>
          <h2 className="t-statement reveal col-span-full max-w-[18ch] lg:col-span-8 lg:col-start-3">
            Days, without an itinerary.
          </h2>
        </div>

        <div className="grid12 mt-20 lg:mt-32">
          <div className="col-span-full lg:col-span-4 lg:col-start-1">
            <div className="lg:sticky lg:top-[22vh]">
              <Plate plate={plates.grounds} sizes="(max-width: 1024px) 100vw, 30vw" />
            </div>
          </div>

          <ol className="col-span-full mt-16 lg:col-span-6 lg:col-start-7 lg:mt-0">
            {experiences.map((item) => (
              <li
                key={item.title}
                className="reveal border-t border-[var(--rule)] py-9 last:border-b lg:py-12"
              >
                <h3 className="t-sub">{item.title}</h3>
                <p className="t-plate mt-3">{item.when}</p>
                <p className="t-body mt-4 text-ink/70">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
