# The Planters Lodge

Website for a 100-acre cocoa and coffee plantation estate in Wayanad, Kerala.

Next.js 16 · React 19 · TypeScript · Tailwind v4. No other runtime
dependencies — no animation library, no UI kit, no icon package.

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

---

# ⚠ LAUNCH CHECKLIST — DO NOT PUBLISH UNTIL THESE ARE DONE

Nothing is ticked except the photography, because none of the rest exists yet.
**Blocking** means the site is missing a capability until it is supplied.

### Brand
- [ ] **Real logo** — `src/app/icon.svg` is an interim green square with a "P"
      in a system serif. It is not a logo.
- [ ] **Favicon** derived from the real logo (replace `src/app/icon.svg`).
- [ ] **OG image** — `src/app/opengraph-image.jpg` is a crop of the arrival
      photograph. Replace if a dedicated share image is designed.

### Contact — `src/content/owner.ts` or `.env.local`
- [ ] **Real phone** — `PHONE_DISPLAY`, `PHONE_E164`
- [ ] **Real WhatsApp number** — `WHATSAPP_NUMBER` · **blocking**
- [ ] **Real email** — `EMAIL` · **blocking**
- [ ] **Real domain** — `NEXT_PUBLIC_SITE_URL` · **blocking**
- [ ] **Real social handles** — `SOCIAL` (an empty list renders nothing)

> **The site currently shows no contact details at all.** Every WhatsApp,
> telephone and email action hides itself rather than link somewhere that does
> not answer. Setting `WHATSAPP_NUMBER` alone restores four CTAs.

### Property information
- [ ] **Real room names** — `src/content/stay.ts`. `Canopy Rooms`,
      `Estate Rooms`, `The Planter's House` are working descriptions, not
      this property's room names.
- [ ] **Real room details** — `size`, `occupancy`, `view`. All `null` today,
      so the specification table does not render at all.
- [ ] **Real amenities** — `amenities[]`. Nothing invented.
- [ ] **Real dining information** — the section says "Menus are in
      development." No chef, restaurant or sourcing claim has been made.
- [ ] **Real experiences** — the six headings came from the brief; the copy
      describes the place, not a programme.
- [ ] **Real location / address** — `STREET_ADDRESS`, `POSTAL_CODE`,
      `LATITUDE`, `LONGITUDE`. Omitted from structured data until supplied.

### Technical
- [ ] **Enquiry notification provider** · **blocking** — `ENQUIRY_CHANNEL` is
      `log`. Submissions are recorded to the server console and **nobody is
      notified**. The form says so, in as many words. See below.
- [ ] **Analytics** — none installed. Nothing is tracked, so no consent
      banner is needed yet; both change together.
- [ ] **Production environment variables** — copy `.env.example` to the host.
- [ ] **Final SEO metadata** — `robots.txt` currently **disallows all
      crawling** and the page is `noindex`, automatically, because no real
      domain is set. Both flip the moment `NEXT_PUBLIC_SITE_URL` is set.
- [ ] **Higher-resolution hero** — the supplied file is 960px wide.

### Photography
- [x] Ten real photographs installed, wired and tuned.
- [ ] **Plantation photography** — there is none. No coffee, cocoa, harvest,
      monsoon, food or landscape image exists, which is why several sections
      are deliberately type-only.

---

## The photographs

Ten files in `public/plates/`, named for what they actually show. **Every one
is 3:4 portrait, at most 1086px wide** — the single fact that drove the
layout.

| File | Plate | Shows |
|---|---|---|
| `01-arrival.jpg` | I | The lodge from the forecourt, daylight |
| `02-cottages.jpg` | II | Two cottages among the trees |
| `03-verandah.jpg` | III | Verandah columns and the stone path |
| `04-grounds.jpg` | VIII | A cottage verandah through a large tree |
| `05-room-twin.jpg` | IV | Room, twin and double |
| `06-room-double.jpg` | V | Room, double, with ceiling fan |
| `07-suite-bed.jpg` | VI | Bedroom, arch through to sitting room |
| `08-suite-sitting.jpg` | VII | The same rooms, from the other end |
| `09-sitting-room.jpg` | IX | The sitting room |
| `10-night.jpg` | X | The lodge after dark |

Plate numbers ascend in the order a reader meets them, which is not file
order — Experiences sits after Stay, so `04-grounds` is Plate VIII.

### Tuning — `src/content/media.ts`

The only file that configures photography. No component needs editing.

```ts
focal: { desktop: "50% 44%", mobile: "50% 46%" },  // object-position
crop:  { desktop: "3 / 4",   mobile: "3 / 4"   },  // aspect-ratio
priority: true,                                    // hero only
```

Raise the second `focal` number to keep more of the bottom of the frame.
`3 / 4` crops nothing; going wider than `4 / 5` starts cutting ceilings and
rooflines. Both switch at 1024px, in CSS, with no JavaScript and no shift.

---

## The motion system

Two files. `src/lib/motion.ts` runs it; the "PLATE MOTION" block in
`src/app/globals.css` defines it. Server components opt in with props on
`<Plate>`; nothing is hand-animated per image.

**Reveals replay.** A photograph animates in each time it meaningfully
re-enters the viewport, scrolling up or down — not once per page load.

| Pattern | What it does | Used on |
|---|---|---|
| `rise` | opacity + 22px rise, image settles 1.045 → 1 | 5 plates (default) |
| `wipe` | frame opens upward via `clip-path`, settles 1.06 → 1 | 3 plates |
| `settle` | scale alone, no travel and no fade | hero, closing frame |

**How the replay works.** One `IntersectionObserver` with hysteresis:
`is-in` goes on once **15%** of the photograph is in view, and comes off only
once it falls back below **2%**. The gap between the two thresholds is what
stops an element parked at the edge from flickering — it must properly leave
before it can arrive again. Config: `threshold: [0, 0.02, 0.15, 0.3]`,
`rootMargin: "0px 0px -10% 0px"`. Photographs stay observed; **text reveals
are released after their first pass**, because words re-animating on every
scroll reads as a page that will not sit still.

**Every transition is declared on the `.is-in` state and nowhere else.** That
asymmetry is the trick: entering picks up the transition and animates;
leaving drops it and snaps silently back to the ready state. Declared on the
base state, a `wipe` would visibly wipe itself shut as you scrolled away.

**Parallax — four photographs, ±10px, desktop only.** Hero (8px), `cottages`
(10), `suiteBed` (10), `night` (10). Entirely separate from the reveal: it
tracks scroll position continuously in both directions for as long as the
element is on screen. A second observer keeps a set of what is visible so the
rAF loop only measures those; one passive scroll listener serves the page,
and it switches off below 1024px. The parallax layer sits *inside* the
clipped frame, inset past its edges, so travel never uncovers a gap.

**Drift — two photographs.** `scale(1) → scale(1.025)` over 24s, alternating,
gated on `.is-in` so it starts on arrival, resets on exit and restarts on
return.

**Hover** — `scale(1.02)` on pointer devices, scoped to `.is-in`.

**Why the properties can never conflict:** every reveal drives `scale`, drift
drives `transform`, parallax drives a custom property consumed by a separate
wrapper. Three different CSS properties on three different elements. The
earlier bug — an `animation` shorthand silently replacing the hero's settle —
is structurally impossible now, because no reveal uses `animation` at all.

### Reduced motion

`prefers-reduced-motion: reduce` removes **all** of it: reveals resolve
instantly, clip-paths clear, drift and settle stop, hover scale is off, and
`initParallax()` never attaches its listeners. Verified against the compiled
stylesheet, not just the source.

There is also a `@media (scripting: none)` fallback: the reveals start hidden
and are uncovered by the motion engine, so if the script never runs the
photographs are still visible.

---

## Enquiry — `src/lib/enquiry/`

```
validate.ts   field rules and guest-readable messages
channels.ts   where an enquiry can go
index.ts      picks the channel named in owner.ts
```

**The form never claims more than happened.** The route returns one of five
states and the UI says something different, and true, for each:

| State | HTTP | What the guest is told |
|---|---|---|
| `invalid` | 400 | the specific field problem |
| `delivered` | 200 | "Your enquiry has reached us" |
| `recorded_not_delivered` | 200 | recorded, **but nobody has been notified** |
| `delivery_failed` | 502 | it did not reach us, plus a channel that works |
| `channel_not_configured` | 502 | same |

A channel declares `notifiesOwner`. `logChannel` runs perfectly and notifies
nobody, so it reports `false` — which is why a valid submission today returns
`recorded_not_delivered` and the form says so in laterite rather than
thanking the guest for nothing.

To connect a real destination, write `{ name, isConfigured(), notifiesOwner,
deliver() }`, register it in `index.ts`, set `ENQUIRY_CHANNEL`. Nothing else
changes. `emailChannel` is scaffolded and reports itself unconfigured, so
selecting it without its environment variables fails loudly instead of
dropping enquiries.

---

## Editorial devices

Kept, and audited for repetition:

- **Plate captions** — reduced from 8 to **4**. The room plates lost theirs:
  the room's name sits alongside, so the caption was repeating it.
- **Running head** — a hairline in the right margin naming the current
  section, vertical, desktop ≥1280px, hidden from assistive technology.
- **Italic emphasis** — reduced from 8 headlines to **4**, at the narrative
  beats: hero, introduction, stay, close. In all eight it was a tic.
- **Still passages** — Wayanad and Journal animate nothing. Not every section
  should move.

## The design system

`src/app/globals.css`, declared before any component.

```
#17251D  plantation green    #F3EFE7  warm ivory      #756552  earth
#24382B  forest              #E9E1D3  soft parchment  #1C1C19  charcoal
```

Cormorant Garamond for statements, Manrope for everything a hand touches.
Hierarchy is by role, not tag: `.t-hero`, `.t-statement`, `.t-title`,
`.t-sub`, `.t-lede`, `.t-body`, `.t-eyebrow`, `.t-plate`.

Display weight is an **optical scale, not one flat weight** — a garalde at
92px carries 400 and still reads substantial, while the same 400 at 47px goes
spindly. So weight rises as size falls:

| Role | @1440 | Weight |
|---|---|---|
| `.t-hero` | 92px | 400 |
| `.t-statement` | 78px | 400 |
| `.t-title` | 47px | 500 |
| `.t-sub` | 29px | 500 |
| `.t-lede` | 18px | 400 |
| `.t-body` | 17px | 400 |
| `.t-eyebrow` / `.t-plate` | 11.5px | 500 / 400 |

Nothing is bold; 500 is medium. `.t-em` inherits its heading's weight — pinned
to 300 it rendered the italic word visibly lighter than the words either side.
Only the weights actually used are shipped (Cormorant 400/500, Manrope
400/500). Body measure runs 49–55 characters at 1440 and 56–67 at 1920.

Client components are only the five that need a browser: `Nav`,
`EnquirySection`, `Plate`, `BleedImage`, `MarginRule`, plus the `MotionEngine`
that renders nothing. Everything else is a server component.

---

## Verified

- Production build, TypeScript and ESLint clean.
- 375 / 390 / 430 / 768 / 1024 / 1440 / 1920: no horizontal overflow, hero
  resolves in exactly one screen, CLS 0, zero sub-44px targets, one `h1`, no
  heading-level jumps, every image alt'd, every input labelled.
- Parallax measured at exactly ±10px peak travel at 1440, and inactive below
  1024.
- Hero runs both `settleIn` and `plateDrift`; settle completes to `scale: 1`.
- Enquiry tested for valid, missing-field, bad-email, reversed-date,
  out-of-range-guests, overlong-message and honeypot submissions.
- No fake phone, email, domain, social handle or dead link renders anywhere.
- Structured data contains only properties backed by real information.
- 1 eager image, 9 lazy; AVIF served at 206 KB against 372 KB JPEG.

Not done, and not claimable: Lighthouse against a production deployment, and
Core Web Vitals from real traffic. Both need a real host.
