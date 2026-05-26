import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FAQS = [
  {
    q: 'Do you accommodate large private events?',
    a: 'Solaris Terrace is available for exclusive buyouts for weddings and private celebrations. With only 12 suites, we provide an intimate environment for up to 24 guests, with additional nearby arrangements available through our concierge.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'As a boutique property, we offer flexible cancellation up to 30 days prior to arrival for seasonal bookings. Exclusive buyouts and holiday periods may have specific terms provided at the time of reservation.',
  },
  {
    q: 'How do you practice sustainability?',
    a: 'Sustainability is deeply rooted in our family\'s values. We use 100% renewable energy, maintain an organic kitchen garden that supplies 80% of our produce, and operate a zero-single-use-plastic estate.',
  },
  {
    q: 'Do you provide airport transfers?',
    a: 'Yes, our Private Services include luxury transfers from Naples International Airport and Salerno Train Station. We can also arrange private water taxi arrivals directly to our pier.',
  },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden">
      <Navbar />

      <main className="pt-24">

        {/* Hero: The Solaris Legacy */}
        <section className="relative min-h-[921px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
              alt="Solaris Terrace at sunset overlooking the Mediterranean"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(250,249,245,0) 0%, rgba(250,249,245,1) 100%)' }} />
          </div>
          <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl bg-surface/40 backdrop-blur-md p-10 md:p-16 rounded-lg border border-white/20 shadow-2xl"
            >
              <span className="font-label-md text-label-md text-primary tracking-widest uppercase mb-4 block">Established 1994</span>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-8 leading-tight">The Solaris Legacy</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                Solaris Terrace was born from a singular vision: to reconcile the quiet intimacy of a family-run estate with the uncompromising comfort of world-class hospitality. Here, we believe that true luxury lies in the harmony of our land, our heritage, and the pursuit of extraordinary peace.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-tertiary">
                  <span className="material-symbols-outlined">eco</span>
                  <span className="font-label-md text-label-md">100% Sustainable Boutique Estate</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SEO intro */}
        <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-headline-md text-headline-md mb-6">A Sanctuary of Bespoke Elegance</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Nestled above the sun-kissed cliffs of the <span className="font-bold text-secondary">Amalfi Coast</span>, our boutique hotel offers a curated collection of just twelve private suites. We specialize in <span className="font-bold text-secondary">personalized hospitality</span>, <span className="font-bold text-secondary">farm-to-table dining</span>, and <span className="font-bold text-secondary">eco-conscious luxury</span> that leaves a lasting impression on your soul, preserving the beauty of our historic coastline.
            </p>
          </div>
        </section>

        {/* Concierge Section */}
        <section className="py-section-gap bg-surface-container-low overflow-hidden">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2 relative group">
                <div className="absolute -inset-4 bg-primary/5 rounded-lg -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
                <motion.img
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                  alt="Solaris Terrace head concierge"
                  className="relative rounded-lg shadow-xl w-full h-[600px] object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="w-full md:w-1/2"
              >
                <h2 className="font-headline-lg text-headline-lg mb-8">Our Concierge Service</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
                  At Solaris Terrace, we don't just provide a room; we curate your entire journey. Our dedicated concierge team consists of local experts who have called this coast home for generations. From securing the best table at a hidden local taverna to arranging private sunrise boat tours, we ensure every detail of your stay is effortless.
                </p>
                <ul className="space-y-6 mb-10">
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined p-2 bg-secondary/10 text-secondary rounded-lg">support_agent</span>
                    <div>
                      <h4 className="font-title-lg text-title-lg">24/7 Private Assistance</h4>
                      <p className="font-body-md text-body-md text-on-surface-variant">Attentive, personalized care available at any hour of your stay.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined p-2 bg-secondary/10 text-secondary rounded-lg">verified_user</span>
                    <div>
                      <h4 className="font-title-lg text-title-lg">Bespoke Local Experiences</h4>
                      <p className="font-body-md text-body-md text-on-surface-variant">Access to private vineyards and artisanal workshops closed to the public.</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact / Plan Your Visit */}
        <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="font-headline-lg text-headline-lg mb-4">Plan Your Visit</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
                Whether you're looking to book a romantic getaway or inquire about exclusive estate buyouts, our family is ready to welcome yours.
              </p>
              <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="font-label-md text-label-md text-on-surface-variant mb-2 block uppercase tracking-wide">First Name</label>
                    <input
                      className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary outline-none transition-all"
                      placeholder="Elias"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="font-label-md text-label-md text-on-surface-variant mb-2 block uppercase tracking-wide">Last Name</label>
                    <input
                      className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary outline-none transition-all"
                      placeholder="Vanderbilt"
                      type="text"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-label-md text-label-md text-on-surface-variant mb-2 block uppercase tracking-wide">Email Address</label>
                  <input
                    className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary outline-none transition-all"
                    placeholder="elias@guest.com"
                    type="email"
                  />
                </div>
                <div>
                  <label className="font-label-md text-label-md text-on-surface-variant mb-2 block uppercase tracking-wide">Desired Dates &amp; Special Requests</label>
                  <textarea
                    className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary outline-none transition-all resize-none"
                    placeholder="Tell us about your preferred dates or any celebrations..."
                    rows={4}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-5 bg-primary text-on-primary rounded-lg font-label-md text-label-md uppercase tracking-[0.2em] shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 active:scale-95 cursor-pointer"
                >
                  Send Inquiry
                </button>
              </form>
            </div>

            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-surface-container rounded-lg border border-outline-variant/30 md:col-span-2">
                  <h4 className="font-title-lg text-title-lg mb-4">The Estate</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Via Terrazza di Solaris, 24<br />
                    Positano, Salerno 84017<br />
                    Italy
                  </p>
                </div>
                <div className="p-8 bg-primary-container text-on-primary-container rounded-lg shadow-xl flex flex-col justify-center items-center text-center md:col-span-2">
                  <span className="material-symbols-outlined text-4xl mb-4">call</span>
                  <h4 className="font-title-lg text-title-lg">+39 089 123 4567</h4>
                  <p className="font-label-md text-label-md">Direct Reservation Line</p>
                </div>
              </div>

              {/* Map */}
              <div className="relative h-[300px] rounded-lg overflow-hidden shadow-2xl group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80"
                  alt="Amalfi Coast map view"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center">
                  <div className="bg-surface/90 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-3 shadow-lg border border-white/30">
                    <span className="material-symbols-outlined text-secondary">location_on</span>
                    <span className="font-label-md text-label-md text-on-surface">View Estate Location</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-section-gap bg-surface-container-highest">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-16">
              <h2 className="font-headline-lg text-headline-lg">Common Enquiries</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-4">Everything you need to know before your arrival.</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="bg-surface rounded-lg p-6 border border-outline-variant/20 cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex justify-between items-center font-title-lg text-title-lg">
                    <span>{faq.q}</span>
                    <span
                      className="material-symbols-outlined transition-transform duration-300"
                      style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      expand_more
                    </span>
                  </div>
                  {openFaq === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-4 font-body-md text-body-md text-on-surface-variant leading-relaxed overflow-hidden"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO grid */}
        <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm text-on-surface-variant/70 border-t border-outline-variant/30 pt-12">
            <div>
              <h5 className="font-bold text-on-surface mb-3">Our Estate</h5>
              <p>Experience luxury at our <span className="underline">boutique hotel in Positano</span>, featuring panoramic views, <span className="underline">private terrace suites</span>, and authentic Italian hospitality.</p>
            </div>
            <div>
              <h5 className="font-bold text-on-surface mb-3">Private Services</h5>
              <p>Offering <span className="underline">bespoke event planning</span>, private yacht excursions, <span className="underline">in-suite spa treatments</span>, and curated culinary tours of the Amalfi Coast.</p>
            </div>
            <div>
              <h5 className="font-bold text-on-surface mb-3">Eco-Luxury</h5>
              <p>Dedicated to <span className="underline">regenerative hospitality</span>, supporting local artisans, and preserving the natural beauty of the <span className="underline">UNESCO World Heritage</span> site we call home.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
