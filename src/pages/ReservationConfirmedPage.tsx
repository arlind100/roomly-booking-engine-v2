import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const SERVICES = [
  {
    title: 'Solaris Wellness Spa',
    desc: 'Signature Mediterranean treatments inspired by local botanicals.',
    img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=85&fit=crop',
  },
  {
    title: 'Terrazza Belvedere',
    desc: 'Exceptional coastal cuisine with a focus on fresh daily catch.',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85&fit=crop',
  },
  {
    title: 'Personal Concierge',
    desc: 'Bespoke arrangements for travel, activities, and local insights.',
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=85&fit=crop',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: d } }),
};

export default function ReservationConfirmedPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden">
      {/* Minimal nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <Link to="/" className="font-display-lg text-title-lg tracking-widest text-primary uppercase">SOLARIS TERRACE</Link>
          <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md">
            <span className="material-symbols-outlined">account_circle</span>
            <span className="hidden md:inline">My Account</span>
          </button>
        </div>
      </nav>

      <main className="pt-24 pb-section-gap min-h-screen">
        {/* Hero */}
        <section className="relative w-full h-[614px] md:h-[716px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1920&q=85&fit=crop"
            alt="Amalfi Coast Sunset"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-margin-mobile">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-on-primary mb-6 shadow-xl">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'wght' 500" }}>check</span>
              </div>
              <h1 className="font-display-lg text-headline-lg md:text-display-lg text-on-surface mb-2">Reservation Confirmed</h1>
              <p className="font-body-lg text-on-surface-variant max-w-xl mx-auto">
                Your journey to the edge of the Mediterranean begins. We are delighted to welcome you to Solaris Terrace.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Booking details */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop -mt-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Main content */}
            <div className="lg:col-span-8 space-y-8">
              {/* Stats bento */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.1}
                className="bg-surface-container-lowest p-8 md:p-12 rounded-[24px] shadow-sm border border-outline-variant/20"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x divide-outline-variant/30">
                  <div className="space-y-1">
                    <p className="font-label-md text-on-surface-variant uppercase">Booking Reference</p>
                    <p className="font-title-lg text-primary tracking-widest">ST-992841X</p>
                  </div>
                  <div className="md:pl-8 space-y-1">
                    <p className="font-label-md text-on-surface-variant uppercase">Check In</p>
                    <p className="font-title-lg text-on-surface">Oct 12, 2024</p>
                    <p className="text-xs text-on-surface-variant">After 3:00 PM</p>
                  </div>
                  <div className="md:pl-8 space-y-1">
                    <p className="font-label-md text-on-surface-variant uppercase">Check Out</p>
                    <p className="font-title-lg text-on-surface">Oct 19, 2024</p>
                    <p className="text-xs text-on-surface-variant">Before 11:00 AM</p>
                  </div>
                </div>
              </motion.div>

              {/* Welcome + accommodation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0.2}
                  className="bg-secondary-container/30 p-8 rounded-[24px]"
                >
                  <h3 className="font-headline-md text-secondary mb-4">Welcome to the Estate</h3>
                  <p className="text-on-secondary-fixed-variant leading-relaxed mb-6">
                    Your suite at Solaris Terrace is being prepared with meticulous care. Our concierge team will reach out within 48 hours to personalize your arrival experience, including airport transfers and dining preferences.
                  </p>
                  <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-secondary font-title-lg group"
                  >
                    <span>Explore Guest Services</span>
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </button>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0.3}
                  className="bg-surface-container p-8 rounded-[24px] flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-title-lg text-on-surface mb-2">Accommodation</h3>
                    <p className="text-on-surface-variant mb-4">Terrace Suite with Infinity Pool View</p>
                    <div className="flex flex-wrap gap-2">
                      {['2 Adults', 'Breakfast Included', 'Private Balcony'].map(tag => (
                        <span key={tag} className="bg-surface-container-highest px-3 py-1 rounded-full text-xs font-medium text-on-surface-variant">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-8 pt-4 border-t border-outline-variant/30 flex justify-between items-center">
                    <p className="font-label-md text-on-surface-variant">Total Paid</p>
                    <p className="font-headline-md text-primary">â‚¬8,420.00</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-32 space-y-6">
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0.4}
                  className="bg-surface-container-lowest p-8 rounded-[24px] shadow-lg border border-outline-variant/10"
                >
                  <h4 className="font-title-lg mb-6">Stay Organized</h4>
                  <div className="space-y-4">
                    <button className="w-full flex items-center justify-center gap-3 bg-primary text-on-primary py-4 rounded-xl font-label-md hover:brightness-110 transition-all active:scale-[0.98]">
                      <span className="material-symbols-outlined">calendar_today</span>
                      Add to Calendar
                    </button>
                    <button className="w-full flex items-center justify-center gap-3 border border-outline text-on-surface-variant py-4 rounded-xl font-label-md hover:bg-surface transition-all active:scale-[0.98]">
                      <span className="material-symbols-outlined">download</span>
                      Download PDF Receipt
                    </button>
                    <button className="w-full flex items-center justify-center gap-3 text-on-surface-variant py-2 font-label-md hover:text-primary transition-all">
                      <span className="material-symbols-outlined">share</span>
                      Share Itinerary
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0.5}
                  className="bg-tertiary-container text-on-tertiary p-8 rounded-[24px] overflow-hidden relative"
                >
                  <div className="relative z-10">
                    <h4 className="font-title-lg mb-2">Enhance Your Stay</h4>
                    <p className="text-sm opacity-90 mb-6">
                      Pre-book a private yacht tour of the Amalfi coast or a sunset dinner at our Michelin-starred terrace.
                    </p>
                    <button
                      onClick={() => navigate('/')}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-2 rounded-lg font-label-md transition-all"
                    >
                      Browse Experiences
                    </button>
                  </div>
                  <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl opacity-10 rotate-12 select-none">sailing</span>
                </motion.div>
              </div>
            </aside>
          </div>
        </section>

        {/* Curated Guest Services */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="font-label-md text-primary uppercase tracking-[0.2em] mb-4">Refined Experiences</p>
            <h2 className="font-display-lg text-headline-lg">Curated Guest Services</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-[24px] mb-6 shadow-md">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h4 className="font-title-lg mb-2">{s.title}</h4>
                <p className="text-on-surface-variant">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

