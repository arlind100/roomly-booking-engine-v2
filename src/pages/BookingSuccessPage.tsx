import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useHotel } from '../hooks/useHotel';
import Footer from '../components/Footer';

export default function BookingSuccessPage() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code') ?? '';
  const email = searchParams.get('email') ?? '';
  const { data: hotel } = useHotel();

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      {/* Minimal nav */}
      <nav className="bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 py-5 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="font-display-lg text-title-lg tracking-widest text-primary uppercase">SOLARIS TERRACE</Link>
      </nav>

      <main className="flex-grow flex items-center justify-center pt-16 pb-24 px-margin-mobile">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-lg w-full"
        >
          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 0.8, bounce: 0.4, delay: 0.15 }}
            className="w-24 h-24 rounded-full bg-primary text-on-primary flex items-center justify-center mx-auto mb-8 shadow-xl"
          >
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'wght' 500" }}>check</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}>
            <h1 className="font-headline-lg text-headline-lg md:text-display-md mb-3">Booking Request Received</h1>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Your booking request has been received. We will confirm your reservation within a few hours.
              {email && <> A summary has been sent to <span className="font-semibold text-on-surface">{email}</span>.</>}
            </p>
          </motion.div>

          {code && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="inline-flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-2xl px-8 py-5 mb-8"
            >
              <span className="material-symbols-outlined text-primary">confirmation_number</span>
              <div className="text-left">
                <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-0.5">Booking Reference</p>
                <p className="font-display-lg text-headline-md text-primary tracking-widest">{code}</p>
              </div>
            </motion.div>
          )}

          {/* What happens next */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-8 text-left space-y-4 mb-8"
          >
            <h4 className="font-title-lg text-center mb-6">What happens next</h4>
            {[
              'Our team will review your request and confirm within a few hours.',
              'You will receive a confirmation email once your reservation is approved.',
              `Check-in from ${hotel?.check_in_time ?? '14:00'} on your arrival date.`,
              'Payment is due at the hotel on arrival.',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold text-primary">{i + 1}</span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{item}</p>
              </div>
            ))}
          </motion.div>

          {/* Hotel contact */}
          {(hotel?.phone || hotel?.email || hotel?.address) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="bg-surface-container p-6 rounded-2xl text-sm text-left mb-8 space-y-2"
            >
              <p className="font-semibold text-on-surface mb-3">{hotel?.name}</p>
              {hotel?.address && <p className="text-on-surface-variant flex items-start gap-2"><span className="material-symbols-outlined text-base text-primary">location_on</span>{hotel.address}</p>}
              {hotel?.phone && <a href={`tel:${hotel.phone}`} className="flex items-center gap-2 text-primary hover:underline"><span className="material-symbols-outlined text-base">call</span>{hotel.phone}</a>}
              {hotel?.email && <a href={`mailto:${hotel.email}`} className="flex items-center gap-2 text-primary hover:underline"><span className="material-symbols-outlined text-base">mail</span>{hotel.email}</a>}
            </motion.div>
          )}

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-10 py-4 bg-on-surface text-surface rounded-full font-label-md hover:bg-primary transition-colors duration-300"
          >
            <span className="material-symbols-outlined text-base">home</span>
            Back to Home
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
