import { site } from "@/content/site";

/**
 * The first thing after the photograph. Almost nothing in it.
 *
 * Deliberately not a three-column anything: a statement set high and left,
 * and a short paragraph dropped low and right, with a great deal of ivory
 * between them. The whitespace is the design.
 */
export function EstateIntro() {
  return (
    <section id="estate" className="section-y">
      <div className="shell grid12">
        <p className="t-eyebrow reveal col-span-full mb-12 lg:col-span-2 lg:mb-0">
          The Estate
        </p>

        <h2 className="t-statement reveal col-span-full lg:col-span-9 lg:col-start-3">
          Some places are discovered.
          <br />
          Others are quietly <span className="t-em">entered</span>.
        </h2>

        <div className="col-span-full mt-16 lg:col-span-4 lg:col-start-8 lg:mt-28">
          <p className="t-body reveal">
            {site.name} is a private retreat set within {site.acreage} acres of
            cocoa and coffee plantations in the hills of Wayanad.
          </p>
          <p className="t-body reveal mt-6 text-ink/70">
            Mornings arrive slowly. Mist first, then birds, then light through
            the shade trees. Nothing here needs to be hurried.
          </p>
        </div>
      </div>
    </section>
  );
}
