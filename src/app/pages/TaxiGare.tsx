import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Train, Clock, CheckCircle, Star } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

const PHONE = '0768303303';
const PHONE_DISPLAY = '07 68 30 33 03';
const WHATSAPP = 'https://wa.me/33768303303?text=Bonjour%2C%20je%20souhaite%20un%20taxi%20pour%20la%20gare%20de%20Narbonne.';
const TEAL = '#3AB4B1';
const TEAL_DARK = '#2A9490';

export default function TaxiGare() {
  return (
    <div style={{ backgroundColor: '#060F1E' }} className="min-h-screen pt-28">
      <SEOHead
        title="Taxi Gare SNCF Narbonne 24h/24 | Transfert Train – ATC TAXI VTC"
        description="Taxi pour la gare SNCF de Narbonne, disponible 24h/24. Suivi des trains en temps réel, prise en charge immédiate, aide aux bagages. Réservation au 07 68 30 33 03."
        canonical="/taxi-gare-narbonne"
        keywords="taxi gare narbonne, taxi gare sncf narbonne, transfert gare narbonne, taxi narbonne train, vtc gare narbonne, taxi arrivée train narbonne, navette gare narbonne"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'TaxiService',
          name: 'Taxi Gare Narbonne – ATC TAXI VTC',
          telephone: '+33768303303',
          description: 'Taxi pour la gare SNCF de Narbonne. Service 24h/24, ponctualité garantie, suivi des trains.',
        }}
      />

      <section className="py-20 px-4 sm:px-6" style={{ background: 'linear-gradient(180deg, #0A1931 0%, #060F1E 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link to="/" className="transition-colors hover:text-white">Accueil</Link>
            <span>/</span>
            <span style={{ color: TEAL }}>Taxi Gare Narbonne</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <Train size={36} style={{ color: TEAL }} />
              <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: TEAL }}>Taxi Gare Narbonne</span>
            </div>
            <h1 className="text-white mt-2 mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800 }}>
              Taxi Gare SNCF Narbonne – 24h/24
            </h1>
            <p className="text-gray-300 mb-8 leading-relaxed max-w-2xl">
              ATC TAXI VTC Narbonne assure vos transferts vers et depuis la gare SNCF de Narbonne 24h/24. Suivi des trains en temps réel, prise en charge immédiate à la sortie du train. Idéal pour vos voyages d'affaires, vacances et déplacements professionnels.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={`tel:${PHONE}`}
                className="flex items-center gap-2 px-7 py-4 rounded-full font-bold text-white text-lg"
                style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}>
                <Phone size={18} /> {PHONE_DISPLAY}
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-4 rounded-full font-bold text-white text-lg bg-green-600 hover:bg-green-500 transition-colors">
                <MessageCircle size={18} /> Taxi Gare WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {[
            { icon: <Clock size={24} />, title: 'Disponible 24h/24', desc: 'Même pour les trains de nuit et les TGV matinaux.' },
            { icon: <Train size={24} />, title: 'Suivi des trains', desc: 'Nous suivons votre train en temps réel. Retard ? Pas de problème.' },
            { icon: <Star size={24} />, title: 'Ponctualité garantie', desc: 'Votre chauffeur vous attend à votre sortie de train.' },
          ].map((f) => (
            <div key={f.title} className="p-5 rounded-2xl text-center"
              style={{ background: '#0D2040', border: `1px solid rgba(58,180,177,0.2)` }}>
              <div className="flex justify-center mb-3" style={{ color: TEAL }}>{f.icon}</div>
              <h3 className="text-white font-bold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-8">
          <section>
            <h2 className="text-white font-bold mb-4" style={{ fontSize: '1.5rem' }}>
              Taxi Gare de Narbonne : Transferts garantis
            </h2>
            <p className="text-gray-300 leading-relaxed">
              La gare SNCF de Narbonne est un hub ferroviaire important en Occitanie, desservant les lignes TGV Paris-Barcelone, les Intercités et les TER régionaux. ATC TAXI VTC Narbonne propose un service de taxi gare professionnel et ponctuel, disponible pour toutes les arrivées et départs, 24 heures sur 24.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-4" style={{ fontSize: '1.5rem' }}>
              Services inclus dans votre taxi gare
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Prise en charge à la sortie du train',
                'Aide aux bagages incluse',
                'Tarif affiché à l\'avance',
                'Suivi train en temps réel',
                'Disponible nuit et week-end',
                'Paiement CB ou espèces',
                'Véhicule propre et climatisé',
                'Chauffeur professionnel certifié',
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle size={14} className="flex-shrink-0" style={{ color: TEAL }} />
                  <span className="text-gray-300 text-sm">{point}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-white font-bold mb-4" style={{ fontSize: '1.5rem' }}>
              Liaison Gare de Narbonne vers toute la région
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Depuis la gare de Narbonne, nous assurons vos transferts vers : les hôtels de Narbonne et alentours, Gruissan, Leucate, Sigean, Port-la-Nouvelle, les campings de la Narbonnaise, les domaines viticoles, l'hôpital de Narbonne, et tous les points d'intérêt de l'Aude. Nous assurons également les correspondances train-aéroport pour les vols au départ de Montpellier, Toulouse ou Carcassonne.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-4" style={{ fontSize: '1.5rem' }}>
              Gare de Narbonne – Informations pratiques
            </h2>
            <p className="text-gray-300 leading-relaxed">
              La <strong>Gare SNCF de Narbonne</strong> est située au cœur de la ville, facilement accessible depuis toutes les communes du Narbonnais. Elle est desservie par les TGV Paris-Perpignan-Barcelone, les Intercités, les TER Occitanie et des correspondances régionales. Notre service de taxi assure les prises en charge sur le parvis de la gare, avec panneau nominatif sur demande pour les groupes et les professionnels.
            </p>
          </section>
        </div>

        {/* Internal links */}
        <div className="mt-12 flex flex-wrap gap-3">
          {[
            { label: 'Taxi Narbonne', href: '/taxi-narbonne' },
            { label: 'Taxi Aéroport Montpellier', href: '/taxi-aeroport-montpellier' },
            { label: 'Taxi Aéroport Toulouse', href: '/taxi-aeroport-toulouse' },
            { label: 'Services', href: '/services' },
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
    </div>
  );
}
