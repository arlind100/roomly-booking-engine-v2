import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HERO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAH5lJu4tVNSjyYWs00aycIuXVGAOQjlPiGYS6DBa4oAV-jan7MqCv3Uj8vgaiLiw-o5oYznrfxHfmZGimo-34Ww9Twa5nn5IxplVgLgygQJyoxw3Xgn1W9hUHTMw-YviLiIfQsMzzt7mfraBMpBaDCGj_jG_fFDQMaa2tnHogG8PN6B2NzLZ3GTnpVZG8owu4LXrqKnvAK8wSDLGdFY8sqbqr-nBTm20pkp9i1Dr050f02XH_sT0-xJ8Lq5obRJgiO25_jQLpG5FL-';

const BENTO_LARGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMAuXe8eFI1VJT4DQE2GFbGzqstjqnY3ADTecAEa7Uti60b-gn21FnqM9VePr6LCVQ-ZqSj4biO5fYpzdS_5DS2m6l9_mpIHnY1vBIxGl54Tjtc_tgDJP29G63PswUTziAi4JsxMVu1LmtBhffiYEwdrvHH-EU6PFneSgaUX-er_xCgiEQLagYclzpPiPR_LN92ZTlqgkVnXc2wvfZE9m66zUyluy1ecS3J0uCOsRrMliDBXeyXerUhnMs8lgSRT_XsvuglcxzBt2L';
const BENTO_MID = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOFX22gcEPuEMSABPWd_x01QhY0stsgzGtFX0B9Y9GClXlXo8VIBo3z80s3A7npzEPFRbgMZD1bzOOmeYKLuWOt_B6W9Ts7j_B00skQOZa-mCphRomOZWpiCRvZO8IDQiBXBUf_p7-oDIsbPpVGhu9xewCOF4-KgPG_JEiaUOs3UIZmIfXcrBOV7xWZ5d80GM5UmjJWGhZXbRlUhb8IKDLarwt9i_S7xSBdHV3foLHVr_6PGCriCyt7XXT0XfKmsGHcYPfAg3IDeFI';
const BENTO_SMALL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFtUy-4Mnu20zQi85p3G916gKpk-AEmtLTrAPZNeMC7RgyIiM2oiPTG-xqEbuZe9ACoAact0NyiAdkpGxQ6D0ElSRmWC-TH7JBgbGcJvazuOF-Dvlpz34OkpC6di8Yzy_gjxDoCI9g_AoDZrTx43lIZEhc5-jtUZU3N0O6DVpmVWoNIHJS4IPlMM2kJrzu7bHXfq3HfAF7C1TTFIakMWM2mNC9RcIxSok3U5oNduYph0dL8AFFyJMdH__3sjXNXpty1Sdwj7vUNmbV';

const TESTIMONIALS = [
  {
    quote: '"The level of service exceeded our every expectation. Solaris Terrace felt like a second home, but with the world\'s finest staff and a view that takes your breath away every single morning."',
    name: 'Julian Vance',
    location: 'London, UK',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaDWJRHOsgTbD51lY-TFhqRG2mGsK__kGLr8X71rD6dcfx2DS18nv4rHA-stE6Q3ZtTwqg2YHqIPUdTIIkv6x4qoElxu5R6CB8YY8gUy-sQXRv0l9rzBH7EmLORIWicUWaYWSEjUxx3mfYtZG5H5eeAH-sZpTgymvkgzQV3EVH0tbpCikFAEARrtYrcF3Rdp6HfRlosAhhwoI07iG6MNs4aCs1b3gDuA5GdZjFgXEkudsVdZJ2_RUyIdpji7ZmEnuezBH9KHC3Ts_r',
  },
  {
    quote: '"The attention to detail at Solaris Terrace is simply breathtaking. The way the morning light filters through the oak shutters into the living space makes you feel like you\'re living inside a painting."',
    name: 'Alexandra V.',
    location: 'Paris, France',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw1m0ZdHCghemhIC_xqyjDCOG__vUYvL0NhCUV13mVFWur8DnKI81rLFH33foTGsS81TCQr2llOng6oKLe3xtF389wNa5j6PKeEkMQBfJbhYF9X7aGky9PMIsUdkrkwXSTpiw3WdYGPHJFgL4MyJ7V4r3Glv2WpeDrRHBpM5sL4fZBz2qJ2n0fpiKPMAoizJMOTkmBUM9Z4-AE9vewwJE1sZIY5li8rZrhtIRR8pNlxz7r03IiDm7fPZ_tngPx2BmtGAfKcMrjaOAL',
  },
  {
    quote: '"Unrivaled service. The private chef prepared a local seafood feast that was the highlight of our entire trip. The infinity pool at sunset is a religious experience."',
    name: 'Marcus Cheng',
    location: 'Singapore',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWpH68huk62UujoeyTxSsfc1YHmk46oQRPuZAlY0qMDAAQjqW7p4a9UKjVwjYdWAPVoa6VFvGLZLaKCfkDfE2vCO4TawaWDm1wmfO8bM58NVLe-hXz8Gb865R5v7xh70g3lgSDkEx8xBIsxq0gEefJ5V_R1XQdwk1g3mLOqOEHrbaqofFl7_B0XxkYF2-XKir36VwJdCsBmCynGpBagxqZNO2FDnvirQabQXlUzcmTseN80wkVniN8dum81KihoHKVb6IvfGzfmnm-',
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (checkIn) params.set('checkin', checkIn);
    if (checkOut) params.set('checkout', checkOut);
    if (guests) params.set('guests', guests);
    navigate(`/booking?${params.toString()}`);
  };

  const prevTestimonial = () => setTestimonialIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const nextTestimonial = () => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[testimonialIdx];

  return (
    <div className="bg-background text-on-surface custom-scrollbar">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="Solaris Terrace Infinity Pool" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="relative z-10 w-full max-w-container-max px-margin-mobile md:px-margin-desktop text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="font-headline-lg text-display-lg-mobile md:text-display-lg mb-8 drop-shadow-lg max-w-4xl mx-auto"
          >
            Your Private Sanctuary on the Amalfi Coast
          </motion.h1>

          {/* Booking bar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-4xl mx-auto mt-12"
          >
            <div className="glass-effect rounded-[24px] p-2 md:p-3 shadow-2xl flex flex-col md:flex-row items-stretch gap-2">
              <div className="flex-1 bg-surface/50 hover:bg-surface transition-colors rounded-xl px-6 py-4 text-left group">
                <label className="block font-label-md text-[10px] text-primary uppercase tracking-widest mb-1">Check-in</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={e => setCheckIn(e.target.value)}
                  className="bg-transparent border-none p-0 w-full focus:ring-0 text-on-surface font-title-lg text-body-md placeholder:text-on-surface-variant/50 outline-none"
                  min={format(new Date(), 'yyyy-MM-dd')}
                />
              </div>
              <div className="flex-1 bg-surface/50 hover:bg-surface transition-colors rounded-xl px-6 py-4 text-left border-l border-outline-variant/20">
                <label className="block font-label-md text-[10px] text-primary uppercase tracking-widest mb-1">Check-out</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={e => setCheckOut(e.target.value)}
                  className="bg-transparent border-none p-0 w-full focus:ring-0 text-on-surface font-title-lg text-body-md placeholder:text-on-surface-variant/50 outline-none"
                  min={checkIn || format(new Date(), 'yyyy-MM-dd')}
                />
              </div>
              <div className="flex-1 bg-surface/50 hover:bg-surface transition-colors rounded-xl px-6 py-4 text-left border-l border-outline-variant/20">
                <label className="block font-label-md text-[10px] text-primary uppercase tracking-widest mb-1">Guests</label>
                <select
                  value={guests}
                  onChange={e => setGuests(e.target.value)}
                  className="bg-transparent border-none p-0 w-full focus:ring-0 text-on-surface font-body-md outline-none appearance-none"
                >
                  {[1,2,3,4,5,6,7,8].map(n => (
                    <option key={n} value={String(n)} className="text-on-surface bg-surface">{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleSearch}
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

      {/* Local Explorations — Bento Grid */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="font-label-md text-primary tracking-widest uppercase block mb-4">Discover Our Surroundings</span>
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface">Local Explorations</h2>
          </div>
          <button onClick={() => navigate('/rooms')} className="font-label-md text-secondary hover:text-primary transition-colors flex items-center gap-2 group">
            Explore all suites
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[700px]">
          <div className="md:col-span-8 relative rounded-3xl overflow-hidden group h-[400px] md:h-full">
            <img src={BENTO_LARGE} alt="The Amalfi Coast Coastline" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 p-10 text-white">
              <p className="font-label-md text-primary-fixed uppercase tracking-[0.2em] mb-2">Moments Away</p>
              <h3 className="font-headline-md text-headline-md mb-4">Ravello Heights</h3>
              <div className="flex gap-4">
                <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-label-md text-[12px]">Garden Tours</span>
                <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-label-md text-[12px]">Music Festivals</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 grid grid-rows-2 gap-8 h-[400px] md:h-full">
            <div className="relative rounded-3xl overflow-hidden group">
              <img src={BENTO_MID} alt="Positano Village" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <p className="font-label-md text-primary-fixed uppercase tracking-widest mb-1">Scenic Drive</p>
                <h3 className="font-title-lg text-title-lg">Positano</h3>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden group">
              <img src={BENTO_SMALL} alt="Isle of Capri" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <p className="font-label-md text-primary-fixed uppercase tracking-widest mb-1">Private Charter</p>
                <h3 className="font-title-lg text-title-lg">Isle of Capri</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solaris Experience — 3 feature cards */}
      <section className="bg-surface-container-low py-section-gap overflow-hidden">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="font-label-md text-primary tracking-widest uppercase block mb-4">Beyond the Ordinary</span>
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface mb-6">The Solaris Experience</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Every detail of your stay is meticulously crafted to ensure absolute serenity and indulgence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {[
              { icon: 'concierge', title: 'Private Concierge', desc: 'Our dedicated hosts are available 24/7 to curate your perfect itinerary and handle every logistical detail of your arrival.' },
              { icon: 'spa', title: 'Cliffside Wellness', desc: 'Tailored spa treatments and private yoga sessions on our ocean-facing terraces, designed for total rejuvenation.' },
              { icon: 'restaurant', title: 'Gourmet Dining', desc: 'Experience the flavors of the Mediterranean at our Michelin-starred restaurant, overlooking the Tyrrhenian Sea.' },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-surface p-12 rounded-[32px] hover:shadow-xl transition-all duration-500 group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-3xl">{f.icon}</span>
                </div>
                <h3 className="font-title-lg text-title-lg mb-4 text-on-surface">{f.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Stories — slider */}
      <section className="py-section-gap bg-surface relative overflow-hidden">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="font-label-md text-primary tracking-widest uppercase block mb-4">Testimonials</span>
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface">Guest Stories</h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden" ref={trackRef}>
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-8"
              >
                <div className="flex justify-center gap-1 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined material-symbols-filled">star</span>
                  ))}
                </div>
                <blockquote className="font-headline-md text-headline-md italic text-on-surface leading-snug">
                  {t.quote}
                </blockquote>
                <div className="flex flex-col items-center">
                  <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-primary/20" />
                  <cite className="not-italic font-title-lg text-title-lg text-on-surface">{t.name}</cite>
                  <span className="font-label-md text-on-surface-variant uppercase tracking-widest text-[12px]">{t.location}</span>
                </div>
              </motion.div>
            </div>

            <div className="flex justify-center gap-4 mt-12">
              <button onClick={prevTestimonial} className="w-12 h-12 rounded-full border border-outline flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button onClick={nextTestimonial} className="w-12 h-12 rounded-full border border-outline flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
          <span className="material-symbols-outlined" style={{ fontSize: '400px' }}>location_on</span>
        </div>
      </section>

      {/* CTA */}
      <section id="about" className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low">
        <div className="max-w-container-max mx-auto text-center">
          <span className="font-label-md text-primary tracking-widest uppercase block mb-4">Established 1994</span>
          <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface mb-6 max-w-2xl mx-auto">
            A Sanctuary of Bespoke Elegance
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
            Nestled above the sun-kissed cliffs of the <span className="font-bold text-secondary">Amalfi Coast</span>, our boutique hotel offers a curated collection of private suites. We specialise in{' '}
            <span className="font-bold text-secondary">personalised hospitality</span>,{' '}
            <span className="font-bold text-secondary">farm-to-table dining</span>, and{' '}
            <span className="font-bold text-secondary">eco-conscious luxury</span> that leaves a lasting impression on your soul.
          </p>
          <button
            onClick={() => navigate('/booking')}
            className="bg-primary text-on-primary px-12 py-5 rounded-full font-title-lg text-title-lg hover:bg-primary-container transition-all shadow-lg active:scale-95"
          >
            Reserve Your Stay
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
