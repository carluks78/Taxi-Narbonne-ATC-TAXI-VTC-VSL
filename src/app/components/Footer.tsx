import { Link } from 'react-router';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import logo from '../../imports/ACT_TAXI5.png';

const PHONE = '0768303303';
const PHONE_DISPLAY = '07 68 30 33 03';
const EMAIL = 'atctaxi11@gmail.com';
const WHATSAPP = 'https://wa.me/33768303303';

const TEAL = '#3AB4B1';
const TEAL_DARK = '#2A9490';

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
                { label: 'Taxi Gruissan', href: '/taxi-gruissan' },
                { label: 'Taxi Leucate', href: '/taxi-leucate' },
                { label: 'Taxi Sigean', href: '/taxi-sigean' },
                { label: 'Taxi Port-la-Nouvelle', href: '/taxi-port-la-nouvelle' },
                { label: 'Taxi Peyriac-de-Mer', href: '/taxi-peyriac-de-mer' },
                { label: 'Taxi Carcassonne', href: '/taxi-carcassonne' },
                { label: 'Taxi Béziers', href: '/taxi-beziers-cap-dagde' },
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
                { label: 'Aéroport Barcelone', href: '/taxi-narbonne-barcelone' },
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
                { label: 'Sitemap', href: '/sitemap.xml', external: true },
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

        {/* Stars & Rating */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex text-xl" style={{ color: TEAL }}>
              {'★★★★★'}
            </div>
            <span className="text-gray-300 text-sm">Note 5/5 – Plus de 200 avis clients vérifiés</span>
          </div>
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
            <Link to="/taxi-gruissan" className="hover:text-gray-400 transition-colors">Taxi Gruissan</Link> •{' '}
            <Link to="/taxi-leucate" className="hover:text-gray-400 transition-colors">Taxi Leucate</Link> •{' '}
            <Link to="/taxi-sigean" className="hover:text-gray-400 transition-colors">Taxi Sigean</Link> •{' '}
            <Link to="/services" className="hover:text-gray-400 transition-colors">Services taxi</Link> •{' '}
            <Link to="/zones-desservies" className="hover:text-gray-400 transition-colors">Zones desservies</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}