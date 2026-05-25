import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  Phone, MessageCircle, Star, ChevronDown, ChevronUp,
  Train, Heart, Plane, Route, Users, Clock,
  CreditCard, Car, Shield, Award, MapPin, CheckCircle
} from 'lucide-react';
import heroImg from '../../imports/taxi_narbonne_gare_vsl.png';
import { SEOHead } from '../components/SEOHead';

const PHONE = '0768303303';
const PHONE_DISPLAY = '07 68 30 33 03';
const WHATSAPP = 'https://wa.me/33768303303?text=Bonjour%2C%20je%20souhaite%20r%C3%A9server%20un%20taxi.';
const TEAL = '#3AB4B1';
const TEAL_DARK = '#2A9490';

const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJNxGmHW6soSARohmCBp-l8xQ&source=g.page.m.nr._&laa=nmx-review-solicitation-recommendation-card';

function GoogleGLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

const services = [
  {
    icon: <Train size={32} />, title: 'Taxi Gare Narbonne',
    desc: 'Transferts gare SNCF de Narbonne. Ponctualité garantie, suivi des trains en temps réel.',
    href: '/taxi-gare-narbonne', badge: 'Populaire',
  },
  {
    icon: <Heart size={32} />, title: 'Taxi Conventionné CPAM',
    desc: 'Transport médical conventionné. Prise en charge Assurance Maladie, VSL agréé.',
    href: '/taxi-vsl-narbonne', badge: 'CPAM',
  },
  {
    icon: <Plane size={32} />, title: 'Taxi Aéroport',
    desc: 'Transferts vers Montpellier, Toulouse, Carcassonne, Barcelone. Tarif fixe garanti.',
    href: '/taxi-aeroport-montpellier', badge: 'Vol suivi',
  },
  {
    icon: <Route size={32} />, title: 'Longue Distance',
    desc: 'Trajets longue distance toute la France. Devis immédiat, confort premium.',
    href: '/services', badge: null,
  },
  {
    icon: <Users size={32} />, title: 'Transport PMR',
    desc: 'Véhicules adaptés aux personnes à mobilité réduite. Accompagnement personnalisé.',
    href: '/services', badge: 'PMR',
  },
  {
    icon: <Car size={32} />, title: 'Mise à Disposition',
    desc: 'Chauffeur privé à votre disposition à l\'heure ou à la journée.',
    href: '/services', badge: null,
  },
];

const features = [
  { icon: <Clock size={28} />, title: 'Disponible 24h/24', desc: '7 jours sur 7, même les jours fériés et la nuit.' },
  { icon: <Heart size={28} />, title: 'CPAM Agréé', desc: 'Transport médical conventionné, prise en charge Sécu.' },
  { icon: <CreditCard size={28} />, title: 'Paiement CB', desc: 'Carte bancaire, espèces, virement. Reçu fourni.' },
  { icon: <Car size={28} />, title: 'Véhicules Premium', desc: 'Flotte récente, climatisée, entretenue régulièrement.' },
  { icon: <Shield size={28} />, title: 'Chauffeurs Pro', desc: 'Tous certifiés, expérimentés, courtois et discrets.' },
  { icon: <Award size={28} />, title: 'Service Humain', desc: 'À l\'écoute, ponctuel, service personnalisé garanti.' },
];

const testimonials = [
  { name: 'Marie L.', city: 'Narbonne', text: 'Service impeccable pour mon transfert à l\'aéroport de Montpellier. Ponctuel, véhicule propre, chauffeur très professionnel. Je recommande vivement !', stars: 5 },
  { name: 'Jean-Pierre M.', city: 'Gruissan', text: 'Taxi conventionné pour mes rendez-vous médicaux. Toujours à l\'heure, très agréable. Merci à toute l\'équipe ATC TAXI !', stars: 5 },
  { name: 'Sophie R.', city: 'Leucate', text: 'Excellent service de taxi pour rejoindre la gare de Narbonne. Prix correct, chauffeur sympa. À recommander sans hésiter.', stars: 5 },
  { name: 'Ahmed B.', city: 'Port-la-Nouvelle', text: 'J\'utilise ATC Taxi régulièrement pour mes déplacements professionnels. Fiable, rapide, pro. Top !', stars: 5 },
  { name: 'Isabelle T.', city: 'Sigean', text: 'Transport pour la réserve africaine de Sigean avec mes enfants. Super expérience, chauffeur adorable et à l\'écoute.', stars: 5 },
  { name: 'François D.', city: 'Narbonne', text: 'Transfert de nuit vers l\'aéroport de Toulouse. Aucun souci, taxi à l\'heure pile, voyage très confortable.', stars: 5 },
  { name: 'Carole V.', city: 'Carcassonne', text: 'Taxi depuis Narbonne jusqu\'à Carcassonne. Tarif raisonnable, bon conducteur. Je reprendrai ATC la prochaine fois.', stars: 5 },
  { name: 'Michel P.', city: 'Narbonne', text: 'Très content de ce service de taxi 24h/24. J\'ai appelé à 5h du matin pour une urgence, ils ont répondu immédiatement !', stars: 5 },
];

const faqs = [
  { q: 'Comment réserver un taxi à Narbonne 24h/24 ?', a: 'Appelez le 07 68 30 33 03 disponible 24h/24 et 7j/7, ou envoyez un message WhatsApp. Réponse garantie en moins de 5 minutes. Réservation à l\'avance également possible.' },
  { q: 'ATC Taxi est-il conventionné par la CPAM ?', a: 'Oui, ATC TAXI VTC Narbonne est agréé pour le transport médical conventionné (VSL). Prise en charge Assurance Maladie pour vos rendez-vous médicaux sur prescription.' },
  { q: 'Quels aéroports desservez-vous depuis Narbonne ?', a: 'Nous desservons les aéroports de Montpellier (1h), Toulouse-Blagnac (1h30), Carcassonne (45 min), Barcelone-El Prat (2h30) et Béziers Cap d\'Agde (40 min). Tarifs fixes sur devis.' },
  { q: 'Proposez-vous le suivi de vol pour les transferts aéroport ?', a: 'Oui, nous suivons votre vol en temps réel. En cas de retard, votre chauffeur adapte automatiquement l\'horaire de prise en charge sans surcoût.' },
  { q: 'Quel est le tarif d\'un taxi Narbonne – Montpellier ?', a: 'Le tarif Narbonne – Aéroport Montpellier est d\'environ 200€ à 220€ aller simple tarif/jour. Contactez-nous pour un devis précis selon votre adresse de départ et nombre de passagers.' },
  { q: 'Acceptez-vous les paiements par carte bancaire ?', a: 'Oui, nous acceptons la carte bancaire, les espèces et le virement. Un reçu est fourni pour tout paiement. Facturation disponible pour les entreprises.' },
  { q: 'Desservez-vous les communes autour de Narbonne ?', a: 'Oui ! Gruissan, Leucate, Sigean, Port-la-Nouvelle, Peyriac-de-Mer, Coursan, Vinassan, Fleury-d\'Aude et toutes les communes de l\'Aude et de l\'Hérault.' },
  { q: 'Puis-je réserver un taxi pour un transport PMR ?', a: 'Absolument. Nous disposons de véhicules adaptés aux personnes à mobilité réduite (PMR). Contactez-nous à l\'avance pour que nous puissions organiser la meilleure prise en charge.' },
];

const zones = [
  { city: 'Narbonne', km: '0', href: '/taxi-narbonne' },
  { city: 'Gruissan', km: '15', href: '/taxi-gruissan' },
  { city: 'Leucate', km: '25', href: '/taxi-leucate' },
  { city: 'Sigean', km: '20', href: '/taxi-sigean' },
  { city: 'Port-la-Nouvelle', km: '30', href: '/taxi-port-la-nouvelle' },
  { city: 'Carcassonne', km: '60', href: '/taxi-carcassonne' },
  { city: 'Béziers', km: '55', href: '/taxi-beziers-cap-dagde' },
  { city: 'Montpellier', km: '100', href: '/taxi-aeroport-montpellier' },
  { city: 'Barcelone', km: '220', href: '/taxi-narbonne-barcelone' },
  { city: 'Toulouse', km: '160', href: '/taxi-aeroport-toulouse' },
  { city: 'Peyriac-de-Mer', km: '18', href: '/taxi-peyriac-de-mer' },
  { city: 'Coursan', km: '10', href: '/taxi-coursan' },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} style={{ fill: TEAL, color: TEAL }} />
      ))}
    </div>
  );
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const seoSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'TaxiService'],
  name: 'ATC TAXI VTC Narbonne',
  telephone: '+33768303303',
  email: 'atctaxi11@gmail.com',
  url: 'https://www.atc-taxi-vtc.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Narbonne', postalCode: '11100', addressRegion: 'Occitanie', addressCountry: 'FR' },
  geo: { '@type': 'GeoCoordinates', latitude: 43.1837, longitude: 3.0029 },
  openingHours: 'Mo-Su 00:00-23:59',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '200' },
  priceRange: '€€',
  description: 'ATC TAXI VTC Narbonne – Service de taxi et VTC disponible 24h/24. Taxi conventionné CPAM, transferts gare et aéroport, longue distance.',
  sameAs: ['https://wa.me/33768303303'],
};

export function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEOHead
        title="Taxi Narbonne 24h/24 | ATC TAXI VTC – Conventionné CPAM, Gare, Aéroport"
        description="ATC TAXI VTC Narbonne : taxi conventionné CPAM, transferts gare SNCF, aéroport Montpellier, Toulouse, Carcassonne. Disponible 24h/24, 7j/7. Réservation immédiate au 07 68 30 33 03."
        canonical="/"
        keywords="taxi narbonne, vtc narbonne, taxi 24h narbonne, taxi conventionné cpam narbonne, taxi gare narbonne, taxi aéroport montpellier narbonne, taxi aéroport toulouse narbonne, transport médical narbonne, taxi aude, vtc aude, réserver taxi narbonne"
        schema={seoSchema}
      />

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroImg})` }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,15,30,0.92) 0%, rgba(10,25,49,0.80) 60%, rgba(6,15,30,0.88) 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to bottom, transparent, #060F1E)' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold"
            style={{ background: `rgba(58,180,177,0.15)`, border: `1px solid rgba(58,180,177,0.5)`, color: TEAL }}
          >
            <Star size={14} style={{ fill: TEAL }} />
            Service noté 5/5 – Disponible 24h/24 – Taxi Narbonne & Aude
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white mb-6"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1 }}
          >
            Taxi Narbonne VTC{' '}
            <span style={{ color: TEAL }}>24h/24</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto mb-8"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', lineHeight: 1.7 }}
          >
             ATC TAXI VTC Narbonne – Votre taxi conventionné CPAM, transferts gare SNCF et aéroports (Montpellier, Toulouse, Carcassonne, Barcelone). Service taxi Aude et Hérault, disponible 24h/24, 7j/7. Réservation immédiate.
          </motion.p>

         <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.3 }}
  className="flex flex-col items-center gap-4"
>
  {/* LIGNE 1 */}
  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
    <a
      href={`tel:${PHONE}`}
      className="flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white text-lg shadow-2xl transition-all hover:scale-105"
      style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}
    >
      <Phone size={20} />
      Appeler maintenant
    </a>
  </div>

  {/* GOOGLE AVIS */}
  <a
    href={GOOGLE_REVIEW_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative overflow-hidden flex items-center gap-4 px-7 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
    style={{
      background: 'rgba(255,255,255,0.96)',
      border: '1px solid rgba(255,255,255,0.15)',
      boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
      backdropFilter: 'blur(12px)',
    }}
  >
    {/* Glow */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{
        background: `linear-gradient(135deg, rgba(58,180,177,0.10), rgba(58,180,177,0.03))`,
      }}
    />

    {/* Logo Google */}
    <div className="relative z-10 w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md">
  <GoogleGLogo size={28} />
</div>

    {/* Texte */}
    <div className="relative z-10 flex flex-col items-start text-left leading-tight">
      <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">
        Votre avis compte
      </span>

      <span className="text-black text-base font-extrabold">
        Noter ATC TAXI VTC Narbonne sur Google
      </span>

      <div className="flex items-center gap-2 mt-1">
        <div className="flex text-yellow-400 text-sm tracking-tight">
          ★★★★★
        </div>

        <span className="text-gray-600 text-xs font-semibold">
          200+ avis clients
        </span>
      </div>
    </div>
  </a>
</motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-3 justify-center mt-10"
          >
            {['Taxi conventionné CPAM', 'Transfert gare Narbonne', 'Aéroport Montpellier', 'Paiement CB', '24h/24 7j/7'].map((chip) => (
              <span key={chip} className="px-3 py-1.5 rounded-full text-xs text-gray-300" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
                {chip}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-60"
          style={{ color: TEAL }}
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ═══════════════════ STATS ═══════════════════ */}
      <section style={{ backgroundColor: '#060F1E', borderTop: '1px solid rgba(58,180,177,0.2)', borderBottom: '1px solid rgba(58,180,177,0.2)' }} className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '200+', label: 'Avis 5 étoiles' },
              { value: '24/7', label: 'Disponibilité' },
              { value: '10+', label: 'Ans d\'expérience' },
              { value: '50+', label: 'Zones desservies' },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="py-4">
                  <p className="mb-1" style={{ fontSize: '2rem', fontWeight: 800, color: TEAL }}>{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SERVICES ═══════════════════ */}
      <section style={{ backgroundColor: '#070E1D' }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: TEAL }}>Nos services</span>
              <h2 className="text-white mt-2" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700 }}>
                Taxi & VTC Narbonne – Tous vos déplacements
              </h2>
              <p className="text-gray-400 mt-3 max-w-xl mx-auto">
                Service de taxi professionnel pour tous vos besoins : médical, gare, aéroport, longue distance.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <FadeIn key={service.title} delay={i * 0.08}>
                <Link to={service.href}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="relative p-6 rounded-2xl h-full cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #0D2040 0%, #0A1931 100%)', border: `1px solid rgba(58,180,177,0.2)` }}
                  >
                    {service.badge && (
                      <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-xs font-bold text-white"
                        style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}>
                        {service.badge}
                      </span>
                    )}
                    <div className="mb-4" style={{ color: TEAL }}>{service.icon}</div>
                    <h3 className="text-white font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-semibold" style={{ color: TEAL }}>
                      En savoir plus →
                    </div>
                  </motion.div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SEO CONTENT ═══════════════════ */}
      <section style={{ background: 'linear-gradient(180deg, #060F1E 0%, #070E1D 100%)' }} className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-white mb-6" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700 }}>
              Taxi Narbonne – Le service de référence dans l'Aude
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed text-sm sm:text-base">
              <p>
                <strong className="text-white">ATC TAXI VTC Narbonne</strong> est votre solution de transport premium basée à Narbonne (Aude, 11). Notre société de taxi et VTC propose un service professionnel disponible <strong>24 heures sur 24, 7 jours sur 7</strong>, y compris les nuits, week-ends et jours fériés. Que vous ayez besoin d'un taxi conventionné CPAM pour vos soins médicaux, d'un transfert vers la gare SNCF de Narbonne, ou d'un véhicule pour rejoindre l'aéroport de Montpellier, Toulouse ou Carcassonne, ATC TAXI est là pour vous.
              </p>
              <p>
                Spécialiste du <strong>taxi conventionné en Occitanie</strong>, notre équipe accompagne chaque jour des patients vers leurs rendez-vous médicaux, hospitalisations, séances de dialyse et chimiothérapies à l'hôpital de Narbonne et dans toute la région. Notre agrément VSL (Véhicule Sanitaire Léger) garantit la prise en charge par la Sécurité Sociale sur prescription médicale.
              </p>
              <p>
                Pour vos <strong>transferts aéroport depuis Narbonne</strong>, nous assurons des liaisons vers les principaux aéroports du Sud de la France : Montpellier Méditerranée (1h, tarif fixe ~200-220€), Toulouse-Blagnac (1h30, ~350-370€), Carcassonne (45 min, ~125-145€), Béziers-Cap d'Agde (50 min, ~80-90€) et Barcelone El Prat (2h30, ~570-590€). Le suivi de vol en temps réel est inclus dans chaque transfert.
              </p>
              <p>
                Notre <strong>zone d'intervention</strong> couvre l'ensemble du département de l'Aude (11) et de l'Hérault (34) : Gruissan, Leucate, Sigean, Port-la-Nouvelle, Peyriac-de-Mer, Coursan, Vinassan, Carcassonne, Lézignan-Corbières, Béziers, Cap d'Agde, et bien d'autres communes. Nous intervenons également dans tout le Languedoc-Roussillon et la région Occitanie.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════ WHY US ═══════════════════ */}
      <section style={{ background: 'linear-gradient(180deg, #060F1E 0%, #0A1931 100%)' }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: TEAL }}>Pourquoi nous choisir</span>
              <h2 className="text-white mt-2" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700 }}>
                6 raisons de choisir ATC TAXI Narbonne
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <FadeIn key={feat.title} delay={i * 0.08}>
                <div
                  className="flex gap-4 p-6 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(58,180,177,0.15)` }}
                >
                  <div className="flex-shrink-0" style={{ color: TEAL }}>{feat.icon}</div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{feat.title}</h3>
                    <p className="text-gray-400 text-sm">{feat.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA PHONE BAND ═══════════════════ */}
      <section style={{ background: `linear-gradient(135deg, ${TEAL} 0%, ${TEAL_DARK} 100%)` }} className="py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-white mb-2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800 }}>
              Réservez votre taxi maintenant !
            </h2>
            <p className="text-white/80 mb-6">Disponible 24h/24 – 7j/7 – Réponse en moins de 5 minutes</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${PHONE}`}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-black text-white font-bold text-lg hover:bg-gray-900 transition-colors"
              >
                <Phone size={20} /> {PHONE_DISPLAY}
              </a>
              <a
                href="https://wa.me/33768303303"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-green-700 text-white font-bold text-lg hover:bg-green-800 transition-colors"
              >
                <MessageCircle size={20} /> WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
      <section style={{ backgroundColor: '#070E1D' }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: TEAL }}>Avis clients</span>
              <h2 className="text-white mt-2" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700 }}>
                Ils nous font confiance
              </h2>
              <div className="flex items-center justify-center gap-2 mt-3">
                <div className="flex text-xl" style={{ color: TEAL }}>{'★★★★★'}</div>
                <span className="text-gray-300">Note 5/5 – 200+ avis vérifiés</span>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.06}>
                <div
                  className="p-5 rounded-2xl h-full"
                  style={{ background: 'linear-gradient(135deg, #0D2040 0%, #0A1931 100%)', border: `1px solid rgba(58,180,177,0.2)` }}
                >
                  <StarRating count={t.stars} />
                  <p className="text-gray-300 text-sm mt-3 mb-4 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-2 mt-auto">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                      style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">{t.name}</p>
                      <p className="text-gray-500 text-xs flex items-center gap-1"><MapPin size={10} />{t.city}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="text-center mt-8">
              <Link
                to="/avis-clients"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-colors"
                style={{ border: `1px solid rgba(58,180,177,0.4)`, color: TEAL }}
              >
                Voir tous les avis →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section style={{ backgroundColor: '#060F1E' }} className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: TEAL }}>FAQ</span>
              <h2 className="text-white mt-2" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700 }}>
                Questions fréquentes – Taxi Narbonne
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ background: '#0D2040', border: `1px solid ${openFaq === i ? `rgba(58,180,177,0.5)` : 'rgba(255,255,255,0.08)'}` }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="text-white font-semibold pr-4">{faq.q}</span>
                    {openFaq === i
                      ? <ChevronUp size={18} className="flex-shrink-0" style={{ color: TEAL }} />
                      : <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
                    }
                  </button>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.2 }}>
                      <div className="px-5 pb-5 text-gray-300 text-sm leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ ZONES ═══════════════════ */}
      <section style={{ backgroundColor: '#070E1D' }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: TEAL }}>Zones desservies</span>
              <h2 className="text-white mt-2" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700 }}>
                Taxi dans tout l'Aude et l'Hérault
              </h2>
              <p className="text-gray-400 mt-3 max-w-xl mx-auto">
                ATC TAXI VTC Narbonne couvre Narbonne et toute la région Occitanie.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {zones.map((zone, i) => (
              <FadeIn key={zone.city} delay={i * 0.05}>
                <Link to={zone.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-4 rounded-xl text-center cursor-pointer transition-all"
                    style={{ background: '#0D2040', border: `1px solid rgba(58,180,177,0.15)` }}
                  >
                    <MapPin size={16} className="mx-auto mb-2" style={{ color: TEAL }} />
                    <p className="text-white text-sm font-semibold">{zone.city}</p>
                    {zone.km !== '0' && <p className="text-gray-500 text-xs">{zone.km} km</p>}
                  </motion.div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="text-center mt-8">
              <Link
                to="/zones-desservies"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-colors"
                style={{ border: `1px solid rgba(58,180,177,0.4)`, color: TEAL }}
              >
                Voir toutes les zones →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════ INTERNAL LINKS / SEO ═══════════════════ */}
      <section style={{ backgroundColor: '#060F1E' }} className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-white mb-6 text-center" style={{ fontSize: '1.3rem', fontWeight: 700 }}>
              Toutes nos destinations depuis Narbonne
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                { label: 'Taxi Narbonne', href: '/taxi-narbonne' },
                { label: 'Taxi Gare Narbonne', href: '/taxi-gare-narbonne' },
                { label: 'Taxi Conventionné CPAM', href: '/taxi-vsl-narbonne' },
                { label: 'Taxi Gruissan', href: '/taxi-gruissan' },
                { label: 'Taxi Leucate', href: '/taxi-leucate' },
                { label: 'Taxi Sigean', href: '/taxi-sigean' },
                { label: 'Taxi Port-la-Nouvelle', href: '/taxi-port-la-nouvelle' },
                { label: 'Taxi Peyriac-de-Mer', href: '/taxi-peyriac-de-mer' },
                { label: 'Taxi Carcassonne', href: '/taxi-carcassonne' },
                { label: 'Taxi Béziers', href: '/taxi-beziers-cap-dagde' },
                { label: 'Taxi Barcelone', href: '/taxi-narbonne-barcelone' },
                { label: 'Aéroport Montpellier', href: '/taxi-aeroport-montpellier' },
                { label: 'Aéroport Toulouse', href: '/taxi-aeroport-toulouse' },
                { label: 'Aéroport Carcassonne', href: '/taxi-aeroport-carcassonne' },
                { label: 'Zones desservies', href: '/zones-desservies' },
                { label: 'Nos services', href: '/services' },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm px-3 py-2 rounded-lg text-center transition-colors hover:text-white text-gray-400"
                  style={{ background: 'rgba(58,180,177,0.06)', border: `1px solid rgba(58,180,177,0.12)` }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════ FINAL CTA ═══════════════════ */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0A1931 0%, #051020 100%)' }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle at 50% 50%, ${TEAL} 0%, transparent 70%)` }} />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <div className="text-5xl mb-4"></div>
            <h2 className="text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800 }}>
              Réservez votre Taxi Narbonne maintenant
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Taxi conventionné, gare, aéroport, transport médical… ATC TAXI VTC Narbonne est disponible 24h/24 pour tous vos déplacements dans l'Aude et l'Hérault.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${PHONE}`}
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-white text-lg shadow-2xl hover:scale-105 transition-all"
                style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}
              >
                <Phone size={20} />
                {PHONE_DISPLAY}
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-white text-lg transition-all hover:scale-105"
                style={{ border: `2px solid rgba(58,180,177,0.5)` }}
              >
                <CheckCircle size={20} />
                Demander un devis
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
