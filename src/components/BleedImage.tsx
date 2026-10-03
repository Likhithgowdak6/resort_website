"use client";

import Image from "next/image";
import { useState } from "react";
import { plateVars, type Plate } from "@/content/media";

type Props = {
  plate: Plate;
  scrim?: "bottom" | "full" | "none";
  className?: string;
  /** An almost imperceptible continuous breath. */
  drift?: boolean;
  /** Maximum parallax travel in pixels. Desktop only. */
  parallax?: number;
};

/**
 * A photograph filling its container, with a scrim so type can sit on it.
 *
 * Separate from <Plate> because these carry no caption and are the ground
 * rather than an object on the page. The reveal is always "settle": a
 * full-bleed frame that travels reads as the page shifting rather than the
 * picture arriving.
 */
export function BleedImage({
  plate,
  scrim = "bottom",
  className = "",
  drift = false,
  parallax,
}: Props) {
  const [failed, setFailed] = useState(false);

  const picture = !failed && (
    <Image
      src={plate.src}
      alt={plate.alt}
      fill
      priority={plate.priority}
      loading={plate.priority ? undefined : "lazy"}
      sizes="100vw"
      quality={82}
      className="plate-img object-cover"
      onError={() => setFailed(true)}
    />
  );

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      data-plate=""
      data-reveal="settle"
      data-drift={drift ? "true" : undefined}
    >
      <div
        className="plate__frame absolute inset-0 !aspect-auto"
        style={plateVars(plate)}
      >
        <div
          className="plate__field"
          role={failed ? "img" : undefined}
          aria-label={failed ? plate.alt : undefined}
          aria-hidden={failed ? undefined : true}
        />
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
      {scrim !== "none" && (
        <div
          className={scrim === "bottom" ? "scrim-b absolute inset-0" : "scrim-full absolute inset-0"}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
