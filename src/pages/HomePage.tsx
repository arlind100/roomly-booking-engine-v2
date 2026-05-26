import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TESTIMONIALS = [
  {
    quote: '"The level of service exceeded our every expectation. Solaris Terrace felt like a second home, but with the world\'s finest staff and a view that takes your breath away every single morning."',
    name: 'Julian Vance',
    location: 'London, UK',
    avatar: 'https://i.pravatar.cc/80?img=68',
  },
  {
    quote: '"Our anniversary here was beyond words. The private pool, the sunsets, the food — absolutely flawless. Solaris Terrace is in a category entirely its own."',
    name: 'Isabella Marchetti',
    location: 'Milan, Italy',
    avatar: 'https://i.pravatar.cc/80?img=47',
  },
  {
    quote: '"Solaris Terrace is more than a hotel; it\'s a sensory masterpiece. The silence of the morning and the light on the water are unforgettable."',
    name: 'Julianna Moretti',
    location: 'Returning Guest',
    avatar: 'https://i.pravatar.cc/80?img=44',
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [storyIdx, setStoryIdx] = useState(0);

  return (
    <div className="bg-background text-on-surface font-body-md antialiased overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
            alt="Solaris Terrace infinity pool overlooking the Amalfi Coast"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="relative z-10 w-full max-w-container-max px-margin-mobile md:px-margin-desktop text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline-lg text-display-lg-mobile md:text-display-lg mb-8 drop-shadow-lg max-w-4xl mx-auto"
          >
            Your Private Sanctuary on the Amalfi Coast
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto mt-12"
          >
            <div className="glass-effect rounded-[24px] p-2 md:p-3 shadow-2xl flex flex-col md:flex-row items-stretch gap-2">
              <div className="flex-1 bg-surface/50 hover:bg-surface transition-colors rounded-xl px-6 py-4 text-left">
                <label className="block font-label-md text-[10px] text-primary uppercase tracking-widest mb-1">Check-in / Check-out</label>
                <input
                  className="bg-transparent border-none p-0 w-full focus:ring-0 text-on-surface font-title-lg placeholder:text-on-surface-variant/50 cursor-pointer"
                  placeholder="Select dates"
                  readOnly
                  onClick={() => navigate('/booking')}
                />
              </div>
              <div className="flex-1 bg-surface/50 hover:bg-surface transition-colors rounded-xl px-6 py-4 text-left border-l border-outline-variant/20">
                <label className="block font-label-md text-[10px] text-primary uppercase tracking-widest mb-1">Guests</label>
                <input
                  className="bg-transparent border-none p-0 w-full focus:ring-0 text-on-surface font-title-lg placeholder:text-on-surface-variant/50 cursor-pointer"
                  placeholder="Add guests"
                  readOnly
                  onClick={() => navigate('/booking')}
                />
              </div>
              <button
                onClick={() => navigate('/booking')}
                className="bg-primary text-on-primary px-10 py-5 rounded-xl font-label-md text-label-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">calendar_today</span>
                Check Availability
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce pointer-events-none">
          <span className="material-symbols-outlined text-white text-3xl">keyboard_double_arrow_down</span>
        </div>
      </section>

      {/* Local Explorations */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="font-label-md text-primary tracking-widest uppercase block mb-4">Discover Our Surroundings</span>
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface">Local Explorations</h2>
          </div>
          <a href="#" className="font-label-md text-secondary hover:text-primary transition-colors flex items-center gap-2 group">
            Explore all excursions
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:h-[700px]">
          {/* Large card — Ravello Heights */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-8 relative rounded-3xl overflow-hidden group cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1200&q=80"
              alt="Ravello Heights on the Amalfi Coast"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 p-10 text-white">
              <p className="font-label-md text-primary-fixed uppercase tracking-[0.2em] mb-2">Moments Away</p>
              <h3 className="font-headline-md text-headline-md mb-4">Ravello Heights</h3>
              <div className="flex gap-4">
                <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-label-md text-[12px]">Garden Tours</span>
                <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-label-md text-[12px]">Music Festivals</span>
              </div>
            </div>
          </motion.div>

          {/* Right column */}
          <div className="md:col-span-4 grid grid-rows-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative rounded-3xl overflow-hidden group cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80"
                alt="Positano village on the Amalfi Coast"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <p className="font-label-md text-primary-fixed uppercase tracking-widest mb-1">Scenic Drive</p>
                <h3 className="font-title-lg text-title-lg">Positano</h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden group cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80"
                alt="Isle of Capri private charter"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <p className="font-label-md text-primary-fixed uppercase tracking-widest mb-1">Private Charter</p>
                <h3 className="font-title-lg text-title-lg">Isle of Capri</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Solaris Experience */}
      <section className="bg-surface-container-low py-section-gap overflow-hidden">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="font-label-md text-primary tracking-widest uppercase block mb-4">Beyond the Ordinary</span>
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface mb-6">The Solaris Experience</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Every detail of your stay is meticulously crafted to ensure absolute serenity and indulgence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {[
              { icon: 'concierge', title: 'Private Concierge', body: 'Our dedicated hosts are available 24/7 to curate your perfect itinerary and handle every logistical detail of your arrival.' },
              { icon: 'spa', title: 'Cliffside Wellness', body: 'Tailored spa treatments and private yoga sessions on our ocean-facing terraces, designed for total rejuvenation.' },
              { icon: 'restaurant', title: 'Gourmet Dining', body: 'Experience the flavors of the Mediterranean at our Michelin-starred restaurant, overlooking the Tyrrhenian Sea.' },
            ].map((card, i) => (
              <motion.div
                key={card.icon}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-surface p-12 rounded-[32px] hover:shadow-xl transition-all duration-500 group cursor-pointer border border-primary/5"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
                  <span className="material-symbols-outlined text-3xl">{card.icon}</span>
                </div>
                <h3 className="font-title-lg text-title-lg mb-4 text-on-surface">{card.title}</h3>
                <p className="font-body-md text-on-surface-variant leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Stories */}
      <section className="py-section-gap bg-surface relative overflow-hidden">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="font-label-md text-primary tracking-widest uppercase block mb-4">Testimonials</span>
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface">Guest Stories</h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={storyIdx}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="text-center space-y-8 px-4"
                >
                  <div className="flex justify-center gap-1 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <blockquote className="font-headline-md text-headline-md italic text-on-surface leading-snug">
                    {TESTIMONIALS[storyIdx].quote}
                  </blockquote>
                  <div className="flex flex-col items-center">
                    <img
                      src={TESTIMONIALS[storyIdx].avatar}
                      alt={TESTIMONIALS[storyIdx].name}
                      className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-primary/20"
                    />
                    <cite className="not-italic font-title-lg text-title-lg text-on-surface">{TESTIMONIALS[storyIdx].name}</cite>
                    <span className="font-label-md text-on-surface-variant uppercase tracking-widest text-[12px]">{TESTIMONIALS[storyIdx].location}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-4 mt-12">
              <button
                onClick={() => setStoryIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="w-12 h-12 rounded-full border border-outline flex items-center justify-center hover:bg-primary hover:text-on-primary hover:border-primary transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                onClick={() => setStoryIdx(i => (i + 1) % TESTIMONIALS.length)}
                className="w-12 h-12 rounded-full border border-outline flex items-center justify-center hover:bg-primary hover:text-on-primary hover:border-primary transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Decorative background icon */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
          <span className="material-symbols-outlined text-[400px]">location_on</span>
        </div>
      </section>

      <Footer />
    </div>
  );
}
