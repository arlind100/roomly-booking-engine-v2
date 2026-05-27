import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MESSAGES = [
  'Securing your sanctuary...',
  'Verifying availability...',
  'Authenticating details...',
  'Almost there...',
];

export default function BookingProcessingPage() {
  const navigate = useNavigate();
  const [msgIdx, setMsgIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const advance = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMsgIdx(i => (i + 1) % MESSAGES.length);
        setVisible(true);
      }, 500);
    }, 5000);
    return () => clearInterval(advance);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => navigate('/confirmed'), 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden min-h-screen flex flex-col">
      {/* Fixed header */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-center py-8">
        <Link to="/" className="font-display-lg text-title-lg tracking-widest text-primary uppercase">
          SOLARIS TERRACE
        </Link>
      </header>

      <main className="relative min-h-screen flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-transparent to-surface/80 z-10" />
          <img
            src="https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1920&q=85&fit=crop"
            alt="Solaris Terrace Estate"
            className="w-full h-full object-cover animate-slow-zoom"
          />
        </div>

        {/* Processing Content */}
        <div className="relative z-20 w-full max-w-[600px] flex flex-col items-center text-center">
          {/* Spinner */}
          <div className="mb-12 relative flex items-center justify-center">
            <div className="w-24 h-24 border-2 border-primary/20 rounded-full" />
            <div className="absolute w-24 h-24 border-t-2 border-primary rounded-full animate-spin" />
            <span className="material-symbols-outlined text-primary text-4xl absolute">auto_awesome</span>
          </div>

          {/* Cycling headline */}
          <h2
            className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface mb-4 transition-opacity duration-500"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {MESSAGES[msgIdx]}
          </h2>

          {/* Pulsing subtitle */}
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 animate-pulse-soft">
            Please stay on this page while we finalize your reservation with Solaris Terrace.
          </p>

          {/* Glass card */}
          <div className="glass-effect w-full rounded-xl p-8 mb-12 shadow-sm text-left" style={{ border: '1px solid rgba(223,192,183,0.3)' }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-outline-variant/30 pb-6 mb-6 gap-4">
              <div>
                <p className="font-label-md text-label-md text-primary uppercase tracking-widest mb-1">Reservation Request</p>
                <h3 className="font-headline-md text-headline-md text-on-surface">The Horizon Sanctuary</h3>
              </div>
              <div className="bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                <p className="font-label-md text-label-md text-primary">Status: Processing</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">calendar_today</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface-variant mb-1">Stay Dates</p>
                  <p className="font-title-lg text-title-lg text-on-surface">Oct 12 â€“ 19, 2024</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">group</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface-variant mb-1">Guests</p>
                  <p className="font-title-lg text-title-lg text-on-surface">2 Adults, 1 Child</p>
                </div>
              </div>
            </div>
          </div>

          {/* Concierge note */}
          <div className="flex flex-col items-center max-w-md">
            <div className="flex items-center gap-3 mb-4 text-secondary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>concierge</span>
              <p className="font-label-md text-label-md uppercase tracking-wider">Bespoke Experience</p>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Once confirmed, your personal guest concierge will reach out via WhatsApp or email to curate your arrival experience and coordinate your private transfers.
            </p>
          </div>
        </div>
      </main>

      {/* Fixed footer */}
      <footer className="fixed bottom-0 left-0 w-full z-20 py-8 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4 opacity-60">
          <p className="font-label-md text-label-md text-on-surface-variant">Â© 2024 SOLARIS TERRACE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <span className="font-label-md text-label-md text-on-surface-variant">Privacy Policy</span>
            <span className="font-label-md text-label-md text-on-surface-variant">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

