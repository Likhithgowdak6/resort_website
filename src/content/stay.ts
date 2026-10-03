import type { PlateKey } from "./media";

/* ==========================================================================
   ACCOMMODATION
   --------------------------------------------------------------------------
   ⚠  THE THREE CATEGORY NAMES BELOW ARE PLACEHOLDERS. They are descriptive
      working names, not real room names at this property. Replace them.

   Every factual field is `null` on purpose. Nothing about room sizes,
   occupancy, counts or amenities has been invented. A null field simply does
   not render — fill one in and it appears, correctly formatted.
   ========================================================================== */

export type Room = {
  /** PLACEHOLDER name — replace. */
  name: string;
  /** One sensory line. Not a sales promise. */
  line: string;
  body: string;
  plate: PlateKey;
  /** Optional second photograph, hung lower beside the first. */
  plateB?: PlateKey;
  /** Factual fields. Leave null until confirmed; nulls are not rendered. */
  specs: {
    size: string | null;
    occupancy: string | null;
    view: string | null;
    amenities: string[] | null;
  };
};

export const rooms: Room[] = [
  {
    name: "Canopy Rooms", // PLACEHOLDER
    line: "A timber ceiling, a tiled floor, and the trees right outside.",
    body: "Glazed doors open straight onto the verandah, so the room ends where the plantation starts.",
    plate: "roomTwin",
    specs: { size: null, occupancy: null, view: null, amenities: null },
  },
  {
    name: "Estate Rooms", // PLACEHOLDER
    line: "A fan turning, and nothing else to listen to.",
    body: "Beds made up under a dark pitched ceiling, with jute underfoot and a lantern on the wall.",
    plate: "roomDouble",
    specs: { size: null, occupancy: null, view: null, amenities: null },
  },
  {
    name: "The Planter's House", // PLACEHOLDER
    line: "A bedroom, and a sitting room through the arch.",
    body: "The largest of them, taken privately — somewhere to put your feet up that is not the end of the bed.",
    plate: "suiteBed",
    plateB: "suiteSitting",
    specs: { size: null, occupancy: null, view: null, amenities: null },
  },
];
