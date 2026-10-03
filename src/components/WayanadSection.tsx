/**
 * Beyond the estate.
 *
 * There is no photograph of Wayanad in the supplied set — only the property.
 * Rather than crop a picture of a bedroom and call it a landscape, this is
 * the one passage on the site with no image at all: deep green, a narrow
 * column of type, and a lot of air. It reads as a held breath between the
 * property and the invitation, which is what it was always meant to be.
 *
 * When landscape photography exists, it belongs here.
 */
export function WayanadSection() {
  return (
    <section
      id="wayanad"
      className="on-dark bg-green-900 py-[clamp(7rem,18vw,16rem)] text-ivory"
    >
      <div className="shell grid12">
        <div className="col-span-full lg:col-span-6 lg:col-start-4">
          <p className="t-eyebrow">Wayanad</p>
          <h2 className="t-statement mt-8 max-w-[12ch]">
            Beyond the estate.
          </h2>
          <p className="t-body mt-12 text-ivory/80">
            Wayanad is high country — forest, rock, tea and coffee laid over the
            hills, and cloud that comes down into the valleys most afternoons.
            The estate sits inside that landscape rather than looking out at it.
          </p>
          <p className="t-body mt-6 text-ivory/60">
            Wake to mist moving through the plantation. What you do after that
            is open.
          </p>
        </div>
      </div>
    </section>
  );
}
