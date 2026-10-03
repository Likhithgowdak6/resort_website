/* ==========================================================================
   IMAGE MANIFEST & TUNING CONFIGURATION
   --------------------------------------------------------------------------
   This file is the only place photography is configured. Focal point, crop,
   loading priority, caption and alt text are all set here, per breakpoint.
   You should never need to edit a component to adjust a photograph.

   ── IMPORTANT: every supplied photograph is 3:4 PORTRAIT, ≤1086px wide. ──
   Crops stay at or near 3/4 so nothing important is cut. Widening a crop
   past about 4/5 starts throwing away the top and bottom of the frame.

   HOW TO TUNE
     focal.desktop / focal.mobile
         CSS object-position. "50% 60%" means centred horizontally, biased
         60% down the frame. Raise the second number to keep more of the
         bottom of the photograph in view.
     crop.desktop / crop.mobile
         CSS aspect-ratio for the frame. "3 / 4" is the native shape of
         these files — no crop at all. "4 / 5" is a mild landscape-ward trim.
     priority
         true only for the first image on screen. Everything else is lazy.

   REPLACING A PHOTOGRAPH
     Drop the new file at the same path in /public/plates/, update `alt` to
     describe what the new photograph actually shows, adjust `focal` if the
     subject sits somewhere different. Nothing else changes.
   ========================================================================== */

export type Plate = {
  id: string;
  src: string;
  /** Describes what is actually in the frame. Read aloud by screen readers. */
  alt: string;
  /** Plate number, printed in roman numerals in the caption. */
  plate: string;
  caption: string;
  /** Intrinsic pixel size of the file — prevents layout shift. */
  width: number;
  height: number;
  focal: { desktop: string; mobile: string };
  crop: { desktop: string; mobile: string };
  priority?: boolean;
};

export const plates = {
  /* ---- Arrival ---------------------------------------------------------- */
  arrival: {
    id: "arrival",
    src: "/plates/01-arrival.jpg",
    alt: "The lodge seen from the forecourt: a low white building under a red tiled roof, timber doors opening onto verandahs, framed by plantation trees.",
    plate: "I",
    caption: "The lodge, from the forecourt",
    width: 960,
    height: 1280,
    // Biased up: keeps the roofline and sky, drops dead forecourt gravel.
    focal: { desktop: "50% 44%", mobile: "50% 46%" },
    crop: { desktop: "3 / 4", mobile: "3 / 4" },
    priority: true,
  },

  /* ---- The estate ------------------------------------------------------- */
  cottages: {
    id: "cottages",
    src: "/plates/02-cottages.jpg",
    alt: "Two tile-roofed cottages standing among tall trees, with grass and a stone path in front.",
    plate: "II",
    caption: "Cottages among the trees",
    width: 1086,
    height: 1448,
    focal: { desktop: "50% 62%", mobile: "50% 58%" },
    crop: { desktop: "3 / 4", mobile: "3 / 4" },
  },
  verandah: {
    id: "verandah",
    src: "/plates/03-verandah.jpg",
    alt: "A run of verandah columns along the front of the lodge, with a moss-jointed stone path curving away beneath a large tree.",
    plate: "III",
    caption: "Verandah and path",
    width: 1086,
    height: 1448,
    focal: { desktop: "48% 55%", mobile: "45% 55%" },
    crop: { desktop: "3 / 4", mobile: "3 / 4" },
  },
  grounds: {
    id: "grounds",
    src: "/plates/04-grounds.jpg",
    alt: "A cottage verandah seen through the branches of a large tree, with lawn and paving in the foreground.",
    plate: "VIII",
    caption: "Under the trees",
    width: 1086,
    height: 1448,
    focal: { desktop: "50% 58%", mobile: "50% 55%" },
    crop: { desktop: "3 / 4", mobile: "3 / 4" },
  },

  /* ---- The rooms -------------------------------------------------------- */
  roomTwin: {
    id: "roomTwin",
    src: "/plates/05-room-twin.jpg",
    alt: "A room with a double and a single bed under a pitched timber ceiling, terracotta floor, and glazed doors onto the verandah.",
    plate: "IV",
    caption: "Room, twin and double",
    width: 960,
    height: 1280,
    focal: { desktop: "50% 58%", mobile: "50% 55%" },
    crop: { desktop: "4 / 5", mobile: "3 / 4" },
  },
  roomDouble: {
    id: "roomDouble",
    src: "/plates/06-room-double.jpg",
    alt: "A double bed and a single bed beneath a dark timber ceiling and a ceiling fan, with a lantern wall light and jute rugs on terracotta tiles.",
    plate: "V",
    caption: "Room, double",
    width: 960,
    height: 1280,
    focal: { desktop: "50% 62%", mobile: "50% 58%" },
    crop: { desktop: "4 / 5", mobile: "3 / 4" },
  },
  suiteBed: {
    id: "suiteBed",
    src: "/plates/07-suite-bed.jpg",
    alt: "A double bed under a timber ceiling, with an arched opening through to a separate sitting room beyond.",
    plate: "VI",
    caption: "Bedroom, through to the sitting room",
    width: 960,
    height: 1280,
    focal: { desktop: "55% 58%", mobile: "52% 55%" },
    crop: { desktop: "4 / 5", mobile: "3 / 4" },
  },
  suiteSitting: {
    id: "suiteSitting",
    src: "/plates/08-suite-sitting.jpg",
    alt: "A private sitting room with upholstered teak settees and a low table, opening through an arch to the bedroom.",
    plate: "VII",
    caption: "The same rooms, from the other end",
    width: 960,
    height: 1280,
    focal: { desktop: "50% 55%", mobile: "50% 52%" },
    crop: { desktop: "3 / 4", mobile: "3 / 4" },
  },

  /* ---- Rooms of the house ----------------------------------------------- */
  sittingRoom: {
    id: "sittingRoom",
    src: "/plates/09-sitting-room.jpg",
    alt: "A sitting room with teak settees facing each other across a glass-topped table, curtains drawn back from glazed doors onto the garden.",
    plate: "IX",
    caption: "Sitting room",
    width: 960,
    height: 1280,
    focal: { desktop: "50% 50%", mobile: "50% 50%" },
    crop: { desktop: "3 / 4", mobile: "3 / 4" },
  },

  /* ---- Night ------------------------------------------------------------ */
  night: {
    id: "night",
    src: "/plates/10-night.jpg",
    alt: "The lodge at dusk, verandahs and tree trunks lit warmly against a deep blue sky.",
    plate: "X",
    caption: "After dark",
    width: 960,
    height: 1280,
    focal: { desktop: "50% 56%", mobile: "50% 54%" },
    crop: { desktop: "16 / 9", mobile: "4 / 5" },
  },
} as const satisfies Record<string, Plate>;

export type PlateKey = keyof typeof plates;

/**
 * Turns a plate's focal and crop settings into CSS custom properties.
 * The component reads these; the breakpoint switch happens in CSS, so there
 * is no layout shift and no JavaScript involved.
 */
export function plateVars(plate: Plate): React.CSSProperties {
  return {
    "--crop-m": plate.crop.mobile,
    "--crop-d": plate.crop.desktop,
    "--focal-m": plate.focal.mobile,
    "--focal-d": plate.focal.desktop,
  } as React.CSSProperties;
}
