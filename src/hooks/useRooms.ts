import { useQuery } from '@tanstack/react-query';
import { supabase, HOTEL_ID } from '../lib/supabase';
import type { RoomType, PricingOverride, AvailabilityBlock, RoomAvailability } from '../lib/types';
import { format, differenceInDays } from 'date-fns';

export function useRooms() {
  return useQuery<RoomType[]>({
    queryKey: ['room_types', HOTEL_ID],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('room_types')
        .select('id, name, description, short_description, base_price, weekend_price, max_guests, room_size, amenities, image_url, images, show_on_website, available_units, view_type, bed_type, floor_level, smoking, featured')
        .eq('hotel_id', HOTEL_ID)
        .eq('show_on_website', true)
        .order('featured', { ascending: false })
        .order('base_price', { ascending: true });
      if (error) throw error;
      return (data ?? []) as RoomType[];
    },
    staleTime: 60_000,
  });
}

export function useRoomById(id: string | undefined) {
  return useQuery<RoomType | null>({
    queryKey: ['room_type', id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('room_types')
        .select('id, name, description, short_description, base_price, weekend_price, max_guests, room_size, amenities, image_url, images, show_on_website, available_units, view_type, bed_type, floor_level, smoking, featured')
        .eq('hotel_id', HOTEL_ID)
        .eq('id', id!)
        .single();
      if (error) return null;
      return data as RoomType;
    },
  });
}

export function usePricingOverrides() {
  return useQuery<PricingOverride[]>({
    queryKey: ['pricing_overrides', HOTEL_ID],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pricing_overrides')
        .select('room_type_id, start_date, end_date, price, label, is_active')
        .eq('hotel_id', HOTEL_ID)
        .eq('is_active', true);
      if (error) throw error;
      return (data ?? []) as PricingOverride[];
    },
    staleTime: 5 * 60_000,
  });
}

export function useAvailabilityBlocks() {
  return useQuery<AvailabilityBlock[]>({
    queryKey: ['availability_blocks', HOTEL_ID],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('availability_blocks')
        .select('room_type_id, date')
        .eq('hotel_id', HOTEL_ID);
      if (error) throw error;
      return (data ?? []) as AvailabilityBlock[];
    },
    staleTime: 5 * 60_000,
  });
}

export function useRoomAvailability(checkIn: Date | undefined, checkOut: Date | undefined) {
  const enabled = !!checkIn && !!checkOut && differenceInDays(checkOut, checkIn) > 0;
  return useQuery<RoomAvailability[]>({
    queryKey: ['room_availability', HOTEL_ID, checkIn?.toISOString(), checkOut?.toISOString()],
    enabled,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_room_availability', {
        p_hotel_id: HOTEL_ID,
        p_check_in: format(checkIn!, 'yyyy-MM-dd'),
        p_check_out: format(checkOut!, 'yyyy-MM-dd'),
      });
      if (error) throw error;
      return (data ?? []) as RoomAvailability[];
    },
  });
}
