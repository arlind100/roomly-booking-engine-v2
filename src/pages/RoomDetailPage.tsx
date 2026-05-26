import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format, differenceInDays } from 'date-fns';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase, HOTEL_ID } from '../lib/supabase';

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

const REVIEWS = [
  {
    name: 'Alexandra V.',
    date: 'October 2024 • Verified Stay',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw1m0ZdHCghemhIC_xqyjDCOG__vUYvL0NhCUV13mVFWur8DnKI81rLFH33foTGsS81TCQr2llOng6oKLe3xtF389wNa5j6PKeEkMQBfJbhYF9X7aGky9PMIsUdkrkwXSTpiw3WdYGPHJFgL4MyJ7V4r3Glv2WpeDrRHBpM5sL4fZBz2qJ2n0fpiKPMAoizJMOTkmBUM9Z4-AE9vewwJE1sZIY5li8rZrhtIRR8pNlxz7r03IiDm7fPZ_tngPx2BmtGAfKcMrjaOAL',
    quote: '"The attention to detail at Solaris Terrace is simply breathtaking. The way the morning light filters through the oak shutters into the living space makes you feel like you\'re living inside a painting."',
  },
  {
    name: 'Marcus Cheng',
    date: 'September 2024 • Verified Stay',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWpH68huk62UujoeyTxSsfc1YHmk46oQRPuZAlY0qMDAAQjqW7p4a9UKjVwjYdWAPVoa6VFvGLZLaKCfkDfE2vCO4TawaWDm1wmfO8bM58NVLe-hXz8Gb865R5v7xh70g3lgSDkEx8xBIsxq0gEefJ5V_R1XQdwk1g3mLOqOEHrbaqofFl7_B0XxkYF2-XKir36VwJdCsBmCynGpBagxqZNO2FDnvirQabQXlUzcmTseN80wkVniN8dum81KihoHKVb6IvfGzfmnm-',
    quote: '"Unrivaled service. The private chef prepared a local seafood feast that was the highlight of our entire trip. The infinity pool at sunset is a religious experience."',
  },
  {
    name: 'Sasha Thorne',
    date: 'August 2024 • Verified Stay',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo5DWcIItOfzksWq-As250087Dw0JvUoyJ36G6fwY1ytwyWAL7i5H3cnhFmqft4kDsxI52amvyCAVGmWwBQDBDMwv92g7kAZ2ohVk_6Sikx6KFhhnqSXD7RWpnFj6ZqvWD1Qsrr67TbNDEH_8pBHkiYXUjfILGYmi7PQ1bk5UyaAO6vGOeNHrunQITbdcZwgFRz7rHxHpxdZ6swi3uhxBS_nfI45NW4Y-oVKizFPMqaz6dzjaQMXmmUFtVK0gAVcuuyVaN2rOb0q95',
    quote: '"The soft minimalism here is perfect. It\'s not cold or sterile, but warm and inviting. Best night of sleep I\'ve had in years on that grand king bed."',
  },
];

const AMENITY_ICONS: Record<string, string> = {
  pool: 'pool', spa: 'spa', kitchen: 'skillet', wifi: 'wifi', tv: 'connected_tv',
  butler: 'concierge', terrace: 'deck', view: 'landscape', gym: 'fitness_center',
};

function getIcon(amenity: string) {
  const lower = amenity.toLowerCase();
  for (const [key, icon] of Object.entries(AMENITY_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return 'check_circle';
}

export default function RoomDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const { data: room, isLoading } = useQuery<RoomType>({
    queryKey: ['room_detail', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('room_types')
        .select('id, name, description, base_price, weekend_price, max_guests, image_url, room_size, amenities, available_units')
        .eq('id', id!)
        .single();
      if (error) throw error;
      return data as RoomType;
    },
    enabled: !!id,
  });

  const { data: relatedRooms = [] } = useQuery<RoomType[]>({
    queryKey: ['room_types_related', HOTEL_ID, id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('room_types')
        .select('id, name, base_price, image_url')
        .eq('hotel_id', HOTEL_ID)
        .eq('show_on_website', true)
        .neq('id', id!)
        .limit(3);
      if (error) throw error;
      return data as RoomType[];
    },
    enabled: !!id,
  });

  const nights = checkIn && checkOut ? Math.max(0, differenceInDays(new Date(checkOut), new Date(checkIn))) : 0;
  const totalPrice = room ? nights * room.base_price : 0;

  const handleBook = () => {
    const params = new URLSearchParams({ room: id! });
    if (checkIn) params.set('checkin', checkIn);
    if (checkOut) params.set('checkout', checkOut);
    params.set('guests', guests);
    navigate(`/booking?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <Navbar />
        <div className="pt-24 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="mosaic-grid animate-pulse mt-8">
            <div className="mosaic-large bg-surface-container-high rounded-xl" />
            <div className="bg-surface-container-high rounded-xl" />
            <div className="bg-surface-container-high rounded-xl" />
            <div className="bg-surface-container-high rounded-xl" />
            <div className="bg-surface-container-high rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <Navbar />
        <div className="text-center pt-24">
          <p className="font-body-lg text-on-surface-variant">Suite not found.</p>
          <button onClick={() => navigate('/rooms')} className="mt-6 text-primary font-label-md">← Back to Suites</button>
        </div>
      </div>
    );
  }

  const galleryImages = [
    room.image_url,
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD9JXykOMGmGCYH_EPLSu2OMxv8onxWZD4WyZqt3Y6Ym3vEtbpTA8gLkdW7jVC4lyc68TAVusBtNArgDa778pC3eenVukscz2bB4M2JBZM6OEVgRkD0uI4Gwf22FjgiE7-_PfV-AYlih3j1V1dN834bgaFTTCh6cILKnSuyiNoZrh81sNcPYO57i1picBYq8F6gbX0aTvCXIUEvSwH1czaf636cPYY-ivIUgx4r7_jfnoE4Htgh1dozNkidiKM4nDXCY21H1Z4QUs1M',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAgv0szHZYPWQn68N8CkAbabtykA4Pe_pDU9o_MB1waUUNRR0le7RAkubvPf2-XRASvdOjJfLAnlMnTcaH2OeyaRcR7_FgZrz48Vh3ATsckmb_i6mGJ2nZs3WdZJdWN6pSPc-sjYrs1NkFc9tGnzIKupiSm_UgQaFH_pJIgwVvnYBLsh4_jlfMYhtapbDeMu0lquxhxKAw16BViqqg6ASHwI-J64cbvvx4dNCc6hcf0KpYCy9CNvWQbKU8r0L7g4RYEjzzkTa_ym3jr',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDUot2M5HLcOZmvaPzvgEqEd88w8ZVCtAxUH3LpW8qZE66pwynoC41WjgILAC8P1OTDhR8KMbNLFcOzN9Vn5T3G4R8kRmVuLi8WbqLhO8wFNgSLyOd2FTpJMlUWyg6XDqGC4vPl0fHkVpBbWYrDi_I',
  ].filter(Boolean) as string[];

  return (
    <div className="bg-background text-on-background custom-scrollbar">
      <Navbar />

      <main className="pt-24 pb-section-gap">
        {/* Mosaic gallery */}
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-8">
          <div className="mosaic-grid">
            <div className="mosaic-large relative overflow-hidden rounded-xl group">
              <img src={galleryImages[0]} alt={room.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            {galleryImages.slice(1, 4).map((img, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl group">
                <img src={img} alt={`${room.name} ${i + 2}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            ))}
            <div className="relative overflow-hidden rounded-xl group bg-surface-container-high flex items-center justify-center cursor-pointer">
              <img src={galleryImages[0]} alt="More photos" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              <span className="relative font-label-md text-label-md text-on-surface z-10 uppercase tracking-widest">+ More Photos</span>
            </div>
          </div>
        </div>

        {/* Content + Sidebar */}
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-section-gap grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left: Suite details */}
          <div className="lg:col-span-8">
            <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-secondary/10 text-secondary px-4 py-1 rounded-full font-label-md text-label-md uppercase tracking-wider">Premium Suite</span>
                <div className="flex items-center text-tertiary">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-label-md text-label-md ml-1">4.9 (124 Reviews)</span>
                </div>
              </div>
              <h1 className="font-headline-lg text-headline-lg mb-6">{room.name}</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">{room.description}</p>
            </motion.header>

            {/* Specs grid */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 border-y border-outline-variant/30 mb-12">
              {room.room_size && (
                <div className="flex flex-col gap-2">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase opacity-60">Living Space</span>
                  <span className="font-title-lg text-title-lg">{room.room_size}</span>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase opacity-60">Bed Type</span>
                <span className="font-title-lg text-title-lg">Grand King</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase opacity-60">Occupancy</span>
                <span className="font-title-lg text-title-lg">Up to {room.max_guests}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase opacity-60">View</span>
                <span className="font-title-lg text-title-lg">Panoramic Sea</span>
              </div>
            </section>

            {/* Heritage */}
            <section className="mb-12">
              <h2 className="font-headline-md text-headline-md mb-8">Heritage &amp; Design</h2>
              <div className="space-y-6 text-on-surface-variant font-body-md text-body-md leading-relaxed">
                <p>Designed by renowned architect Elena Rossi, the suite is a dialogue between traditional Mediterranean materiality and soft minimalism. Each piece of furniture has been hand-selected or custom-crafted by local artisans using reclaimed oak, terracotta, and hand-woven linens.</p>
                <p>The space is defined by its "Gallery" feel — vast white surfaces acting as a canvas for the changing light throughout the day. From the sun-drenched optimism of high-noon to the deep ocean blues of the blue hour, this suite adapts to your rhythm.</p>
              </div>
            </section>

            {/* Amenities */}
            {room.amenities && room.amenities.length > 0 && (
              <section className="mb-12">
                <h2 className="font-headline-md text-headline-md mb-8">Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {room.amenities.map(a => (
                    <div key={a} className="flex items-start gap-4">
                      <div className="bg-surface-container-high p-4 rounded-xl">
                        <span className="material-symbols-outlined text-secondary">{getIcon(a)}</span>
                      </div>
                      <div>
                        <h4 className="font-title-lg text-title-lg mb-1">{a}</h4>
                        <p className="text-on-surface-variant text-sm">Included with your stay.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right: Sticky booking widget */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32 bg-surface-container-lowest p-8 rounded-[24px] shadow-lg border border-outline-variant/10">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <span className="font-headline-md text-headline-md text-primary">${room.base_price.toLocaleString()}</span>
                  <span className="text-on-surface-variant font-label-md text-label-md uppercase tracking-tight ml-1">/ Night</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-surface p-4 rounded-xl border border-outline-variant/20 focus-within:border-secondary transition-all">
                  <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-2">Check-in</label>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-on-surface-variant">calendar_today</span>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={e => setCheckIn(e.target.value)}
                      min={format(new Date(), 'yyyy-MM-dd')}
                      className="bg-transparent border-none p-0 focus:ring-0 w-full font-body-md outline-none"
                    />
                  </div>
                </div>
                <div className="bg-surface p-4 rounded-xl border border-outline-variant/20 focus-within:border-secondary transition-all">
                  <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-2">Check-out</label>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-on-surface-variant">calendar_today</span>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={e => setCheckOut(e.target.value)}
                      min={checkIn || format(new Date(), 'yyyy-MM-dd')}
                      className="bg-transparent border-none p-0 focus:ring-0 w-full font-body-md outline-none"
                    />
                  </div>
                </div>
                <div className="bg-surface p-4 rounded-xl border border-outline-variant/20 focus-within:border-secondary transition-all">
                  <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-2">Guests</label>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-on-surface-variant">group</span>
                    <select
                      value={guests}
                      onChange={e => setGuests(e.target.value)}
                      className="bg-transparent border-none p-0 focus:ring-0 w-full font-body-md appearance-none outline-none"
                    >
                      {Array.from({ length: room.max_guests }, (_, i) => i + 1).map(n => (
                        <option key={n} value={String(n)}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {nights > 0 && (
                <div className="space-y-3 mb-8 py-6 border-t border-outline-variant/20">
                  <div className="flex justify-between font-body-md text-on-surface-variant">
                    <span>${room.base_price.toLocaleString()} × {nights} night{nights > 1 ? 's' : ''}</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-title-lg text-title-lg pt-4">
                    <span>Total</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleBook}
                className="w-full bg-primary text-on-primary py-4 rounded-full font-title-lg text-title-lg hover:bg-primary-container transition-all shadow-md active:scale-95"
              >
                {nights > 0 ? 'Book This Suite' : 'Check Availability'}
              </button>
              <p className="text-center text-on-surface-variant text-xs mt-4">You won't be charged yet</p>
            </div>
          </div>
        </div>

        {/* Guest Reviews */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-section-gap">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-headline-md text-headline-md mb-2">Guest Experiences</h2>
              <p className="text-on-surface-variant">Verified stories from our global community.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {REVIEWS.map(r => (
              <div key={r.name} className="bg-surface-container-low p-8 rounded-2xl flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-title-lg text-title-lg">{r.name}</h4>
                    <span className="text-on-surface-variant text-sm">{r.date}</span>
                  </div>
                </div>
                <div className="flex gap-1 text-tertiary mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="text-on-surface-variant italic mb-6 flex-grow">{r.quote}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related suites */}
        {relatedRooms.length > 0 && (
          <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-section-gap">
            <h2 className="font-headline-md text-headline-md mb-12">Discover Other Suites</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedRooms.map(r => (
                <button key={r.id} onClick={() => navigate(`/rooms/${r.id}`)} className="group text-left">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6">
                    {r.image_url ? (
                      <img src={r.image_url} alt={r.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full bg-surface-container-high" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <span className="font-label-md text-label-md uppercase tracking-widest opacity-80 mb-2 block">Solaris Terrace</span>
                      <h3 className="font-headline-md text-2xl mb-1">{r.name}</h3>
                      <p className="font-body-md text-body-md opacity-90">${r.base_price.toLocaleString()} / Night</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
