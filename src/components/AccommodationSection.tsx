import { Plate } from "./Plate";
import { plates } from "@/content/media";
import { rooms } from "@/content/stay";

/**
 * Stay.
 *
 * Not three cards — three spreads, image and text trading sides, each hung
 * at its own height. Crops come from media.ts and stay close to the native
 * 3:4, because these are room photographs and the ceiling is half of what
 * makes these rooms what they are.
 */
export function AccommodationSection() {
  return (
    <section id="stay" className="section-y bg-parchment">
      <div className="shell">
        <div className="grid12">
          <p className="t-eyebrow reveal col-span-full mb-10 lg:col-span-2 lg:mb-0">
            Stay
          </p>
          <h2 className="t-statement reveal col-span-full max-w-[20ch] lg:col-span-8 lg:col-start-3">
            Rooms designed to <span className="t-em">disappear</span> into the
            landscape.
          </h2>
        </div>

        <div className="mt-24 lg:mt-36">
          {rooms.map((room, i) => {
            const flipped = i % 2 === 1;
            return (
              <article
                key={room.name}
                className="grid12 items-start gap-y-10 [&:not(:first-child)]:mt-24 lg:[&:not(:first-child)]:mt-40"
              >
                <div
                  className={`col-span-full lg:col-span-6 ${
                    flipped ? "lg:col-start-7" : "lg:col-start-1"
                  }`}
                >
                  <Plate
                    plate={plates[room.plate]}
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    reveal={i === 1 ? "wipe" : "rise"}
                    parallax={i === 2 ? 10 : undefined}
                    caption={false}
                  />
                </div>

                <div
                  className={`reveal col-span-full lg:col-span-4 lg:pt-10 ${
                    flipped ? "lg:col-start-2 lg:row-start-1" : "lg:col-start-8"
                  }`}
                >
                  <h3 className="t-title">{room.name}</h3>
                  <p className="t-lede mt-5 text-ink/75">{room.line}</p>
                  <p className="t-body mt-6 text-ink/70">{room.body}</p>

                  {/* Specifications render only once they are real. */}
                  <Specs specs={room.specs} />

                  <a href="#enquire" className="action mt-8">
                    Enquire — {room.name}
                    <span aria-hidden="true" className="action__arrow">
                      →
                    </span>
                  </a>

                  {/* A second view, where there is one, hung under the text. */}
                  {room.plateB && (
                    <div className="mt-14 lg:mt-20">
                      <Plate
                        plate={plates[room.plateB]}
                        sizes="(max-width: 1024px) 100vw, 30vw"
                        caption={false}
                      />
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <p className="t-plate reveal mt-24 border-t border-[var(--rule)] pt-7 lg:mt-36">
          Room specifications are being finalised. Written enquiries are open.
        </p>
      </div>
    </section>
  );
}

function Specs({ specs }: { specs: (typeof rooms)[number]["specs"] }) {
  const rows: [string, string][] = [];
  if (specs.size) rows.push(["Size", specs.size]);
  if (specs.occupancy) rows.push(["Occupancy", specs.occupancy]);
  if (specs.view) rows.push(["View", specs.view]);
  if (specs.amenities?.length) rows.push(["In the room", specs.amenities.join(", ")]);
  if (rows.length === 0) return null;

  return (
    <dl className="mt-8 border-t border-[var(--rule)]">
      {rows.map(([term, value]) => (
        <div key={term} className="flex gap-6 border-b border-[var(--rule)] py-3">
          <dt className="t-plate w-28 shrink-0">{term}</dt>
          <dd className="text-sm">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
