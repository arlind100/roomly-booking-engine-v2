import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ROOM_IMAGE = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80';

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const accommodation = 1950;
  const serviceFee = 280;
  const taxes = 220;
  const total = accommodation + serviceFee + taxes;

  function handleConfirm() {
    setConfirming(true);
    setTimeout(() => {
      setConfirming(false);
      setConfirmed(true);
    }, 2000);
  }

  if (confirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-margin-mobile">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8 max-w-xl"
        >
          <div className="w-24 h-24 bg-secondary text-on-secondary rounded-full flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'wght' 700" }}>check</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg">Reservation Confirmed!</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            A confirmation email has been sent to julianne.m@example.com. We look forward to welcoming you to Solaris Terrace soon.
          </p>
          <div className="p-6 bg-white rounded-xl border border-outline-variant/30 text-left">
            <p className="font-label-md text-label-md text-outline">RESERVATION REFERENCE</p>
            <p className="font-headline-md text-headline-md text-primary">ST-8829-XQ</p>
          </div>
          <Link
            to="/"
            className="inline-block px-12 py-4 bg-primary text-on-primary rounded-full font-title-lg text-title-lg shadow-lg hover:bg-primary-container transition-all"
          >
            Return to Homepage
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">

      {/* Checkout Nav */}
      <nav className="bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-6 max-w-container-max mx-auto">
          <Link to="/" className="font-display-lg text-title-lg tracking-widest text-primary uppercase">
            SOLARIS TERRACE
          </Link>
          <div className="flex items-center gap-4 text-on-surface-variant">
            <span className="material-symbols-outlined">lock</span>
            <span className="font-label-md text-label-md hidden md:inline">SECURE CHECKOUT</span>
          </div>
        </div>
      </nav>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 flex-grow">

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-section-gap">
          <div className="flex items-center w-full max-w-2xl">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">1</div>
              <span className="font-label-md text-label-md text-primary">Details</span>
            </div>
            <div className="h-px bg-outline-variant flex-1 mb-6" />
            {/* Step 2 */}
            <div className={`flex flex-col items-center gap-2 flex-1 transition-opacity duration-300 ${step >= 2 ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${step >= 2 ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface'}`}>2</div>
              <span className={`font-label-md text-label-md transition-colors duration-300 ${step >= 2 ? 'text-primary' : ''}`}>Payment</span>
            </div>
            <div className="h-px bg-outline-variant flex-1 mb-6" />
            {/* Step 3 */}
            <div className={`flex flex-col items-center gap-2 flex-1 transition-opacity duration-300 ${step >= 3 ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${step >= 3 ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface'}`}>3</div>
              <span className={`font-label-md text-label-md transition-colors duration-300 ${step >= 3 ? 'text-primary' : ''}`}>Confirm</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">

          {/* Left: Form Steps */}
          <div className="lg:col-span-8 space-y-8">

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.section
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="bg-white rounded-xl shadow-sm border border-outline-variant/20 p-8 md:p-12">
                    <h2 className="font-headline-md text-headline-md mb-8">Guest Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-label-md text-label-md block">FIRST NAME</label>
                        <input
                          className="w-full bg-[#F8F4EF] border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary transition-all outline-none"
                          placeholder="e.g. Julianne"
                          type="text"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-label-md text-label-md block">LAST NAME</label>
                        <input
                          className="w-full bg-[#F8F4EF] border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary transition-all outline-none"
                          placeholder="e.g. Moore"
                          type="text"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="font-label-md text-label-md block">EMAIL ADDRESS</label>
                        <input
                          className="w-full bg-[#F8F4EF] border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary transition-all outline-none"
                          placeholder="julianne.m@example.com"
                          type="email"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="font-label-md text-label-md block">SPECIAL REQUESTS (OPTIONAL)</label>
                        <textarea
                          className="w-full bg-[#F8F4EF] border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary transition-all outline-none resize-none"
                          placeholder="Dietary requirements, early check-in, or occasion details..."
                          rows={4}
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => setStep(2)}
                      className="mt-10 w-full md:w-auto px-12 py-4 bg-primary text-on-primary rounded-full font-title-lg text-title-lg shadow-lg hover:bg-primary-container transition-all active:scale-95 cursor-pointer"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </motion.section>
              )}

              {step === 2 && (
                <motion.section
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="bg-white rounded-xl shadow-sm border border-outline-variant/20 p-8 md:p-12">
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="font-headline-md text-headline-md">Payment Method</h2>
                      <div className="flex gap-2 text-secondary">
                        <span className="material-symbols-outlined">verified_user</span>
                        <span className="material-symbols-outlined">encrypted</span>
                      </div>
                    </div>
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2 space-y-2">
                          <label className="font-label-md text-label-md block">CARDHOLDER NAME</label>
                          <input
                            className="w-full bg-[#F8F4EF] border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary transition-all outline-none"
                            placeholder="Name as it appears on card"
                            type="text"
                          />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="font-label-md text-label-md block">CARD NUMBER</label>
                          <div className="relative">
                            <input
                              className="w-full bg-[#F8F4EF] border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary transition-all outline-none pr-12"
                              placeholder="0000 0000 0000 0000"
                              type="text"
                            />
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline">credit_card</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="font-label-md text-label-md block">EXPIRY DATE</label>
                          <input
                            className="w-full bg-[#F8F4EF] border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary transition-all outline-none"
                            placeholder="MM/YY"
                            type="text"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="font-label-md text-label-md block">CVV</label>
                          <input
                            className="w-full bg-[#F8F4EF] border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary transition-all outline-none"
                            placeholder="***"
                            type="password"
                          />
                        </div>
                      </div>

                      {/* Card brand badges */}
                      <div className="flex flex-wrap gap-6 items-center pt-4 border-t border-outline-variant/20">
                        <div className="flex items-center gap-2 grayscale opacity-60">
                          <span className="material-symbols-outlined">account_balance</span>
                          <span className="font-label-md text-label-md">VISA</span>
                        </div>
                        <div className="flex items-center gap-2 grayscale opacity-60">
                          <span className="material-symbols-outlined">payments</span>
                          <span className="font-label-md text-label-md">MASTERCARD</span>
                        </div>
                        <div className="flex items-center gap-2 grayscale opacity-60">
                          <span className="material-symbols-outlined">wallet</span>
                          <span className="font-label-md text-label-md">AMEX</span>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-4 mt-10">
                        <button
                          onClick={() => setStep(1)}
                          className="px-8 py-4 border-2 border-primary text-primary rounded-full font-title-lg text-title-lg hover:bg-primary-fixed transition-all cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleConfirm}
                          disabled={confirming}
                          className="flex-1 px-12 py-4 bg-primary text-on-primary rounded-full font-title-lg text-title-lg shadow-lg hover:bg-primary-container transition-all active:scale-95 cursor-pointer disabled:opacity-70"
                        >
                          {confirming ? (
                            <span className="flex items-center justify-center gap-3">
                              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Confirming Reservation...
                            </span>
                          ) : (
                            `Complete Reservation • $${total.toLocaleString()}.00`
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            {/* Reassurance cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: 'verified', title: 'Secure Checkout', desc: '256-bit SSL encrypted payment gateway.' },
                { icon: 'price_check', title: 'Direct Rates', desc: 'Best price guaranteed when booking directly with us.' },
                { icon: 'event_available', title: 'Instant Confirmation', desc: 'Your stay is guaranteed immediately.' },
              ].map(r => (
                <div key={r.title} className="flex items-start gap-4 p-6 bg-surface-container-low rounded-xl">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>{r.icon}</span>
                  <div>
                    <p className="font-title-lg text-title-lg text-on-surface">{r.title}</p>
                    <p className="text-on-surface-variant text-sm">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Booking Summary */}
          <aside className="lg:col-span-4 sticky top-32 space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-outline-variant/20 overflow-hidden">
              <div className="relative h-48 w-full">
                <img src={ROOM_IMAGE} alt="Grand Ocean Suite" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white font-label-md text-label-md tracking-widest uppercase">SOLARIS TERRACE RESORT</p>
                  <h3 className="text-white font-headline-md text-title-lg">Grand Ocean Suite</h3>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex justify-between border-b border-outline-variant/10 pb-6">
                  <div>
                    <p className="font-label-md text-label-md text-on-surface-variant">CHECK-IN</p>
                    <p className="font-title-lg text-title-lg">Oct 12, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-label-md text-label-md text-on-surface-variant">CHECK-OUT</p>
                    <p className="font-title-lg text-title-lg">Oct 17, 2024</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-on-surface-variant">
                    <span className="font-body-md text-body-md">Accommodation (5 nights)</span>
                    <span className="font-body-md">${accommodation.toLocaleString()}.00</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span className="font-body-md text-body-md">Resort Service Fee</span>
                    <span className="font-body-md">${serviceFee.toLocaleString()}.00</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span className="font-body-md text-body-md">Taxes &amp; Levies</span>
                    <span className="font-body-md">${taxes.toLocaleString()}.00</span>
                  </div>
                </div>
                <div className="pt-6 border-t-2 border-dashed border-outline-variant/30">
                  <div className="flex justify-between items-baseline">
                    <span className="font-title-lg text-title-lg">Total Amount</span>
                    <span className="font-headline-md text-headline-md text-primary">${total.toLocaleString()}.00</span>
                  </div>
                  <p className="text-xs text-on-surface-variant text-right mt-1">All prices inclusive of VAT</p>
                </div>
                <div className="p-4 bg-tertiary-fixed rounded-lg text-on-tertiary-fixed text-sm">
                  <p className="font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">info</span>
                    Flexible Cancellation
                  </p>
                  <p className="mt-1">Free cancellation until Oct 05. After that, a 50% charge applies.</p>
                </div>
              </div>
            </div>
            <div className="text-center p-6 border-2 border-outline-variant/20 border-dotted rounded-xl">
              <p className="font-body-md text-body-md text-on-surface-variant">Need assistance with your stay?</p>
              <a href="#" className="text-primary font-bold hover:underline">Contact our Guest Concierge</a>
            </div>
          </aside>
        </div>
      </main>

      {/* Checkout Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant/20 py-12 mt-section-gap">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <h4 className="font-display-lg text-headline-md text-primary mb-6 uppercase tracking-widest">SOLARIS TERRACE</h4>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto mb-8">
            A sanctuary of light and sea. Experience unparalleled luxury and personalized service at our coastal retreat.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <a href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Sustainability</a>
            <a href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Terms of Service</a>
          </div>
          <p className="font-label-md text-xs text-outline">© 2024 SOLARIS TERRACE. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
