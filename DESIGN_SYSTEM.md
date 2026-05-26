# DESIGN_SYSTEM.md — Solaris Terrace

Source: `stitch-export/solaris_sea/DESIGN.md` + all Solaris Terrace HTML exports.
Brand concept: **"Adventurous Luxury"** — editorial warmth, sun-drenched optimism, soft minimalism.

---

## Colors

All files use an identical Tailwind config. Use these exact token names as Tailwind classes.

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#a43716` | Terracotta — CTAs, active nav, price display, icons |
| `on-primary` | `#ffffff` | Text on primary buttons |
| `primary-container` | `#c54f2c` | Button hover state |
| `primary-fixed` | `#ffdbd1` | Light terracotta tint |
| `primary-fixed-dim` | `#ffb5a0` | Inverse primary / badges |
| `secondary` | `#2c657b` | Deep Ocean — secondary buttons, footer accents |
| `on-secondary` | `#ffffff` | Text on secondary buttons |
| `secondary-container` | `#aee5fe` | Light teal tint |
| `tertiary` | `#8b4c18` | Sand/amber — star ratings, decorative |
| `tertiary-container` | `#a8642e` | Badge backgrounds |
| `tertiary-fixed` | `#ffdcc6` | Cancellation policy info box bg |
| `surface` | `#faf9f5` | Warm white — page background |
| `background` | `#faf9f5` | Same as surface |
| `surface-container-lowest` | `#ffffff` | Cards, booking widget bg |
| `surface-container-low` | `#f4f4f0` | Alternate section bg, footer |
| `surface-container` | `#efeeea` | Chips, pills |
| `surface-container-high` | `#e9e8e4` | Rating badge bg, filter track |
| `surface-container-highest` | `#e3e2df` | Dividers |
| `surface-bright` | `#faf9f5` | Nav bg, booking bar inputs |
| `surface-dim` | `#dbdad6` | Dark mode surface |
| `on-surface` | `#1b1c1a` | Primary body text |
| `on-surface-variant` | `#58423c` | Secondary text, labels, placeholders |
| `outline` | `#8b716a` | Borders, dividers |
| `outline-variant` | `#dfc0b7` | Subtle borders (use at /20–/30 opacity) |
| `inverse-surface` | `#2f312e` | Dark containers |
| `inverse-on-surface` | `#f2f1ed` | Text on dark containers |
| `surface-tint` | `#a73918` | Tint overlay |
| `error` | `#ba1a1a` | Form errors |

**Input field background (not a token):** `#F8F4EF` — sand-tinted input bg used directly in checkout form.

**Glass effect:** `rgba(255,255,255,0.7)` + `backdrop-filter: blur(12px)` — used on hero booking bar and suite card favorite buttons.

**Hero gradient:** `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.3) 100%)`

**Card image overlay:** `bg-gradient-to-t from-black/60 via-transparent to-transparent`

---

## Typography

Two Google Fonts: **Playfair Display** (headlines) + **Plus Jakarta Sans** (UI/body).
Material Symbols Outlined icon font (wght 300–400, FILL 0).

```
font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
```

| Scale token | Font | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| `display-lg` | Playfair Display | 64px | 700 | 1.1 | -0.02em |
| `display-lg-mobile` | Playfair Display | 40px | 700 | 1.2 | -0.01em |
| `headline-lg` | Playfair Display | 48px | 600 | 1.2 | — |
| `headline-md` | Playfair Display | 32px | 600 | 1.3 | — |
| `title-lg` | Plus Jakarta Sans | 20px | 600 | 1.5 | — |
| `body-lg` | Plus Jakarta Sans | 18px | 400 | 1.6 | — |
| `body-md` | Plus Jakarta Sans | 16px | 400 | 1.6 | — |
| `label-md` | Plus Jakarta Sans | 14px | 600 | 1.0 | 0.05em |

**Tailwind usage:** `font-headline-lg text-headline-lg`, `font-label-md text-label-md`, etc. — both font-family and font-size tokens share the same name prefix.

**Brand wordmark:** `font-display-lg text-title-lg tracking-widest text-primary uppercase` → "SOLARIS TERRACE"

---

## Spacing & Layout

| Token | Value | Usage |
|---|---|---|
| `unit` | 8px | Base spacing unit — all spacing is multiples of 8 |
| `gutter` | 24px | Grid column gutter |
| `margin-desktop` | 64px | Horizontal page padding on desktop |
| `margin-mobile` | 20px | Horizontal page padding on mobile |
| `section-gap` | 120px | Vertical gap between major page sections |
| `container-max` | 1280px | Max content width |

**Container pattern:** `max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop`

**Section pattern:** `py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto`

**Grid:** 12-column on desktop with 24px gutters. Suite detail layout: `grid-cols-1 lg:grid-cols-12` with left `lg:col-span-8` and right `lg:col-span-4`.

---

## Border Radius

| Token | Value | Usage |
|---|---|---|
| `DEFAULT` | 0.25–0.5rem | Small components, inputs |
| `lg` | 0.5rem | Standard cards |
| `xl` | 0.75rem | Input fields, booking bar sections |
| `full` | 9999px | Pill buttons, nav CTA, filter chips |
| `rounded-2xl` | 1rem | Review cards |
| `rounded-3xl` | 1.5rem | Suite listing cards, bento grid items |
| `rounded-[24px]` | 24px | Hero booking bar, sticky booking widget |
| `rounded-[32px]` | 32px | Experience feature cards |

---

## Shadows & Elevation

- **Default card:** `shadow-sm` (barely visible)
- **Hover card:** `hover:shadow-xl` with `transition-all duration-500`
- **Booking widget sidebar:** `shadow-lg border border-outline-variant/10`
- **Checkout sidebar:** `shadow-lg border border-outline-variant/20`
- **Nav:** `shadow-sm border-b border-outline-variant/30`
- **No dark/black shadows** — all shadows use Deep Ocean at 4–8% opacity conceptually

---

## Component Patterns

### Navigation (Fixed, z-50)
```
bg-surface/80 backdrop-blur-md shadow-sm border-b border-outline-variant/30
fixed top-0 left-0 right-0 z-50
py-6 (shrinks to py-4 on scroll via JS)
```
- Logo: `font-display-lg text-title-lg tracking-widest text-primary uppercase`
- Nav links: `text-on-surface-variant hover:text-primary transition-colors duration-300 font-body-lg text-body-lg`
- Active link: `text-primary border-b-2 border-primary font-bold pb-1`
- CTA button: `bg-primary text-on-primary px-8 py-3 rounded-full font-label-md text-label-md`

### Hero Section (full-screen)
```
relative h-screen w-full flex items-center justify-center overflow-hidden
```
- Full-bleed image with `hero-gradient` overlay
- Title: `font-headline-lg text-display-lg-mobile md:text-display-lg drop-shadow-lg`
- Scroll indicator: `animate-bounce` chevron at `bottom-10`

### Hero Booking Bar (inside hero, glass effect)
```
glass-effect rounded-[24px] p-2 md:p-3 shadow-2xl flex flex-col md:flex-row items-stretch gap-2
```
- Each field: `flex-1 bg-surface/50 hover:bg-surface transition-colors rounded-xl px-6 py-4`
- Label: `font-label-md text-[10px] text-primary uppercase tracking-widest mb-1`
- Input: `bg-transparent border-none p-0 focus:ring-0 font-title-lg placeholder:text-on-surface-variant/50`
- Submit: `bg-primary text-on-primary px-10 py-5 rounded-xl font-label-md`

### Sticky Rooms Sub-Header (rooms page only)
```
sticky top-[88px] z-40 bg-surface-container-low border-b border-outline-variant/20 py-4 shadow-sm
```
- Booking summary pill: `bg-surface-bright rounded-full px-6 py-2 border border-outline-variant/30`

### Suite Listing Card
```
group relative bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm
hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1
```
- Image wrapper: `relative aspect-[4/3] overflow-hidden`
- Image: `w-full h-full object-cover transition-transform duration-700 group-hover:scale-110`
- Badge pill: `bg-primary/90 text-on-primary font-label-md text-[10px] px-3 py-1 rounded-full backdrop-blur-md`
- Price: `font-headline-md text-headline-md text-primary`
- CTA: `bg-on-surface text-surface px-6 py-3 rounded-full font-label-md hover:bg-primary transition-colors`
- Rating badge: `bg-surface-container-high px-2 py-1 rounded-lg` with filled star

### Mosaic Gallery (suite detail page)
```css
.mosaic-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: repeat(2, 300px);
  gap: 16px;
}
.mosaic-large { grid-column: 1/2; grid-row: 1/3; }
/* Mobile: 2-col, large spans full width */
```
- Each cell: `relative overflow-hidden rounded-xl group` with `group-hover:scale-105 transition-transform duration-700`
- Last cell: overlay with `+ 12 Photos` label

### Sticky Booking Widget (suite detail, right column)
```
sticky top-32 bg-surface-container-lowest p-8 rounded-[24px] shadow-lg border border-outline-variant/10
```
- Price: `font-headline-md text-headline-md text-primary` + `/ Night` label
- Field wrapper: `bg-surface p-4 rounded-xl border border-outline-variant/20 focus-within:border-secondary transition-all`
- Breakdown: `py-6 border-t border-outline-variant/20 space-y-3`
- Book button: `w-full bg-primary text-on-primary py-4 rounded-full font-title-lg hover:bg-primary-container shadow-md active:scale-95`
- Subtext: `text-center text-on-surface-variant text-xs mt-4` — "You won't be charged yet"

### Amenity Item (suite detail)
```
flex items-start gap-4
  bg-surface-container-high p-4 rounded-xl  ← icon wrapper, text-secondary icon
  h4: font-title-lg  p: text-on-surface-variant text-sm
```

### Bento Grid (homepage explorations)
```
grid grid-cols-1 md:grid-cols-12 gap-8 h-[700px]
  Large item: md:col-span-8 relative rounded-3xl overflow-hidden group
  Right stack: md:col-span-4 grid grid-rows-2 gap-8
```

### Experience Feature Cards (3-col grid)
```
bg-surface p-12 rounded-[32px] hover:shadow-xl transition-all duration-500 group
  Icon box: w-16 h-16 bg-primary/10 rounded-2xl → group-hover:bg-primary group-hover:text-on-primary
  Title: font-title-lg  Body: font-body-md text-on-surface-variant
```

### Testimonial Slider
```
overflow-hidden → flex transition-transform duration-700 ease-out (JS translate)
  Blockquote: font-headline-md text-headline-md italic
  Avatar: w-20 h-20 rounded-full border-2 border-primary/20
  Nav buttons: w-12 h-12 rounded-full border hover:bg-primary hover:text-white hover:border-primary
```

### Guest Review Cards (3-col grid)
```
bg-surface-container-low p-8 rounded-2xl flex flex-col h-full
  Stars: text-tertiary (filled FILL=1)
  Quote: text-on-surface-variant italic
```

### Related Suite Card (portrait, 4:5)
```
group → relative aspect-[4/5] rounded-2xl overflow-hidden
  Image: group-hover:scale-110 duration-700
  Overlay: bg-gradient-to-t from-black/60 to-transparent
  Text (white): label-md uppercase tracking-widest, headline-md, body-md
```

### Sidebar Filters (rooms page, sticky)
```
sticky top-48 space-y-10
  Price slider: h-1 bg-outline-variant/30 rounded-full, primary thumb dots
  Checkboxes: w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary
  Labels: group-hover:text-primary transition-colors
```

### Checkout Form
- **Nav:** reduced — logo only + lock icon + "SECURE CHECKOUT"
- **Progress steps:** numbered circles, active = `bg-primary text-on-primary`, inactive = `bg-surface-container-high opacity-40`
- **Form card:** `bg-white rounded-xl shadow-sm border border-outline-variant/20 p-8 md:p-12`
- **Inputs:** `w-full bg-[#F8F4EF] border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary`
- **Labels:** `font-label-md text-label-md block` UPPERCASE
- **Primary CTA:** `px-12 py-4 bg-primary text-on-primary rounded-full font-title-lg shadow-lg hover:bg-primary-container active:scale-95`
- **Back button:** `px-8 py-4 border-2 border-primary text-primary rounded-full hover:bg-primary-fixed`
- **Reassurance cards:** `flex items-start gap-4 p-6 bg-surface-container-low rounded-xl` (3-col)

### Checkout Sidebar
```
bg-white rounded-xl shadow-lg border border-outline-variant/20 overflow-hidden
  Thumbnail: relative h-48 w-full with gradient overlay + title
  Stay details: flex justify-between border-b
  Breakdown: space-y-3 text-on-surface-variant
  Total: pt-6 border-t-2 border-dashed border-outline-variant/30
  Cancellation: p-4 bg-tertiary-fixed rounded-lg text-on-tertiary-fixed text-sm
```

### Success Screen (booking confirmed)
```
min-h-screen flex items-center justify-center bg-background
  Icon circle: w-24 h-24 bg-secondary text-on-secondary rounded-full (spring animation)
  Heading: font-headline-lg
  Reference box: p-6 bg-white rounded-xl border border-outline-variant/30
    Label: font-label-md text-outline
    Code: font-headline-md text-headline-md text-primary
```

### Footer
```
bg-surface-container-low border-t border-outline-variant/20 pt-section-gap pb-12
  4-col grid: logo+desc, The Hotel, Discover Amalfi, Contact
  Logo: font-display-lg text-headline-md text-primary uppercase tracking-widest
  Links: font-body-md text-on-surface-variant hover:text-tertiary underline
  Bottom bar: flex justify-between, label-md uppercase
```

### About / Our Story Page
- Hero: `min-h-[921px]` with full-bleed image + frosted card overlay (`bg-surface/40 backdrop-blur-md p-10 md:p-16 rounded-lg border border-white/20 shadow-2xl`)
- Concierge section: 2-col with image (rotated bg accent `bg-primary/5 rounded-lg -rotate-2 group-hover:rotate-0`) + feature list (`material-symbols-outlined p-2 bg-secondary/10 text-secondary rounded-lg`)

---

## Animations & Interactions

| Element | Behavior |
|---|---|
| Suite card image | `group-hover:scale-110 transition-transform duration-700` |
| Bento image | `group-hover:scale-105 transition-transform duration-700` |
| Suite listing card | `hover:-translate-y-1 hover:shadow-xl transition-all duration-500` |
| Experience feature card | `hover:shadow-xl transition-all duration-500` icon box hover fills primary |
| CTA buttons | `active:scale-95` or `scale-95 active:scale-90` |
| Nav → arrow link | `group-hover:translate-x-1 transition-transform` |
| Nav shrink on scroll | JS: `py-6` → `py-4` when `scrollY > 50` |
| Hero booking bar input | JS: adds `bg-white shadow-sm` on focus |
| Testimonial slider | JS translate-based with prev/next buttons |
| Framer Motion | Used in old booking page — success screen spring animation, step transitions |

---

## Page Structure Summary

| Route | Page | Key Sections |
|---|---|---|
| `/` | Homepage | Nav, Hero+BookingBar, Local Explorations (bento), The Solaris Experience (3 cards), Guest Stories (slider), Footer |
| `/rooms` | Suite Listing | Nav, Sticky sub-header, Sidebar filters, Suite card grid (2-col), Footer |
| `/rooms/:id` | Suite Detail | Nav, Mosaic gallery, Left content (title, specs grid, description, amenities, reviews), Right sticky booking widget, Related suites (3-col portrait), Footer |
| `/booking` | Checkout | Reduced nav, Progress steps, Guest info form → Payment form, Booking summary sidebar, Reassurance cards, Footer |
| `/booking/success` | Confirmation | Full-screen centered, success icon, headline, email note, reservation code, CTA |
