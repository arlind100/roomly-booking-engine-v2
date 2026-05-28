export interface RoomType {
  id: string;
  name: string;
  description: string | null;
  short_description: string | null;
  base_price: number;
  weekend_price: number | null;
  max_guests: number;
  room_size: string | null;
  amenities: string[];
  image_url: string | null;
  images: string[];
  show_on_website: boolean;
  available_units: number;
  view_type: string | null;
  bed_type: string | null;
  floor_level: string | null;
  smoking: boolean;
  featured: boolean;
}

export interface PricingOverride {
  room_type_id: string;
  start_date: string;
  end_date: string;
  price: number;
  label: string | null;
  is_active: boolean;
}

export interface AvailabilityBlock {
  room_type_id: string;
  date: string;
}

export interface RoomAvailability {
  room_type_id: string;
  available_units: number;
  booked_count: number;
  remaining: number;
}

export interface HotelConfig {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  currency: string;
  tax_percentage: number;
  check_in_time: string | null;
  check_out_time: string | null;
  child_pricing_enabled: boolean;
  child_price_type: string;
  child_price_value: number;
  cancellation_policy: string | null;
}

export const CURRENCY_SYMBOLS: Record<string, string> = {
  EUR: '€', USD: '$', GBP: '£', CHF: 'CHF ', JPY: '¥',
};

export function getCurrencySymbol(currency: string): string {
  return CURRENCY_SYMBOLS[currency] ?? currency;
}
