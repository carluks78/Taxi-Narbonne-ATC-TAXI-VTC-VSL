import { motion } from 'motion/react';
import { Link, useParams } from 'react-router';
import { Phone, MessageCircle, Plane, Clock, CheckCircle, Star } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

const PHONE = '0768303303';
const PHONE_DISPLAY = '07 68 30 33 03';
const TEAL = '#3AB4B1';
const TEAL_DARK = '#2A9490';

type AirportData = {
  name: string;
  distance: string;
  duration: string;
  price: string;
  description: string;
  seoContent: string;
  tips: string[];
};

const airportData: Record<string, AirportData> = {
  'montpellier': {
    name: 'Aéroport Montpellier Méditerranée',
    distance: '100 km', duration: '1h00', price: '120 – 140 €',
    description: 'Taxi depuis Narbonne vers l\'aéroport de Montpellier Méditerranée (MPL). Service premium, suivi de vol en temps réel, aide aux bagages. Tarif fixe garanti sans surprise.',
    seoContent: 'L\'aéroport de Montpellier Méditerranée (MPL) est situé à 100 km de Narbonne, soit environ 1 heure de trajet. ATC TAXI VTC Narbonne assure des transferts réguliers vers cet aéroport desservant de nombreuses destinations en Europe et en Afrique du Nord. Notre service inclut le suivi de vol en temps réel, une attente gratuite en cas de retard, l\'aide aux bagages et un panneau nominatif pour les arrivées. Tarif fixe Narbonne-Montpellier Aéroport : 120 à 140€ selon l\'adresse de départ. Disponible 24h/24, 7j/7.',
    tips: ['Réservez 24h à l\'avance', 'Suivi vol en temps réel inclus', 'Attente gratuite si retard', 'Aide aux bagages incluse'],
  },
  'toulouse': {
    name: 'Aéroport Toulouse-Blagnac',
    distance: '160 km', duration: '1h30', price: '170 – 200 €',
    description: 'Taxi Narbonne – Aéroport Toulouse Blagnac (TLS). Transfert confortable et rapide vers le 4e aéroport de France. Départ garanti, même de nuit.',
    seoContent: 'L\'aéroport de Toulouse-Blagnac (TLS) est le 4e aéroport français, desservant de nombreuses destinations en France, en Europe et dans le monde. Situé à 160 km de Narbonne, le trajet dure environ 1h30. ATC TAXI VTC Narbonne propose des transferts aller-retour vers Toulouse-Blagnac avec des véhicules spacieux, idéaux pour les familles et les groupes. Tarif fixe Narbonne-Toulouse Aéroport : 170 à 200€. Service disponible pour tous les horaires, y compris les départs très matinaux et les arrivées tardives.',
    tips: ['Départ de nuit possible', 'Suivi vol Toulouse-Blagnac', 'Véhicule spacieux 7 places', 'Climatisation premium'],
  },
  'carcassonne': {
    name: 'Aéroport de Carcassonne',
    distance: '60 km', duration: '45 min', price: '80 – 100 €',
    description: 'Taxi Narbonne – Aéroport de Carcassonne (CCF). Aéroport le plus proche de Narbonne, idéal pour les vols low-cost. Tarif économique, service rapide.',
    seoContent: 'L\'aéroport de Carcassonne-Salvaza (CCF) est l\'aéroport le plus proche de Narbonne, à seulement 60 km. Il desserve principalement des destinations européennes avec des compagnies low-cost comme Ryanair. ATC TAXI VTC Narbonne propose des transferts vers Carcassonne Aéroport en seulement 45 minutes. C\'est la solution la plus économique et la plus rapide pour rejoindre un aéroport depuis Narbonne. Tarif fixe : 80 à 100€. Service disponible 24h/24.',
    tips: ['Aéroport le plus proche', 'Tarif le plus économique', 'Trajet rapide 45 min', 'Vols low-cost Ryanair'],
  },
  'beziers': {
    name: 'Aéroport Béziers Cap d\'Agde',
    distance: '55 km', duration: '50 min', price: '75 – 95 €',
    description: 'Taxi Narbonne – Aéroport de Béziers Cap d\'Agde (BZR). Transfert rapide et confortable vers cet aéroport régional en plein développement.',
    seoContent: 'L\'aéroport de Béziers Cap d\'Agde (BZR) est un aéroport régional en développement, desservant des destinations touristiques européennes, principalement en été. Situé à 55 km de Narbonne, le trajet dure environ 50 minutes. ATC TAXI VTC Narbonne propose des transferts vers Béziers Aéroport depuis Narbonne et toute la région. Service particulièrement adapté pour les vols saisonniers vers les îles britanniques et l\'Europe du Nord.',
    tips: ['50 min depuis Narbonne', 'Tarif compétitif', 'Vols saisonniers', 'Service ponctuel garanti'],
  },
};

export function AirportPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? airportData[slug] : null;

  const airportName = data?.name ?? `Aéroport ${slug?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) ?? ''}`;
  const seoDescription = `Taxi Narbonne → ${airportName}. ${data?.description ?? ''} Tarif fixe, suivi vol, disponible 24h/24. Réservez au ${PHONE_DISPLAY}.`;

  return (
    <div style={{ backgroundColor: '#060F1E' }} className="min-h-screen pt-28">
      <SEOHead
        title={`Taxi Narbonne → ${airportName} | Tarif Fixe – ATC TAXI VTC`}
        description={seoDescription.substring(0, 160)}
        canonical={`/taxi-aeroport-${slug}`}
        keywords={`taxi narbonne ${airportName.toLowerCase()}, transfert narbonne aéroport, taxi aéroport narbonne, navette aéroport narbonne, vtc aéroport narbonne`}
      />

      <section className="py-20 px-4 sm:px-6" style={{ background: 'linear-gradient(180deg, #0A1931 0%, #060F1E 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span style={{ color: TEAL }}>Taxi {airportName}</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-3">
              <Plane size={28} style={{ color: TEAL }} />
              <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: TEAL }}>Transfert Aéroport</span>
            </div>
            <h1 className="text-white mt-2 mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800 }}>
              Taxi Narbonne → {airportName}
            </h1>
            {data && (
              <div className="flex flex-wrap gap-4 mb-5">
                <span className="text-gray-300 text-sm">📍 {data.distance}</span>
                <span className="text-gray-300 text-sm">⏱ {data.duration}</span>
                <span className="font-bold text-sm" style={{ color: TEAL }}>💶 Tarif fixe : {data.price}</span>
              </div>
            )}
            <p className="text-gray-300 mb-8 leading-relaxed max-w-2xl">
              {data?.description ?? `Taxi professionnel depuis Narbonne vers ${airportName}. Service premium 24h/24, ponctualité garantie, suivi de vol inclus.`}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={`tel:${PHONE}`}
                className="flex items-center gap-2 px-7 py-4 rounded-full font-bold text-white text-lg"
                style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}>
                <Phone size={18} /> {PHONE_DISPLAY}
              </a>
              <a href="https://wa.me/33768303303?text=Bonjour%2C%20je%20souhaite%20r%C3%A9server%20un%20taxi%20pour%20l%27a%C3%A9roport."
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-4 rounded-full font-bold text-white text-lg bg-green-600 hover:bg-green-500 transition-colors">
                <MessageCircle size={18} /> Réserver WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Tips */}
        {data?.tips && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {data.tips.map((tip) => (
              <div key={tip} className="flex items-start gap-2 p-4 rounded-xl text-sm"
                style={{ background: '#0D2040', border: `1px solid rgba(58,180,177,0.15)` }}>
                <CheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: TEAL }} />
                <span className="text-gray-200">{tip}</span>
              </div>
            ))}
          </div>
        )}

        {/* Inclusions */}
        <div className="p-7 rounded-2xl mb-10" style={{ background: '#0D2040', border: `1px solid rgba(58,180,177,0.3)` }}>
          <h2 className="text-white font-bold mb-5" style={{ fontSize: '1.3rem' }}>Ce qui est inclus dans votre transfert aéroport</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Prise en charge à domicile ou hôtel',
              'Aide aux valises et bagages',
              'Suivi de vol en temps réel',
              'Attente gratuite si retard de vol',
              'Panneau nominatif à l\'arrivée',
              'Paiement CB ou espèces',
              'Véhicule propre et climatisé',
              'Chauffeur professionnel certifié',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Star size={12} className="flex-shrink-0" style={{ color: TEAL }} />
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Content */}
        <section className="mb-10">
          <h2 className="text-white font-bold mb-4" style={{ fontSize: '1.5rem' }}>
            Pourquoi réserver votre taxi aéroport avec ATC TAXI Narbonne ?
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            {data?.seoContent ?? `ATC TAXI VTC Narbonne est spécialisé dans les transferts aéroport depuis Narbonne et toute l'Aude. Nos chauffeurs expérimentés connaissent parfaitement les routes et les aéroports régionaux.`}
          </p>
          <p className="text-gray-300 leading-relaxed">
            Nous garantissons une ponctualité absolue grâce au suivi de vos vols en temps réel. En cas de retard, votre chauffeur adapte automatiquement l'heure de prise en charge, sans surcoût. Nos tarifs fixes sont convenus à l'avance, sans surprises ni compteur.
          </p>
        </section>

        {/* CTA box */}
        <div className="p-8 rounded-2xl text-center" style={{ background: `linear-gradient(135deg, rgba(58,180,177,0.15), rgba(58,180,177,0.05))`, border: `1px solid rgba(58,180,177,0.4)` }}>
          <Clock size={32} className="mx-auto mb-3" style={{ color: TEAL }} />
          <h3 className="text-white font-bold text-xl mb-2">Réservez votre taxi aéroport</h3>
          <p className="text-gray-300 mb-6">Tarif fixe · Suivi vol inclus · Disponible 24h/24</p>
          <a href={`tel:${PHONE}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-lg"
            style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}>
            <Phone size={18} /> {PHONE_DISPLAY}
          </a>
        </div>

        {/* Internal links */}
        <div className="mt-10 flex flex-wrap gap-3">
          {[
            { label: 'Taxi Narbonne', href: '/taxi-narbonne' },
            { label: 'Taxi Gare Narbonne', href: '/taxi-gare-narbonne' },
            { label: 'Aéroport Montpellier', href: '/taxi-aeroport-montpellier' },
            { label: 'Aéroport Toulouse', href: '/taxi-aeroport-toulouse' },
            { label: 'Aéroport Carcassonne', href: '/taxi-aeroport-carcassonne' },
            { label: 'Toutes les zones', href: '/zones-desservies' },
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
