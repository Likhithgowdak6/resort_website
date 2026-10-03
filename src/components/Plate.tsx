"use client";

import Image from "next/image";
import { useState } from "react";
import { plateVars, type Plate as PlateT } from "@/content/media";

/** The three reveal patterns. See "PLATE MOTION" in globals.css. */
export type Reveal = "rise" | "wipe" | "settle";

type Props = {
  plate: PlateT;
  /** Responsive sizes hint — always pass a real one. */
  sizes: string;
  /** Overrides the crop from media.ts. Use sparingly. */
  ratio?: string;
  className?: string;
  caption?: boolean;
  captionClassName?: string;

  /* -- motion. Defaults are the quiet option; opt in deliberately. ------- */
  /** How the photograph arrives. Default "rise". */
  reveal?: Reveal;
  /** Maximum parallax travel in pixels. ~10 is the whole budget. Desktop only. */
  parallax?: number;
  /** An almost imperceptible continuous breath. Two photographs at most. */
  drift?: boolean;
  /** Subtle scale on hover, pointer devices only. Default on. */
  hover?: boolean;
};

/**
 * A photograph, set as a plate in a monograph.
 *
 * Crop, focal point and loading priority come from media.ts; motion comes
 * from the props above and runs entirely in CSS. If a photograph is framed
 * badly the fix belongs in the manifest, not here.
 */
export function Plate({
  plate,
  sizes,
  ratio,
  className = "",
  caption = true,
  captionClassName = "",
  reveal = "rise",
  parallax,
  drift = false,
  hover = true,
}: Props) {
  const [failed, setFailed] = useState(false);

  const picture = !failed && (
    <Image
      src={plate.src}
      alt={plate.alt}
      fill
      priority={plate.priority}
      loading={plate.priority ? undefined : "lazy"}
      sizes={sizes}
      quality={82}
      className="plate-img object-cover"
      onError={() => setFailed(true)}
    />
  );

  return (
    <figure
      className={className}
      data-plate=""
      data-reveal={reveal}
      data-drift={drift ? "true" : undefined}
      data-hover={hover ? "true" : undefined}
    >
      <div
        className="plate__frame"
        style={{ ...plateVars(plate), ...(ratio ? { aspectRatio: ratio } : {}) }}
      >
        <div
          className="plate__field"
          role={failed ? "img" : undefined}
          aria-label={failed ? plate.alt : undefined}
          aria-hidden={failed ? undefined : true}
        />
        {/* The parallax layer lives inside the clipped frame and is inset
            past its edges, so a few pixels of travel never uncovers a gap. */}
        {parallax ? (
          <div
            data-parallax={parallax}
            className="absolute"
            style={{ inset: `-${parallax + 6}px` }}
          >
            {picture}
          </div>
        ) : (
          picture
        )}
      </div>

      {caption && (
        <figcaption className={`t-plate mt-4 flex gap-3 ${captionClassName}`}>
          <span className="shrink-0 opacity-70">Plate {plate.plate}</span>
          <span aria-hidden="true" className="opacity-40">
            —
          </span>
          <span>{plate.caption}</span>
        </figcaption>
      )}
    </figure>
  );
}
