import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface text-on-surface custom-scrollbar overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop py-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl"
        >
          <div className="font-display-lg text-[120px] leading-none text-primary/20 mb-6 select-none">
            404
          </div>
          <h1 className="font-headline-md text-headline-md text-on-surface mb-4">
            This suite doesn't exist
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">
            The page you're looking for has checked out or was never here. Let us guide you back to the Solaris Terrace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-on-surface text-surface px-8 py-3.5 rounded-full font-label-md text-label-md hover:bg-primary transition-colors duration-300"
            >
              Return Home
            </button>
            <button
              onClick={() => navigate('/rooms')}
              className="bg-surface-container text-on-surface px-8 py-3.5 rounded-full font-label-md text-label-md hover:bg-surface-container-high transition-colors"
            >
              Browse Suites
            </button>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

