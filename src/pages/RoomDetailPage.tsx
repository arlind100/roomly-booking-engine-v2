import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRoomById, useRooms, usePricingOverrides, useRoomAvailability } from '../hooks/useRooms';
import { useHotel } from '../hooks/useHotel';
import { calcRoomTotal, getDayPrice } from '../lib/pricing';
import { getCurrencySymbol } from '../lib/types';

const FALLBACK_IMGS = [
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=85',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=85',
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=85',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=85',
  'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=85',
];

const ROOM_FALLBACK_IMG: Record<string, string> = {
  standard: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
  deluxe: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80',
  suite: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80',
  presidential: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
};

function getRoomImg(name: string, imageUrl: string | null, images: string[]): string {
  if (images?.length) return images[0];
  if (imageUrl) return imageUrl;
  const lower = name.toLowerCase();
  for (const [k, v] of Object.entries(ROOM_FALLBACK_IMG)) if (lower.includes(k)) return v;
  return ROOM_FALLBACK_IMG.standard;
}

function SkeletonDetail() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-[380px] bg-surface-container-high rounded-3xl" />
      <div className="h-8 bg-surface-container-high rounded w-1/2" />
      <div className="h-4 bg-surface-container-high rounded w-3/4" />
    </div>
  );
}

export default function RoomDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const checkinParam = searchParams.get('checkin');
  const checkoutParam = searchParams.get('checkout');
  const adultsParam = Math.max(1, parseInt(searchParams.get('adults') || '2'));
  const childrenParam = Math.max(0, parseInt(searchParams.get('children') || '0'));

  const checkIn = checkinParam ? new Date(checkinParam + 'T00:00:00') : undefined;
  const checkOut = checkoutParam ? new Date(checkoutParam + 'T00:00:00') : undefined;
  const nights = checkIn && checkOut ? Math.max(0, Math.round((checkOut.getTime() - checkIn.getTime()) / 86400000)) : 0;

  const { data: room, isLoading } = useRoomById(id);
  const { data: allRooms = [] } = useRooms();
  const { data: hotel } = useHotel();
  const { data: overrides = [] } = usePricingOverrides();
  const { data: availability = [] } = useRoomAvailability(checkIn, checkOut);

  const cur = getCurrencySymbol(hotel?.currency ?? 'EUR');
  const roomAvail = availability.find(a => a.room_type_id === id);
  const remaining = roomAvail?.remaining;
  const isUnavailable = nights > 0 && remaining !== undefined && remaining <= 0;

  const nightlyPrice = room && checkIn
    ? getDayPrice(checkIn, room.id, room.base_price, room.weekend_price, overrides)
    : room ? Number(room.base_price) : 0;

  const totalForStay = room && checkIn && checkOut && nights > 0
    ? calcRoomTotal(checkIn, checkOut, room.id, room.base_price, room.weekend_price, overrides)
    : null;

  const taxRate = hotel?.tax_percentage ?? 0;
  const taxAmount = totalForStay && taxRate > 0 ? totalForStay * (taxRate / 100) : 0;
  const grandTotal = (totalForStay ?? 0) + taxAmount;

  const images = room?.images?.length ? room.images : FALLBACK_IMGS;

  // Related rooms = up to 3 other rooms from same hotel
  const relatedRooms = allRooms.filter(r => r.id !== id).slice(0, 3);

  function buildBookingUrl() {
    const params = new URLSearchParams({ room: id! });
    if (checkinParam) params.set('checkin', checkinParam);
    if (checkoutParam) params.set('checkout', checkoutParam);
    params.set('adults', String(adultsParam));
    params.set('children', String(childrenParam));
    return `/booking?${params.toString()}`;
  }

  if (isLoading) {
    return (
      <div className="bg-surface text-on-surface font-body-md">
        <Navbar />
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16"><SkeletonDetail /></div>
        <Footer />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-center py-24">
          <div>
            <span className="material-symbols-outlined text-6xl text-on-surface-variant opacity-30 block mb-4">bed</span>
            <h2 className="font-title-lg text-xl mb-4">Room not found</h2>
            <button onClick={() => navigate('/rooms')} className="px-8 py-3 bg-primary text-on-primary rounded-full font-label-md">Browse All Rooms</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface font-body-md custom-scrollbar">
      <Navbar />

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
        {/* Gallery mosaic */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-4 grid-rows-2 gap-3 h-[320px] md:h-[460px] rounded-3xl overflow-hidden mb-12"
        >
          <div className="col-span-2 row-span-2 overflow-hidden">
            <img src={images[0]} alt={room.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          {images.slice(1, 5).map((img, i) => (
            <div key={i} className="overflow-hidden">
              <img src={img} alt={`${room.name} view ${i + 2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left: room info */}
          <div className="lg:col-span-8 space-y-10">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex flex-wrap gap-2 mb-4">
                {room.featured && <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">Featured</span>}
                {room.view_type && <span className="bg-secondary/10 text-secondary text-xs font-semibold px-3 py-1 rounded-full capitalize">{room.view_type} View</span>}
                {room.bed_type && <span className="bg-surface-container-high text-on-surface-variant text-xs px-3 py-1 rounded-full capitalize">{room.bed_type} Bed</span>}
                {room.floor_level && <span className="bg-surface-container-high text-on-surface-variant text-xs px-3 py-1 rounded-full capitalize">{room.floor_level} Floor</span>}
              </div>
              <h1 className="font-display-lg text-headline-lg md:text-display-sm text-on-surface mb-4">{room.name}</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                {room.description || room.short_description || 'A beautifully appointed room at Solaris Terrace.'}
              </p>
            </motion.div>

            {/* Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: 'straighten', label: 'Room Size', value: room.room_size ?? 'N/A' },
                { icon: 'bed', label: 'Bed Type', value: room.bed_type ? room.bed_type.charAt(0).toUpperCase() + room.bed_type.slice(1) : 'N/A' },
                { icon: 'group', label: 'Max Guests', value: `${room.max_guests}` },
                { icon: 'landscape', label: 'View', value: room.view_type ? room.view_type.charAt(0).toUpperCase() + room.view_type.slice(1) : 'N/A' },
              ].map(s => (
                <div key={s.label} className="bg-surface-container p-4 rounded-2xl text-center">
                  <span className="material-symbols-outlined text-primary text-2xl block mb-1">{s.icon}</span>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wide">{s.label}</p>
                  <p className="font-title-lg text-sm mt-1">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Amenities */}
            {room.amenities?.length > 0 && (
              <div>
                <h2 className="font-headline-md text-headline-md mb-6">Suite Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {room.amenities.map(a => (
                    <div key={a} className="flex items-center gap-3 p-3 bg-surface-container rounded-xl">
                      <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                      <span className="font-body-md text-sm">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Policies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-surface-container rounded-2xl">
                <p className="text-xs text-on-surface-variant uppercase tracking-wide mb-1">Check-in</p>
                <p className="font-title-lg">After {hotel?.check_in_time ?? '14:00'}</p>
              </div>
              <div className="p-5 bg-surface-container rounded-2xl">
                <p className="text-xs text-on-surface-variant uppercase tracking-wide mb-1">Check-out</p>
                <p className="font-title-lg">Before {hotel?.check_out_time ?? '11:00'}</p>
              </div>
              <div className="p-5 bg-surface-container rounded-2xl flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant">{room.smoking ? 'smoking_rooms' : 'smoke_free'}</span>
                <p className="font-title-lg">{room.smoking ? 'Smoking Permitted' : 'Non-smoking'}</p>
              </div>
              <div className="p-5 bg-secondary/10 rounded-2xl flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">payments</span>
                <div>
                  <p className="font-title-lg text-sm text-secondary">Pay at Hotel</p>
                  <p className="text-xs text-on-surface-variant">No payment required now</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: booking widget */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28">
              <div className="bg-surface-container-lowest rounded-3xl shadow-xl border border-outline-variant/20 p-8 space-y-6">
                <div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-display-lg text-headline-lg text-primary">{cur}{nightlyPrice.toFixed(0)}</span>
                    <span className="font-body-md text-body-md text-on-surface-variant">/ night</span>
                  </div>
                  {remaining !== undefined && remaining <= 3 && remaining > 0 && (
                    <p className="text-xs font-semibold" style={{ color: 'var(--color-error, #b91c1c)' }}>Only {remaining} unit{remaining > 1 ? 's' : ''} left!</p>
                  )}
                </div>

                {checkIn && checkOut && nights > 0 ? (
                  <div className="bg-surface-container rounded-2xl divide-y divide-outline-variant/20 text-sm">
                    <div className="flex justify-between p-4">
                      <div>
                        <p className="text-xs text-on-surface-variant uppercase tracking-wide">Check-in</p>
                        <p className="font-medium">{format(checkIn, 'EEE, MMM d')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-on-surface-variant uppercase tracking-wide">Check-out</p>
                        <p className="font-medium">{format(checkOut, 'EEE, MMM d')}</p>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between text-on-surface-variant">
                        <span>{nights} night{nights > 1 ? 's' : ''}</span>
                        <span>{cur}{totalForStay?.toFixed(2)}</span>
                      </div>
                      {taxAmount > 0 && (
                        <div className="flex justify-between text-on-surface-variant">
                          <span>Tax ({taxRate}%)</span>
                          <span>{cur}{taxAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-semibold pt-2 border-t border-outline-variant/20">
                        <span>Total</span>
                        <span className="text-primary">{cur}{grandTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-surface-container rounded-2xl p-4 text-sm text-on-surface-variant text-center">
                    Select dates to see total price
                  </div>
                )}

                <button
                  onClick={() => !isUnavailable && navigate(buildBookingUrl())}
                  disabled={isUnavailable}
                  className="w-full py-4 bg-primary text-on-primary rounded-full font-title-lg hover:brightness-110 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUnavailable ? 'Not Available' : 'Book This Room'}
                </button>
                <p className="text-center text-xs text-on-surface-variant">Pay at hotel · No card required · Free to request</p>
              </div>
            </div>
          </aside>
        </div>

        {/* Related rooms — real data */}
        {relatedRooms.length > 0 && (
          <section className="mt-section-gap">
            <h2 className="font-headline-md text-headline-md mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedRooms.map(r => (
                <div
                  key={r.id}
                  onClick={() => navigate(`/rooms/${r.id}${checkinParam ? `?checkin=${checkinParam}&checkout=${checkoutParam}&adults=${adultsParam}&children=${childrenParam}` : ''}`)}
                  className="group cursor-pointer rounded-2xl overflow-hidden bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={getRoomImg(r.name, r.image_url, r.images ?? [])}
                      alt={r.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-title-lg">{r.name}</h3>
                    <p className="text-primary font-semibold mt-1">{cur}{Number(r.base_price).toFixed(0)} <span className="text-on-surface-variant font-normal text-sm">/night</span></p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
