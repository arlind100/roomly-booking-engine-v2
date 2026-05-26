import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ROOMS = [
  {
    id: '1',
    name: 'The Horizon Sanctuary',
    description: 'Our most prestigious sanctuary, perched at the estate\'s peak with 270-degree views of the Mediterranean.',
    price: 2850,
    rating: '5.0',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
    badges: [{ label: 'SIGNATURE SUITE', color: 'bg-primary/90 text-on-primary' }, { label: 'CLIFFSIDE', color: 'bg-secondary/90 text-on-secondary' }],
    amenities: [{ icon: 'pool', label: 'Infinity Pool' }, { icon: 'concierge', label: 'Personal Butler' }],
  },
  {
    id: '2',
    name: 'Azure Terrace Suite',
    description: 'A masterfully appointed suite featuring a private lemon-scented garden and sun-drenched stone patio.',
    price: 1150,
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    badges: [{ label: 'GARDEN LEVEL', color: 'bg-tertiary-container text-on-tertiary-container' }],
    amenities: [{ icon: 'deck', label: 'Private Terrace' }, { icon: 'eco', label: 'Zen Garden' }],
  },
  {
    id: '3',
    name: 'Monastero Royal Suite',
    description: 'Preserving the estate\'s historic architecture with vaulted stone ceilings and hand-carved furnishings.',
    price: 1950,
    rating: '5.0',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
    badges: [],
    amenities: [{ icon: 'fireplace', label: 'Heritage Fireplace' }, { icon: 'history', label: 'Historic' }],
  },
  {
    id: '4',
    name: 'Artisan Sea-View Loft',
    description: 'A contemporary two-story loft featuring floor-to-ceiling windows and curated local Italian art.',
    price: 920,
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    badges: [],
    amenities: [{ icon: 'palette', label: 'Curated Art' }, { icon: 'stairs', label: 'Duplex Layout' }],
  },
];

const AMENITY_OPTIONS = ['Private Infinity Pool', 'Outdoor Rainfall Shower', 'Butler Service', 'In-Suite Wellness Kit'];
const VIEW_OPTIONS = ['Panoramic Sea View', 'Garden & Terrace', 'Cliffside Horizon'];

export default function RoomsPage() {
  const navigate = useNavigate();
  const [selectedViews, setSelectedViews] = useState<string[]>(['Panoramic Sea View']);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('Popular');

  const toggleView = (v: string) =>
    setSelectedViews(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);
  const toggleAmenity = (a: string) =>
    setSelectedAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden custom-scrollbar">
      <Navbar />

      {/* Sticky sub-header */}
      <header className="sticky top-[88px] z-40 bg-surface-container-low border-b border-outline-variant/20 py-4 shadow-sm">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 bg-surface-bright rounded-full px-6 py-2 border border-outline-variant/30 flex-grow max-w-xl cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/booking')}>
            <div className="flex items-center gap-2 border-r border-outline-variant/30 pr-4">
              <span className="material-symbols-outlined text-primary text-lg">calendar_today</span>
              <span className="font-label-md text-label-md">Select Dates</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">group</span>
              <span className="font-label-md text-label-md">2 Guests</span>
            </div>
            <div className="ml-auto">
              <span className="material-symbols-outlined text-on-surface-variant">edit</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-secondary text-on-secondary px-5 py-2.5 rounded-full font-label-md text-label-md hover:opacity-90 transition-opacity cursor-pointer">
              <span className="material-symbols-outlined text-lg">map</span>
              Estate Map
            </button>
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="flex items-center gap-2 bg-surface-bright border border-outline-variant/50 px-5 py-2.5 rounded-full font-label-md text-label-md hover:bg-surface-container-high transition-colors appearance-none pr-10 outline-none cursor-pointer"
              >
                <option>Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
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

            {/* Price Range */}
            <div>
              <h3 className="font-title-lg text-title-lg text-on-surface mb-6">Price Range</h3>
              <div className="px-2">
                <div className="h-1 bg-outline-variant/30 rounded-full relative">
                  <div className="absolute left-1/4 right-1/4 h-1 bg-primary rounded-full" />
                  <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-surface shadow-sm cursor-pointer" />
                  <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-surface shadow-sm cursor-pointer" />
                </div>
                <div className="flex justify-between mt-4 font-label-md text-label-md text-on-surface-variant">
                  <span>$600</span>
                  <span>$4,500+</span>
                </div>
              </div>
            </div>

            {/* Suite Views */}
            <div>
              <h3 className="font-title-lg text-title-lg text-on-surface mb-6">Suite Views</h3>
              <div className="space-y-3">
                {VIEW_OPTIONS.map(v => (
                  <label key={v} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedViews.includes(v)}
                      onChange={() => toggleView(v)}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary accent-primary"
                    />
                    <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">{v}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Signature Amenities */}
            <div>
              <h3 className="font-title-lg text-title-lg text-on-surface mb-6">Signature Amenities</h3>
              <div className="space-y-3">
                {AMENITY_OPTIONS.map(a => (
                  <label key={a} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(a)}
                      onChange={() => toggleAmenity(a)}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary accent-primary"
                    />
                    <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">{a}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Suite grid */}
        <section className="flex-grow">
          <div className="mb-10">
            <h1 className="font-headline-md text-headline-md text-on-surface">Available Sanctuaries &amp; Suites</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Discover {ROOMS.length} bespoke spaces within the Solaris Terrace estate</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ROOMS.map((room, i) => (
              <motion.article
                key={room.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <button className="absolute top-4 right-4 w-10 h-10 glass-panel rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                  {room.badges.length > 0 && (
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {room.badges.map(b => (
                        <span key={b.label} className={`${b.color} font-label-md text-[10px] px-3 py-1 rounded-full backdrop-blur-md`}>{b.label}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="font-title-lg text-title-lg text-on-surface leading-tight">{room.name}</h2>
                    <div className="flex items-center gap-1 bg-surface-container-high px-2 py-1 rounded-lg shrink-0 ml-2">
                      <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="font-label-md text-label-md">{room.rating}</span>
                    </div>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-2">{room.description}</p>

                  <div className="flex items-center gap-6 mb-8 text-on-surface-variant">
                    {room.amenities.map(a => (
                      <div key={a.icon} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">{a.icon}</span>
                        <span className="font-label-md text-[12px]">{a.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center border-t border-outline-variant/20 pt-6">
                    <div>
                      <span className="font-body-md text-body-md text-on-surface-variant">Per evening</span>
                      <div className="font-headline-md text-headline-md text-primary">
                        ${room.price.toLocaleString()}<span className="font-body-md text-body-md text-on-surface-variant font-normal"> / stay</span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/rooms/${room.id}`)}
                      className="bg-on-surface text-surface px-6 py-3 rounded-full font-label-md text-label-md hover:bg-primary transition-colors duration-300 cursor-pointer"
                    >
                      Explore Room
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <button className="bg-surface border-2 border-primary text-primary px-12 py-4 rounded-full font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all duration-300 cursor-pointer">
              Discover More Sanctuaries
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
