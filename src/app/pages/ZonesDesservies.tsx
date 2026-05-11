import { motion } from 'motion/react';
import { Link } from 'react-router';
import { MapPin, Phone } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

const PHONE = '0768303303';
const TEAL = '#3AB4B1';
const TEAL_DARK = '#2A9490';

const zones = [
  { city: 'Narbonne', dept: 'Aude (11)', km: '0', href: '/taxi-narbonne', desc: 'Centre ville, gare, hôpital, résidences' },
  { city: 'Gruissan', dept: 'Aude (11)', km: '15', href: '/taxi-gruissan', desc: 'Village, plage, chalets, casino' },
  { city: 'Leucate', dept: 'Aude (11)', km: '25', href: '/taxi-leucate', desc: 'Port Leucate, La Franqui, Leucate Plage' },
  { city: 'Sigean', dept: 'Aude (11)', km: '20', href: '/taxi-sigean', desc: 'Réserve africaine, village, clinique' },
  { city: 'Port-la-Nouvelle', dept: 'Aude (11)', km: '30', href: '/taxi-port-la-nouvelle', desc: 'Port, centre, pôle industriel' },
  { city: 'Peyriac-de-Mer', dept: 'Aude (11)', km: '18', href: '/taxi-peyriac-de-mer', desc: 'Étang de Bages, village' },
  { city: 'Coursan', dept: 'Aude (11)', km: '8', href: '/taxi-coursan', desc: 'Commune proche de Narbonne' },
  { city: 'Carcassonne', dept: 'Aude (11)', km: '60', href: '/taxi-carcassonne', desc: 'Cité médiévale, gare, aéroport' },
  { city: 'Béziers', dept: 'Hérault (34)', km: '55', href: '/taxi-beziers-cap-dagde', desc: 'Centre, Cap d\'Agde, aéroport' },
  { city: 'Montpellier', dept: 'Hérault (34)', km: '100', href: '/taxi-aeroport-montpellier', desc: 'Aéroport Méditerranée, centre' },
  { city: 'Toulouse', dept: 'Haute-Garonne (31)', km: '160', href: '/taxi-aeroport-toulouse', desc: 'Aéroport Blagnac, centre' },
  { city: 'Barcelone', dept: 'Espagne', km: '220', href: '/taxi-narbonne-barcelone', desc: 'Aéroport El Prat, port, centre' },
];

export function ZonesDesservies() {
  return (
    <div style={{ backgroundColor: '#060F1E' }} className="min-h-screen pt-28">
      <SEOHead
        title="Zones Desservies Taxi Narbonne | Aude, Hérault, Occitanie – ATC TAXI VTC"
        description="ATC TAXI VTC Narbonne dessert toute l'Aude et l'Hérault : Gruissan, Leucate, Sigean, Port-la-Nouvelle, Carcassonne, Béziers, Montpellier, Toulouse, Barcelone. Taxi 24h/24."
        canonical="/zones-desservies"
        keywords="zones taxi narbonne, taxi aude 11, taxi hérault 34, taxi gruissan, taxi leucate, taxi sigean, taxi port-la-nouvelle, taxi carcassonne, taxi béziers, taxi montpellier depuis narbonne, taxi occitanie"
      />

      <section className="py-16 text-center px-4 sm:px-6" style={{ background: 'linear-gradient(180deg, #0A1931 0%, #060F1E 100%)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: TEAL }}>Zones desservies</span>
          <h1 className="text-white mt-3 mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
            Taxi Narbonne – Toute la région
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            ATC TAXI VTC Narbonne dessert l'ensemble du département de l'Aude, l'Hérault, l'Occitanie et les longues distances vers l'Espagne.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {zones.map((zone, i) => (
            <motion.div
              key={zone.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link to={zone.href}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="p-5 rounded-2xl h-full cursor-pointer"
                  style={{ background: '#0D2040', border: `1px solid rgba(58,180,177,0.2)` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} style={{ color: TEAL }} />
                      <span className="font-bold text-white">{zone.city}</span>
                    </div>
                    {zone.km !== '0' && (
                      <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">{zone.km} km</span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs mb-2">{zone.dept}</p>
                  <p className="text-gray-300 text-sm">{zone.desc}</p>
                  <div className="mt-4 text-xs font-semibold" style={{ color: TEAL }}>Réserver →</div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* SEO Content */}
        <div className="mt-16 space-y-6 text-gray-300 leading-relaxed">
          <h2 className="text-white font-bold" style={{ fontSize: '1.5rem' }}>
            Taxi Narbonne – Zone d'intervention étendue dans l'Aude et l'Hérault
          </h2>
          <p>
            <strong className="text-white">ATC TAXI VTC Narbonne</strong> intervient dans un large périmètre autour de Narbonne, couvrant l'ensemble du Narbonnais, le Minervois, les Corbières et le littoral audois. Notre service de taxi est disponible <strong>24h/24, 7j/7</strong> pour tous vos déplacements locaux, régionaux et longue distance.
          </p>
          <p>
            Dans le <strong>département de l'Aude (11)</strong>, nous desservons notamment : Narbonne, Gruissan, Leucate, Port Leucate, La Franqui, Sigean, Port-la-Nouvelle, Peyriac-de-Mer, Coursan, Vinassan, Bages, Montredon-des-Corbières, Lézignan-Corbières, Carcassonne et bien d'autres communes.
          </p>
          <p>
            Dans l'<strong>Hérault (34)</strong>, nous intervenons vers Béziers, Cap d'Agde, Agde, Valras-Plage, Pézenas, Sète et l'aéroport de Montpellier Méditerranée. Nous assurons également des transferts longue distance vers Toulouse, Perpignan, Marseille, Paris et l'Espagne (Barcelone, Gérone).
          </p>
        </div>

        <div className="mt-12 p-8 rounded-2xl text-center" style={{ background: '#0D2040', border: `1px solid rgba(58,180,177,0.3)` }}>
          <h2 className="text-white font-bold text-2xl mb-3">Vous ne trouvez pas votre ville ?</h2>
          <p className="text-gray-300 mb-6">Appelez-nous directement, nous desservons tout l'Aude et l'Hérault.</p>
          <a href={`tel:${PHONE}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-lg"
            style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}>
            <Phone size={18} /> Nous contacter
          </a>
        </div>

        {/* Internal links */}
        <div className="mt-10 flex flex-wrap gap-3">
          {[
            { label: 'Accueil', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'Taxi Narbonne', href: '/taxi-narbonne' },
            { label: 'Aéroport Montpellier', href: '/taxi-aeroport-montpellier' },
            { label: 'Contact', href: '/contact' },
          ].map((link) => (
            <Link key={link.href} to={link.href}
              className="text-sm px-4 py-2 rounded-full transition-colors hover:text-white"
              style={{ border: `1px solid rgba(58,180,177,0.3)`, color: TEAL }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
