import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SUITES = [
  {
    id: 'horizon-sanctuary',
    name: 'The Horizon Sanctuary',
    desc: 'Our most prestigious sanctuary, perched at the estate\'s peak with 270-degree views of the Mediterranean.',
    price: 2850,
    rating: 5.0,
    tags: ['SIGNATURE', 'CLIFFSIDE'],
    tagColors: ['bg-primary/90 text-on-primary', 'bg-secondary/90 text-on-secondary'],
    amenities: [{ icon: 'pool', label: 'Infinity Pool' }, { icon: 'concierge', label: 'Personal Butler' }],
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=85&fit=crop',
  },
  {
    id: 'azure-suite',
    name: 'Azure Terrace Suite',
    desc: 'A masterfully appointed suite featuring a private lemon-scented garden and sun-drenched stone patio.',
    price: 1150,
    rating: 4.9,
    tags: ['GARDEN WING'],
    tagColors: ['bg-tertiary-container text-on-tertiary-container'],
    amenities: [{ icon: 'deck', label: 'Private Terrace' }, { icon: 'eco', label: 'Zen Garden' }],
    img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=85&fit=crop',
  },
  {
    id: 'monastero-royal',
    name: 'Monastero Royal Suite',
    desc: 'Preserving the estate\'s historic architecture with vaulted stone ceilings and hand-carved furnishings.',
    price: 1950,
    rating: 5.0,
    tags: ['HISTORIC WING'],
    tagColors: ['bg-surface-variant/90 text-on-surface-variant'],
    amenities: [{ icon: 'fireplace', label: 'Heritage Fireplace' }, { icon: 'history', label: 'Historic' }],
    img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=85&fit=crop',
  },
  {
    id: 'artisan-loft',
    name: 'Artisan Sea-View Loft',
    desc: 'A contemporary two-story loft featuring floor-to-ceiling windows and curated local Italian art.',
    price: 920,
    rating: 4.8,
    tags: ['LOFT COLLECTION'],
    tagColors: ['bg-surface-variant/90 text-on-surface-variant'],
    amenities: [{ icon: 'palette', label: 'Curated Art' }, { icon: 'stairs', label: 'Duplex Layout' }],
    img: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&q=85&fit=crop',
  },
  {
    id: 'cliffside-villa',
    name: 'Cliffside Panorama Villa',
    desc: 'An expansive private villa with a dedicated plunge pool and butler cottage overlooking the Tyrrhenian Sea.',
    price: 3400,
    rating: 5.0,
    tags: ['VILLA', 'PANORAMIC'],
    tagColors: ['bg-primary/90 text-on-primary', 'bg-secondary/90 text-on-secondary'],
    amenities: [{ icon: 'hot_tub', label: 'Plunge Pool' }, { icon: 'villa', label: 'Full Villa' }],
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=85&fit=crop',
  },
  {
    id: 'garden-retreat',
    name: 'Bougainvillea Garden Retreat',
    desc: 'Framed by vivid pink bougainvillea, this serene retreat opens onto private landscaped grounds.',
    price: 870,
    rating: 4.7,
    tags: ['GARDEN WING'],
    tagColors: ['bg-tertiary-container text-on-tertiary-container'],
    amenities: [{ icon: 'yard', label: 'Private Garden' }, { icon: 'spa', label: 'Wellness Kit' }],
    img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=85&fit=crop',
  },
  {
    id: 'penthouse-sky',
    name: 'Penthouse Sky Terrace',
    desc: 'The estate\'s crown jewel â€” a glass-walled penthouse with a wraparound terrace and private sommelier.',
    price: 4200,
    rating: 5.0,
    tags: ['PENTHOUSE', 'SIGNATURE'],
    tagColors: ['bg-primary/90 text-on-primary', 'bg-secondary/90 text-on-secondary'],
    amenities: [{ icon: 'wine_bar', label: 'Sommelier' }, { icon: 'roofing', label: 'Sky Terrace' }],
    img: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=85&fit=crop',
  },
  {
    id: 'stone-grotto',
    name: 'Stone Grotto Cave Suite',
    desc: 'A one-of-a-kind subterranean suite carved into the cliffside, with a private sea-facing grotto pool.',
    price: 1680,
    rating: 4.9,
    tags: ['UNIQUE STAY'],
    tagColors: ['bg-surface-variant/90 text-on-surface-variant'],
    amenities: [{ icon: 'waves', label: 'Grotto Pool' }, { icon: 'landscape', label: 'Cave Architecture' }],
    img: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=85&fit=crop',
  },
];

const ASPECTS = ['Panoramic Sea View', 'Garden & Terrace', 'Cliffside Horizon'];
const FEATURES = ['Private Infinity Pool', 'Garden & Terrace', 'Cliffside Horizon', 'In-Suite Wellness Kit'];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function RoomsPage() {
  const navigate = useNavigate();
  const [showMap, setShowMap] = useState(false);
  const [aspects, setAspects] = useState<string[]>(['Panoramic Sea View']);
  const [features, setFeatures] = useState<string[]>([]);

  function toggleAspect(v: string) {
    setAspects(a => a.includes(v) ? a.filter(x => x !== v) : [...a, v]);
  }
  function toggleFeature(v: string) {
    setFeatures(f => f.includes(v) ? f.filter(x => x !== v) : [...f, v]);
  }

  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden custom-scrollbar">
      <Navbar />

      {/* Sticky sub-header */}
      <header className="sticky top-[72px] z-40 bg-surface-container-low border-b border-outline-variant/20 py-4 shadow-sm">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 bg-surface-bright rounded-full px-6 py-2 border border-outline-variant/30 flex-grow max-w-xl cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 border-r border-outline-variant/30 pr-4">
              <span className="material-symbols-outlined text-primary text-lg">calendar_today</span>
              <span className="font-label-md text-label-md">Oct 12 â€” Oct 19</span>
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
            <button
              onClick={() => setShowMap(v => !v)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-label-md text-label-md transition-colors ${
                showMap ? 'bg-tertiary text-on-tertiary' : 'bg-secondary text-on-secondary'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{showMap ? 'list' : 'map'}</span>
              {showMap ? 'Show Suites' : 'Estate Map'}
            </button>
            <div className="relative">
              <button className="flex items-center gap-2 bg-surface-bright border border-outline-variant/50 px-5 py-2.5 rounded-full font-label-md text-label-md hover:bg-surface-container-high transition-colors">
                Sort: Popular
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 flex gap-10">
        {/* Sidebar */}
        <aside className="w-72 shrink-0 hidden lg:block">
          <div className="sticky top-48 space-y-10">
            {/* Nightly Rate */}
            <div>
              <h3 className="font-title-lg text-title-lg text-on-surface mb-6">Nightly Rate</h3>
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

            {/* Room Aspect */}
            <div>
              <h3 className="font-title-lg text-title-lg text-on-surface mb-6">Room Aspect</h3>
              <div className="space-y-3">
                {ASPECTS.map(a => (
                  <label key={a} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={aspects.includes(a)}
                      onChange={() => toggleAspect(a)}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                    />
                    <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">
                      {a}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Suite Features */}
            <div>
              <h3 className="font-title-lg text-title-lg text-on-surface mb-6">Suite Features</h3>
              <div className="space-y-3">
                {FEATURES.map(f => (
                  <label key={f} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={features.includes(f)}
                      onChange={() => toggleFeature(f)}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                    />
                    <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">
                      {f}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Listing */}
        <section className="flex-grow">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <h1 className="font-headline-md text-headline-md text-on-surface">Property Sanctuaries &amp; Suites</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
              Discover our collection of 8 curated retreats within the Solaris Terrace estate
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SUITES.map((suite, i) => (
              <motion.article
                key={suite.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.07 }}
                className="group relative bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={suite.img}
                    alt={suite.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <button className="absolute top-4 right-4 w-10 h-10 glass-effect rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {suite.tags.map((tag, ti) => (
                      <span key={tag} className={`font-label-md text-[10px] px-3 py-1 rounded-full backdrop-blur-md ${suite.tagColors[ti] ?? suite.tagColors[0]}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="font-title-lg text-title-lg text-on-surface leading-tight">{suite.name}</h2>
                    <div className="flex items-center gap-1 bg-surface-container-high px-2 py-1 rounded-lg">
                      <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="font-label-md text-label-md">{suite.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-2">{suite.desc}</p>
                  <div className="flex items-center gap-6 mb-8 text-on-surface-variant">
                    {suite.amenities.map(a => (
                      <div key={a.label} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">{a.icon}</span>
                        <span className="font-label-md text-[12px]">{a.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center border-t border-outline-variant/20 pt-6">
                    <div>
                      <span className="font-body-md text-body-md text-on-surface-variant">Per evening</span>
                      <div className="font-headline-md text-headline-md text-primary">
                        ${suite.price.toLocaleString()}<span className="font-body-md text-body-md text-on-surface-variant font-normal"> / stay</span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/rooms/${suite.id}`)}
                      className="bg-on-surface text-surface px-6 py-3 rounded-full font-label-md text-label-md hover:bg-primary transition-colors duration-300"
                    >
                      Reserve Suite
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <button className="bg-surface border-2 border-primary text-primary px-12 py-4 rounded-full font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all duration-300">
              View Next Collection
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

