import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

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

        <div className="hidden md:flex gap-8 items-center">
          <Link
            to="/rooms"
            className={`font-body-md text-body-md transition-colors duration-300 ${
              location.pathname.startsWith('/rooms')
                ? 'text-primary border-b-2 border-primary font-bold pb-1'
                : 'text-on-surface-variant hover:text-primary font-medium'
            }`}
          >
            Suites
          </Link>
          <a href="#" className="text-on-surface-variant font-medium font-body-md text-body-md hover:text-primary transition-colors duration-300">Wellness</a>
          <a href="#" className="text-on-surface-variant font-medium font-body-md text-body-md hover:text-primary transition-colors duration-300">Dining</a>
          <Link
            to="/about"
            className={`font-body-md text-body-md transition-colors duration-300 ${
              location.pathname === '/about'
                ? 'text-primary border-b-2 border-primary font-bold pb-1'
                : 'text-on-surface-variant hover:text-primary font-medium'
            }`}
          >
            The Estate
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors hidden md:block">account_circle</span>
          <Link
            to="/booking"
            className="hidden md:block bg-primary text-on-primary px-8 py-3 rounded-full font-label-md text-label-md hover:bg-primary/90 active:scale-95 transition-all"
          >
            Reserve Now
          </Link>
          <button
            className="md:hidden flex flex-col gap-1.5"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className="w-6 h-0.5 bg-primary block" />
            <span className="w-6 h-0.5 bg-primary block" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-md border-t border-outline-variant/20 px-margin-mobile py-6 flex flex-col gap-4">
          <Link to="/rooms" className="font-body-md text-on-surface-variant hover:text-primary" onClick={() => setMobileOpen(false)}>Suites</Link>
          <a href="#" className="font-body-md text-on-surface-variant hover:text-primary">Wellness</a>
          <a href="#" className="font-body-md text-on-surface-variant hover:text-primary">Dining</a>
          <Link to="/about" className="font-body-md text-on-surface-variant hover:text-primary" onClick={() => setMobileOpen(false)}>The Estate</Link>
          <Link to="/booking" className="mt-2 bg-primary text-on-primary px-6 py-3 rounded-full font-label-md text-center" onClick={() => setMobileOpen(false)}>Reserve Now</Link>
        </div>
      )}
    </nav>
  );
}
