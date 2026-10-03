/* ==========================================================================
   EXPERIENCES
   --------------------------------------------------------------------------
   The six headings come from the brand brief. The copy underneath is sensory
   and describes the place, not a scheduled activity — no guided tours,
   timings, guides or facilities have been invented.

   There is deliberately no photograph attached to each entry: the supplied
   photography is of the buildings and the rooms, and illustrating "Coffee &
   Cocoa" with a picture of a bedroom would be a lie told in pictures. When
   plantation photography exists, this is the natural place for it.
   ========================================================================== */

export type Experience = {
  title: string;
  /** Season or time of day — the only "data" here, and it is honest. */
  when: string;
  body: string;
};

export const experiences: Experience[] = [
  {
    title: "Plantation Walks",
    when: "Any morning",
    body: "A hundred acres is further than it sounds. Paths run between the rows, under shade trees, down to where the ground gets wet.",
  },
  {
    title: "Coffee & Cocoa",
    when: "Harvest, roughly October to February",
    body: "Pods come off the trunk with a knife. Cherries are picked red. Both happen within sight of where you are staying.",
  },
  {
    title: "Monsoon Mornings",
    when: "June to August",
    body: "Rain arrives and stays. The plantation goes very green and very loud, and then very quiet.",
  },
  {
    title: "Wilderness",
    when: "Year round",
    body: "The estate sits in a landscape of forest and hill. What you see depends on how early you are up and how still you keep.",
  },
  {
    title: "Slow Breakfasts",
    when: "Until you are finished",
    body: "Coffee from the estate. Breakfast cooked to order, eaten outside when the weather allows it.",
  },
  {
    title: "Fireside Evenings",
    when: "December to February",
    body: "It gets cold here after dark. The evening ends early and nobody minds.",
  },
];
