import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Phone, Train, Heart, Plane, Route, Users, Car, CheckCircle } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export async function loader() {
  return null;
}

const PHONE = '0768303303';
const PHONE_DISPLAY = '07 68 30 33 03';
const TEAL = '#3AB4B1';
const TEAL_DARK = '#2A9490';

const services = [
  {
    icon: <Train size={40} />, title: 'Taxi Gare Narbonne', slug: 'taxi-gare',
    description: 'Transferts professionnels vers et depuis la gare SNCF de Narbonne. Suivi des trains en temps réel, ponctualité garantie. Disponible 24h/24 pour tous les horaires de trains, même de nuit.',
    points: ['Suivi trains en temps réel', 'Ponctualité garantie', 'Nuit et week-end', 'Tarif fixe affiché'],
    href: '/taxi-gare-narbonne',
  },
  {
    icon: <Heart size={40} />, title: 'Taxi Conventionné CPAM', slug: 'taxi-cpam',
    description: 'Transport médical conventionné par l\'Assurance Maladie. VSL agréé pour vos rendez-vous médicaux, hospitalisations, séances de dialyse, chimiothérapie et soins réguliers. Prise en charge Sécu sur prescription.',
    points: ['CPAM agréé', 'VSL conventionné', 'Prescription médicale', 'Dialyse & chimio'],
    href: '/taxi-vsl-narbonne',
  },
  {
    icon: <Plane size={40} />, title: 'Taxi Aéroport', slug: 'taxi-aeroport',
    description: 'Transferts aéroport depuis Narbonne vers Montpellier, Toulouse-Blagnac, Carcassonne, Béziers et Barcelone. Tarifs fixes, suivi de vol, aide aux bagages. Devis gratuit instantané.',
    points: ['Tarif fixe garanti', 'Suivi vol inclus', 'Aide aux bagages', 'Panneau nominatif'],
    href: '/taxi-aeroport-montpellier',
  },
  {
    icon: <Route size={40} />, title: 'Longue Distance', slug: 'longue-distance',
    description: 'Trajets longue distance partout en France et en Europe. Devis personnalisé, tarifs compétitifs, véhicules premium confortables. Idéal pour rejoindre Paris, Lyon, Barcelone, Madrid.',
    points: ['Toute la France', 'Europe (Espagne...)', 'Devis instantané', 'Véhicule premium'],
    href: '/services',
  },
  {
    icon: <Users size={40} />, title: 'Transport PMR', slug: 'pmr',
    description: 'Transport adapté aux personnes à mobilité réduite. Véhicules équipés, assistance personnalisée, chauffeurs formés pour l\'accompagnement PMR. Réservation à l\'avance conseillée.',
    points: ['Véhicules adaptés', 'Chauffeurs formés', 'Accompagnement', 'Réservation facile'],
    href: '/services',
  },
  {
    icon: <Car size={40} />, title: 'Mise à Disposition', slug: 'mise-a-disposition',
    description: 'Chauffeur privé à votre disposition à l\'heure ou à la journée. Idéal pour événements d\'entreprise, mariages, sorties touristiques, visites professionnelles dans l\'Aude.',
    points: ['À l\'heure ou journée', 'Événements & mariages', 'Visite touristique', 'Tarif négociable'],
    href: '/services',
  },
];

export default function Services() {
  return (
    <div style={{ backgroundColor: '#060F1E' }} className="min-h-screen pt-28">
      <SEOHead
        title="Services Taxi VTC Narbonne | CPAM, Gare, Aéroport, PMR, Longue Distance"
        description="Tous les services d'ATC TAXI VTC Narbonne : taxi conventionné CPAM, transfert gare SNCF, aéroport, transport PMR, longue distance, mise à disposition chauffeur. Disponible 24h/24."
        canonical="/services"
        keywords="services taxi narbonne, taxi conventionné cpam narbonne, transport vsl narbonne, taxi aéroport narbonne, transport pmr narbonne, taxi longue distance narbonne, mise à disposition chauffeur narbonne, vtc narbonne services"
      />

      {/* Hero */}
      <section className="py-16 text-center px-4 sm:px-6" style={{ background: 'linear-gradient(180deg, #0A1931 0%, #060F1E 100%)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: TEAL }}>Nos services</span>
          <h1 className="text-white mt-3 mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
            Services Taxi & VTC Narbonne
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            ATC TAXI VTC Narbonne – Tous vos déplacements couverts : conventionné CPAM, gare, aéroport, PMR, longue distance. Disponible 24h/24.
          </p>
        </motion.div>
      </section>

      {/* Services list */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-8">
        {services.map((service, i) => (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden"
            style={{ background: '#0D2040', border: `1px solid rgba(58,180,177,0.2)` }}
          >
            <div className={`flex flex-col md:flex-row ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-1/4 p-8 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, rgba(58,180,177,0.15), rgba(58,180,177,0.05))` }}>
                <div style={{ color: TEAL }}>{service.icon}</div>
              </div>
              <div className="flex-1 p-6 sm:p-8">
                <h2 className="text-white font-bold mb-3" style={{ fontSize: '1.5rem' }}>{service.title}</h2>
                <p className="text-gray-300 mb-5 leading-relaxed">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {service.points.map((pt) => (
                    <span key={pt} className="flex items-center gap-1 text-xs text-gray-300 px-3 py-1.5 rounded-full"
                      style={{ background: `rgba(58,180,177,0.1)`, border: `1px solid rgba(58,180,177,0.25)` }}>
                      <CheckCircle size={10} style={{ color: TEAL }} /> {pt}
                    </span>
                  ))}
                </div>
                <a href={`tel:${PHONE}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}>
                  <Phone size={14} /> Réserver – {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* SEO Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <h2 className="text-white font-bold" style={{ fontSize: '1.5rem' }}>
            ATC TAXI VTC Narbonne – Vos services de transport dans l'Aude
          </h2>
          <p>
            <strong className="text-white">ATC TAXI VTC Narbonne</strong> est une société de taxi et VTC professionnelle proposant une gamme complète de services de transport dans le département de l'Aude (11) et la région Occitanie. Que vous soyez un particulier, un professionnel ou un patient en besoin de transport médical, nous avons la solution adaptée à vos besoins.
          </p>
          <p>
            Notre <strong>taxi conventionné CPAM</strong> (VSL – Véhicule Sanitaire Léger) est agréé par l'Assurance Maladie pour le transport de patients vers leurs rendez-vous médicaux : consultations spécialisées, hospitalisations programmées, séances de dialyse, chimiothérapie, kinésithérapie et tout autre soin nécessitant un transport sanitaire. Avec une prescription médicale de transport, votre trajet est pris en charge par la Sécurité Sociale.
          </p>
          <p>
            Pour vos <strong>transferts aéroport</strong>, nous desservons l'ensemble des aéroports régionaux : Montpellier Méditerranée (MPL), Toulouse-Blagnac (TLS), Carcassonne (CCF), Béziers-Cap d'Agde (BZR) et l'aéroport international de Barcelone El Prat (BCN). Chaque transfert inclut le suivi de vol en temps réel, une attente gratuite en cas de retard et l'aide aux bagages.
          </p>
          <p>
            Nos <strong>services de mise à disposition</strong> permettent à nos clients professionnels de bénéficier d'un chauffeur privé à l'heure ou à la journée. Idéal pour les déplacements d'affaires, les événements corporate, les mariages, les visites touristiques et les sorties dans l'Aude. Facturation disponible pour les entreprises.
          </p>
        </div>

        {/* Internal links */}
        <div className="mt-10">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">Pages liées</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Taxi Narbonne', href: '/taxi-narbonne' },
              { label: 'Taxi Gare Narbonne', href: '/taxi-gare-narbonne' },
              { label: 'Taxi Conventionné CPAM', href: '/taxi-vsl-narbonne' },
              { label: 'Aéroport Montpellier', href: '/taxi-aeroport-montpellier' },
              { label: 'Zones desservies', href: '/zones-desservies' },
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
      </section>

      <div className="text-center pb-16 px-4">
        <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-lg transition-colors"
          style={{ border: `2px solid rgba(58,180,177,0.5)` }}>
          Demander un devis gratuit →
        </Link>
      </div>
    </div>
  );
}
