import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format, differenceInDays, isWeekend, eachDayOfInterval, isSameDay } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { supabase, HOTEL_ID } from '../lib/supabase';

// ─── Types ────────────────────────────────────────────────────────────────────

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
  start_date: string;
  end_date: string;
  price: number;
}

interface AvailabilityBlock {
  room_type_id: string;
  date: string;
}

interface HotelConfig {
  currency: string;
  tax_percentage: number | null;
  check_in_time: string | null;
  check_out_time: string | null;
  child_pricing_enabled: boolean;
  child_price_type: string;
  child_price_value: number;
  name: string;
  email: string | null;
}

interface RoomAvailability {
  room_type_id: string;
  available_units: number;
  remaining: number;
}

// ─── Form schema ──────────────────────────────────────────────────────────────

const guestSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string(),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phone: z.string(),
  children: z.string(),
  specialRequests: z.string(),
});
type GuestForm = z.infer<typeof guestSchema>;

const STEPS = ['dates', 'room', 'details', 'confirm'] as const;
type Step = typeof STEPS[number];
const STEP_LABELS = ['Select Dates', 'Choose Room', 'Your Details', 'Confirm'];

const CURRENCY_SYMBOLS: Record<string, string> = { EUR: '€', USD: '$', GBP: '£', CHF: 'CHF ', JPY: '¥' };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getDayPrice(date: Date, roomId: string, basePrice: number, weekendPrice?: number, overrides?: PricingOverride[]) {
  const override = overrides?.find(o => {
    if (o.room_type_id !== roomId) return false;
    const start = new Date(o.start_date + 'T00:00:00');
    const end = new Date(o.end_date + 'T00:00:00');
    return date >= start && date <= end;
  });
  if (override) return override.price;
  if (weekendPrice && isWeekend(date)) return weekendPrice;
  return basePrice;
}

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center mb-16">
      <div className="flex items-center w-full max-w-2xl">
        {STEPS.map((_, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${i <= current ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface opacity-40'}`}>
                {i < current ? <span className="material-symbols-outlined text-lg">check</span> : i + 1}
              </div>
              <span className={`font-label-md text-label-md whitespace-nowrap transition-all ${i === current ? 'text-primary' : 'text-on-surface-variant opacity-60'}`}>
                {STEP_LABELS[i]}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-px flex-1 mx-2 mb-6 transition-all ${i < current ? 'bg-primary' : 'bg-outline-variant'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BookingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [step, setStep] = useState<Step>('dates');
  const [selectedRoom, setSelectedRoom] = useState(searchParams.get('room') || '');
  const [checkIn, setCheckIn] = useState<Date | undefined>(() => {
    const d = searchParams.get('checkin');
    return d ? new Date(d + 'T00:00:00') : undefined;
  });
  const [checkOut, setCheckOut] = useState<Date | undefined>(() => {
    const d = searchParams.get('checkout');
    return d ? new Date(d + 'T00:00:00') : undefined;
  });
  const [guests, setGuests] = useState(searchParams.get('guests') || '2');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { register, trigger, getValues, watch: watchForm, formState: { errors } } = useForm<GuestForm>({
    resolver: zodResolver(guestSchema),
    defaultValues: { firstName: '', lastName: '', email: '', phone: '', children: '0', specialRequests: '' },
  });
  const children = watchForm('children');

  useEffect(() => {
    const room = searchParams.get('room');
    if (room && checkIn && checkOut) setStep('details');
    else if (room) setStep('dates');
  }, []);

  // ─── Data fetching ───────────────────────────────────────────────────────────

  const { data: hotel } = useQuery<HotelConfig>({
    queryKey: ['hotel_config', HOTEL_ID],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hotels')
        .select('name, email, currency, tax_percentage, check_in_time, check_out_time, child_pricing_enabled, child_price_type, child_price_value')
        .eq('id', HOTEL_ID).single();
      if (error) throw error;
      return data as HotelConfig;
    },
  });

  const { data: rooms = [] } = useQuery<RoomType[]>({
    queryKey: ['room_types_booking', HOTEL_ID],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('room_types')
        .select('id, name, description, base_price, weekend_price, max_guests, image_url, room_size, amenities, available_units')
        .eq('hotel_id', HOTEL_ID).eq('show_on_website', true).order('base_price', { ascending: true });
      if (error) throw error;
      return data as RoomType[];
    },
  });

  const { data: pricingOverrides } = useQuery<PricingOverride[]>({
    queryKey: ['pricing_overrides', HOTEL_ID],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pricing_overrides')
        .select('room_type_id, start_date, end_date, price').eq('hotel_id', HOTEL_ID);
      if (error) throw error;
      return data as PricingOverride[];
    },
  });

  const { data: availabilityBlocks } = useQuery<AvailabilityBlock[]>({
    queryKey: ['availability_blocks', HOTEL_ID],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('availability_blocks')
        .select('room_type_id, date').eq('hotel_id', HOTEL_ID);
      if (error) throw error;
      return data as AvailabilityBlock[];
    },
  });

  const { data: roomAvailability } = useQuery<RoomAvailability[]>({
    queryKey: ['room_availability', HOTEL_ID, checkIn?.toISOString(), checkOut?.toISOString()],
    enabled: !!checkIn && !!checkOut && differenceInDays(checkOut, checkIn) > 0,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_room_availability', {
        p_hotel_id: HOTEL_ID,
        p_check_in: format(checkIn!, 'yyyy-MM-dd'),
        p_check_out: format(checkOut!, 'yyyy-MM-dd'),
      });
      if (error) throw error;
      return data as RoomAvailability[];
    },
  });

  // ─── Derived state ───────────────────────────────────────────────────────────

  const currencySymbol = CURRENCY_SYMBOLS[hotel?.currency ?? 'USD'] ?? '$';
  const nights = checkIn && checkOut ? Math.max(0, differenceInDays(checkOut, checkIn)) : 0;

  const availabilityByRoom = useMemo(() => {
    const map = new Map<string, RoomAvailability>();
    roomAvailability?.forEach(a => map.set(a.room_type_id, a));
    return map;
  }, [roomAvailability]);

  const maxGuests = useMemo(() => {
    if (!rooms.length) return 8;
    return Math.max(...rooms.map(r => r.max_guests));
  }, [rooms]);

  const blockedDates = useMemo(() => {
    if (!selectedRoom || !availabilityBlocks) return [];
    return availabilityBlocks
      .filter(b => b.room_type_id === selectedRoom)
      .map(b => new Date(b.date + 'T00:00:00'));
  }, [selectedRoom, availabilityBlocks]);

  const eligibleRooms = useMemo(() =>
    rooms.filter(r => r.max_guests >= parseInt(guests)), [rooms, guests]);

  const selectedRoomData = useMemo(() =>
    rooms.find(r => r.id === selectedRoom), [rooms, selectedRoom]);

  const roomTotal = useMemo(() => {
    if (!selectedRoomData || !checkIn || !checkOut || nights <= 0) return 0;
    const days = eachDayOfInterval({ start: checkIn, end: new Date(checkOut.getTime() - 86400000) });
    return days.reduce((sum, day) =>
      sum + getDayPrice(day, selectedRoomData.id, selectedRoomData.base_price, selectedRoomData.weekend_price, pricingOverrides), 0);
  }, [selectedRoomData, checkIn, checkOut, nights, pricingOverrides]);

  const childTotal = useMemo(() => {
    const numChildren = parseInt(children);
    if (!hotel?.child_pricing_enabled || numChildren === 0 || !hotel.child_price_value || nights <= 0) return 0;
    if (hotel.child_price_type === 'fixed') return hotel.child_price_value * numChildren * nights;
    const nightlyRate = roomTotal / Math.max(1, nights);
    return (nightlyRate * hotel.child_price_value / 100) * numChildren * nights;
  }, [hotel, children, roomTotal, nights]);

  const subtotal = roomTotal + childTotal;
  const taxAmount = useMemo(() => {
    const rate = hotel?.tax_percentage ?? 0;
    return rate > 0 && subtotal > 0 ? subtotal * (rate / 100) : 0;
  }, [hotel?.tax_percentage, subtotal]);
  const grandTotal = subtotal + taxAmount;

  const stepIndex = STEPS.indexOf(step);

  const isDateBlocked = (date: Date) => blockedDates.some(d => isSameDay(d, date));

  // ─── Navigation ──────────────────────────────────────────────────────────────

  const canProceed = () => {
    if (step === 'dates') return !!checkIn && !!checkOut && nights > 0;
    if (step === 'room') return !!selectedRoom;
    return true;
  };

  const nextStep = async () => {
    if (step === 'details') {
      const valid = await trigger(['firstName', 'email']);
      if (!valid) return;
    }
    if (STEPS[stepIndex + 1] === 'room' && selectedRoom && !eligibleRooms.some(r => r.id === selectedRoom)) {
      setSelectedRoom('');
    }
    if (stepIndex < STEPS.length - 1) setStep(STEPS[stepIndex + 1]);
  };

  const prevStep = () => {
    if (stepIndex > 0) setStep(STEPS[stepIndex - 1]);
  };

  // ─── Submission ──────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    const { firstName, lastName, email, phone, children: childCount, specialRequests } = getValues();
    setError('');
    if (!selectedRoom || !checkIn || !checkOut || nights <= 0) { setError('Please complete all booking details.'); return; }
    const numGuests = parseInt(guests);
    if (selectedRoomData && numGuests > selectedRoomData.max_guests) {
      setError(`This room accommodates up to ${selectedRoomData.max_guests} guests.`); return;
    }
    setLoading(true);
    try {
      const { data: reservationId, error: rpcError } = await supabase.rpc('create_reservation_if_available', {
        p_hotel_id: HOTEL_ID,
        p_room_type_id: selectedRoom,
        p_check_in: format(checkIn, 'yyyy-MM-dd'),
        p_check_out: format(checkOut, 'yyyy-MM-dd'),
        p_guest_name: `${firstName} ${lastName}`.trim(),
        p_guest_email: email || null,
        p_guest_phone: phone || null,
        p_guests_count: numGuests,
        p_total_price: roomTotal,
        p_booking_source: 'website',
        p_room_id: null,
        p_num_children: parseInt(childCount),
        p_special_requests: specialRequests || null,
      });

      if (rpcError) {
        const msg = rpcError.message ?? '';
        if (msg.includes('No availability')) setError('Sorry, this room is no longer available for your selected dates.');
        else if (msg.includes('blocked')) setError('One or more of your selected dates are no longer available.');
        else if (msg.includes('capacity') || msg.includes('exceeds')) setError(`This room fits up to ${selectedRoomData?.max_guests ?? 'fewer'} guests.`);
        else if (msg.includes('rate limit') || msg.includes('rate_limit')) setError('Too many booking attempts. Please wait a few minutes and try again.');
        else setError('Something went wrong. Please try again.');
        return;
      }

      await supabase.functions.invoke('send-booking-received', {
        body: { reservation_id: reservationId, hotel_id: HOTEL_ID },
      });

      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ─── Success screen ──────────────────────────────────────────────────────────

  if (success) {
    const { firstName, email } = getValues();
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-margin-mobile">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8 max-w-xl w-full"
        >
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 0.8, bounce: 0.45, delay: 0.2 }}
            className="w-24 h-24 bg-secondary text-on-secondary rounded-full flex items-center justify-center mx-auto"
          >
            <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'wght' 700" }}>check</span>
          </motion.div>

          <h1 className="font-headline-lg text-headline-lg">Reservation Request Received!</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Thank you, <strong>{firstName}</strong>. Your request is <strong>pending review</strong>. We'll confirm your booking via email to <strong>{email}</strong> shortly. Our team looks forward to welcoming you to Solaris Terrace.
          </p>

          <div className="p-6 bg-white rounded-xl border border-outline-variant/30 text-left">
            <p className="font-label-md text-label-md text-outline uppercase mb-2">Your Stay</p>
            <p className="font-body-md text-on-surface-variant">
              {selectedRoomData?.name} · {checkIn && format(checkIn, 'MMM d')} – {checkOut && format(checkOut, 'MMM d, yyyy')} · {guests} {parseInt(guests) === 1 ? 'guest' : 'guests'}
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="px-12 py-4 bg-primary text-on-primary rounded-full font-title-lg text-title-lg shadow-lg hover:bg-primary-container transition-all"
          >
            Return to Homepage
          </button>
        </motion.div>
      </div>
    );
  }

  // ─── Sidebar summary ─────────────────────────────────────────────────────────

  const SidebarSummary = () => (
    <aside className="lg:col-span-4 sticky top-32 space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-outline-variant/20 overflow-hidden">
        {selectedRoomData?.image_url && (
          <div className="relative h-48 w-full">
            <img src={selectedRoomData.image_url} alt={selectedRoomData.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white font-label-md text-label-md tracking-widest uppercase">SOLARIS TERRACE</p>
              <h3 className="text-white font-headline-md text-title-lg">{selectedRoomData.name}</h3>
            </div>
          </div>
        )}
        {!selectedRoomData && (
          <div className="h-32 bg-surface-container-high flex items-center justify-center">
            <span className="font-label-md text-on-surface-variant text-label-md uppercase tracking-widest">SOLARIS TERRACE</span>
          </div>
        )}

        <div className="p-6 space-y-6">
          {checkIn && checkOut && (
            <div className="flex justify-between border-b border-outline-variant/10 pb-6">
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant uppercase">CHECK-IN</p>
                <p className="font-title-lg text-title-lg">{format(checkIn, 'MMM d, yyyy')}</p>
              </div>
              <div className="text-right">
                <p className="font-label-md text-label-md text-on-surface-variant uppercase">CHECK-OUT</p>
                <p className="font-title-lg text-title-lg">{format(checkOut, 'MMM d, yyyy')}</p>
              </div>
            </div>
          )}

          {roomTotal > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between text-on-surface-variant">
                <span className="font-body-md text-body-md">Accommodation ({nights} night{nights > 1 ? 's' : ''})</span>
                <span className="font-body-md">{currencySymbol}{roomTotal.toLocaleString()}</span>
              </div>
              {childTotal > 0 && (
                <div className="flex justify-between text-on-surface-variant">
                  <span className="font-body-md text-body-md">Children</span>
                  <span className="font-body-md">{currencySymbol}{childTotal.toLocaleString()}</span>
                </div>
              )}
              {taxAmount > 0 && (
                <div className="flex justify-between text-on-surface-variant">
                  <span className="font-body-md text-body-md">Taxes &amp; Levies (est.)</span>
                  <span className="font-body-md">{currencySymbol}{taxAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-6 border-t-2 border-dashed border-outline-variant/30">
                <div className="flex justify-between items-baseline">
                  <span className="font-title-lg text-title-lg">Total Amount</span>
                  <span className="font-headline-md text-headline-md text-primary">{currencySymbol}{grandTotal.toLocaleString()}</span>
                </div>
                <p className="text-xs text-on-surface-variant text-right mt-1">Estimate incl. taxes</p>
              </div>
            </div>
          )}

          {!checkIn && (
            <p className="font-body-md text-body-md text-on-surface-variant text-center py-4">Select dates to see pricing</p>
          )}

          <div className="p-4 bg-tertiary-fixed rounded-lg text-on-tertiary-fixed text-sm">
            <p className="font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">info</span>
              Flexible Cancellation
            </p>
            <p className="mt-1">Free cancellation until 48h before arrival.</p>
          </div>
        </div>
      </div>

      {/* Reassurance */}
      <div className="space-y-3">
        {[
          { icon: 'verified', title: 'Secure Checkout', desc: '256-bit SSL encrypted.' },
          { icon: 'price_check', title: 'Direct Rates', desc: 'Best price guaranteed.' },
          { icon: 'event_available', title: 'Instant Request', desc: 'Your stay is requested immediately.' },
        ].map(r => (
          <div key={r.title} className="flex items-start gap-4 p-4 bg-surface-container-low rounded-xl">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>{r.icon}</span>
            <div>
              <p className="font-title-lg text-on-surface text-sm font-semibold">{r.title}</p>
              <p className="text-on-surface-variant text-xs">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* Reduced nav */}
      <nav className="bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-6 max-w-container-max mx-auto">
          <button onClick={() => navigate('/')} className="font-display-lg text-title-lg tracking-widest text-primary uppercase">
            SOLARIS TERRACE
          </button>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-lg">lock</span>
            <span className="font-label-md text-label-md hidden md:inline uppercase">Secure Checkout</span>
          </div>
        </div>
      </nav>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
        <StepIndicator current={stepIndex} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Main content */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                {/* ── STEP 1: DATES ── */}
                {step === 'dates' && (
                  <div className="bg-white rounded-xl shadow-sm border border-outline-variant/20 p-8 md:p-12">
                    <h2 className="font-headline-md text-headline-md mb-8">Select Your Dates</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="font-label-md text-label-md block mb-3 uppercase">Check-in Date</label>
                        <div className="border border-outline-variant/30 rounded-xl overflow-hidden">
                          <DayPicker
                            mode="single"
                            selected={checkIn}
                            onSelect={setCheckIn}
                            disabled={[{ before: new Date() }, ...(isDateBlocked ? [isDateBlocked] : [])]}
                            startMonth={new Date()}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="font-label-md text-label-md block mb-3 uppercase">Check-out Date</label>
                        <div className="border border-outline-variant/30 rounded-xl overflow-hidden">
                          <DayPicker
                            mode="single"
                            selected={checkOut}
                            onSelect={setCheckOut}
                            disabled={[{ before: checkIn ?? new Date() }]}
                            startMonth={checkIn ?? new Date()}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <label className="font-label-md text-label-md block mb-3 uppercase">Number of Guests</label>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setGuests(g => String(Math.max(1, parseInt(g) - 1)))}
                          className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:border-primary hover:text-primary transition-all"
                        >
                          <span className="material-symbols-outlined">remove</span>
                        </button>
                        <span className="font-title-lg text-title-lg w-8 text-center">{guests}</span>
                        <button
                          onClick={() => setGuests(g => String(Math.min(maxGuests, parseInt(g) + 1)))}
                          className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:border-primary hover:text-primary transition-all"
                        >
                          <span className="material-symbols-outlined">add</span>
                        </button>
                        <span className="font-body-md text-on-surface-variant">{parseInt(guests) === 1 ? 'Adult' : 'Adults'}</span>
                      </div>
                    </div>

                    {checkIn && checkOut && nights > 0 && (
                      <div className="bg-surface-container-low rounded-xl p-4 mb-8 flex items-center gap-3">
                        <span className="material-symbols-outlined text-secondary">check_circle</span>
                        <p className="font-body-md text-on-surface">
                          <strong>{nights} night{nights > 1 ? 's' : ''}</strong> · {format(checkIn, 'MMM d')} → {format(checkOut, 'MMM d, yyyy')}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* ── STEP 2: ROOM ── */}
                {step === 'room' && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-outline-variant/20 p-8">
                      <h2 className="font-headline-md text-headline-md mb-2">Choose Your Suite</h2>
                      <p className="font-body-md text-on-surface-variant">Showing suites for {guests} guest{parseInt(guests) > 1 ? 's' : ''} · {nights} night{nights > 1 ? 's' : ''}</p>
                    </div>

                    {eligibleRooms.length === 0 ? (
                      <div className="bg-white rounded-xl shadow-sm border border-outline-variant/20 p-12 text-center">
                        <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 block mb-4">search_off</span>
                        <p className="font-body-lg text-on-surface-variant">No suites available for {guests} guests.</p>
                        <button onClick={() => setGuests('2')} className="mt-4 text-primary font-label-md text-label-md hover:underline">Reset to 2 guests</button>
                      </div>
                    ) : (
                      eligibleRooms.map(room => {
                        const avail = availabilityByRoom.get(room.id);
                        const isSelected = selectedRoom === room.id;
                        const remaining = avail?.remaining ?? room.available_units ?? 99;
                        const isUnavailable = remaining <= 0;
                        const nightlyTotal = nights > 0
                          ? eachDayOfInterval({ start: checkIn!, end: new Date(checkOut!.getTime() - 86400000) })
                              .reduce((s, d) => s + getDayPrice(d, room.id, room.base_price, room.weekend_price, pricingOverrides), 0)
                          : room.base_price;

                        return (
                          <button
                            key={room.id}
                            disabled={isUnavailable}
                            onClick={() => !isUnavailable && setSelectedRoom(room.id)}
                            className={`w-full text-left group relative bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm transition-all duration-300 border-2 ${
                              isSelected ? 'border-primary shadow-lg' : isUnavailable ? 'border-transparent opacity-50 cursor-not-allowed' : 'border-transparent hover:border-primary/30 hover:shadow-md'
                            }`}
                          >
                            <div className="flex flex-col md:flex-row">
                              <div className="relative w-full md:w-64 h-48 md:h-auto shrink-0 overflow-hidden">
                                {room.image_url ? (
                                  <img src={room.image_url} alt={room.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                ) : (
                                  <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                                    <span className="material-symbols-outlined text-5xl text-on-surface-variant/30">hotel</span>
                                  </div>
                                )}
                                {remaining <= 3 && remaining > 0 && (
                                  <span className="absolute top-3 left-3 bg-error text-on-error font-label-md text-[10px] px-2 py-1 rounded-full">Only {remaining} left</span>
                                )}
                                {isUnavailable && (
                                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <span className="text-white font-label-md text-label-md">Unavailable</span>
                                  </div>
                                )}
                              </div>

                              <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-3">
                                  <h3 className="font-title-lg text-title-lg text-on-surface">{room.name}</h3>
                                  {isSelected && (
                                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                  )}
                                </div>
                                <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2">{room.description}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                  <span className="flex items-center gap-1 font-label-md text-[12px] text-on-surface-variant">
                                    <span className="material-symbols-outlined text-sm">group</span> Up to {room.max_guests}
                                  </span>
                                  {room.room_size && (
                                    <span className="flex items-center gap-1 font-label-md text-[12px] text-on-surface-variant">
                                      <span className="material-symbols-outlined text-sm">straighten</span> {room.room_size}
                                    </span>
                                  )}
                                  {room.amenities?.slice(0, 2).map(a => (
                                    <span key={a} className="bg-surface-container px-2 py-0.5 rounded-full font-label-md text-[11px] text-on-surface-variant">{a}</span>
                                  ))}
                                </div>

                                <div className="mt-auto flex justify-between items-end">
                                  <div>
                                    <span className="font-label-md text-on-surface-variant text-[12px] block">{nights > 0 ? `${nights} nights total` : 'per night'}</span>
                                    <span className="font-headline-md text-headline-md text-primary">{currencySymbol}{nightlyTotal.toLocaleString()}</span>
                                  </div>
                                  {!isUnavailable && !isSelected && (
                                    <span className="font-label-md text-label-md text-secondary">Select →</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>
                )}

                {/* ── STEP 3: DETAILS ── */}
                {step === 'details' && (
                  <div className="bg-white rounded-xl shadow-sm border border-outline-variant/20 p-8 md:p-12">
                    <h2 className="font-headline-md text-headline-md mb-8">Guest Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-label-md text-label-md block">FIRST NAME *</label>
                        <input
                          {...register('firstName')}
                          className="w-full bg-[#F8F4EF] border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary transition-all outline-none"
                          placeholder="e.g. Julianne"
                        />
                        {errors.firstName && <p className="text-error text-sm">{errors.firstName.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="font-label-md text-label-md block">LAST NAME</label>
                        <input
                          {...register('lastName')}
                          className="w-full bg-[#F8F4EF] border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary transition-all outline-none"
                          placeholder="e.g. Moore"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="font-label-md text-label-md block">EMAIL ADDRESS *</label>
                        <input
                          {...register('email')}
                          type="email"
                          className="w-full bg-[#F8F4EF] border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary transition-all outline-none"
                          placeholder="julianne.m@example.com"
                        />
                        {errors.email && <p className="text-error text-sm">{errors.email.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="font-label-md text-label-md block">PHONE (OPTIONAL)</label>
                        <input
                          {...register('phone')}
                          type="tel"
                          className="w-full bg-[#F8F4EF] border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary transition-all outline-none"
                          placeholder="+1 555 000 0000"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-label-md text-label-md block">CHILDREN</label>
                        <select
                          {...register('children')}
                          className="w-full bg-[#F8F4EF] border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary transition-all outline-none appearance-none"
                        >
                          {[0,1,2,3,4].map(n => <option key={n} value={String(n)}>{n} {n === 1 ? 'Child' : 'Children'}</option>)}
                        </select>
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="font-label-md text-label-md block">SPECIAL REQUESTS (OPTIONAL)</label>
                        <textarea
                          {...register('specialRequests')}
                          rows={4}
                          className="w-full bg-[#F8F4EF] border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary transition-all outline-none resize-none"
                          placeholder="Dietary requirements, early check-in, or occasion details…"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 4: CONFIRM ── */}
                {step === 'confirm' && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-outline-variant/20 p-8 md:p-12">
                      <h2 className="font-headline-md text-headline-md mb-8">Confirm Your Reservation</h2>

                      <div className="space-y-6">
                        <div className="flex justify-between py-4 border-b border-outline-variant/20">
                          <span className="font-label-md text-label-md text-on-surface-variant uppercase">Suite</span>
                          <span className="font-title-lg text-title-lg">{selectedRoomData?.name}</span>
                        </div>
                        <div className="flex justify-between py-4 border-b border-outline-variant/20">
                          <span className="font-label-md text-label-md text-on-surface-variant uppercase">Dates</span>
                          <span className="font-body-md">{checkIn && format(checkIn, 'MMM d')} – {checkOut && format(checkOut, 'MMM d, yyyy')}</span>
                        </div>
                        <div className="flex justify-between py-4 border-b border-outline-variant/20">
                          <span className="font-label-md text-label-md text-on-surface-variant uppercase">Guests</span>
                          <span className="font-body-md">{guests} adults{parseInt(children) > 0 ? `, ${children} children` : ''}</span>
                        </div>
                        <div className="flex justify-between py-4 border-b border-outline-variant/20">
                          <span className="font-label-md text-label-md text-on-surface-variant uppercase">Guest Name</span>
                          <span className="font-body-md">{`${getValues('firstName')} ${getValues('lastName')}`.trim()}</span>
                        </div>
                        <div className="flex justify-between py-4 border-b border-outline-variant/20">
                          <span className="font-label-md text-label-md text-on-surface-variant uppercase">Email</span>
                          <span className="font-body-md">{getValues('email')}</span>
                        </div>
                        <div className="flex justify-between py-4">
                          <span className="font-label-md text-label-md text-on-surface-variant uppercase">Total (est.)</span>
                          <span className="font-headline-md text-headline-md text-primary">{currencySymbol}{grandTotal.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="mt-8 p-4 bg-surface-container-low rounded-xl">
                        <p className="font-body-md text-body-md text-on-surface-variant">
                          By completing this reservation, your booking will be submitted for review. You will receive a confirmation email once approved. No payment is collected at this stage.
                        </p>
                      </div>

                      {error && (
                        <div className="mt-6 p-4 bg-error-container rounded-xl">
                          <p className="text-on-error-container font-body-md text-body-md">{error}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-4">
              {stepIndex > 0 && (
                <button
                  onClick={prevStep}
                  className="px-8 py-4 border-2 border-primary text-primary rounded-full font-title-lg text-title-lg hover:bg-primary-fixed transition-all"
                >
                  ← Back
                </button>
              )}
              {step !== 'confirm' ? (
                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="flex-1 md:flex-none px-12 py-4 bg-primary text-on-primary rounded-full font-title-lg text-title-lg shadow-lg hover:bg-primary-container transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 md:flex-none px-12 py-4 bg-primary text-on-primary rounded-full font-title-lg text-title-lg shadow-lg hover:bg-primary-container transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Confirming Reservation…
                    </>
                  ) : (
                    `Complete Reservation · ${currencySymbol}${grandTotal.toLocaleString()}`
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <SidebarSummary />
        </div>
      </main>

      {/* Simple footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant/20 py-12 mt-section-gap">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <h4 className="font-display-lg text-headline-md text-primary mb-6 uppercase tracking-widest">SOLARIS TERRACE</h4>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto mb-8">
            A sanctuary of light and sea. Experience unparalleled luxury and personalized service at our coastal retreat.
          </p>
          <p className="font-label-md text-xs text-outline">© 2024 SOLARIS TERRACE. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
