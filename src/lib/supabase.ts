import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const HOTEL_ID = import.meta.env.VITE_HOTEL_ID as string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
