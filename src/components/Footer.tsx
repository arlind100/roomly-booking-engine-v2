import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/20 pt-section-gap pb-12">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-20">

          {/* Brand */}
          <div className="col-span-1">
            <div className="font-display-lg text-headline-md text-primary mb-8 uppercase tracking-widest">SOLARIS TERRACE</div>
            <p className="font-body-md text-on-surface-variant mb-8 max-w-xs">
              Redefining coastal luxury through impeccable service and unparalleled views on the Amalfi Coast.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined text-xl">public</span>
              </a>
            </div>
          </div>

          {/* The Hotel */}
          <div>
            <h4 className="font-title-lg text-on-surface mb-8">The Hotel</h4>
            <ul className="space-y-4">
              <li><Link to="/rooms" className="font-body-md text-on-surface-variant hover:text-tertiary underline transition-all">Our Suites</Link></li>
              <li><a href="#" className="font-body-md text-on-surface-variant hover:text-tertiary underline transition-all">Beach Club</a></li>
              <li><a href="#" className="font-body-md text-on-surface-variant hover:text-tertiary underline transition-all">Wellness Spa</a></li>
              <li><a href="#" className="font-body-md text-on-surface-variant hover:text-tertiary underline transition-all">Dining &amp; Bars</a></li>
            </ul>
          </div>

          {/* Discover Amalfi */}
          <div>
            <h4 className="font-title-lg text-on-surface mb-8">Discover Amalfi</h4>
            <ul className="space-y-4">
              <li><a href="#" className="font-body-md text-on-surface-variant hover:text-tertiary underline transition-all">Local Guide</a></li>
              <li><a href="#" className="font-body-md text-on-surface-variant hover:text-tertiary underline transition-all">Private Charters</a></li>
              <li><a href="#" className="font-body-md text-on-surface-variant hover:text-tertiary underline transition-all">Hidden Gems</a></li>
              <li><Link to="/about" className="font-body-md text-on-surface-variant hover:text-tertiary underline transition-all">Sustainability</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-title-lg text-on-surface mb-8">Contact</h4>
            <ul className="space-y-4">
              <li><Link to="/booking" className="font-body-md text-on-surface-variant hover:text-tertiary underline transition-all">Reservations</Link></li>
              <li><Link to="/about" className="font-body-md text-on-surface-variant hover:text-tertiary underline transition-all">Location</Link></li>
              <li><a href="#" className="font-body-md text-on-surface-variant hover:text-tertiary underline transition-all">Media Center</a></li>
              <li><a href="#" className="font-body-md text-on-surface-variant hover:text-tertiary underline transition-all">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-outline-variant/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-label-md text-label-md text-on-surface-variant uppercase">© 2024 SOLARIS TERRACE. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-lg">language</span>
            <span className="font-label-md text-label-md">EN (US) - USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
