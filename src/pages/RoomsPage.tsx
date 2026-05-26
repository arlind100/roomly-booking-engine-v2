import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase, HOTEL_ID } from '../lib/supabase';

interface RoomType {
  id: string;
  name: string;
  description: string;
  base_price: number;
  max_guests: number;
  image_url?: string;
  amenities?: string[];
  available_units?: number;
}

const AMENITY_OPTIONS = ['Private Pool', 'Ocean View', 'Butler Service', 'Terrace', 'Spa Access', 'Kitchen'];

export default function RoomsPage() {
  const navigate = useNavigate();
  const [guestFilter, setGuestFilter] = useState(1);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'popular'>('popular');

  const { data: rooms = [], isLoading } = useQuery<RoomType[]>({
    queryKey: ['room_types', HOTEL_ID],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('room_types')
        .select('id, name, description, base_price, max_guests, image_url, amenities, available_units')
        .eq('hotel_id', HOTEL_ID)
        .eq('show_on_website', true)
        .order('base_price', { ascending: true });
      if (error) throw error;
      return data as RoomType[];
    },
  });

  const filteredRooms = useMemo(() => {
    let result = rooms.filter(r => r.max_guests >= guestFilter);
    if (selectedAmenities.length > 0) {
      result = result.filter(r =>
        selectedAmenities.every(a => r.amenities?.some(ra => ra.toLowerCase().includes(a.toLowerCase())))
      );
    }
    if (sortBy === 'price_asc') result = [...result].sort((a, b) => a.base_price - b.base_price);
    if (sortBy === 'price_desc') result = [...result].sort((a, b) => b.base_price - a.base_price);
    return result;
  }, [rooms, guestFilter, selectedAmenities, sortBy]);

  const toggleAmenity = (a: string) =>
    setSelectedAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  return (
    <div className="bg-surface text-on-surface custom-scrollbar overflow-x-hidden">
      <Navbar />

      {/* Sticky sub-header */}
      <header className="sticky top-[80px] z-40 bg-surface-container-low border-b border-outline-variant/20 py-4 shadow-sm">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 bg-surface-bright rounded-full px-6 py-2 border border-outline-variant/30 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 border-r border-outline-variant/30 pr-4">
              <span className="material-symbols-outlined text-primary text-lg">group</span>
              <span className="font-label-md text-label-md">{guestFilter} {guestFilter === 1 ? 'Guest' : 'Guests'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">tune</span>
              <span className="font-label-md text-label-md">{filteredRooms.length} Suites</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as typeof sortBy)}
                className="flex items-center gap-2 bg-surface-bright border border-outline-variant/50 px-5 py-2.5 rounded-full font-label-md text-label-md hover:bg-surface-container-high transition-colors appearance-none pr-10 outline-none cursor-pointer"
              >
                <option value="popular">Sort: Popular</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-lg pointer-events-none">expand_more</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 flex gap-10">
        {/* Sidebar filters */}
        <aside className="w-72 shrink-0 hidden lg:block">
          <div className="sticky top-48 space-y-10">
            <div>
              <h3 className="font-title-lg text-title-lg text-on-surface mb-6">Guests</h3>
              <div className="flex gap-2 flex-wrap">
                {[1,2,3,4,5,6].map(n => (
                  <button
                    key={n}
                    onClick={() => setGuestFilter(n)}
                    className={`w-10 h-10 rounded-full font-label-md text-label-md border transition-all ${guestFilter === n ? 'bg-primary text-on-primary border-primary' : 'border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-title-lg text-title-lg text-on-surface mb-6">Signature Amenities</h3>
              <div className="space-y-3">
                {AMENITY_OPTIONS.map(a => (
                  <label key={a} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(a)}
                      onChange={() => toggleAmenity(a)}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                    />
                    <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">{a}</span>
                  </label>
                ))}
              </div>
            </div>

            {selectedAmenities.length > 0 && (
              <button
                onClick={() => setSelectedAmenities([])}
                className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </aside>

        {/* Suite grid */}
        <section className="flex-grow">
          <div className="mb-10">
            <h1 className="font-headline-md text-headline-md text-on-surface">Available Sanctuaries &amp; Suites</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
              {isLoading ? 'Loading suites…' : `Discover ${filteredRooms.length} bespoke spaces within the Solaris Terrace estate`}
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-surface-container-lowest rounded-3xl overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-surface-container-high" />
                  <div className="p-8 space-y-4">
                    <div className="h-5 bg-surface-container-high rounded w-3/4" />
                    <div className="h-4 bg-surface-container-high rounded w-full" />
                    <div className="h-4 bg-surface-container-high rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="text-center py-24">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 block mb-4">search_off</span>
              <p className="font-body-lg text-body-lg text-on-surface-variant">No suites match your current filters.</p>
              <button onClick={() => { setGuestFilter(1); setSelectedAmenities([]); }} className="mt-6 text-primary font-label-md text-label-md hover:underline">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredRooms.map((room, i) => (
                <motion.article
                  key={room.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group relative bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {room.image_url ? (
                      <img
                        src={room.image_url}
                        alt={room.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                        <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">hotel</span>
                      </div>
                    )}
                    <button className="absolute top-4 right-4 w-10 h-10 glass-panel rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">favorite</span>
                    </button>
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <span className="bg-primary/90 text-on-primary font-label-md text-[10px] px-3 py-1 rounded-full backdrop-blur-md uppercase">Suite</span>
                      {room.max_guests >= 4 && (
                        <span className="bg-secondary/90 text-on-secondary font-label-md text-[10px] px-3 py-1 rounded-full backdrop-blur-md">Family</span>
                      )}
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="font-title-lg text-title-lg text-on-surface leading-tight">{room.name}</h2>
                      <div className="flex items-center gap-1 bg-surface-container-high px-2 py-1 rounded-lg shrink-0 ml-2">
                        <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="font-label-md text-label-md">5.0</span>
                      </div>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-2">{room.description}</p>

                    <div className="flex items-center gap-6 mb-8 text-on-surface-variant">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">group</span>
                        <span className="font-label-md text-[12px]">Up to {room.max_guests}</span>
                      </div>
                      {room.amenities?.slice(0, 1).map(a => (
                        <div key={a} className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-lg">check_circle</span>
                          <span className="font-label-md text-[12px]">{a}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center border-t border-outline-variant/20 pt-6">
                      <div>
                        <span className="font-body-md text-body-md text-on-surface-variant">Per evening</span>
                        <div className="font-headline-md text-headline-md text-primary">
                          ${room.base_price.toLocaleString()}<span className="font-body-md text-body-md text-on-surface-variant font-normal"> / night</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/rooms/${room.id}`)}
                          className="bg-surface-container text-on-surface px-5 py-2.5 rounded-full font-label-md text-label-md hover:bg-surface-container-high transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => navigate(`/booking?room=${room.id}`)}
                          className="bg-on-surface text-surface px-6 py-3 rounded-full font-label-md text-label-md hover:bg-primary transition-colors duration-300"
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
