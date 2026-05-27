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
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face',
  },
  {
    quote: '"Waking up to those views every morning was a spiritual experience. The concierge arranged everything flawlessly â€” from the private boat to Capri to a candlelit dinner on the terrace."',
    name: 'Sophie Laurent',
    location: 'Paris, France',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=face',
  },
  {
    quote: '"Nothing compares to the silence of a Solaris morning. The cliff-side spa treatment as the sun rose over the Tyrrhenian Sea was the single most memorable moment of our honeymoon."',
    name: 'Marcus & Elina Kohl',
    location: 'Munich, Germany',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&crop=face',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function HomePage() {
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0);

  function prev() {
    setActiveIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }
  function next() {
    setActiveIdx(i => (i + 1) % TESTIMONIALS.length);
  }

  return (
    <div className="bg-background text-on-surface font-body-md antialiased">
      <Navbar />

      {/* â”€â”€ Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=1920&q=85&fit=crop"
            alt="Solaris Terrace Infinity Pool"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="relative z-10 w-full max-w-container-max px-margin-mobile md:px-margin-desktop text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="font-headline-lg text-display-lg-mobile md:text-display-lg mb-8 drop-shadow-lg max-w-4xl mx-auto"
          >
            Your Private Sanctuary on the Amalfi Coast
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="font-body-lg text-white/90 max-w-2xl mx-auto mt-4 drop-shadow-md"
          >
            An intimate escape where every suite is a destination in itself.
          </motion.p>

          {/* Booking Bar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="max-w-4xl mx-auto mt-12"
          >
            <div className="glass-effect rounded-[24px] p-2 md:p-3 shadow-2xl flex flex-col md:flex-row items-stretch gap-2">
              <div className="flex-1 bg-surface/50 hover:bg-surface transition-colors rounded-xl px-6 py-4 text-left">
                <label className="block font-label-md text-[10px] text-primary uppercase tracking-widest mb-1">
                  Check-in / Check-out
                </label>
                <input
                  type="text"
                  placeholder="Select dates"
                  className="bg-transparent border-none p-0 w-full focus:ring-0 text-on-surface font-title-lg text-title-lg placeholder:text-on-surface-variant/50 outline-none"
                />
              </div>
              <div className="flex-1 bg-surface/50 hover:bg-surface transition-colors rounded-xl px-6 py-4 text-left border-l border-outline-variant/20">
                <label className="block font-label-md text-[10px] text-primary uppercase tracking-widest mb-1">
                  Guests
                </label>
                <input
                  type="text"
                  placeholder="Add guests"
                  className="bg-transparent border-none p-0 w-full focus:ring-0 text-on-surface font-title-lg text-title-lg placeholder:text-on-surface-variant/50 outline-none"
                />
              </div>
              <button
                onClick={() => navigate('/rooms')}
                className="bg-primary text-on-primary px-10 py-5 rounded-xl font-label-md text-label-md hover:bg-primary-container transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">calendar_today</span>
                Check Availability
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <span className="material-symbols-outlined text-white text-3xl">keyboard_double_arrow_down</span>
        </div>
      </section>

      {/* â”€â”€ Local Explorations â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="explore" className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <span className="font-label-md text-primary tracking-widest uppercase block mb-4">Discover Our Surroundings</span>
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface">Local Explorations</h2>
          </div>
          <a href="#" className="font-label-md text-secondary hover:text-primary transition-colors flex items-center gap-2 group">
            Explore all excursions
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[700px]"
        >
          {/* Large bento â€” Ravello */}
          <div className="md:col-span-8 relative rounded-3xl overflow-hidden group h-[400px] md:h-full">
            <img
              src="https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1200&q=85&fit=crop"
              alt="The Amalfi Coast Coastline"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 p-10 text-white">
              <p className="font-label-md text-primary-fixed-dim uppercase tracking-[0.2em] mb-2">Moments Away</p>
              <h3 className="font-headline-md text-headline-md mb-4">Ravello Heights</h3>
              <div className="flex gap-4">
                <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-label-md text-[12px]">Garden Tours</span>
                <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-label-md text-[12px]">Music Festivals</span>
              </div>
            </div>
          </div>

          {/* Right column â€” Positano + Capri */}
          <div className="md:col-span-4 grid grid-rows-2 gap-8 h-[400px] md:h-full">
            <div className="relative rounded-3xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=85&fit=crop"
                alt="Positano Village"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <p className="font-label-md text-primary-fixed-dim uppercase tracking-widest mb-1">Scenic Drive</p>
                <h3 className="font-title-lg text-title-lg">Positano</h3>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=85&fit=crop"
                alt="Capri Boat Trip"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <p className="font-label-md text-primary-fixed-dim uppercase tracking-widest mb-1">Private Charter</p>
                <h3 className="font-title-lg text-title-lg">Isle of Capri</h3>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* â”€â”€ The Solaris Experience â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="bg-surface-container-low py-section-gap overflow-hidden">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="font-label-md text-primary tracking-widest uppercase block mb-4">Beyond the Ordinary</span>
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface mb-6">The Solaris Experience</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Every detail of your stay is meticulously crafted to ensure absolute serenity and indulgence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {[
              {
                id: undefined,
                icon: 'concierge',
                title: 'Private Concierge',
                desc: 'Our dedicated hosts are available 24/7 to curate your perfect itinerary and handle every logistical detail of your arrival.',
                shadow: '',
              },
              {
                id: 'wellness',
                icon: 'spa',
                title: 'Cliffside Wellness',
                desc: 'Tailored spa treatments and private yoga sessions on our ocean-facing terraces, designed for total rejuvenation.',
                shadow: 'shadow-sm border border-primary/5',
              },
              {
                id: 'dining',
                icon: 'restaurant',
                title: 'Gourmet Dining',
                desc: 'Experience the flavors of the Mediterranean at our Michelin-starred restaurant, overlooking the Tyrrhenian Sea.',
                shadow: '',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                id={card.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-surface p-12 rounded-[32px] hover:shadow-xl transition-all duration-500 group ${card.shadow}`}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-3xl">{card.icon}</span>
                </div>
                <h3 className="font-headline-md text-title-lg mb-4 text-on-surface">{card.title}</h3>
                <p className="font-body-md text-on-surface-variant leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Guest Stories â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-section-gap bg-surface relative overflow-hidden">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-16"
          >
            <span className="font-label-md text-primary tracking-widest uppercase block mb-4">Testimonials</span>
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface">Guest Stories</h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5 }}
                  className="text-center space-y-8 px-4"
                >
                  <div className="flex justify-center gap-1 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <blockquote className="font-headline-md text-headline-md italic text-on-surface leading-snug">
                    {TESTIMONIALS[activeIdx].quote}
                  </blockquote>
                  <div className="flex flex-col items-center">
                    <img
                      src={TESTIMONIALS[activeIdx].avatar}
                      alt={TESTIMONIALS[activeIdx].name}
                      className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-primary/20"
                    />
                    <cite className="not-italic font-title-lg text-title-lg text-on-surface">{TESTIMONIALS[activeIdx].name}</cite>
                    <span className="font-label-md text-on-surface-variant uppercase tracking-widest text-[12px]">{TESTIMONIALS[activeIdx].location}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-4 mt-12">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-outline flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-outline flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
          <span className="material-symbols-outlined text-[400px]">location_on</span>
        </div>
      </section>

      <Footer />
    </div>
  );
}

