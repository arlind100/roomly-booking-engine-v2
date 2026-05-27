# Solaris Terrace - Comprehensive Interactive Flow & Functional Map

This document provides a detailed blueprint of all interactive elements, navigation paths, and user flows for the Solaris Terrace booking engine.

---

## 1. Global Navigation (Desktop)
*Standard across all primary pages (Homepage, Availability, Details, Support).*

*   **Logo ("Solaris Terrace"):** Redirects to **Homepage** ({{DATA:SCREEN:SCREEN_4}}).
*   **Nav Link: "Suites":** Anchors to "The Solaris Philosophy" on Homepage or redirects to **Room Availability** ({{DATA:SCREEN:SCREEN_20}}).
*   **Nav Link: "Wellness":** Anchors to "Cliffside Wellness" section on Homepage.
*   **Nav Link: "Dining":** Anchors to "Gourmet Dining" section on Homepage.
*   **Nav Link: "Explore":** Anchors to "Local Explorations" section on Homepage.
*   **User Icon:** Opens Account/Profile modal (Conceptual).
*   **CTA: "Reserve Now":** Redirects to **Room Availability** ({{DATA:SCREEN:SCREEN_20}}).

---

## 2. Homepage (Desktop) - {{DATA:SCREEN:SCREEN_4}}
*The entry point focusing on brand storytelling and initial availability check.*

*   **Check-in / Check-out Input:** Opens date picker.
*   **Guests Input:** Opens occupancy selector.
*   **CTA: "Check Availability":** Redirects to **Room Availability** ({{DATA:SCREEN:SCREEN_20}}).
*   **Section: "Local Explorations"**
    *   **"Explore all excursions" (Link):** Redirects to **Our Story & Contact** ({{DATA:SCREEN:SCREEN_15}}).
    *   **Location Cards (Positano, Ravello, Capri):** Informational; link to external guides (Conceptual).
*   **Footer Links:**
    *   **"Our Suites":** → **Room Availability** ({{DATA:SCREEN:SCREEN_20}})
    *   **"Sustainability":** → **Our Story & Contact** ({{DATA:SCREEN:SCREEN_15}})
    *   **"Reservations":** → **Room Availability** ({{DATA:SCREEN:SCREEN_20}})

---

## 3. Room Availability (Desktop) - {{DATA:SCREEN:SCREEN_20}}
*Inventory selection with real-time filtering.*

*   **Date/Guest Header (Edit Icon):** Triggers inline editing of stay parameters.
*   **CTA: "Estate Map":** Toggles visual map overlay of the property.
*   **Sidebar Filters (Price, Wing, Wellness):** Dynamically updates the suite list.
*   **Suite Cards:**
    *   **Suite Image/Title:** Redirects to **Suite Details** ({{DATA:SCREEN:SCREEN_29}}).
    *   **"Per evening" Price:** Redirects to **Suite Details** ({{DATA:SCREEN:SCREEN_29}}).
*   **CTA: "View Next Collection":** Loads additional suite inventory.

---

## 4. Suite Details (Desktop) - {{DATA:SCREEN:SCREEN_29}}
*Deep dive into specific room features and conversion.*

*   **Back Button (Nav):** Returns to **Room Availability** ({{DATA:SCREEN:SCREEN_20}}).
*   **Gallery (+12 Photos):** Opens full-screen media lightbox.
*   **Booking Widget:**
    *   **Check-in/Out Selection:** Updates price calculation.
    *   **CTA: "Instant Booking":** Redirects to **Checkout** ({{DATA:SCREEN:SCREEN_18}}).
*   **Section: "Discover Other Suites"**
    *   **Suite Cards (Penthouse, Verdant, Solstice):** Redirects to the respective **Suite Details** page variant.

---

## 5. Checkout (Desktop) - {{DATA:SCREEN:SCREEN_18}}
*Conversion funnel with form inputs.*

*   **Step Indicator (1. Details):** Current step.
*   **Contact Our Guest Concierge (Link):** Redirects to **Our Story & Contact** ({{DATA:SCREEN:SCREEN_15}}).
*   **CTA: "Continue to Payment":** Progresses to Step 2 (Conceptual) then triggers **Booking Processing** ({{DATA:SCREEN:SCREEN_12}}).

---

## 6. Processing & Success (Desktop)
*Post-payment sequence.*

*   **Booking Processing ({{DATA:SCREEN:SCREEN_12}}):**
    *   **Automatic Transition:** Moves to Success state after 3-5 seconds.
*   **Reservation Confirmed ({{DATA:SCREEN:SCREEN_11}}):**
    *   **CTA: "Add to Calendar":** Triggers .ics file download.
    *   **CTA: "Download PDF Receipt":** Triggers PDF generation.
    *   **"Browse Experiences":** Redirects back to **Homepage** (Explore section).

---

## 7. Mobile Flow - Interactive Elements
*Optimized for touch and vertical navigation.*

*   **Homepage ({{DATA:SCREEN:SCREEN_25}}):**
    *   **Hamburger Menu:** Opens Navigation Drawer with links to Suites, Dining, Wellness.
    *   **CTA: "Check Availability":** → **Room Availability (Mobile)** ({{DATA:SCREEN:SCREEN_9}}).
*   **Room Availability ({{DATA:SCREEN:SCREEN_9}}):**
    *   **"Details" Button (Suite Cards):** → **Suite Details (Mobile)** ({{DATA:SCREEN:SCREEN_8}}).
    *   **Sticky "Check Availability":** Re-triggers date/occupancy filters.
*   **Suite Details ({{DATA:SCREEN:SCREEN_8}}):**
    *   **Floating "Book Stay" Bar:** → **Checkout (Mobile)** ({{DATA:SCREEN:SCREEN_27}}).
*   **Checkout (Mobile) ({{DATA:SCREEN:SCREEN_27}}):**
    *   **Order Summary (Accordion):** Expands to show price breakdown.
    *   **CTA: "Continue to Payment":** → **Booking Processing (Mobile)** ({{DATA:SCREEN:SCREEN_10}}).
*   **Success (Mobile) ({{DATA:SCREEN:SCREEN_23}}):**
    *   **CTA: "View Estate Map":** Opens property map.
    *   **CTA: "Add to Apple Wallet":** Triggers wallet pass generation.

---

## 8. Support & Contact Flow
*   **"Enquire" (Mobile Bottom Nav) / "Our Story & Contact" (Desktop):**
    *   **Form Submission ("Send Request"):** Triggers success message/toast.
    *   **Direct Reservation Line (Phone CTA):** Triggers `tel:` protocol.