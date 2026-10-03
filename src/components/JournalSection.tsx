import { journal } from "@/content/journal";

/**
 * The journal, set as a contents page.
 *
 * The cursor-following image preview has gone. It needed a photograph per
 * article; the only candidates were pictures of rooms, which say nothing
 * about a plantation morning. Without it this is a clean typographic index —
 * and one less client component.
 *
 * Entries whose `href` is still "#" are unpublished and are not rendered as
 * links, because a link that goes nowhere is worse than no link.
 */
export function JournalSection() {
  return (
    <section id="journal" className="section-y bg-parchment">
      <div className="shell">
        <div className="grid12">
          <p className="t-eyebrow col-span-full mb-10 lg:col-span-2 lg:mb-0">
            Journal
          </p>
          <h2 className="t-statement col-span-full max-w-[16ch] lg:col-span-8 lg:col-start-3">
            Notes from the hills.
          </h2>
        </div>

        <ul className="mt-20 lg:mt-28">
          {journal.map((entry) => {
            const published = entry.href !== "#";
            const Row = published ? "a" : "div";
            return (
              <li key={entry.title} className="border-t border-[var(--rule)] last:border-b">
                <Row
                  {...(published ? { href: entry.href } : {})}
                  className={`grid12 items-baseline gap-y-3 py-9 lg:py-12 ${
                    published ? "cursor-pointer" : ""
                  }`}
                >
                  <h3 className="t-title col-span-full lg:col-span-6 lg:col-start-1">
                    {entry.title}
                  </h3>
                  <p className="t-body col-span-full text-sm text-ink/65 lg:col-span-4 lg:col-start-8">
                    {entry.standfirst}
                  </p>
                  {published && (
                    <span className="t-plate col-span-full lg:col-span-1 lg:col-start-12 lg:text-right">
                      Read
                    </span>
                  )}
                </Row>
              </li>
            );
          })}
        </ul>

        <p className="t-plate mt-10">The journal opens with the lodge.</p>
      </div>
    </section>
  );
}
