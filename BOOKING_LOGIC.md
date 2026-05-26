# BOOKING_LOGIC.md — Roomly Booking Engine v2

Source: `roomly-booking-engine/src/pages/BookingPage.tsx` (1,218 lines), RoomsPage, RoomDetailPage, BookingWidget, and `src/lib/supabase.ts`.

---

## Supabase Client

```ts
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
export const HOTEL_ID = import.meta.env.VITE_HOTEL_ID as string;
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

All queries use `HOTEL_ID` as the primary filter. This is a public-facing app — anon key only, no auth.

---

## Data Types

```ts
interface RoomType {
  id: string;
  name: string;
  description: string;
  base_price: number;
  weekend_price?: number;
  max_guests: number;
  image_url?: string;
  room_size?: string;
  amenities?: string[];
  available_units?: number;
}

interface PricingOverride {
  room_type_id: string;
  start_date: string;   // 'yyyy-MM-dd'
  end_date: string;     // 'yyyy-MM-dd'
  price: number;
  label?: string;
}

interface AvailabilityBlock {
  room_type_id: string;
  date: string;         // 'yyyy-MM-dd'
}

interface HotelConfig {
  currency: string;
  tax_percentage: number | null;
  check_in_time: string | null;
  check_out_time: string | null;
  child_pricing_enabled: boolean;
  child_price_type: string;       // 'fixed' | 'percentage'
  child_price_value: number;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
}

interface RoomAvailability {
  room_type_id: string;
  available_units: number;
  booked_count: number;
  remaining: number;
}
```

---

## Data Fetching (React Query)

### 1. Hotel Config
```ts
queryKey: ['hotel_config', HOTEL_ID]
table: hotels
select: 'name, email, phone, address, currency, tax_percentage, check_in_time, check_out_time, child_pricing_enabled, child_price_type, child_price_value'
filter: .eq('id', HOTEL_ID).single()
```
Used for: currency symbol, tax rate, check-in/out times, child pricing config.

### 2. Room Types
```ts
queryKey: ['room_types_booking', HOTEL_ID]
table: room_types
select: 'id, name, description, base_price, weekend_price, max_guests, image_url, room_size, amenities, available_units'
filter: .eq('hotel_id', HOTEL_ID).eq('show_on_website', true).order('base_price', { ascending: true })
```
**IMPORTANT:** Only fetch where `show_on_website = true`. Only rooms + descriptions + images + prices + amenities + size + max_guests come from the DB (per Step 2 content rule).

### 3. Pricing Overrides
```ts
queryKey: ['pricing_overrides', HOTEL_ID]
table: pricing_overrides
select: 'room_type_id, start_date, end_date, price, label'
filter: .eq('hotel_id', HOTEL_ID)
```
**NOTE:** Do NOT add `.eq('is_active', true)` — that column does not exist in the schema.

### 4. Availability Blocks
```ts
queryKey: ['availability_blocks', HOTEL_ID]
table: availability_blocks
select: 'room_type_id, date'
filter: .eq('hotel_id', HOTEL_ID)
```
Used to disable specific dates in the calendar per room.

### 5. Real-time Room Availability (RPC)
```ts
queryKey: ['room_availability', HOTEL_ID, checkIn?.toISOString(), checkOut?.toISOString()]
enabled: !!checkIn && !!checkOut && differenceInDays(checkOut, checkIn) > 0
rpc: 'get_room_availability'
params: { p_hotel_id: HOTEL_ID, p_check_in: 'yyyy-MM-dd', p_check_out: 'yyyy-MM-dd' }
```
Returns remaining units per room type for the selected dates. Uses SECURITY DEFINER so anon key can call it without a SELECT policy on reservations.

Result indexed for O(1) lookup:
```ts
const availabilityByRoom = new Map<string, RoomAvailability>();
roomAvailability?.forEach(a => availabilityByRoom.set(a.room_type_id, a));
```

---

## URL Parameters

The booking page reads from `useSearchParams()` on mount:

| Param | Type | Source |
|---|---|---|
| `room` | string (UUID) | Room listing / detail page "Book" button |
| `checkin` | string (date) | BookingWidget on homepage |
| `checkout` | string (date) | BookingWidget on homepage |
| `guests` | string (number) | BookingWidget on homepage |

If `room` is present AND dates are filled → skip to `details` step. If `room` is present but no dates → go to `dates` step.

---

## 4-Step Wizard

```ts
const STEPS = ['dates', 'room', 'details', 'confirm'] as const;
const STEP_LABELS = ['Select Dates', 'Choose Room', 'Your Details', 'Confirm'];
```

### Step 1 — Select Dates
- `checkIn: Date | undefined`, `checkOut: Date | undefined`
- `guests: string` (number of adults, default '2')
- Calendar with blocked dates per selected room: `blockedDatesForRoom` derived from `availabilityBlocks`
- `isDateBlocked(date)` → `blockedDatesForRoom.some(d => isSameDay(d, date))`
- `maxGuests` = `Math.max(...rooms.map(r => r.max_guests))` — caps guest selector
- Proceed condition: `!!checkIn && !!checkOut && nights > 0`

### Step 2 — Choose Room
- `eligibleRooms` = `rooms.filter(r => r.max_guests >= parseInt(guests))`
- Each card shows: name, description, image, amenities, price, remaining availability
- Availability display: `availabilityByRoom.get(room.id)?.remaining` → show "Only X left" badge if remaining ≤ 3
- `selectedRoom: string` (UUID)
- Proceed condition: `!!selectedRoom`
- On next: if `selectedRoom` is not in `eligibleRooms` (guest count changed), clear it

### Step 3 — Guest Details
Form schema (Zod + react-hook-form):
```ts
const guestSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional().default(''),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phone: z.string().optional().default(''),
  children: z.string().default('0'),
  specialRequests: z.string().optional().default(''),
});
```
- Fields: First name (required), Last name (optional), Email (required), Phone (optional), Children count, Special requests
- `trigger(['firstName', 'email'])` validates before advancing to step 4

### Step 4 — Confirm
- Read-only summary: room, dates, guests, children, price breakdown
- "Complete Reservation" button triggers `handleSubmit()`

---

## Pricing Calculation

### `getDayPrice(date, roomId, basePrice, weekendPrice?)`
Priority order:
1. Check `pricingOverrides` for a matching date range on this room → return `override.price`
2. If `weekendPrice` set and date is weekend (`isWeekend(date)`) → return `weekendPrice`
3. Return `basePrice`

### `roomTotal`
```ts
// Iterate each night (exclude checkout day)
const days = eachDayOfInterval({ start: checkIn, end: new Date(checkOut - 86400000) });
const roomTotal = days.reduce((sum, day) =>
  sum + getDayPrice(day, roomId, base_price, weekend_price), 0);
```

### `childTotal` (display estimate only — mirrors RPC)
```ts
const numChildren = parseInt(children);
if (!hotel.child_pricing_enabled || numChildren === 0) → 0
if (hotel.child_price_type === 'fixed') → child_price_value * numChildren * nights
else → (nightlyRate * child_price_value / 100) * numChildren * nights
  where nightlyRate = roomTotal / Math.max(1, nights)
```

### `taxAmount` (display estimate only)
```ts
// Do NOT include in p_total_price sent to RPC — causes double-taxation
const taxAmount = subtotal * (hotel.tax_percentage / 100)
```

### `grandTotal`
```ts
const subtotal = roomTotal + childTotal;
const grandTotal = subtotal + taxAmount;
```

**Currency:** `CURRENCY_SYMBOLS[hotel.currency] ?? hotel.currency`
```ts
const CURRENCY_SYMBOLS = { EUR: '€', USD: '$', GBP: '£', CHF: 'CHF ', JPY: '¥' };
```

---

## Booking Submission

### `handleSubmit()` — called on step 4 confirm

**Validation before RPC:**
- `!selectedRoom || !checkIn || !checkOut || nights <= 0` → error toast
- `numGuests > selectedRoomData.max_guests` → capacity error toast

**RPC call:**
```ts
const { data: reservationId, error } = await supabase.rpc('create_reservation_if_available', {
  p_hotel_id: HOTEL_ID,
  p_room_type_id: selectedRoom,
  p_check_in: format(checkIn, 'yyyy-MM-dd'),
  p_check_out: format(checkOut, 'yyyy-MM-dd'),
  p_guest_name: `${firstName} ${lastName}`.trim(),
  p_guest_email: email || null,
  p_guest_phone: phone || null,
  p_guests_count: numGuests,               // adults only
  p_total_price: roomTotal,                // pre-tax adult room total; RPC appends child_total
  p_booking_source: 'website',
  p_room_id: null,                         // always null for website bookings
  p_num_children: parseInt(childCount),
});
```
Returns: `reservationId` (UUID string) on success.

**RPC error handling:**
| Error message contains | User toast |
|---|---|
| `'No availability'` | Room no longer available for selected dates |
| `'blocked'` | One or more dates no longer available |
| `'capacity'` or `'exceeds'` | Room max guests exceeded |
| `'rate limit'` or `'rate_limit'` | Too many attempts, wait a few minutes |
| anything else | Generic "something went wrong" |

**Edge function (after successful RPC):**
```ts
await supabase.functions.invoke('send-booking-received', {
  body: { reservation_id: reservationId, hotel_id: HOTEL_ID },
});
```
- Sends acknowledgement email to guest + notifies hotel about new pending reservation
- No auth required — public function
- Email error is logged but does NOT block success state (reservation already created)

**On success:** `setSuccess(true)` → render success screen

---

## Success Screen

Renders instead of the booking form when `success === true`.

Content:
- Animated check icon (Framer Motion spring)
- Headline: "Reservation Request Received"
- Body: "Your request is **pending review**. We'll confirm your booking via email shortly."
- Guest email displayed
- **No reservation code shown** (pending status — not confirmed yet)
- CTA: "Back to Homepage" → navigate to `/`

---

## Booking Widget (Homepage)

Used on the homepage hero. On submit:
```ts
const params = new URLSearchParams({
  checkin: format(checkIn, 'yyyy-MM-dd'),
  checkout: format(checkOut, 'yyyy-MM-dd'),
  guests: String(guests),
});
navigate(`/booking?${params.toString()}`);
```
Max guests derived from: `Math.max(...roomTypes.map(r => r.max_guests))`

---

## Rooms Page (`/rooms`)

```ts
// Fetch
table: room_types
select: 'id, name, description, base_price, max_guests, image_url, amenities, available_units'
filter: .eq('hotel_id', HOTEL_ID).eq('show_on_website', true).order('base_price', ascending)

// Client-side filter
eligibleRooms = rooms.filter(r =>
  r.max_guests >= guestFilter &&
  selectedAmenities.every(a => r.amenities?.includes(a))
)
```

"Book" button links to: `/booking?room=${room.id}`

---

## Room Detail Page (`/rooms/:id`)

```ts
// Single room
const { id } = useParams();
table: room_types, filter: .eq('id', id).single()

// All rooms for recommendations
table: room_types, filter: .eq('hotel_id', HOTEL_ID).eq('show_on_website', true)
```

Booking widget on detail page:
- Date pickers (check-in / check-out)
- Guest selector
- Shows: `nights × base_price` estimate
- "Book Now" button → `/booking?room=${id}&checkin=...&checkout=...&guests=...`

---

## Dependencies Required

```json
"@tanstack/react-query": "^5.x",
"react-router-dom": "^6.x",
"react-hook-form": "^7.x",
"@hookform/resolvers": "^3.x",
"zod": "^3.x",
"date-fns": "^3.x",
"framer-motion": "^12.x",
"@supabase/supabase-js": "^2.x"
```

---

## Routing

```ts
// App.tsx
'/'              → HomePage       (hero + booking widget + sections)
'/rooms'         → RoomsPage      (suite listing with filters)
'/rooms/:id'     → RoomDetailPage (mosaic gallery + booking widget)
'/booking'       → BookingPage    (4-step wizard)
'/booking/success' → Success      (post-booking confirmation — optional separate route, or inline state)
'*'              → NotFound
```

---

## Content Rule (Step 2)

**FROM SUPABASE (dynamic):**
- Room type names, descriptions, images, prices (base + weekend + overrides)
- Amenities list, room size, max guests, available_units
- Real availability for selected dates (RPC)
- Hotel check-in/out times, tax percentage, child pricing config

**FROM STITCH DESIGN (static copy — never from DB):**
- Hero headline: "Your Private Sanctuary on the Amalfi Coast"
- All section headings, marketing copy, nav links, footer text
- Feature card content (Private Concierge, Cliffside Wellness, Gourmet Dining)
- Testimonials (static — Julian Vance, Alexandra V., Marcus Cheng, Sasha Thorne)
- About/story copy, concierge section, FAQ
- Local Explorations section (Ravello Heights, Positano, Isle of Capri)
- Footer columns and links
- Reassurance copy (Secure Checkout, Direct Rates, Instant Confirmation)
