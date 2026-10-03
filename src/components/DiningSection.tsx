import { Plate } from "./Plate";
import { plates } from "@/content/media";

/**
 * Dining.
 *
 * There is no food photography yet, and inventing it with a borrowed image
 * would be the one thing this brief rules out. So the photograph here is the
 * sitting room — captioned as exactly that — and the copy says plainly that
 * menus are still being worked out. When the table is photographed, swap the
 * plate and rewrite the last line.
 */
export function DiningSection() {
  return (
    <section id="dining" className="section-y overflow-hidden">
      <div className="grid12 shell items-center">
        <div className="col-span-full -ml-[var(--gutter)] lg:col-span-5">
          <Plate
            plate={plates.sittingRoom}
            sizes="(max-width: 1024px) 100vw, 42vw"
            reveal="wipe"
            captionClassName="pl-[var(--gutter)]"
          />
        </div>

        <div className="col-span-full mt-16 lg:col-span-5 lg:col-start-8 lg:mt-0">
          <p className="t-eyebrow reveal">Dining</p>
          <h2 className="t-statement reveal mt-8 max-w-[14ch]">
            From the estate, and the land around it.
          </h2>

          <div className="reveal mt-10 space-y-6">
            <p className="t-body">
              Kerala cooking — rice, coconut, curry leaf, pepper, whatever the
              season is giving. Coffee is grown here, and roasted close by.
            </p>
            <p className="t-body text-ink/70">
              Breakfast is slow and taken outside when the weather allows it.
              Some mornings are better left unscheduled.
            </p>
            <p className="t-plate pt-4">
              Menus are in development. Details to follow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
