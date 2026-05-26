# Solaris Terrace — Design System

Synthesised from all 15 Stitch export screens (Luxe Voyage + Solaris Terrace, desktop + mobile).
Ground truth is the stitch-export HTML/CSS. This document is the single source of truth for every
pixel in the static build.

---

## 1. Color Tokens (Material Design 3 Semantic)

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#a43716` | CTAs, active states, price text, badges, progress fills |
| `on-primary` | `#ffffff` | Text/icons on primary backgrounds |
| `primary-container` | `#ffdcc9` | Subtle badges, tag backgrounds |
| `on-primary-container` | `#410e00` | Text on primary-container |
| `secondary` | `#2c657b` | Links, secondary buttons, accent icons |
| `on-secondary` | `#ffffff` | Text on secondary backgrounds |
| `secondary-container` | `#aecbdc` | Muted feature tags, room type badges |
| `on-secondary-container` | `#001d2c` | Text on secondary-container |
| `tertiary` | `#8c6a5c` | Warm accent, footer link hover |
| `on-tertiary` | `#ffffff` | |
| `surface` | `#faf9f5` | Page background (slight warm tint vs pure white) |
| `surface-bright` | `#ffffff` | Cards, modal surfaces |
| `on-surface` | `#1c1b1f` | Primary body text |
| `on-surface-variant` | `#49454f` | Secondary/muted body text |
| `surface-container-lowest` | `#ffffff` | |
| `surface-container-low` | `#f7f2f0` | Section backgrounds, sidebar |
| `surface-container` | `#f3eef3` | Card backgrounds |
| `surface-container-high` | `#ede8ed` | Hover state backgrounds, input fills |
| `outline` | `#79747e` | Default borders |
| `outline-variant` | `#cac4d0` | Dividers, subtle borders |
| `error` | `#b3261e` | Form validation errors |

### Special Glass Surface
```css
background: rgba(255, 255, 255, 0.70);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.30);
```
Used in: hero booking bar, nav glass state, mobile search panel.

### Input Fill Color
```css
background: #f8f4ef;  /* warm off-white, NOT surface-container */
```
Used in all form inputs (checkout, contact).

---

## 2. Typography

### Font Families
- **Display / Headlines**: `Playfair Display` — serif, weights 400 600 700
- **UI / Body / Labels**: `Plus Jakarta Sans` — sans-serif, weights 300 400 500 600 700

### Type Scale

| Token | Family | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| `display-lg` | Playfair Display | 64px | 700 | 1.1 | −0.02em |
| `display-md` | Playfair Display | 48px | 700 | 1.15 | −0.01em |
| `display-sm` | Playfair Display | 36px | 700 | 1.2 | 0 |
| `headline-lg` | Playfair Display | 40px | 600 | 1.25 | 0 |
| `headline-md` | Playfair Display | 32px | 600 | 1.3 | 0 |
| `headline-sm` | Playfair Display | 28px | 600 | 1.35 | 0 |
| `title-lg` | Plus Jakarta Sans | 20px | 600 | 1.5 | 0.01em |
| `title-md` | Plus Jakarta Sans | 16px | 600 | 1.6 | 0.015em |
| `body-lg` | Plus Jakarta Sans | 18px | 400 | 1.65 | 0.03em |
| `body-md` | Plus Jakarta Sans | 16px | 400 | 1.6 | 0.03em |
| `body-sm` | Plus Jakarta Sans | 14px | 400 | 1.5 | 0.025em |
| `label-md` | Plus Jakarta Sans | 14px | 600 | 1.0 | 0.01em |
| `label-sm` | Plus Jakarta Sans | 12px | 600 | 1.15 | 0.05em |

### Google Fonts Import
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
```

---

## 3. Spacing

| Token | Value | Usage |
|---|---|---|
| `margin-mobile` | `16px` | Page horizontal padding on mobile |
| `margin-desktop` | `64px` | Page horizontal padding on desktop |
| `container-max` | `1280px` | Max content width |
| `section-gap` | `120px` | Vertical space between page sections |
| `gutter` | `32px` | Column gap in grids |
| `card-padding` | `32px` (desktop) / `24px` (mobile) | Internal card padding |

Standard spacing steps: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120px.

---

## 4. Border Radius

| Token | Value | Usage |
|---|---|---|
| `sm` | `8px` | Inputs, small badges |
| `DEFAULT` | `12px` | Buttons |
| `lg` | `16px` | Small cards |
| `xl` | `20px` | Modal dialogs |
| `2xl` | `24px` | Booking widget, filter sidebar |
| `3xl` | `32px` | Room cards, gallery images |
| `full` | `9999px` | Pills, circular buttons |

---

## 5. Shadows (Elevation)

```css
/* Elevation 1 — subtle card */
box-shadow: 0 1px 2px rgba(0,0,0,0.30), 0 1px 3px 1px rgba(0,0,0,0.15);

/* Elevation 2 — hover card */
box-shadow: 0 1px 2px rgba(0,0,0,0.30), 0 2px 6px 2px rgba(0,0,0,0.15);

/* Elevation 3 — nav, booking widget */
box-shadow: 0 4px 8px rgba(0,0,0,0.30), 0 16px 24px 2px rgba(0,0,0,0.15);

/* Elevation 4 — floating actions, modals */
box-shadow: 0 16px 24px 2px rgba(0,0,0,0.14);

/* Elevation 5 — prominent overlays */
box-shadow: 0 8px 24px rgba(0,0,0,0.30), 0 20px 37px rgba(0,0,0,0.15);
```

---

## 6. Animations

| Name | Properties | Duration | Easing | Trigger |
|---|---|---|---|---|
| Card lift | `translateY(-8px)`, shadow E2 | 300ms | `ease-out` | hover |
| Image zoom | `scale(1.08)` | 700ms | `ease-in-out` | card hover |
| Button color | `background-color` | 300ms | `ease-out` | hover |
| Nav shrink | `padding-top/bottom` py-6→py-4 | 300ms | `ease-out` | scroll > 50px |
| Carousel snap | `scroll-snap-type: x mandatory` | native | — | drag/touch |
| Fade-in-up | `opacity 0→1, translateY(24px→0)` | 500ms | `ease-out` | mount |
| Collapse | `max-height 0→800px` | 300ms | `ease-in-out` | toggle |
| Glass blur | `backdrop-filter: blur(12px)` | — | — | static |

**Framer Motion variants for fade-in-up:**
```ts
initial={{ opacity: 0, y: 24 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
```

**Stagger for card grids:** `delay: index * 0.08`

**`prefers-reduced-motion`:** Wrap all Framer animations with `useReducedMotion()` hook.

---

## 7. Component Specifications

### Navbar
```
Height: 80px → shrinks to 64px on scroll
Background: transparent (hero) → surface/95 backdrop-blur-md on scroll
Logo: "SOLARIS TERRACE" — label-md uppercase tracking-widest text-primary
Links: body-md text-on-surface (desktop only, hidden mobile)
CTA: "Reserve Now" — bg-primary text-on-primary rounded-full px-6 py-2.5 label-md
Mobile: hamburger menu button (right), logo (left)
z-index: 50
```

### Hero
```
Height: 100vh (desktop) / 850px (mobile)
Background: full-bleed image + linear-gradient(to-b, black/40, black/20, transparent)
Headline: display-lg text-white text-center
Subheadline: body-lg text-white/90 text-center

Booking Bar:
  Position: absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6
  Desktop: glass panel, horizontal 4-column (destination, dates, guests, CTA)
  Mobile: glass panel, 1-column stacked
  Glass: bg-white/70 backdrop-blur-[12px] rounded-2xl p-6 border border-white/30
  Inputs: bg-surface-container-high rounded-xl px-4 py-3.5 body-md
  CTA button: bg-primary text-on-primary px-8 py-3.5 rounded-full label-md font-semibold
```

### Room Card
```
Container: rounded-3xl overflow-hidden bg-surface-container-lowest shadow-sm
Hover: -translate-y-2 shadow-xl transition-all duration-300 cursor-pointer

Image:
  aspect-[4/3] overflow-hidden
  img: w-full h-full object-cover scale-100 → scale-110 on parent hover, duration-700

Absolute overlays:
  Favorite: top-4 right-4 — w-10 h-10 glass-panel rounded-full
  Badges: bottom-4 left-4 — flex gap-2
    Suite badge: bg-primary/90 text-on-primary label-sm px-3 py-1 rounded-full backdrop-blur-md
    Family badge (if max_guests>=4): bg-secondary/90 text-on-secondary same

Body padding: p-8 (desktop) / p-6 (mobile)

Title: title-lg text-on-surface
Rating: star icon + "5.0" — bg-surface-container-high px-2 py-1 rounded-lg label-md
Description: body-md text-on-surface-variant line-clamp-2 mb-6

Specs row: flex gap-6 text-on-surface-variant mb-8
  - group icon + "Up to N" — label-md text-[12px]
  - amenity icon + first amenity

Price / CTA row: border-t border-outline-variant/20 pt-6 flex justify-between
  Price: headline-md text-primary + " / night" body-md text-on-surface-variant
  Buttons: "Details" bg-surface-container rounded-full px-5 py-2.5 label-md
           "Book" bg-on-surface text-surface rounded-full px-6 py-3 label-md hover:bg-primary
```

### Mosaic Gallery
```css
.mosaic-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: repeat(2, 300px);
  gap: 16px;
}
.mosaic-large {
  grid-row: span 2;
}
```
All images: `border-radius: 24px; overflow: hidden; object-fit: cover`.

### Sticky Booking Widget (Room Detail)
```
Position: sticky top-32
Width: 100% (inside max-w-[380px] column)
Background: surface-bright
Border-radius: 24px
Shadow: elevation-3
Padding: 32px

Price: headline-lg text-primary + "/night" body-md text-on-surface-variant

Date inputs: 2-column grid
  Each: bg-surface-container-high rounded-xl px-4 py-3 body-md
  Label above: label-md uppercase mb-2

Guest select: full-width same styling as date inputs

Price breakdown:
  Row: flex justify-between body-md text-on-surface-variant mb-2
  Divider: border-t border-outline-variant/20 my-4
  Total row: flex justify-between title-lg text-on-surface font-semibold

Book button: bg-primary text-on-primary w-full py-4 rounded-2xl label-md font-semibold
  Hover: bg-primary/90 transition-colors duration-300

Cancellation: body-sm text-on-surface-variant text-center mt-4
```

### Booking Wizard Step Indicator
```
Outer: flex items-center justify-center mb-16

Per step group: flex items-center flex-1
  Circle: w-10 h-10 rounded-full
    Active/complete: bg-primary text-on-primary
    Inactive: bg-surface-container-high text-on-surface opacity-40
    Complete: shows check icon
  Label: label-md below circle, active = text-primary, inactive = text-on-surface-variant/60
  Connector line (between steps): h-px flex-1 mx-2 mb-6
    Past: bg-primary
    Future: bg-outline-variant
```

### Filter Sidebar
```
Width: 288px (lg+), hidden below lg
Position: sticky top-48
Background: transparent (no card wrapper)

Section header: title-lg text-on-surface mb-6

Guest filter: flex gap-2 flex-wrap
  Buttons: w-10 h-10 rounded-full border
    Active: bg-primary text-on-primary border-primary
    Inactive: border-outline-variant text-on-surface-variant hover:border-primary

Amenity checkboxes:
  Label: flex items-center gap-3 cursor-pointer group
  Checkbox: w-5 h-5 rounded accent-primary
  Text: body-md text-on-surface-variant group-hover:text-primary
```

### Form Inputs
```
Background: #f8f4ef
Height: 56px (h-14)
Padding: px-4 py-3
Border: 1px solid outline-variant, transparent on focus
Border-radius: rounded-xl
Font: body-md
Focus: ring-2 ring-secondary/50 outline-none
Placeholder: text-on-surface-variant/60

Label above: label-md uppercase text-on-surface mb-2 block
Error: body-sm text-error mt-1
```

### Progress Steps (Checkout)
```
Circles: w-10 h-10 rounded-full flex items-center justify-center font-bold
  Active: bg-primary text-on-primary
  Complete: bg-secondary text-on-secondary (shows check icon)
  Inactive: bg-surface-container text-on-surface opacity-40

Labels: label-md whitespace-nowrap
  Active: text-primary
  Inactive: text-on-surface-variant/60

Connector: h-px flex-1 mx-2 mb-6
  Past: bg-primary
  Future: bg-outline-variant/50
```

### Bottom Navigation Bar (Mobile Only)
```
Position: fixed bottom-0 left-0 right-0 z-50
Height: 80px
Background: bg-surface border-t border-outline-variant
Safe area: pb-[env(safe-area-inset-bottom)]
Layout: flex justify-around items-center

Item: flex flex-col items-center gap-1
  Icon: Material Symbols 24px
  Label: label-sm
  Active item: bg-primary-container text-primary rounded-full px-4 py-1
  Inactive: text-on-surface-variant
```

### Booking Summary Sidebar (Checkout)
```
Background: surface-container-low
Border-radius: 24px
Padding: 32px
Position: sticky top-32

Image: h-48 w-full rounded-2xl object-cover mb-6

Date row: grid grid-cols-2 gap-4
  Label: label-sm uppercase text-on-surface-variant mb-1
  Date: headline-sm text-on-surface font-semibold

Room name: title-lg text-on-surface mt-6 mb-4

Breakdown rows: flex justify-between body-sm text-on-surface-variant mb-2
Divider: border-t border-outline-variant/20 my-4

Total row: flex justify-between title-lg text-on-surface font-semibold
```

### Trust Badge Cards
```
Layout: flex gap-4 items-start
Background: surface-container-low
Border-radius: 16px
Padding: 24px

Icon: 32px text-secondary
Title: title-md text-on-surface font-semibold
Description: body-sm text-on-surface-variant mt-1
```

### FAQ Accordion
```
Item: border-b border-outline-variant/30 py-5

Summary: flex justify-between items-center cursor-pointer
  Title: title-md text-on-surface font-semibold
  Icon: expand_more — rotates 180deg when open, transition-transform duration-300

Content: body-md text-on-surface-variant pt-3 pb-2
```

### Footer
```
Background: surface-container-low
Border-top: border-outline-variant/20
Padding-top: section-gap (120px)

Grid: 4-column md:grid-cols-4
Column 1 (brand): logo + description + social icons
  Logo: label-md uppercase tracking-widest text-primary
  Social: w-10 h-10 rounded-full bg-surface-container text-primary hover:bg-primary hover:text-white

Columns 2-4: links
  Heading: title-lg text-on-surface mb-8
  Links: body-md text-on-surface-variant hover:text-tertiary underline

Bottom bar: border-t border-outline-variant/20 pt-8
  Copyright: label-md uppercase text-on-surface-variant
  Language: flex gap-2 items-center text-primary
```

---

## 8. Page Layouts

### / — Homepage
```
Sections (top to bottom):
1. Navbar (fixed z-50)
2. Hero (100vh, full-bleed image, booking bar)
3. "Local Explorations" bento grid — mosaic 8-col asymmetric
4. Feature trio — 3 cards (Concierge, Wellness, Dining)
5. Testimonial slider — 3 cards, Framer key-animation
6. CTA / About strip — two-column image+text
7. Footer
```

### /rooms — Suite Listing
```
Sections:
1. Navbar
2. Sticky sub-header (z-40 top-[80px]) — guest counter pill + sort select
3. Main (flex gap-10):
   - Left: Filter sidebar (w-72, hidden below lg, sticky top-48)
   - Right: Suite grid (grid-cols-1 md:grid-cols-2 gap-8)
4. Footer
```

### /rooms/:id — Suite Detail
```
Sections:
1. Navbar
2. Mosaic gallery (full-width, 2fr 1fr 1fr, 2x300px rows)
3. Two-column main (flex gap-16):
   - Left (flex-grow): badge, title, specs, description, amenities, reviews, related
   - Right (w-96 shrink-0): sticky booking widget
4. Footer
```

### /booking — Checkout Wizard
```
Sections:
1. Navbar (booking-specific: logo + "Secure Checkout" + lock icon)
2. Step indicator (4 steps)
3. Two-column main:
   - Left (flex-grow): animated step panels (AnimatePresence)
   - Right (w-96 shrink-0): sticky booking summary sidebar
4. No footer (replaced by sticky progress bar on mobile)
```

### /about — Our Story & Contact
```
Sections:
1. Navbar
2. Hero (h-[600px], image + text panel)
3. Legacy narrative (two-column: image + prose)
4. Experience cards (3-column grid)
5. Contact form + location cards (two-column)
6. FAQ accordion
7. Footer
```

---

## 9. Mobile-Specific Patterns

- **Header**: fixed h-16, burger + logo + CTA button (book)
- **Hero**: h-[850px], search form as glass panel pinned inside hero
- **Cards**: single column, aspect-[16/10] for room images
- **Horizontal carousels**: `overflow-x-auto snap-x snap-mandatory` with `hide-scrollbar`
- **Bottom nav bar**: fixed, 4 tabs (Suites/Dining/Wellness/Saved), safe-area padding
- **Sticky footer CTA** (room detail): price left + "Book Stay" button right
- **Collapsible booking summary** (checkout): toggled with max-height transition
- **Floating "Check Availability"** CTA: fixed bottom-24 (above bottom nav) on rooms page
- **Image carousel** (room detail): full-width swipeable, dot pagination indicator

### Hide Scrollbar Utility
```css
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar { display: none; }
```

---

## 10. Static Placeholder Data

Use this exact data for the static build (matches Stitch design copy):

### Rooms (5 placeholder suites)
```ts
const ROOMS = [
  {
    id: '1', name: 'Panorama Cliffside Suite',
    description: 'Perched on the edge of the Amalfi cliffs with unobstructed sea views from every angle.',
    price: 1250, maxGuests: 2, size: '95m2',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
    amenities: ['Private Pool', 'Ocean View', 'Butler Service'],
    badge: 'Signature Suite',
  },
  {
    id: '2', name: 'Terrace Garden Villa',
    description: 'A private villa with cascading terraced gardens and a plunge pool overlooking the sea.',
    price: 1890, maxGuests: 4, size: '160m2',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    amenities: ['Private Pool', 'Terrace', 'Butler Service', 'Kitchen'],
    badge: 'Villa',
  },
  {
    id: '3', name: 'Azure Sea Suite',
    description: 'Wake up to the sound of waves with floor-to-ceiling windows framing the turquoise Tyrrhenian Sea.',
    price: 980, maxGuests: 2, size: '75m2',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
    amenities: ['Ocean View', 'Spa Access', 'Terrace'],
    badge: 'Sea View',
  },
  {
    id: '4', name: 'Heritage Lemon Suite',
    description: 'Surrounded by fragrant lemon groves, this suite captures the essence of Amalfi storied past.',
    price: 820, maxGuests: 2, size: '65m2',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    amenities: ['Terrace', 'Spa Access'],
    badge: 'Garden View',
  },
  {
    id: '5', name: 'Grand Solaris Penthouse',
    description: 'The crown jewel of Solaris Terrace — a two-level penthouse with 360-degree panoramic views.',
    price: 3400, maxGuests: 6, size: '280m2',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    amenities: ['Private Pool', 'Ocean View', 'Butler Service', 'Kitchen', 'Spa Access'],
    badge: 'Penthouse',
  },
];
```

### Testimonials (3 static)
```ts
const TESTIMONIALS = [
  { name: 'Isabella Marchetti', location: 'Milan, Italy', rating: 5,
    quote: 'Solaris Terrace redefined what luxury means to me. The staff anticipated our every need before we even had to ask.',
    avatar: 'https://i.pravatar.cc/64?img=47', stay: 'Panorama Cliffside Suite' },
  { name: 'James & Sophie Hartwell', location: 'London, UK', rating: 5,
    quote: 'Our anniversary here was beyond words. The private pool, the sunsets, the food — simply flawless.',
    avatar: 'https://i.pravatar.cc/64?img=32', stay: 'Terrace Garden Villa' },
  { name: 'Sven Lindqvist', location: 'Stockholm, Sweden', rating: 5,
    quote: 'I have stayed at many five-star properties around the world. Solaris Terrace stands in a category of its own.',
    avatar: 'https://i.pravatar.cc/64?img=58', stay: 'Azure Sea Suite' },
];
```

### Hero Images (Unsplash, no API key needed)
```
Hero bg:    https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920
About hero: https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1920
Bento lg:   https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800
Bento 1:    https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400
Bento 2:    https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400
```

---

## 11. Icon Library

Use **Material Symbols Outlined** (loaded via Google Fonts CDN — already in index.css):
```html
<span class="material-symbols-outlined">icon_name</span>
```

Key icons used:
- `hotel` — room placeholder
- `group` — guests
- `calendar_today` — dates
- `star` — ratings (with `fontVariationSettings: "'FILL' 1"` for filled)
- `favorite` — wishlist
- `tune` — filters
- `expand_more` — dropdowns, FAQ
- `check` — completed step, amenity check
- `lock` — secure checkout
- `arrow_back` — mobile back
- `menu` — mobile hamburger
- `share` — share room
- `language` — footer locale
- `check_circle` — amenity check pill
- `spa`, `restaurant`, `pool`, `beach_access` — experience features

---

## 12. Pre-Delivery Checklist (from SKILL.md)

- [ ] No emojis used as icons — Material Symbols Outlined only
- [ ] `cursor-pointer` on all clickable cards, buttons, links
- [ ] All hover states: smooth 150-300ms transitions
- [ ] Light mode text contrast >= 4.5:1
- [ ] All images have descriptive `alt` text
- [ ] Form inputs have associated `<label>` elements
- [ ] `prefers-reduced-motion` respected in Framer Motion (`useReducedMotion`)
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on any breakpoint
- [ ] Fixed navbars do not obscure content (padding-top on first section)
- [ ] Focus states visible for keyboard navigation
- [ ] Mobile bottom nav has `pb-[env(safe-area-inset-bottom)]`
