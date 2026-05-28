import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRooms, usePricingOverrides, useRoomAvailability } from '../hooks/useRooms';
import { useHotel } from '../hooks/useHotel';
import { getDayPrice, calcRoomTotal } from '../lib/pricing';
import { getCurrencySymbol } from '../lib/types';

const FALLBACK_IMGS: Record<string, string> = {
  standard: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
  deluxe: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
  suite: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
  presidential: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
  junior: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80',
};

function getRoomImg(name: string, imageUrl: string | null, images: string[]): string {
  if (images?.length) return images[0];
  if (imageUrl) return imageUrl;
  const lower = name.toLowerCase();
  for (const [k, v] of Object.entries(FALLBACK_IMGS)) if (lower.includes(k)) return v;
  return FALLBACK_IMGS.standard;
}

function SkeletonCard() {
  return (
    <div className="bg-surface-container-lowest rounded-3xl overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-surface-container-high" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-surface-container-high rounded w-2/3" />
        <div className="h-4 bg-surface-container-high rounded w-full" />
        <div className="h-4 bg-surface-container-high rounded w-3/4" />
        <div className="h-10 bg-surface-container-high rounded-full w-1/2 mt-4" />
      </div>
    </div>
  );
}

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function RoomsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Read URL params
  const checkinParam = searchParams.get('checkin');
  const checkoutParam = searchParams.get('checkout');
  const adultsParam = Math.max(1, parseInt(searchParams.get('adults') || '2'));
  const childrenParam = Math.max(0, parseInt(searchParams.get('children') || '0'));

  const checkIn = checkinParam ? new Date(checkinParam + 'T00:00:00') : undefined;
  const checkOut = checkoutParam ? new Date(checkoutParam + 'T00:00:00') : undefined;
  const nights = checkIn && checkOut ? Math.max(0, Math.round((checkOut.getTime() - checkIn.getTime()) / 86400000)) : 0;

  // Filters
  const [viewFilter, setViewFilter] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(500);
  const [sortBy, setSortBy] = useState<'popular' | 'price_asc' | 'price_desc'>('popular');
  const [showMap, setShowMap] = useState(false);

  const { data: hotel } = useHotel();
  const { data: rooms, isLoading } = useRooms();
  const { data: overrides = [] } = usePricingOverrides();
  const { data: availability = [] } = useRoomAvailability(checkIn, checkOut);

  const cur = getCurrencySymbol(hotel?.currency ?? 'EUR');

  const availMap = useMemo(() => {
    const m = new Map<string, number>();
    availability.forEach(a => m.set(a.room_type_id, a.remaining));
    return m;
  }, [availability]);

  const filteredRooms = useMemo(() => {
    if (!rooms) return [];
    let list = rooms.filter(r => r.max_guests >= adultsParam);

    if (viewFilter.length > 0) {
      list = list.filter(r => r.view_type && viewFilter.includes(r.view_type));
    }

    // Price filter based on base price
    list = list.filter(r => Number(r.base_price) <= priceMax);

    // Sort
    if (sortBy === 'popular') {
      list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (sortBy === 'price_asc') {
      list = [...list].sort((a, b) => Number(a.base_price) - Number(b.base_price));
    } else {
      list = [...list].sort((a, b) => Number(b.base_price) - Number(a.base_price));
    }

    return list;
  }, [rooms, adultsParam, viewFilter, priceMax, sortBy]);

  function buildBookingUrl(roomId: string) {
    const params = new URLSearchParams({ room: roomId });
    if (checkinParam) params.set('checkin', checkinParam);
    if (checkoutParam) params.set('checkout', checkoutParam);
    params.set('adults', String(adultsParam));
    params.set('children', String(childrenParam));
    return `/booking?${params.toString()}`;
  }

  function toggleView(v: string) {
    setViewFilter(f => f.includes(v) ? f.filter(x => x !== v) : [...f, v]);
  }

  const VIEW_OPTIONS = ['ocean', 'garden', 'city', 'pool'];

  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden custom-scrollbar">
      <Navbar />

      {/* Sticky sub-header */}
      <header className="sticky top-[72px] z-40 bg-surface-container-low border-b border-outline-variant/20 py-4 shadow-sm">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-wrap items-center justify-between gap-4">
          <div
            onClick={() => navigate(`/?edit=1`)}
            className="flex items-center gap-4 bg-surface-bright rounded-full px-6 py-2 border border-outline-variant/30 flex-grow max-w-xl cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 border-r border-outline-variant/30 pr-4">
              <span className="material-symbols-outlined text-primary text-lg">calendar_today</span>
              <span className="font-label-md text-label-md">
                {checkIn && checkOut ? `${format(checkIn, 'MMM d')} – ${format(checkOut, 'MMM d')}` : 'Select dates'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">group</span>
              <span className="font-label-md text-label-md">
                {adultsParam} Adult{adultsParam > 1 ? 's' : ''}{childrenParam > 0 ? `, ${childrenParam} Child${childrenParam > 1 ? 'ren' : ''}` : ''}
              </span>
            </div>
            <div className="ml-auto">
              <span className="material-symbols-outlined text-on-surface-variant">edit</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMap(v => !v)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-label-md text-label-md transition-colors ${showMap ? 'bg-tertiary text-on-tertiary' : 'bg-secondary text-on-secondary'}`}
            >
              <span className="material-symbols-outlined text-lg">{showMap ? 'list' : 'map'}</span>
              {showMap ? 'Show Suites' : 'Estate Map'}
            </button>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="bg-surface-bright border border-outline-variant/50 px-5 py-2.5 rounded-full font-label-md text-label-md hover:bg-surface-container-high transition-colors outline-none cursor-pointer"
            >
              <option value="popular">Sort: Popular</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 flex gap-10">
        {/* Sidebar */}
        <aside className="w-72 shrink-0 hidden lg:block">
          <div className="sticky top-48 space-y-10">
            {/* Price slider */}
            <div>
              <h3 className="font-title-lg text-title-lg text-on-surface mb-6">Nightly Rate</h3>
              <div className="px-2">
                <input
                  type="range"
                  min={50}
                  max={500}
                  step={10}
                  value={priceMax}
                  onChange={e => setPriceMax(parseInt(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between mt-2 font-label-md text-label-md text-on-surface-variant">
                  <span>{cur}50</span>
                  <span className="text-primary font-semibold">Up to {cur}{priceMax}</span>
                </div>
              </div>
            </div>

            {/* View type */}
            <div>
              <h3 className="font-title-lg text-title-lg text-on-surface mb-6">Room View</h3>
              <div className="space-y-3">
                {VIEW_OPTIONS.map(v => (
                  <label key={v} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={viewFilter.includes(v)}
                      onChange={() => toggleView(v)}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                    />
                    <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors capitalize">{v} View</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Listing */}
        <section className="flex-grow min-w-0">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
            <h1 className="font-headline-md text-headline-md text-on-surface">Available Rooms &amp; Suites</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
              {isLoading ? 'Loading availability...' : `${filteredRooms.length} room${filteredRooms.length !== 1 ? 's' : ''} available${checkIn && checkOut ? ` · ${nights} night${nights > 1 ? 's' : ''}` : ''}`}
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="text-center py-24">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant opacity-30 mb-4 block">bed</span>
              <h2 className="font-title-lg text-xl mb-2">No rooms match your criteria</h2>
              <p className="text-on-surface-variant mb-6">Try adjusting your filters or selecting different dates.</p>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-primary text-on-primary rounded-full font-label-md"
              >
                Change Dates
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredRooms.map((room, i) => {
                const remaining = availMap.get(room.id);
                const isUnavailable = nights > 0 && remaining !== undefined && remaining <= 0;
                const nightlyPrice = checkIn
                  ? getDayPrice(checkIn, room.id, room.base_price, room.weekend_price, overrides)
                  : Number(room.base_price);
                const totalForStay = checkIn && checkOut && nights > 0
                  ? calcRoomTotal(checkIn, checkOut, room.id, room.base_price, room.weekend_price, overrides)
                  : null;

                return (
                  <motion.article
                    key={room.id}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: i * 0.06 }}
                    className={`group relative bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${isUnavailable ? 'opacity-60' : ''}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={getRoomImg(room.name, room.image_url, room.images ?? [])}
                        alt={room.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <button className="absolute top-4 right-4 w-10 h-10 glass-effect rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">favorite</span>
                      </button>
                      <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                        {room.featured && (
                          <span className="font-label-md text-[10px] px-3 py-1 rounded-full bg-primary/90 text-on-primary backdrop-blur-md">FEATURED</span>
                        )}
                        {room.view_type && (
                          <span className="font-label-md text-[10px] px-3 py-1 rounded-full bg-secondary/90 text-on-secondary backdrop-blur-md capitalize">{room.view_type} VIEW</span>
                        )}
                        {remaining !== undefined && remaining <= 3 && remaining > 0 && (
                          <span className="font-label-md text-[10px] px-3 py-1 rounded-full bg-error text-white backdrop-blur-md">Only {remaining} left!</span>
                        )}
                        {isUnavailable && (
                          <span className="font-label-md text-[10px] px-3 py-1 rounded-full bg-surface/80 text-on-surface backdrop-blur-md">Unavailable</span>
                        )}
                      </div>
                    </div>

                    <div className="p-6 md:p-8">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="font-title-lg text-title-lg text-on-surface leading-tight">{room.name}</h2>
                      </div>

                      <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2">
                        {room.short_description || room.description || ''}
                      </p>

                      <div className="flex flex-wrap gap-3 mb-4 text-on-surface-variant text-xs">
                        {room.bed_type && (
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">bed</span>
                            <span className="capitalize">{room.bed_type} Bed</span>
                          </span>
                        )}
                        {room.room_size && (
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">straighten</span>
                            {room.room_size}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">group</span>
                          Up to {room.max_guests}
                        </span>
                      </div>

                      {room.amenities?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {room.amenities.slice(0, 4).map(a => (
                            <span key={a} className="text-[10px] px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant">{a}</span>
                          ))}
                          {room.amenities.length > 4 && (
                            <span className="text-[10px] px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant">+{room.amenities.length - 4} more</span>
                          )}
                        </div>
                      )}

                      <div className="flex justify-between items-center border-t border-outline-variant/20 pt-5">
                        <div>
                          <span className="font-body-md text-body-md text-on-surface-variant">Per night</span>
                          <div className="flex items-baseline gap-1">
                            <span className="font-headline-md text-headline-md text-primary">{cur}{nightlyPrice.toFixed(0)}</span>
                            {totalForStay && nights > 1 && (
                              <span className="font-body-md text-xs text-on-surface-variant">({cur}{totalForStay.toFixed(0)} total)</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/rooms/${room.id}${checkinParam ? `?checkin=${checkinParam}&checkout=${checkoutParam}&adults=${adultsParam}&children=${childrenParam}` : ''}`)}
                            className="border border-primary text-primary px-4 py-2.5 rounded-full font-label-md text-sm hover:bg-primary/10 transition-colors duration-300"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => !isUnavailable && navigate(buildBookingUrl(room.id))}
                            disabled={isUnavailable}
                            className="bg-on-surface text-surface px-5 py-2.5 rounded-full font-label-md text-sm hover:bg-primary transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
