---
name: Solaris & Sea
colors:
  surface: '#faf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#faf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f0'
  surface-container: '#efeeea'
  surface-container-high: '#e9e8e4'
  surface-container-highest: '#e3e2df'
  on-surface: '#1b1c1a'
  on-surface-variant: '#58423c'
  inverse-surface: '#2f312e'
  inverse-on-surface: '#f2f1ed'
  outline: '#8b716a'
  outline-variant: '#dfc0b7'
  surface-tint: '#a73918'
  primary: '#a43716'
  on-primary: '#ffffff'
  primary-container: '#c54f2c'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb5a0'
  secondary: '#2c657b'
  on-secondary: '#ffffff'
  secondary-container: '#aee5fe'
  on-secondary-container: '#2f677d'
  tertiary: '#8b4c18'
  on-tertiary: '#ffffff'
  tertiary-container: '#a8642e'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd1'
  primary-fixed-dim: '#ffb5a0'
  on-primary-fixed: '#3b0900'
  on-primary-fixed-variant: '#862201'
  secondary-fixed: '#bce9ff'
  secondary-fixed-dim: '#98cee7'
  on-secondary-fixed: '#001f29'
  on-secondary-fixed-variant: '#0a4d62'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb785'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703703'
  background: '#faf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e3e2df'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.5'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style

The design system is anchored in the concept of "Adventurous Luxury." It rejects the sterile, utilitarian aesthetic of traditional travel booking engines in favor of a vibrant, editorial approach that evokes the emotional warmth of a premium holiday. The brand personality is welcoming and sophisticated, balancing the excitement of discovery with the comfort of high-end hospitality.

The visual style is a blend of **Modern Editorial** and **Soft Minimalism**. It prioritizes high-fidelity photography, using generous negative space to create a "gallery" feel. Transitions should feel fluid and organic, avoiding rigid or mechanical movements. The goal is to evoke a sense of "sun-drenched" optimism through warm tones and tactile-yet-refined UI elements.

## Colors

The palette is inspired by natural landscapes at golden hour.
- **Primary (Terracotta):** A rich, clay-inspired orange used for primary actions and highlights. It conveys warmth and human energy.
- **Secondary (Deep Ocean):** A sophisticated, dark teal used for secondary accents, footers, and high-contrast text elements.
- **Tertiary (Sand):** A softer peach-gold for decorative elements, hover states, and background variations.
- **Base (Warm White):** Instead of pure white, the system uses a subtle "parchment" base (#FDFCF8) to reduce visual fatigue and enhance the premium, tactile feel of the interface.
- **Neutral Surface:** Use varied tints of the secondary color (low opacity) for dividers and disabled states to maintain a cohesive color temperature.

## Typography

This design system utilizes a high-contrast typographic pairing to establish hierarchy.
- **Headlines:** *Playfair Display* provides a literary, high-fashion aesthetic. It should be used for hero sections, property titles, and editorial storytelling. Use tighter tracking for large display sizes.
- **UI & Body:** *Plus Jakarta Sans* offers a modern, friendly, and highly legible experience for functional elements. Its soft curves complement the warmth of the brand.
- **Scale:** Maintain a clear distinction between "Reading" text (Body) and "Functional" text (Labels). Labels should often use uppercase with slight letter-spacing to improve scannability in dense UI.

## Layout & Spacing

The layout philosophy follows a **Fixed-Fluid Hybrid** model. Content is contained within a 1280px max-width wrapper on desktop to ensure readability, while background elements and imagery can bleed to the edges of the viewport to maintain a sense of scale.

- **Vertical Rhythm:** A generous 120px gap between major sections allows the eye to rest and emphasizes the quality of the photography.
- **Grid:** Use a 12-column grid for desktop with 24px gutters. On mobile, transition to a 4-column grid with 20px side margins.
- **Spacing Scale:** All spacing should be multiples of 8px. Use larger increments (48px, 64px) for padding within cards and containers to reinforce the "luxury" feel.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layering** and **Ambient Shadows**.
- **Surface Strategy:** Use the warm-white base for the primary background. "Elevated" containers (like booking widgets or search bars) should use a pure white surface with a very soft, diffused shadow.
- **Shadows:** Avoid harsh, black shadows. Use the Secondary color (Deep Ocean) at 4-8% opacity for shadows to keep them "cool" and integrated with the palette.
- **Depth Levels:**
  - *Level 1 (Default):* Flat, defined by subtle 1px borders in a 10% tint of the primary or secondary color.
  - *Level 2 (Interactive):* Used for cards and buttons. 12px blur, 4px Y-offset, 5% opacity.
  - *Level 3 (Overlays):* Used for modals and navigation menus. 32px blur, 16px Y-offset, 8% opacity.

## Shapes

The shape language is consistently **Soft and Welcoming**. 
- A base radius of 8px (0.5rem) is used for standard components like input fields and small buttons.
- Large containers and cards should use `rounded-lg` (16px) or `rounded-xl` (24px) to create a more modern, approachable look.
- Interactive elements like "tags" or "chips" may use a full-pill radius to distinguish them from structural components.
- Avoid sharp corners entirely to maintain the "full of life" and adventurous tone.

## Components

- **Buttons:** Primary buttons use the Terracotta color with white text. High-emphasis buttons should be slightly oversized with generous horizontal padding (32px).
- **Input Fields:** Use a subtle "Sand" background (#F8F4EF) instead of a border to create a soft, modern feel. On focus, transition to a 1.5px Secondary color border.
- **Cards:** Property and destination cards should feature a subtle "zoom" effect on the image when hovered. Content inside cards should be bottom-aligned with a slight gradient overlay to ensure text legibility over photography.
- **Chips/Badges:** Small, rounded-pill elements with low-opacity fills of the primary or secondary color. Used for amenities (e.g., "Infinity Pool," "Private Chef").
- **Navigation:** A transparent header that transitions to the "Warm White" base on scroll. Use thin, elegant icons with a 1.5pt stroke weight.
- **Booking Widget:** A floating, high-elevation container that anchors to the bottom of the screen on mobile and the side on desktop, utilizing the most generous corner radii (24px).