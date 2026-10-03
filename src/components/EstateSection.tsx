import { Plate } from "./Plate";
import { plates } from "@/content/media";

/* Four facts about the land, set as a register rule rather than four cards.
   Order is descriptive, not ranked — so no numbering. */
const register = ["100 Acres", "Cocoa", "Coffee", "Wayanad"];

/**
 * The estate.
 *
 * The full-bleed band that used to open this section has gone: it cropped a
 * 3:4 photograph to 21:9 and kept almost nothing. In its place, a register
 * rule in type and a diptych of two portraits hung at different heights —
 * which is what these frames actually want.
 */
export function EstateSection() {
  return (
    <section className="pb-[var(--section-y)]">
      {/* Register rule — the land, stated in four words across the page. */}
      <div className="shell">
        <ul className="reveal flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-y border-[var(--rule)] py-5">
          {register.map((item) => (
            <li key={item} className="t-plate">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="shell grid12 mt-20 lg:mt-32">
        <div className="col-span-full lg:col-span-4 lg:col-start-1">
          <h2 className="t-title reveal max-w-[15ch]">
            One hundred acres, and a long way to the gate.
          </h2>

          <div className="reveal mt-10 space-y-6">
            <p className="t-body">
              Shade trees hold the heat off the coffee. Pepper climbs their
              trunks. Cocoa grows below, in the half-light, and the pods come
              off the wood by hand.
            </p>
            <p className="t-body text-ink/70">
              Coffee trees. Cocoa pods. Rain on the roof. In June the monsoon
              arrives and does not leave for a while, and the whole estate turns
              a green that is difficult to describe afterwards.
            </p>
            <p className="t-body text-ink/70">
              Walk out in any direction and the plantation keeps going.
            </p>
          </div>
        </div>

        {/* Diptych. The second plate hangs lower, so the two never line up. */}
        <div className="col-span-full mt-16 lg:col-span-4 lg:col-start-6 lg:mt-0">
          <Plate
            plate={plates.cottages}
            sizes="(max-width: 1024px) 100vw, 30vw"
            reveal="wipe"
            parallax={10}
          />
        </div>

        <div className="col-span-full mt-12 lg:col-span-3 lg:col-start-10 lg:mt-40">
          <Plate plate={plates.verandah} sizes="(max-width: 1024px) 100vw, 23vw" />
        </div>
      </div>
    </section>
  );
}
