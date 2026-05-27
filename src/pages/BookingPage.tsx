import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SUITE_IMG = 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=85&fit=crop';

const REASSURANCE = [
  { icon: 'verified', title: 'Secure Checkout', desc: '256-bit SSL encrypted payment gateway.' },
  { icon: 'price_check', title: 'Direct Rates', desc: 'Best price guaranteed when booking directly with us.' },
  { icon: 'event_available', title: 'Instant Confirmation', desc: 'Your stay is guaranteed immediately.' },
];

const slideVariant = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40, transition: { duration: 0.3 } }),
};

export default function BookingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [processing, setProcessing] = useState(false);

  function goStep(n: number) {
    setDir(n > step ? 1 : -1);
    setStep(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleComplete() {
    setProcessing(true);
    setTimeout(() => navigate('/processing'), 1200);
  }

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      {/* Reduced nav */}
      <nav className="bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-6 max-w-container-max mx-auto">
          <Link to="/" className="font-display-lg text-title-lg tracking-widest text-primary uppercase">SOLARIS TERRACE</Link>
          <div className="flex items-center gap-4 text-on-surface-variant">
            <span className="material-symbols-outlined">lock</span>
            <span className="font-label-md text-label-md hidden md:inline">SECURE CHECKOUT</span>
          </div>
        </div>
      </nav>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 flex-grow">
        {/* Progress */}
        <div className="flex items-center justify-center mb-section-gap">
          <div className="flex items-center w-full max-w-2xl">
            {[{ n: 1, label: 'Details' }, { n: 2, label: 'Payment' }, { n: 3, label: 'Confirm' }].map(({ n, label }, i) => (
              <>
                <div key={n} className={`flex flex-col items-center gap-2 flex-1 transition-opacity ${step >= n ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= n ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface'}`}>
                    {n}
                  </div>
                  <span className={`font-label-md text-label-md ${step >= n ? 'text-primary' : ''}`}>{label}</span>
                </div>
                {i < 2 && <div key={`line-${n}`} className="h-px bg-outline-variant flex-1 mb-6" />}
              </>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Form Area */}
          <div className="lg:col-span-8 space-y-8">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait" custom={dir}>
                {step === 1 && (
                  <motion.section
                    key="step1"
                    custom={dir}
                    variants={slideVariant}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <div className="bg-white rounded-xl shadow-sm border border-outline-variant/20 p-8 md:p-12">
                      <h2 className="font-headline-md text-headline-md mb-8">Guest Information</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="font-label-md text-label-md block">FIRST NAME</label>
                          <input type="text" placeholder="e.g. Julianne" className="w-full bg-[#F8F4EF] border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary transition-all outline-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="font-label-md text-label-md block">LAST NAME</label>
                          <input type="text" placeholder="e.g. Moore" className="w-full bg-[#F8F4EF] border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary transition-all outline-none" />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="font-label-md text-label-md block">EMAIL ADDRESS</label>
                          <input type="email" placeholder="julianne.m@example.com" className="w-full bg-[#F8F4EF] border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary transition-all outline-none" />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="font-label-md text-label-md block">SPECIAL REQUESTS (OPTIONAL)</label>
                          <textarea rows={4} placeholder="Dietary requirements, early check-in, or occasion details..." className="w-full bg-[#F8F4EF] border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary transition-all outline-none resize-none" />
                        </div>
                      </div>
                      <button
                        onClick={() => goStep(2)}
                        className="mt-10 w-full md:w-auto px-12 py-4 bg-primary text-on-primary rounded-full font-title-lg text-title-lg shadow-lg hover:bg-primary-container transition-all active:scale-95"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </motion.section>
                )}

                {step === 2 && (
                  <motion.section
                    key="step2"
                    custom={dir}
                    variants={slideVariant}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <div className="bg-white rounded-xl shadow-sm border border-outline-variant/20 p-8 md:p-12">
                      <div className="flex justify-between items-center mb-8">
                        <h2 className="font-headline-md text-headline-md">Payment Method</h2>
                        <div className="flex gap-2">
                          <span className="material-symbols-outlined text-secondary">verified_user</span>
                          <span className="material-symbols-outlined text-secondary">encrypted</span>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="md:col-span-2 space-y-2">
                            <label className="font-label-md text-label-md block">CARDHOLDER NAME</label>
                            <input type="text" placeholder="Name as it appears on card" className="w-full bg-[#F8F4EF] border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary transition-all outline-none" />
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="font-label-md text-label-md block">CARD NUMBER</label>
                            <div className="relative">
                              <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-[#F8F4EF] border-none rounded-lg p-4 pr-12 focus:ring-2 focus:ring-secondary transition-all outline-none" />
                              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline">credit_card</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="font-label-md text-label-md block">EXPIRY DATE</label>
                            <input type="text" placeholder="MM/YY" className="w-full bg-[#F8F4EF] border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary transition-all outline-none" />
                          </div>
                          <div className="space-y-2">
                            <label className="font-label-md text-label-md block">CVV</label>
                            <input type="password" placeholder="***" className="w-full bg-[#F8F4EF] border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary transition-all outline-none" />
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-6 items-center pt-4 border-t border-outline-variant/20">
                          {[['account_balance', 'VISA'], ['payments', 'MASTERCARD'], ['wallet', 'AMEX']].map(([icon, label]) => (
                            <div key={label} className="flex items-center gap-2 grayscale opacity-60">
                              <span className="material-symbols-outlined">{icon}</span>
                              <span className="font-label-md text-label-md">{label}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 mt-10">
                          <button
                            onClick={() => goStep(1)}
                            className="px-8 py-4 border-2 border-primary text-primary rounded-full font-title-lg text-title-lg hover:bg-primary-fixed transition-all"
                          >
                            Back
                          </button>
                          <button
                            onClick={handleComplete}
                            disabled={processing}
                            className="flex-1 px-12 py-4 bg-primary text-on-primary rounded-full font-title-lg text-title-lg shadow-lg hover:bg-primary-container transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3"
                          >
                            {processing ? (
                              <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Confirming Reservation...
                              </>
                            ) : (
                              'Complete Reservation â€¢ $2,450.00'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>
            </div>

            {/* Reassurance */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REASSURANCE.map(r => (
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

          {/* Sidebar */}
          <aside className="lg:col-span-4 sticky top-32 space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-outline-variant/20 overflow-hidden">
              <div className="relative h-48 w-full">
                <img src={SUITE_IMG} alt="Grand Ocean Suite" className="w-full h-full object-cover" />
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
                  {[['Accommodation (5 nights)', '$1,950.00'], ['Resort Service Fee', '$280.00'], ['Taxes & Levies', '$220.00']].map(([label, amount]) => (
                    <div key={label} className="flex justify-between text-on-surface-variant">
                      <span className="font-body-md text-body-md">{label}</span>
                      <span className="font-body-md text-body-md">{amount}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t-2 border-dashed border-outline-variant/30">
                  <div className="flex justify-between items-baseline">
                    <span className="font-title-lg text-title-lg">Total Amount</span>
                    <span className="font-headline-md text-headline-md text-primary">$2,450.00</span>
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
              <Link to="/about" className="text-primary font-bold hover:underline">Contact our Guest Concierge</Link>
            </div>
          </aside>
        </div>
      </main>

      {/* Simple footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant/20 py-12 mt-section-gap">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <h4 className="font-display-lg text-headline-md text-primary mb-6 uppercase tracking-widest">SOLARIS TERRACE</h4>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto mb-8">
            A sanctuary of light and sea. Experience unparalleled luxury and personalized service at our coastal retreat.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {['Sustainability', 'Privacy Policy', 'Terms of Service'].map(t => (
              <a key={t} href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">{t}</a>
            ))}
          </div>
          <p className="font-label-md text-xs text-outline">Â© 2024 SOLARIS TERRACE. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}

