import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md shadow-sm border-b border-outline-variant/30 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <Link to="/" className="font-display-lg text-title-lg tracking-widest text-primary uppercase">
          SOLARIS TERRACE
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/rooms" className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 font-body-lg text-body-md">
            Suites
          </Link>
          <Link to="/#experiences" className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 font-body-lg text-body-md">
            Experiences
          </Link>
          <Link to="/#about" className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 font-body-lg text-body-md">
            The Estate
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/booking')}
            className="hidden md:block bg-primary text-on-primary px-8 py-3 rounded-full font-label-md text-label-md scale-95 active:scale-90 transition-transform"
          >
            Reserve Now
          </button>
          <button
            className="md:hidden flex flex-col gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="w-6 h-0.5 bg-primary block transition-all" style={{ transform: mobileOpen ? 'rotate(45deg) translateY(8px)' : 'none' }} />
            <span className="w-6 h-0.5 bg-primary block transition-all" style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span className="w-6 h-0.5 bg-primary block transition-all" style={{ transform: mobileOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-outline-variant/20 px-margin-mobile py-6 flex flex-col gap-4">
          <Link to="/rooms" onClick={() => setMobileOpen(false)} className="text-on-surface font-body-lg text-body-md py-2">Suites</Link>
          <Link to="/#experiences" onClick={() => setMobileOpen(false)} className="text-on-surface font-body-lg text-body-md py-2">Experiences</Link>
          <Link to="/#about" onClick={() => setMobileOpen(false)} className="text-on-surface font-body-lg text-body-md py-2">The Estate</Link>
          <button
            onClick={() => { setMobileOpen(false); navigate('/booking'); }}
            className="w-full bg-primary text-on-primary py-3 rounded-full font-label-md text-label-md mt-2"
          >
            Reserve Now
          </button>
        </div>
      )}
    </nav>
  );
}
