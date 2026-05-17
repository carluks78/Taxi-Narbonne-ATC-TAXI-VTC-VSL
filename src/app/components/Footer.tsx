import { Link } from 'react-router';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import logo from '../../imports/ACT_TAXI5.png';

const PHONE = '0768303303';
const PHONE_DISPLAY = '07 68 30 33 03';
const EMAIL = 'atctaxi11@gmail.com';
const WHATSAPP = 'https://wa.me/33768303303';
const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJNxGmHW6soSARohmCBp-l8xQ&source=g.page.m.nr._&laa=nmx-review-solicitation-recommendation-card';

const TEAL = '#3AB4B1';
const TEAL_DARK = '#2A9490';

function GoogleGLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#111111', borderTop: '1px solid rgba(58,180,177,0.2)' }}>
      {/* ── CTA Banner ── */}
      <div style={{ background: `linear-gradient(135deg, ${TEAL} 0%, ${TEAL_DARK} 100%)` }} className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-lg">Besoin d'un taxi maintenant ?</p>
            <p className="text-white/80 text-sm">Disponible 24h/24 – 7j/7 – Réponse immédiate</p>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <a
              href={`tel:${PHONE}`}
              className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-full font-bold text-sm hover:bg-gray-900 transition-colors"
            >
              <Phone size={16} />
              Appeler
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-full font-bold text-sm hover:bg-green-700 transition-colors"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src={logo}
                alt="ATC TAXI VTC Narbonne"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              ATC TAXI VTC Narbonne – Votre partenaire transport premium dans l'Aude. Taxi conventionné CPAM, VTC, transferts gare et aéroport 24h/24.
            </p>
            <div className="space-y-2">
              <a href={`tel:${PHONE}`} className="flex items-center gap-2 text-sm transition-colors" style={{ color: TEAL }}>
                <Phone size={14} />
                {PHONE_DISPLAY}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                <Mail size={14} />
                {EMAIL}
              </a>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin size={14} style={{ color: TEAL }} />
                Narbonne, Aude (11)
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Clock size={14} style={{ color: TEAL }} />
                24h/24 – 7j/7
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 uppercase tracking-wider text-xs" style={{ color: TEAL }}>Nos Services</h3>
            <ul className="space-y-2">
              {[
                { label: 'Taxi Conventionné CPAM', href: '/services' },
                { label: 'Transport VSL Narbonne', href: '/taxi-vsl-narbonne' },
                { label: 'Taxi Gare Narbonne', href: '/taxi-gare-narbonne' },
                { label: 'Taxi Aéroport', href: '/taxi-aeroport-montpellier' },
                { label: 'Transport PMR', href: '/services' },
                { label: 'Mise à disposition', href: '/services' },
                { label: 'Longue distance', href: '/services' },
                { label: 'VTC Narbonne', href: '/taxi-narbonne' },
              ].map((item) => (
                <li key={item.href + item.label}>
                  <Link to={item.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    → {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zones */}
          <div>
            <h3 className="font-semibold mb-4 uppercase tracking-wider text-xs" style={{ color: TEAL }}>Zones desservies</h3>
            <ul className="space-y-2">
              {[
                { label: 'Taxi Narbonne', href: '/taxi-narbonne' },
                { label: 'Taxi Narbonne Plage', href: '/taxi-narbonne-plage' },
                { label: 'Taxi Gruissan', href: '/taxi-gruissan' },
                { label: 'Taxi Leucate', href: '/taxi-leucate' },
                { label: 'Taxi Sigean', href: '/taxi-sigean' },
                { label: 'Taxi Bages', href: '/taxi-bages' },
                { label: 'Taxi Vinassan', href: '/taxi-vinassan' },
                { label: 'Taxi Carcassonne', href: '/taxi-carcassonne' },
              ].map((item) => (
                <li key={item.href + item.label}>
                  <Link to={item.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    → {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Airports & Links */}
          <div>
            <h3 className="font-semibold mb-4 uppercase tracking-wider text-xs" style={{ color: TEAL }}>Transferts Aéroports</h3>
            <ul className="space-y-2 mb-6">
              {[
                { label: 'Aéroport Montpellier', href: '/taxi-aeroport-montpellier' },
                { label: 'Aéroport Toulouse', href: '/taxi-aeroport-toulouse' },
                { label: 'Aéroport Carcassonne', href: '/taxi-aeroport-carcassonne' },
                { label: 'Aéroport Béziers', href: '/taxi-aeroport-beziers' },
                { label: 'Aéroport Barcelone El Prat', href: '/taxi-aeroport-barcelone' },
              ].map((item) => (
                <li key={item.href + item.label}>
                  <Link to={item.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    ✈ {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold mb-4 uppercase tracking-wider text-xs" style={{ color: TEAL }}>Informations</h3>
            <ul className="space-y-2">
              {[
                { label: 'Zones desservies', href: '/zones-desservies' },
                { label: 'Avis clients', href: '/avis-clients' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.href + item.label}>
                  {item.external ? (
                    <a href={item.href} className="text-gray-400 hover:text-white transition-colors text-sm">→ {item.label}</a>
                  ) : (
                    <Link to={item.href} className="text-gray-400 hover:text-white transition-colors text-sm">→ {item.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stars, Rating & Google Review */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-5 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="flex text-xl" style={{ color: TEAL }}>
              {'★★★★★'}
            </div>
            <span className="text-gray-300 text-sm">Note 5/5 – Plus de 200 avis clients vérifiés</span>
          </div>

          {/* Google Reviews Button */}
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 rounded-2xl transition-all hover:scale-105 hover:shadow-xl"
            style={{ background: '#ffffff', border: '2px solid #dadce0', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            aria-label="Laisser un avis Google sur ATC TAXI VTC Narbonne"
          >
            <GoogleGLogo size={24} />
            <div className="flex flex-col leading-tight">
              <span className="text-xs text-gray-500 font-medium">Avis Google</span>
              <span className="text-sm font-bold text-gray-800">Laisser nous un avis</span>
            </div>
            <span className="text-yellow-400" style={{ fontSize: '1.1rem' }}>★★★★★</span>
          </a>

          <p className="text-gray-600 text-xs text-center">
            © {new Date().getFullYear()} ATC TAXI VTC Narbonne – Tous droits réservés | Taxi Narbonne 24h/24
          </p>
        </div>

        {/* SEO Internal links */}
        <div className="mt-6 pt-4 border-t border-white/5">
          <p className="text-gray-600 text-xs leading-relaxed">
            <strong className="text-gray-500">Liens internes :</strong>{' '}
            <Link to="/taxi-narbonne" className="hover:text-gray-400 transition-colors">Taxi Narbonne</Link> •{' '}
            <Link to="/taxi-gare-narbonne" className="hover:text-gray-400 transition-colors">Taxi Gare Narbonne</Link> •{' '}
            <Link to="/taxi-aeroport-montpellier" className="hover:text-gray-400 transition-colors">Taxi Aéroport Montpellier</Link> •{' '}
            <Link to="/taxi-aeroport-toulouse" className="hover:text-gray-400 transition-colors">Taxi Aéroport Toulouse</Link> •{' '}
            <Link to="/taxi-aeroport-carcassonne" className="hover:text-gray-400 transition-colors">Taxi Aéroport Carcassonne</Link> •{' '}
            <Link to="/taxi-aeroport-beziers" className="hover:text-gray-400 transition-colors">Taxi Aéroport Béziers</Link> •{' '}
            <Link to="/taxi-aeroport-barcelone" className="hover:text-gray-400 transition-colors">Taxi Aéroport Barcelone</Link> •{' '}
            <Link to="/taxi-gruissan" className="hover:text-gray-400 transition-colors">Taxi Gruissan</Link> •{' '}
            <Link to="/taxi-leucate" className="hover:text-gray-400 transition-colors">Taxi Leucate</Link> •{' '}
            <Link to="/taxi-sigean" className="hover:text-gray-400 transition-colors">Taxi Sigean</Link> •{' '}
            <Link to="/taxi-narbonne-plage" className="hover:text-gray-400 transition-colors">Taxi Narbonne Plage</Link> •{' '}
            <Link to="/taxi-bages" className="hover:text-gray-400 transition-colors">Taxi Bages</Link> •{' '}
            <Link to="/taxi-vinassan" className="hover:text-gray-400 transition-colors">Taxi Vinassan</Link> •{' '}
            <Link to="/taxi-argeliers" className="hover:text-gray-400 transition-colors">Taxi Argeliers</Link> •{' '}
            <Link to="/taxi-ginestas" className="hover:text-gray-400 transition-colors">Taxi Ginestas</Link> •{' '}
            <Link to="/taxi-bize-minervois" className="hover:text-gray-400 transition-colors">Taxi Bize-Minervois</Link> •{' '}
            <Link to="/taxi-cuxac-daude" className="hover:text-gray-400 transition-colors">Taxi Cuxac-d'Aude</Link> •{' '}
            <Link to="/taxi-le-somail" className="hover:text-gray-400 transition-colors">Taxi Le Somail</Link> •{' '}
            <Link to="/taxi-armissan" className="hover:text-gray-400 transition-colors">Taxi Armissan</Link> •{' '}
            <Link to="/taxi-narbonne-barcelone" className="hover:text-gray-400 transition-colors">Taxi Barcelone</Link> •{' '}
            <Link to="/taxi-reserve-africaine-sigean" className="hover:text-gray-400 transition-colors">Réserve Africaine Sigean</Link> •{' '}
            <Link to="/taxi-vsl-narbonne" className="hover:text-gray-400 transition-colors">VSL Narbonne CPAM</Link> •{' '}
            <Link to="/services" className="hover:text-gray-400 transition-colors">Services taxi</Link> •{' '}
            <Link to="/zones-desservies" className="hover:text-gray-400 transition-colors">Zones desservies</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
