import {} from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80', alt: 'Azure Suite bedroom with panoramic sea view' },
  { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80', alt: 'Luxury en-suite bathroom with stone soaking tub' },
  { src: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80', alt: 'Suite interior detail with curated art' },
  { src: 'https://images.unsplash.com/photo-1572552636336-4ae6a62a3aec?w=600&q=80', alt: 'Private infinity pool at sunset' },
  { src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80', alt: 'Suite lounge area at dusk' },
];

const REVIEWS = [
  {
    name: 'Alexandra V.',
    date: 'October 2024 • Verified Stay',
    avatar: 'https://i.pravatar.cc/48?img=47',
    quote: '"The attention to detail at Solaris Terrace is simply breathtaking. The way the morning light filters through the oak shutters into the living space makes you feel like you\'re living inside a painting."',
  },
  {
    name: 'Marcus Cheng',
    date: 'September 2024 • Verified Stay',
    avatar: 'https://i.pravatar.cc/48?img=12',
    quote: '"Unrivaled service. The private chef prepared a local seafood feast that was the highlight of our entire trip. The infinity pool at sunset is a religious experience."',
  },
  {
    name: 'Sasha Thorne',
    date: 'August 2024 • Verified Stay',
    avatar: 'https://i.pravatar.cc/48?img=44',
    quote: '"The soft minimalism here is perfect. It\'s not cold or sterile, but warm and inviting. Best night of sleep I\'ve had in years on that grand king bed."',
  },
];

const RELATED = [
  { label: 'Ocean View', name: 'The Terra Penthouse', price: '$1,850 / Night', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80' },
  { label: 'Garden Escape', name: 'The Verdant Suite', price: '$920 / Night', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80' },
  { label: 'Sunset Point', name: 'The Solstice Loft', price: '$1,100 / Night', img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80' },
];

export default function RoomDetailPage() {
  const navigate = useNavigate();
  const checkIn = 'Oct 24';
  const checkOut = 'Oct 29, 2024';
  const nights = 5;
  const rate = 1240;
  const serviceFee = 120;
  const total = rate * nights + serviceFee;

  return (
    <div className="bg-background text-on-background font-body-md scroll-smooth">
      <Navbar />

      <main className="pt-24 pb-section-gap">

        {/* Mosaic Gallery */}
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-8">
          <div className="mosaic-grid">
            <div className="mosaic-large relative overflow-hidden rounded-xl group">
              <img
                src={GALLERY_IMAGES[0].src}
                alt={GALLERY_IMAGES[0].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {GALLERY_IMAGES.slice(1, 4).map((img, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl group">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
            <div className="relative overflow-hidden rounded-xl group bg-surface-container-high flex items-center justify-center cursor-pointer">
              <img
                src={GALLERY_IMAGES[4].src}
                alt={GALLERY_IMAGES[4].alt}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <span className="relative font-label-md text-label-md text-on-surface z-10 uppercase tracking-widest">+ 12 Photos</span>
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-section-gap grid grid-cols-1 lg:grid-cols-12 gap-gutter">

          {/* Left column */}
          <div className="lg:col-span-8">
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-secondary/10 text-secondary px-4 py-1 rounded-full font-label-md text-label-md uppercase tracking-wider">Premium Suite</span>
                <div className="flex items-center text-tertiary">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-label-md text-label-md ml-1">4.9 (124 Reviews)</span>
                </div>
              </div>
              <h1 className="font-headline-lg text-headline-lg mb-6">The Azure Suite</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                A sanctuary where the sky meets the sea. Inspired by the legendary heritage of the Solaris Coast, The Azure Suite offers an unparalleled blend of artisanal craftsmanship and modern editorial design within Solaris Terrace.
              </p>
            </header>

            {/* Specs */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 border-y border-outline-variant/30 mb-12">
              {[
                { label: 'Living Space', value: '124 SQM' },
                { label: 'Bed Type', value: 'Grand King' },
                { label: 'Occupancy', value: '2 Adults' },
                { label: 'View', value: 'Panoramic Sea' },
              ].map(s => (
                <div key={s.label} className="flex flex-col gap-2">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase opacity-60">{s.label}</span>
                  <span className="font-title-lg text-title-lg">{s.value}</span>
                </div>
              ))}
            </section>

            {/* Heritage */}
            <section className="mb-12">
              <h2 className="font-headline-md text-headline-md mb-8">Heritage &amp; Design</h2>
              <div className="text-on-surface-variant font-body-md leading-relaxed space-y-6">
                <p>Designed by renowned architect Elena Rossi, the suite is a dialogue between traditional Mediterranean materiality and soft minimalism. Each piece of furniture has been hand-selected or custom-crafted by local artisans using reclaimed oak, terracotta, and hand-woven linens.</p>
                <p>The space is defined by its "Gallery" feel—vast white surfaces acting as a canvas for the changing light throughout the day. From the sun-drenched optimism of high-noon to the deep ocean blues of the blue hour, The Azure Suite adapts to your rhythm.</p>
              </div>
            </section>

            {/* Amenities */}
            <section className="mb-12">
              <h2 className="font-headline-md text-headline-md mb-8">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { icon: 'pool', title: 'Private Infinity Pool', desc: 'Temperature controlled with salt-water filtration.' },
                  { icon: 'skillet', title: 'Private Chef Service', desc: 'On-demand fine dining prepared in your suite kitchen.' },
                  { icon: 'spa', title: 'In-Suite Spa', desc: 'Dedicated massage table and organic essential oils.' },
                  { icon: 'connected_tv', title: 'Smart Living', desc: 'Integrated climate and mood lighting control via tablet.' },
                ].map(a => (
                  <div key={a.title} className="flex items-start gap-4">
                    <div className="bg-surface-container-high p-4 rounded-xl shrink-0">
                      <span className="material-symbols-outlined text-secondary">{a.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-title-lg text-title-lg mb-1">{a.title}</h4>
                      <p className="text-on-surface-variant text-sm">{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right column — sticky booking widget */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32 bg-surface-container-lowest p-8 rounded-[24px] shadow-lg border border-outline-variant/10">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <span className="font-headline-md text-headline-md text-primary">${rate.toLocaleString()}</span>
                  <span className="text-on-surface-variant font-label-md text-label-md uppercase tracking-tight ml-1">/ Night</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-surface p-4 rounded-xl border border-outline-variant/20 focus-within:border-secondary transition-all">
                  <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-2">Check-in / Check-out</label>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-on-surface-variant">calendar_today</span>
                    <input
                      className="bg-transparent border-none p-0 focus:ring-0 w-full font-body-md"
                      readOnly
                      value={`${checkIn} - ${checkOut}`}
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <div className="bg-surface p-4 rounded-xl border border-outline-variant/20 focus-within:border-secondary transition-all">
                  <label className="block font-label-md text-label-md text-on-surface-variant uppercase mb-2">Guests</label>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-on-surface-variant">group</span>
                    <select className="bg-transparent border-none p-0 focus:ring-0 w-full font-body-md appearance-none cursor-pointer">
                      <option>2 Adults, 0 Children</option>
                      <option>1 Adult</option>
                      <option>2 Adults, 1 Child</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-8 py-6 border-t border-outline-variant/20">
                <div className="flex justify-between font-body-md text-on-surface-variant">
                  <span>${rate.toLocaleString()} x {nights} nights</span>
                  <span>${(rate * nights).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-body-md text-on-surface-variant">
                  <span>Service Fee</span>
                  <span>${serviceFee}</span>
                </div>
                <div className="flex justify-between font-title-lg text-title-lg pt-4">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/booking')}
                className="w-full bg-primary text-on-primary py-4 rounded-full font-title-lg text-title-lg hover:bg-primary/90 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Instant Booking
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
            <div className="hidden md:flex gap-4">
              <button className="p-4 rounded-full border border-outline-variant/30 hover:border-secondary transition-all cursor-pointer">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="p-4 rounded-full border border-outline-variant/30 hover:border-secondary transition-all cursor-pointer">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-surface-container-low p-8 rounded-2xl flex flex-col h-full"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-title-lg text-title-lg">{r.name}</h4>
                    <span className="text-on-surface-variant text-sm">{r.date}</span>
                  </div>
                </div>
                <div className="flex gap-1 text-tertiary mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="text-on-surface-variant italic mb-6 flex-grow">{r.quote}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Related Suites */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-section-gap">
          <h2 className="font-headline-md text-headline-md mb-12">Discover Other Suites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {RELATED.map((r, i) => (
              <motion.a
                key={r.name}
                href="/rooms"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6">
                  <img
                    src={r.img}
                    alt={r.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <span className="font-label-md text-label-md uppercase tracking-widest opacity-80 mb-2 block">{r.label}</span>
                    <h3 className="font-headline-md text-2xl mb-1">{r.name}</h3>
                    <p className="font-body-md text-body-md opacity-90">{r.price}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
