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

const SEO_BLOCKS = [
  { title: 'Our Estate', text: 'Experience luxury at our boutique hotel in Positano, featuring panoramic views, private terrace suites, and authentic Italian hospitality.' },
  { title: 'Private Services', text: 'Offering bespoke event planning, private yacht excursions, in-suite spa treatments, and curated culinary tours of the Amalfi Coast.' },
  { title: 'Eco-Luxury', text: 'Dedicated to regenerative hospitality, supporting local artisans, and preserving the natural beauty of the UNESCO World Heritage site we call home.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-background text-on-surface">
      <Navbar />

      <main className="pt-24">
        {/* â”€â”€ Hero: The Solaris Legacy â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className="relative min-h-[760px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=85&fit=crop"
              alt="Solaris Terrace Hotel Terrace"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(250,249,245,0) 0%, rgba(250,249,245,1) 100%)' }} />
          </div>
          <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
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

        {/* â”€â”€ SEO Content Block â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="font-headline-md text-headline-md mb-6">A Sanctuary of Bespoke Elegance</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Nestled above the sun-kissed cliffs of the <span className="font-bold text-secondary">Amalfi Coast</span>, our boutique hotel offers a curated collection of just twelve private suites. We specialize in{' '}
              <span className="font-bold text-secondary">personalized hospitality</span>,{' '}
              <span className="font-bold text-secondary">farm-to-table dining</span>, and{' '}
              <span className="font-bold text-secondary">eco-conscious luxury</span> that leaves a lasting impression on your soul, preserving the beauty of our historic coastline.
            </p>
          </div>
        </motion.section>

        {/* â”€â”€ Concierge Service â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className="py-section-gap bg-surface-container-low overflow-hidden">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="w-full md:w-1/2 relative group"
              >
                <div className="absolute -inset-4 bg-primary/5 rounded-lg -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=85&fit=crop"
                  alt="Solaris Terrace Concierge"
                  className="relative rounded-lg shadow-xl w-full h-[600px] object-cover"
                />
              </motion.div>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="w-full md:w-1/2"
              >
                <h2 className="font-headline-lg text-headline-lg mb-8">Our Concierge Service</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
                  At Solaris Terrace, we don't just provide a room; we curate your entire journey. Our dedicated concierge team consists of local experts who have called this coast home for generations. From securing the best table at a hidden local taverna to arranging private sunrise boat tours, we ensure every detail of your stay is effortless.
                </p>
                <ul className="space-y-6 mb-10">
                  {[
                    { icon: 'support_agent', title: '24/7 Private Assistance', desc: 'Attentive, personalized care available at any hour of your stay.' },
                    { icon: 'verified_user', title: 'Bespoke Local Experiences', desc: 'Access to private vineyards and artisanal workshops closed to the public.' },
                  ].map(item => (
                    <li key={item.title} className="flex items-start gap-4">
                      <span className="material-symbols-outlined p-2 bg-secondary/10 text-secondary rounded-lg">{item.icon}</span>
                      <div>
                        <h4 className="font-title-lg text-title-lg">{item.title}</h4>
                        <p className="font-body-md text-body-md text-on-surface-variant">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* â”€â”€ Contact / Plan Your Visit â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="font-headline-lg text-headline-lg mb-4">Plan Your Visit</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
                Whether you're looking to book a romantic getaway or inquire about exclusive estate buyouts, our family is ready to welcome yours.
              </p>
              <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="font-label-md text-label-md text-on-surface-variant mb-2 block uppercase tracking-wide">First Name</label>
                    <input type="text" placeholder="Elias" className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary outline-none transition-all" />
                  </div>
                  <div>
                    <label className="font-label-md text-label-md text-on-surface-variant mb-2 block uppercase tracking-wide">Last Name</label>
                    <input type="text" placeholder="Vanderbilt" className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="font-label-md text-label-md text-on-surface-variant mb-2 block uppercase tracking-wide">Email Address</label>
                  <input type="email" placeholder="elias@guest.com" className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary outline-none transition-all" />
                </div>
                <div>
                  <label className="font-label-md text-label-md text-on-surface-variant mb-2 block uppercase tracking-wide">Desired Dates &amp; Special Requests</label>
                  <textarea rows={4} placeholder="Tell us about your preferred dates or any celebrations..." className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-secondary outline-none transition-all resize-none" />
                </div>
                <button type="submit" className="w-full py-5 bg-primary text-on-primary rounded-lg font-label-md text-label-md uppercase tracking-[0.2em] shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 active:scale-95">
                  Send Inquiry
                </button>
              </form>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-12"
            >
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
              <div className="relative h-[300px] rounded-lg overflow-hidden shadow-2xl group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=85&fit=crop"
                  alt="Map of Positano"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center">
                  <div className="bg-surface/90 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-3 shadow-lg border border-white/30">
                    <span className="material-symbols-outlined text-secondary">location_on</span>
                    <span className="font-label-md text-label-md text-on-surface">View Estate Location</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* â”€â”€ FAQ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className="py-section-gap bg-surface-container-highest">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-headline-lg text-headline-lg">Common Enquiries</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-4">Everything you need to know before your arrival.</p>
            </motion.div>
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
                      className="material-symbols-outlined transition-transform duration-300 shrink-0 ml-4"
                      style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      expand_more
                    </span>
                  </div>
                  {openFaq === i && (
                    <div className="mt-4 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* â”€â”€ SEO Grid â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm text-on-surface-variant/70 border-t border-outline-variant/30 pt-12">
            {SEO_BLOCKS.map(b => (
              <div key={b.title}>
                <h5 className="font-bold text-on-surface mb-3">{b.title}</h5>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

