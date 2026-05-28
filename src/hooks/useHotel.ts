import { useQuery } from '@tanstack/react-query';
import { supabase, HOTEL_ID } from '../lib/supabase';
import type { HotelConfig } from '../lib/types';

export function useHotel() {
  return useQuery<HotelConfig>({
    queryKey: ['hotel_config', HOTEL_ID],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hotels')
        .select('id, name, email, phone, address, currency, tax_percentage, check_in_time, check_out_time, child_pricing_enabled, child_price_type, child_price_value, cancellation_policy')
        .eq('id', HOTEL_ID)
        .single();
      if (error) throw error;
      return data as HotelConfig;
    },
    staleTime: 5 * 60_000,
  });
}
