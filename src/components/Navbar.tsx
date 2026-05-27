import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Suites', to: '/rooms' },
  { label: 'Wellness', href: '/#wellness' },
  { label: 'Dining', href: '/#dining' },
  { label: 'Explore', href: '/#explore' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleAnchor(href: string) {
    const [path, hash] = href.split('#');
    if (location.pathname === '/' || path === '/') {
      const el = document.getElementById(hash);
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    navigate(`/#${hash}`);
    setMobileOpen(false);
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md shadow-sm border-b border-outline-variant/30 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">

        <Link to="/" className="font-display-lg text-title-lg tracking-widest text-primary uppercase">
          SOLARIS TERRACE
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map(link =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                className={`font-body-lg text-body-lg transition-colors duration-300 ${
                  location.pathname.startsWith(link.to)
                    ? 'text-primary border-b-2 border-primary font-bold pb-1'
                    : 'text-on-surface-variant font-medium hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={() => handleAnchor(link.href!)}
                className="text-on-surface-variant font-medium font-body-lg text-body-lg hover:text-primary transition-colors duration-300 bg-transparent border-none cursor-pointer"
              >
                {link.label}
              </button>
            )
          )}
        </div>

        <div className="flex items-center gap-6">
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors hidden md:block">
            account_circle
          </span>
          <Link
            to="/booking"
            className="hidden md:block bg-primary text-on-primary px-8 py-3 rounded-full font-label-md text-label-md hover:bg-primary-container active:scale-95 transition-all"
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
          <button onClick={() => handleAnchor('/#wellness')} className="text-left font-body-md text-on-surface-variant hover:text-primary bg-transparent border-none cursor-pointer">Wellness</button>
          <button onClick={() => handleAnchor('/#dining')} className="text-left font-body-md text-on-surface-variant hover:text-primary bg-transparent border-none cursor-pointer">Dining</button>
          <button onClick={() => handleAnchor('/#explore')} className="text-left font-body-md text-on-surface-variant hover:text-primary bg-transparent border-none cursor-pointer">Explore</button>
          <Link to="/about" className="font-body-md text-on-surface-variant hover:text-primary" onClick={() => setMobileOpen(false)}>The Estate</Link>
          <Link to="/booking" className="mt-2 bg-primary text-on-primary px-6 py-3 rounded-full font-label-md text-center" onClick={() => setMobileOpen(false)}>Reserve Now</Link>
        </div>
      )}
    </nav>
  );
}
