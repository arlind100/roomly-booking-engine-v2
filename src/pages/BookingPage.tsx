import { useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format, differenceInDays, isBefore, startOfToday } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { supabase, HOTEL_ID } from '../lib/supabase';
import { useHotel } from '../hooks/useHotel';
import { useRooms, usePricingOverrides, useAvailabilityBlocks, useRoomAvailability } from '../hooks/useRooms';
import { calcRoomTotal, getDayPrice } from '../lib/pricing';
import { getCurrencySymbol } from '../lib/types';
import 'react-day-picker/style.css';

const FALLBACK_IMGS: Record<string, string> = {
  standard: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
  deluxe: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
  suite: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
  presidential: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
};

function getRoomImg(name: string, imageUrl: string | null, images: string[]): string {
  if (images?.length) return images[0];
  if (imageUrl) return imageUrl;
  const lower = name.toLowerCase();
  for (const [k, v] of Object.entries(FALLBACK_IMGS)) if (lower.includes(k)) return v;
  return FALLBACK_IMGS.standard;
}

const guestSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string(),
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  phone: z.string(),
  specialRequests: z.string(),
});
type GuestForm = z.infer<typeof guestSchema>;

const STEPS = ['Dates & Guests', 'Choose Room', 'Your Details', 'Confirm'] as const;

const slideVariant = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.35 } },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -48 : 48, transition: { duration: 0.25 } }),
};

export default function BookingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [calendarOpen, setCalendarOpen] = useState<'in' | 'out' | null>(null);
  const [checkIn, setCheckIn] = useState<Date | undefined>(() => {
    const d = searchParams.get('checkin');
    return d ? new Date(d + 'T00:00:00') : undefined;
  });
  const [checkOut, setCheckOut] = useState<Date | undefined>(() => {
    const d = searchParams.get('checkout');
    return d ? new Date(d + 'T00:00:00') : undefined;
  });
  const [adults, setAdults] = useState(() => Math.max(1, parseInt(searchParams.get('adults') || '2')));
  const [children, setChildren] = useState(() => Math.max(0, parseInt(searchParams.get('children') || '0')));
  const [selectedRoom, setSelectedRoom] = useState<string>(searchParams.get('room') || '');
  const [loading, setLoading] = useState(false);

  const { data: hotel } = useHotel();
  const { data: rooms } = useRooms();
  const { data: overrides = [] } = usePricingOverrides();
  const { data: blocks = [] } = useAvailabilityBlocks();
  const { data: availability = [] } = useRoomAvailability(checkIn, checkOut);

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<GuestForm>({
    resolver: zodResolver(guestSchema),
    defaultValues: { firstName: '', lastName: '', email: '', phone: '', specialRequests: '' },
  });

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const today = startOfToday();
  const cur = getCurrencySymbol(hotel?.currency ?? 'EUR');

  const allBlockedDates = useMemo(() => {
    return blocks.map(b => new Date(b.date + 'T00:00:00'));
  }, [blocks]);

  const availMap = useMemo(() => {
    const m = new Map<string, number>();
    availability.forEach(a => m.set(a.room_type_id, a.remaining));
    return m;
  }, [availability]);

  const selectedRoomData = useMemo(() => rooms?.find(r => r.id === selectedRoom), [rooms, selectedRoom]);

  const roomTotal = useMemo(() => {
    if (!selectedRoomData || !checkIn || !checkOut || nights <= 0) return 0;
    return calcRoomTotal(checkIn, checkOut, selectedRoomData.id, selectedRoomData.base_price, selectedRoomData.weekend_price, overrides);
  }, [selectedRoomData, checkIn, checkOut, nights, overrides]);

  const taxRate = hotel?.tax_percentage ?? 0;
  const taxAmount = taxRate > 0 && roomTotal > 0 ? roomTotal * (taxRate / 100) : 0;
  const grandTotal = roomTotal + taxAmount;

  const eligibleRooms = useMemo(() => {
    if (!rooms) return [];
    return rooms.filter(r => r.max_guests >= adults);
  }, [rooms, adults]);

  function goStep(n: number) {
    setDir(n > step ? 1 : -1);
    setStep(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function nextStep() {
    if (step === 2) {
      const ok = await trigger(['firstName', 'email']);
      if (!ok) return;
    }
    if (step < STEPS.length - 1) goStep(step + 1);
  }

  function prevStep() {
    if (step > 0) goStep(step - 1);
  }

  function canProceed(): boolean {
    switch (step) {
      case 0: return !!checkIn && !!checkOut && nights > 0;
      case 1: return !!selectedRoom;
      case 2: return true;
      default: return true;
    }
  }

  async function handleSubmit() {
    const { firstName, lastName, email, phone } = getValues();
    if (!selectedRoom || !checkIn || !checkOut || nights <= 0) return;

    setLoading(true);
    try {
      const { data: reservationId, error } = await supabase.rpc('create_reservation_if_available', {
        p_hotel_id: HOTEL_ID,
        p_room_type_id: selectedRoom,
        p_check_in: format(checkIn, 'yyyy-MM-dd'),
        p_check_out: format(checkOut, 'yyyy-MM-dd'),
        p_guest_name: `${firstName} ${lastName}`.trim(),
        p_guest_email: email || null,
        p_guest_phone: phone || null,
        p_guests_count: adults,
        p_total_price: roomTotal,
        p_booking_source: 'website',
        p_room_id: null,
        p_num_children: children,
      });

      if (error) {
        const msg = error.message ?? '';
        if (msg.includes('No availability')) {
          alert('Sorry, this room is no longer available for your selected dates.');
        } else if (msg.includes('blocked')) {
          alert('One or more selected dates are blocked. Please choose different dates.');
        } else if (msg.includes('rate limit') || msg.includes('rate_limit')) {
          alert('Too many booking attempts. Please wait a few minutes and try again.');
        } else {
          alert('Something went wrong. Please try again.');
        }
        return;
      }

      // Fetch the reservation code to display on success page
      const { data: resData } = await supabase
        .from('reservations')
        .select('reservation_code')
        .eq('id', reservationId)
        .single();

      // Fire acknowledgement email (non-blocking)
      supabase.functions.invoke('send-booking-confirmation', {
        body: { reservation_id: reservationId, hotel_id: HOTEL_ID },
      }).catch(() => {});

      navigate(`/booking/success?code=${resData?.reservation_code ?? ''}&email=${encodeURIComponent(email)}`);
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // ── Day picker modifiers ────────────────────────────────────────────────────
  const disabledDays = [
    { before: today },
    ...allBlockedDates,
  ];

  // ── Sidebar summary ─────────────────────────────────────────────────────────
  const Summary = () => (
    <div className="bg-surface-container-lowest rounded-3xl shadow-lg border border-outline-variant/20 overflow-hidden">
      <div className="relative h-44">
        <img
          src={selectedRoomData ? getRoomImg(selectedRoomData.name, selectedRoomData.image_url, selectedRoomData.images ?? []) : 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80'}
          alt={selectedRoomData?.name ?? 'Suite'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-white/70 font-label-md text-[10px] tracking-widest uppercase">Solaris Terrace</p>
          <h3 className="text-white font-title-lg text-title-lg">{selectedRoomData?.name ?? 'Select a room'}</h3>
        </div>
      </div>
      <div className="p-6 space-y-5">
        {checkIn && checkOut && nights > 0 && (
          <div className="flex justify-between border-b border-outline-variant/20 pb-4 text-sm">
            <div>
              <p className="text-on-surface-variant text-xs uppercase tracking-wide">Check-in</p>
              <p className="font-medium">{format(checkIn, 'MMM d, yyyy')}</p>
            </div>
            <div className="text-right">
              <p className="text-on-surface-variant text-xs uppercase tracking-wide">Check-out</p>
              <p className="font-medium">{format(checkOut, 'MMM d, yyyy')}</p>
            </div>
          </div>
        )}
        {nights > 0 && (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-on-surface-variant">
              <span>{nights} night{nights > 1 ? 's' : ''} × {cur}{selectedRoomData ? getDayPrice(checkIn!, selectedRoomData.id, selectedRoomData.base_price, selectedRoomData.weekend_price, overrides).toFixed(0) : '–'}</span>
              <span>{cur}{roomTotal > 0 ? roomTotal.toFixed(2) : '–'}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>{adults} adult{adults > 1 ? 's' : ''}{children > 0 ? ` + ${children} child${children > 1 ? 'ren' : ''}` : ''}</span>
            </div>
            {taxAmount > 0 && (
              <div className="flex justify-between text-on-surface-variant">
                <span>Tax ({taxRate}%)</span>
                <span>{cur}{taxAmount.toFixed(2)}</span>
              </div>
            )}
          </div>
        )}
        {grandTotal > 0 && (
          <div className="pt-4 border-t-2 border-dashed border-outline-variant/30">
            <div className="flex justify-between items-baseline">
              <span className="font-title-lg">Total</span>
              <span className="font-headline-md text-primary">{cur}{grandTotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-on-surface-variant mt-1">Includes all taxes</p>
          </div>
        )}
        <div className="p-4 bg-secondary/10 rounded-xl flex items-start gap-3">
          <span className="material-symbols-outlined text-secondary text-lg mt-0.5">payments</span>
          <div>
            <p className="font-label-md text-sm font-semibold text-secondary">Pay at Hotel</p>
            <p className="text-xs text-on-surface-variant mt-0.5">No payment required now. You pay on arrival.</p>
          </div>
        </div>
        {(hotel?.phone || hotel?.email) && (
          <div className="pt-2 border-t border-outline-variant/20 space-y-2">
            <p className="text-xs text-on-surface-variant uppercase tracking-wide font-semibold">Need help?</p>
            {hotel.phone && (
              <a href={`tel:${hotel.phone}`} className="flex items-center gap-2 text-sm text-primary hover:underline">
                <span className="material-symbols-outlined text-base">call</span>{hotel.phone}
              </a>
            )}
            {hotel.email && (
              <a href={`mailto:${hotel.email}`} className="flex items-center gap-2 text-sm text-primary hover:underline">
                <span className="material-symbols-outlined text-base">mail</span>{hotel.email}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-5 max-w-container-max mx-auto">
          <Link to="/" className="font-display-lg text-title-lg tracking-widest text-primary uppercase">SOLARIS TERRACE</Link>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-lg">lock</span>
            <span className="font-label-md text-[11px] hidden md:inline tracking-widest uppercase">Secure Booking</span>
          </div>
        </div>
      </nav>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 flex-grow w-full">
        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center w-full max-w-xl">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1.5">
                  <button
                    onClick={() => i < step ? goStep(i) : undefined}
                    disabled={i >= step}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      i < step ? 'bg-primary text-on-primary cursor-pointer' :
                      i === step ? 'bg-primary text-on-primary ring-4 ring-primary/20' :
                      'bg-surface-container-high text-on-surface-variant cursor-default opacity-50'
                    }`}
                  >
                    {i < step ? <span className="material-symbols-outlined text-base">check</span> : i + 1}
                  </button>
                  <span className={`text-[10px] font-medium uppercase tracking-wide hidden sm:block ${i === step ? 'text-primary' : 'text-on-surface-variant opacity-60'}`}>
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`h-px flex-1 mx-2 mb-5 transition-colors ${i < step ? 'bg-primary' : 'bg-outline-variant/40'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main content */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait" custom={dir}>

                {/* ── Step 0: Dates & Guests ── */}
                {step === 0 && (
                  <motion.div key="step0" custom={dir} variants={slideVariant} initial="enter" animate="center" exit="exit">
                    <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/20 p-8 md:p-10">
                      <h2 className="font-headline-md text-headline-md mb-8">Select Dates &amp; Guests</h2>

                      {/* Date pickers */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                        <div className="relative">
                          <label className="font-label-md text-[11px] uppercase tracking-wider text-on-surface-variant mb-2 block">Check-in</label>
                          <button
                            onClick={() => setCalendarOpen(calendarOpen === 'in' ? null : 'in')}
                            className="w-full flex items-center gap-3 bg-surface-container p-4 rounded-xl text-left hover:bg-surface-container-high transition-colors"
                          >
                            <span className="material-symbols-outlined text-primary">calendar_today</span>
                            <span className={checkIn ? 'font-medium' : 'text-on-surface-variant'}>
                              {checkIn ? format(checkIn, 'EEE, MMM d, yyyy') : 'Select date'}
                            </span>
                          </button>
                          {calendarOpen === 'in' && (
                            <div className="absolute top-full left-0 z-50 mt-2 bg-surface rounded-2xl shadow-xl border border-outline-variant/20 overflow-hidden">
                              <DayPicker
                                mode="single"
                                selected={checkIn}
                                onSelect={(d) => { setCheckIn(d); if (d && checkOut && !isBefore(d, checkOut)) setCheckOut(undefined); setCalendarOpen(null); }}
                                disabled={disabledDays}
                                startMonth={today}
                              />
                            </div>
                          )}
                        </div>
                        <div className="relative">
                          <label className="font-label-md text-[11px] uppercase tracking-wider text-on-surface-variant mb-2 block">Check-out</label>
                          <button
                            onClick={() => setCalendarOpen(calendarOpen === 'out' ? null : 'out')}
                            className="w-full flex items-center gap-3 bg-surface-container p-4 rounded-xl text-left hover:bg-surface-container-high transition-colors"
                          >
                            <span className="material-symbols-outlined text-primary">calendar_today</span>
                            <span className={checkOut ? 'font-medium' : 'text-on-surface-variant'}>
                              {checkOut ? format(checkOut, 'EEE, MMM d, yyyy') : 'Select date'}
                            </span>
                          </button>
                          {calendarOpen === 'out' && (
                            <div className="absolute top-full left-0 z-50 mt-2 bg-surface rounded-2xl shadow-xl border border-outline-variant/20 overflow-hidden">
                              <DayPicker
                                mode="single"
                                selected={checkOut}
                                onSelect={(d) => { setCheckOut(d); setCalendarOpen(null); }}
                                disabled={[...(checkIn ? [{ before: new Date(checkIn.getTime() + 86400000) }] : [{ before: today }]), ...allBlockedDates]}
                                startMonth={checkIn ?? today}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Guest steppers */}
                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <label className="font-label-md text-[11px] uppercase tracking-wider text-on-surface-variant mb-2 block">Adults</label>
                          <div className="flex items-center gap-4 bg-surface-container p-3 rounded-xl">
                            <button onClick={() => setAdults(a => Math.max(1, a - 1))} className="w-9 h-9 rounded-full bg-surface-container-high hover:bg-outline-variant/30 flex items-center justify-center font-bold text-lg transition-colors">−</button>
                            <span className="font-title-lg text-title-lg flex-1 text-center">{adults}</span>
                            <button onClick={() => setAdults(a => Math.min(8, a + 1))} className="w-9 h-9 rounded-full bg-surface-container-high hover:bg-outline-variant/30 flex items-center justify-center font-bold text-lg transition-colors">+</button>
                          </div>
                        </div>
                        <div>
                          <label className="font-label-md text-[11px] uppercase tracking-wider text-on-surface-variant mb-2 block">Children</label>
                          <div className="flex items-center gap-4 bg-surface-container p-3 rounded-xl">
                            <button onClick={() => setChildren(c => Math.max(0, c - 1))} className="w-9 h-9 rounded-full bg-surface-container-high hover:bg-outline-variant/30 flex items-center justify-center font-bold text-lg transition-colors">−</button>
                            <span className="font-title-lg text-title-lg flex-1 text-center">{children}</span>
                            <button onClick={() => setChildren(c => Math.min(4, c + 1))} className="w-9 h-9 rounded-full bg-surface-container-high hover:bg-outline-variant/30 flex items-center justify-center font-bold text-lg transition-colors">+</button>
                          </div>
                        </div>
                      </div>

                      {nights > 0 && (
                        <p className="mt-6 text-sm text-on-surface-variant">
                          <span className="material-symbols-outlined text-base align-middle mr-1">nights_stay</span>
                          {nights} night{nights > 1 ? 's' : ''} · {format(checkIn!, 'MMM d')} – {format(checkOut!, 'MMM d, yyyy')}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* ── Step 1: Room Selection ── */}
                {step === 1 && (
                  <motion.div key="step1" custom={dir} variants={slideVariant} initial="enter" animate="center" exit="exit">
                    <div className="space-y-4">
                      <h2 className="font-headline-md text-headline-md mb-4">Choose Your Room</h2>
                      {!eligibleRooms.length && (
                        <div className="bg-surface-container-lowest rounded-3xl p-10 text-center text-on-surface-variant">
                          No rooms available for {adults} guest{adults > 1 ? 's' : ''}.
                        </div>
                      )}
                      {eligibleRooms.map(room => {
                        const remaining = availMap.get(room.id);
                        const isUnavailable = nights > 0 && remaining !== undefined && remaining <= 0;
                        const nightlyPrice = checkIn ? getDayPrice(checkIn, room.id, room.base_price, room.weekend_price, overrides) : Number(room.base_price);
                        const totalForStay = checkIn && checkOut && nights > 0 ? calcRoomTotal(checkIn, checkOut, room.id, room.base_price, room.weekend_price, overrides) : null;
                        return (
                          <div
                            key={room.id}
                            onClick={() => !isUnavailable && setSelectedRoom(room.id)}
                            className={`group flex gap-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                              isUnavailable ? 'opacity-50 cursor-not-allowed border-outline-variant/20' :
                              selectedRoom === room.id ? 'border-primary shadow-lg' : 'border-outline-variant/20 hover:border-primary/50 hover:shadow-md'
                            }`}
                          >
                            <div className="w-28 sm:w-36 shrink-0 relative">
                              <img src={getRoomImg(room.name, room.image_url, room.images ?? [])} alt={room.name} className="w-full h-full object-cover" />
                              {remaining !== undefined && remaining <= 3 && remaining > 0 && (
                                <div className="absolute top-2 left-2 bg-primary text-on-primary text-[9px] font-bold px-2 py-0.5 rounded-full">
                                  {remaining} left
                                </div>
                              )}
                            </div>
                            <div className="flex-1 p-4 sm:p-5 bg-surface-container-lowest flex flex-col justify-between">
                              <div>
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <h3 className="font-title-lg text-title-lg">{room.name}</h3>
                                  {selectedRoom === room.id && (
                                    <span className="material-symbols-outlined text-primary text-xl shrink-0">check_circle</span>
                                  )}
                                </div>
                                <p className="text-on-surface-variant text-sm line-clamp-2 mb-2">
                                  {room.short_description || room.description || ''}
                                </p>
                                <div className="flex flex-wrap gap-2 text-xs text-on-surface-variant">
                                  {room.bed_type && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">bed</span>{room.bed_type} bed</span>}
                                  {room.room_size && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">straighten</span>{room.room_size}</span>}
                                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">group</span>Up to {room.max_guests}</span>
                                </div>
                              </div>
                              <div className="flex items-end justify-between mt-3">
                                <div>
                                  <span className="font-headline-md text-lg text-primary">{cur}{nightlyPrice.toFixed(0)}</span>
                                  <span className="text-on-surface-variant text-xs"> /night</span>
                                  {totalForStay && <p className="text-xs text-on-surface-variant">{cur}{totalForStay.toFixed(2)} total</p>}
                                </div>
                                {isUnavailable && <span className="text-xs text-error font-semibold">Unavailable</span>}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* ── Step 2: Guest Details ── */}
                {step === 2 && (
                  <motion.div key="step2" custom={dir} variants={slideVariant} initial="enter" animate="center" exit="exit">
                    <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/20 p-8 md:p-10">
                      <h2 className="font-headline-md text-headline-md mb-8">Your Details</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="font-label-md text-[11px] uppercase tracking-wider text-on-surface-variant block">First Name *</label>
                          <input {...register('firstName')} placeholder="Julianne" className="w-full bg-surface-container p-4 rounded-xl outline-none focus:ring-2 focus:ring-primary/40 transition-all" />
                          {errors.firstName && <p className="text-error text-xs">{errors.firstName.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="font-label-md text-[11px] uppercase tracking-wider text-on-surface-variant block">Last Name</label>
                          <input {...register('lastName')} placeholder="Moore" className="w-full bg-surface-container p-4 rounded-xl outline-none focus:ring-2 focus:ring-primary/40 transition-all" />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="font-label-md text-[11px] uppercase tracking-wider text-on-surface-variant block">Email Address *</label>
                          <input {...register('email')} type="email" placeholder="julianne@example.com" className="w-full bg-surface-container p-4 rounded-xl outline-none focus:ring-2 focus:ring-primary/40 transition-all" />
                          {errors.email && <p className="text-error text-xs">{errors.email.message}</p>}
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="font-label-md text-[11px] uppercase tracking-wider text-on-surface-variant block">Phone</label>
                          <input {...register('phone')} type="tel" placeholder="+1 555 000 0000" className="w-full bg-surface-container p-4 rounded-xl outline-none focus:ring-2 focus:ring-primary/40 transition-all" />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="font-label-md text-[11px] uppercase tracking-wider text-on-surface-variant block">Special Requests</label>
                          <textarea {...register('specialRequests')} rows={3} placeholder="Dietary requirements, early check-in, anniversary surprises..." className="w-full bg-surface-container p-4 rounded-xl outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 3: Confirm ── */}
                {step === 3 && (
                  <motion.div key="step3" custom={dir} variants={slideVariant} initial="enter" animate="center" exit="exit">
                    <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/20 p-8 md:p-10 space-y-8">
                      <h2 className="font-headline-md text-headline-md">Review Your Booking</h2>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-surface-container p-4 rounded-xl">
                            <p className="text-xs text-on-surface-variant uppercase tracking-wide mb-1">Check-in</p>
                            <p className="font-title-lg">{checkIn ? format(checkIn, 'EEE, MMM d') : '—'}</p>
                            <p className="text-xs text-on-surface-variant">After {hotel?.check_in_time ?? '14:00'}</p>
                          </div>
                          <div className="bg-surface-container p-4 rounded-xl">
                            <p className="text-xs text-on-surface-variant uppercase tracking-wide mb-1">Check-out</p>
                            <p className="font-title-lg">{checkOut ? format(checkOut, 'EEE, MMM d') : '—'}</p>
                            <p className="text-xs text-on-surface-variant">Before {hotel?.check_out_time ?? '11:00'}</p>
                          </div>
                        </div>
                        <div className="bg-surface-container p-4 rounded-xl flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                            <img src={selectedRoomData ? getRoomImg(selectedRoomData.name, selectedRoomData.image_url, selectedRoomData.images ?? []) : ''} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-title-lg">{selectedRoomData?.name}</p>
                            <p className="text-sm text-on-surface-variant">{adults} adult{adults > 1 ? 's' : ''}{children > 0 ? ` + ${children} child${children > 1 ? 'ren' : ''}` : ''} · {nights} night{nights > 1 ? 's' : ''}</p>
                          </div>
                        </div>
                        <div className="bg-surface-container p-4 rounded-xl space-y-1.5 text-sm">
                          <div className="flex justify-between">
                            <span className="text-on-surface-variant">Guest</span>
                            <span className="font-medium">{`${getValues('firstName')} ${getValues('lastName')}`.trim()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-on-surface-variant">Email</span>
                            <span>{getValues('email')}</span>
                          </div>
                          {getValues('phone') && (
                            <div className="flex justify-between">
                              <span className="text-on-surface-variant">Phone</span>
                              <span>{getValues('phone')}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Pay at Hotel */}
                      <div className="bg-secondary/10 border border-secondary/20 rounded-2xl p-6 flex items-start gap-4">
                        <span className="material-symbols-outlined text-secondary text-2xl mt-0.5">payments</span>
                        <div>
                          <h4 className="font-title-lg text-secondary mb-1">Pay at Hotel</h4>
                          <p className="text-sm text-on-surface-variant leading-relaxed">
                            No payment is required now. You pay on arrival at the hotel. Your reservation will be held pending confirmation from our team within a few hours.
                          </p>
                        </div>
                      </div>

                      {hotel?.cancellation_policy && (
                        <div className="bg-surface-container p-4 rounded-xl text-sm text-on-surface-variant">
                          <p className="font-semibold mb-1">Cancellation Policy</p>
                          <p>{hotel.cancellation_policy}</p>
                        </div>
                      )}

                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full py-4 bg-primary text-on-primary rounded-full font-title-lg text-title-lg shadow-lg hover:brightness-110 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Submitting Request...
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined">check_circle</span>
                            Confirm Booking · {cur}{grandTotal.toFixed(2)}
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            {step < 3 && (
              <div className="flex justify-between mt-6">
                <button
                  onClick={prevStep}
                  disabled={step === 0}
                  className="px-7 py-3 border-2 border-outline-variant text-on-surface rounded-full font-label-md disabled:opacity-40 hover:border-primary/50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="px-10 py-3 bg-on-surface text-surface rounded-full font-label-md hover:bg-primary transition-colors disabled:opacity-40 flex items-center gap-2"
                >
                  Continue
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            )}
            {step === 3 && (
              <div className="flex mt-6">
                <button onClick={prevStep} className="px-7 py-3 border-2 border-outline-variant text-on-surface rounded-full font-label-md hover:border-primary/50 transition-colors">
                  Back
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 sticky top-28">
            <Summary />
          </aside>
        </div>
      </main>

      {/* Mobile sticky price bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-surface border-t border-outline-variant/30 shadow-xl px-4 py-3 flex items-center justify-between gap-4">
        <div>
          {grandTotal > 0 ? (
            <>
              <p className="text-[10px] uppercase tracking-wider text-on-surface-variant">Total</p>
              <p className="font-headline-md text-lg text-primary">{cur}{grandTotal.toFixed(2)}</p>
            </>
          ) : (
            <p className="text-xs text-on-surface-variant">Step {step + 1} of {STEPS.length}</p>
          )}
        </div>
        <div className="flex gap-2">
          {step > 0 && (
            <button onClick={prevStep} className="h-11 w-11 border border-outline-variant rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          )}
          {step < 3 ? (
            <button onClick={nextStep} disabled={!canProceed()} className="h-11 px-7 bg-primary text-on-primary rounded-full font-label-md disabled:opacity-40 flex items-center gap-2">
              Continue <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={loading} className="h-11 px-7 bg-primary text-on-primary rounded-full font-label-md disabled:opacity-60 flex items-center gap-2">
              {loading ? 'Submitting...' : 'Confirm'}
            </button>
          )}
        </div>
      </div>
      <div className="lg:hidden h-20" />
    </div>
  );
}
