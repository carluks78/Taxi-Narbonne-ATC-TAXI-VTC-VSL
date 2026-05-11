import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Menu, X, ChevronDown, MapPin, Plane, Briefcase } from 'lucide-react';
import logo from '../../imports/ACT_TAXI5.png';

const PHONE = '0768303303';
const PHONE_DISPLAY = '07 68 30 33 03';

const TEAL = '#3AB4B1';
const TEAL_DARK = '#2A9490';

const marqueeItems = [
  '⭐ Service noté 5/5',
  '🚖 Taxi Narbonne 24h/24 7j/7',
  '✅ Conventionné CPAM – Transport médical',
  '✈️ Transferts Aéroports Montpellier · Toulouse · Carcassonne',
  '🚉 Taxi Gare SNCF Narbonne',
  '📱 Réservation immédiate – Réponse < 5 min',
  '💳 Paiement CB accepté',
  '🗺️ Gruissan · Leucate · Sigean · Port-la-Nouvelle · Carcassonne',
  '🌍 Longue distance – Barcelone – France entière',
];

const zonesMenu = [
  { label: 'Taxi Gruissan', href: '/taxi-gruissan' },
  { label: 'Taxi Leucate', href: '/taxi-leucate' },
  { label: 'Taxi Sigean', href: '/taxi-sigean' },
  { label: 'Taxi Port-la-Nouvelle', href: '/taxi-port-la-nouvelle' },
  { label: 'Taxi Narbonne Plage', href: '/taxi-narbonne-plage' },
  { label: 'Taxi Peyriac-de-Mer', href: '/taxi-peyriac-de-mer' },
  { label: 'Taxi Bages', href: '/taxi-bages' },
  { label: 'Taxi Carcassonne', href: '/taxi-carcassonne' },
  { label: 'Taxi Béziers', href: '/taxi-beziers-cap-dagde' },
  { label: 'Taxi Coursan', href: '/taxi-coursan' },
  { label: 'Taxi Vinassan', href: '/taxi-vinassan' },
  { label: 'Taxi Cuxac-d\'Aude', href: '/taxi-cuxac-daude' },
  { label: 'Taxi Armissan', href: '/taxi-armissan' },
  { label: 'Taxi Argeliers', href: '/taxi-argeliers' },
  { label: 'Taxi Ginestas', href: '/taxi-ginestas' },
  { label: 'Taxi Bize-Minervois', href: '/taxi-bize-minervois' },
  { label: 'Taxi Le Somail', href: '/taxi-le-somail' },
  { label: 'Taxi Barcelone', href: '/taxi-narbonne-barcelone' },
  { label: 'Réserve Africaine Sigean', href: '/taxi-reserve-africaine-sigean' },
];

const servicesMenu = [
  { label: 'Taxi Conventionné CPAM', href: '/services' },
  { label: 'Taxi VSL Narbonne', href: '/taxi-vsl-narbonne' },
  { label: 'Transport PMR', href: '/services' },
  { label: 'Mise à disposition', href: '/services' },
  { label: 'Longue distance', href: '/services' },
];

const airportsMenu = [
  { label: 'Aéroport Montpellier', href: '/taxi-aeroport-montpellier' },
  { label: 'Aéroport Toulouse', href: '/taxi-aeroport-toulouse' },
  { label: 'Aéroport Carcassonne', href: '/taxi-aeroport-carcassonne' },
  { label: 'Aéroport Béziers', href: '/taxi-aeroport-beziers' },
  { label: 'Aéroport Barcelone', href: '/taxi-aeroport-barcelone' },
];

function DropdownMenu({ items, onClose }: { items: { label: string; href: string }[]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
      className="absolute top-full left-0 mt-1 w-56 rounded-xl overflow-hidden shadow-2xl z-50"
      style={{ background: '#1A1A1A', border: `1px solid rgba(58,180,177,0.3)` }}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          onClick={onClose}
          className="block px-4 py-3 text-sm text-gray-200 transition-colors"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = TEAL; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = ''; }}
        >
          {item.label}
        </Link>
      ))}
    </motion.div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const marqueeContent = marqueeItems.join('    •    ');

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: '#111111',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.6)' : '0 2px 10px rgba(0,0,0,0.4)',
      }}
    >
      {/* ── Scrolling Top Bar ── */}
      <div
        className="border-b py-1.5"
        style={{ backgroundColor: '#0D0D0D', borderColor: `rgba(58,180,177,0.2)` }}
        aria-label="Informations taxi Narbonne"
      >
        <div className="marquee-container">
          <div className="marquee-track">
            {/* Duplicate for seamless loop */}
            {[0, 1].map((copy) => (
              <span key={copy} className="text-xs text-gray-300 px-6">
                {marqueeContent}&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src={logo}
              alt="ATC TAXI VTC Narbonne"
              className="h-11 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            <Link
              to="/"
              className="px-3 py-2 text-sm text-gray-200 transition-colors whitespace-nowrap hover:text-white"
              style={{ color: location.pathname === '/' ? TEAL : undefined }}
            >
              Accueil
            </Link>
            <Link
              to="/taxi-narbonne"
              className="px-3 py-2 text-sm text-gray-200 transition-colors whitespace-nowrap hover:text-white"
              style={{ color: location.pathname === '/taxi-narbonne' ? TEAL : undefined }}
            >
              Taxi Narbonne
            </Link>
            <Link
              to="/taxi-gare-narbonne"
              className="px-3 py-2 text-sm text-gray-200 transition-colors whitespace-nowrap hover:text-white"
            >
              Taxi Gare
            </Link>

            {/* Zones dropdown */}
            <div className="relative" onMouseEnter={() => handleMouseEnter('zones')} onMouseLeave={handleMouseLeave}>
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-200 transition-colors whitespace-nowrap hover:text-white"
                style={{ color: activeDropdown === 'zones' ? TEAL : undefined }}
              >Zones desservies<MapPin size={14} /><ChevronDown size={14} className={`transition-transform ${activeDropdown === 'zones' ? 'rotate-180' : ''}`} /></button>
              <AnimatePresence>
                {activeDropdown === 'zones' && (
                  <DropdownMenu items={zonesMenu} onClose={() => setActiveDropdown(null)} />
                )}
              </AnimatePresence>
            </div>

            {/* Services dropdown */}
            <div className="relative" onMouseEnter={() => handleMouseEnter('services')} onMouseLeave={handleMouseLeave}>
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-200 transition-colors whitespace-nowrap hover:text-white"
                style={{ color: activeDropdown === 'services' ? TEAL : undefined }}
              >
                <Briefcase size={14} />
                Services
                <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <DropdownMenu items={servicesMenu} onClose={() => setActiveDropdown(null)} />
                )}
              </AnimatePresence>
            </div>

            {/* Airports dropdown */}
            <div className="relative" onMouseEnter={() => handleMouseEnter('airports')} onMouseLeave={handleMouseLeave}>
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-200 transition-colors whitespace-nowrap hover:text-white"
                style={{ color: activeDropdown === 'airports' ? TEAL : undefined }}
              >
                <Plane size={14} />
                Aéroports
                <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'airports' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'airports' && (
                  <DropdownMenu items={airportsMenu} onClose={() => setActiveDropdown(null)} />
                )}
              </AnimatePresence>
            </div>

            <Link to="/avis-clients" className="px-3 py-2 text-sm text-gray-200 hover:text-white transition-colors whitespace-nowrap">
              Avis clients
            </Link>
            <Link to="/contact" className="px-3 py-2 text-sm text-gray-200 hover:text-white transition-colors">
              Contact
            </Link>

            <a
              href={`tel:${PHONE}`}
              className="ml-3 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white transition-all hover:scale-105 hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}
            >
              <Phone size={14} />
              Réserver
            </a>
          </div>

          {/* Mobile: phone + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href={`tel:${PHONE}`}
              className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-bold text-white"
              style={{ background: TEAL }}
              aria-label="Appeler ATC Taxi"
            >
              <Phone size={14} />
              <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-white hover:opacity-80 transition-opacity"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t"
            style={{ backgroundColor: '#111111', borderColor: `rgba(58,180,177,0.2)` }}
          >
            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {[
                { label: 'Accueil', href: '/' },
                { label: 'Taxi Narbonne', href: '/taxi-narbonne' },
                { label: 'Taxi Gare Narbonne', href: '/taxi-gare-narbonne' },
                { label: 'Services', href: '/services' },
                { label: 'Taxi Conventionné CPAM', href: '/taxi-vsl-narbonne' },
                { label: '✈ Aéroport Montpellier', href: '/taxi-aeroport-montpellier' },
                { label: '✈ Aéroport Toulouse', href: '/taxi-aeroport-toulouse' },
                { label: '✈ Aéroport Carcassonne', href: '/taxi-aeroport-carcassonne' },
                { label: '✈ Aéroport Béziers', href: '/taxi-aeroport-beziers' },
                { label: '✈ Aéroport Barcelone', href: '/taxi-aeroport-barcelone' },
                { label: '📍 Taxi Gruissan', href: '/taxi-gruissan' },
                { label: '📍 Taxi Leucate', href: '/taxi-leucate' },
                { label: '📍 Taxi Sigean', href: '/taxi-sigean' },
                { label: '📍 Taxi Port-la-Nouvelle', href: '/taxi-port-la-nouvelle' },
                { label: 'Zones desservies', href: '/zones-desservies' },
                { label: 'Avis clients', href: '/avis-clients' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 px-4 text-gray-200 border-b border-white/5 transition-colors hover:text-white"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={`tel:${PHONE}`}
                className="flex items-center justify-center gap-2 mt-4 py-3 rounded-full font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}
              >
                <Phone size={16} />
                {PHONE_DISPLAY}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}