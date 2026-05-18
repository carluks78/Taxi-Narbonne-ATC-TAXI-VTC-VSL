import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Phone, Home, MapPin } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export async function loader() {
  return {};
}

const PHONE = '0768303303';
const PHONE_DISPLAY = '07 68 30 33 03';
const TEAL = '#3AB4B1';
const TEAL_DARK = '#2A9490';

export function NotFound() {
  return (
    <div style={{ backgroundColor: '#060F1E' }} className="min-h-screen pt-28 flex items-center justify-center px-4">
      <SEOHead
        title="Page introuvable – 404 | ATC TAXI VTC Narbonne"
        description="La page demandée n'existe pas. Retournez à l'accueil ou contactez ATC TAXI VTC Narbonne au 07 68 30 33 03."
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg"
      >
        <div className="mb-6" style={{ fontSize: '5rem', fontWeight: 800, color: TEAL }}>404</div>
        <h1 className="text-white mb-4" style={{ fontSize: '1.8rem', fontWeight: 700 }}>Page introuvable</h1>
        <p className="text-gray-400 mb-8">
          La page que vous recherchez n'existe pas. Mais notre taxi, lui, est bien disponible 24h/24 !
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold"
            style={{ border: `2px solid rgba(58,180,177,0.5)`, color: TEAL }}>
            <Home size={16} /> Accueil
          </Link>
          <a href={`tel:${PHONE}`}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}>
            <Phone size={16} /> {PHONE_DISPLAY}
          </a>
          <Link to="/zones-desservies"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-gray-300 hover:text-white"
            style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
            <MapPin size={16} /> Zones
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
