import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router';
import { Phone, MessageCircle, Plane, Clock, CheckCircle, Star, Shield, Award, MapPin } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

const PHONE = '0768303303';
const PHONE_DISPLAY = '07 68 30 33 03';
const TEAL = '#3AB4B1';
const TEAL_DARK = '#2A9490';
const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJNxGmHW6soSARohmCBp-l8xQ&source=g.page.m.nr._&laa=nmx-review-solicitation-recommendation-card';

type AirportData = {
  name: string;
  code: string;
  distance: string;
  duration: string;
  price: string;
  description: string;
  seoContent: string;
  seoContent2: string;
  seoContent3: string;
  tips: string[];
  faq: { q: string; a: string }[];
  heroImage: string;
  heroAlt: string;
};

const airportData: Record<string, AirportData> = {
  'montpellier': {
    name: 'Aéroport Montpellier Méditerranée',
    code: 'MPL',
    distance: '100 km', duration: '1h00', price: '200 – 220 €',
    heroImage: 'https://images.unsplash.com/photo-1622982376381-e4b944344055?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Aéroport Montpellier Méditerranée terminal – Taxi Narbonne Montpellier Aéroport',
    description: 'Taxi depuis Narbonne vers l\'aéroport de Montpellier Méditerranée (MPL). Service premium, suivi de vol en temps réel, aide aux bagages. Tarif fixe garanti sans surprise.',
    seoContent: 'L\'aéroport de Montpellier Méditerranée (MPL) est situé à 100 km de Narbonne, soit environ 1 heure de trajet. Cet aéroport régional dessert de nombreuses destinations en France, en Europe et en Afrique du Nord avec des compagnies comme Air France, easyJet, Vueling, Ryanair, Transavia et bien d\'autres. Plus d\'un million de passagers y transitent chaque année.',
    seoContent2: 'ATC TAXI VTC Narbonne assure des transferts réguliers vers l\'aéroport Montpellier Méditerranée depuis Narbonne, Gruissan, Leucate, Sigean, Port-la-Nouvelle et toutes les communes de l\'Aude. Notre service inclut le suivi de vol en temps réel, une attente gratuite en cas de retard (jusqu\'à 60 minutes), l\'aide aux bagages et un panneau nominatif pour les arrivées.',
    seoContent3: 'Tarif fixe Narbonne-Montpellier Aéroport : 120 à 140€ selon l\'adresse de départ. Pour les résidents des communes périphériques (Gruissan, Leucate, Sigean, etc.), des tarifs spécifiques sont disponibles sur demande. Disponible 24h/24, 7j/7, y compris les jours fériés. Réservation recommandée 24h à l\'avance pour les vols matinaux.',
    tips: ['Réservez 24h à l\'avance', 'Suivi vol en temps réel inclus', 'Attente gratuite si retard', 'Aide aux bagages incluse'],
    faq: [
      { q: 'Quel est le tarif du taxi Narbonne – Aéroport Montpellier ?', a: 'Le tarif fixe Narbonne centre – Aéroport Montpellier est de 120 à 140€. Ce tarif inclut les péages. Pour un devis précis selon votre adresse de départ, appelez le 07 68 30 33 03.' },
      { q: 'Combien de temps dure le trajet Narbonne – Montpellier Aéroport ?', a: 'Environ 1 heure de trajet par l\'A9 dans des conditions normales. En cas de travaux ou forte affluence, prévoir 1h15. Nous conseillons de partir 30 minutes de plus pour les vols matinaux.' },
      { q: 'Le taxi attend-il en cas de retard de vol ?', a: 'Oui ! Nous suivons votre vol en temps réel et adaptons automatiquement l\'heure de prise en charge. L\'attente est gratuite jusqu\'à 60 minutes après l\'heure d\'atterrissage prévue.' },
      { q: 'Taxi Gruissan ou Leucate vers Montpellier Aéroport ?', a: 'Oui, nous prenons les passagers depuis toutes les communes de l\'Aude : Gruissan, Leucate, Sigean, Port-la-Nouvelle, Carcassonne... Tarif personnalisé selon votre localisation.' },
    ],
  },
  'toulouse': {
    name: 'Aéroport Toulouse-Blagnac',
    code: 'TLS',
    distance: '160 km', duration: '1h30', price: '350 – 370 €',
    heroImage: 'https://images.unsplash.com/photo-1623014470071-389a38c3f595?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Aéroport Toulouse Blagnac TLS – Taxi Narbonne Toulouse Aéroport',
    description: 'Taxi Narbonne – Aéroport Toulouse Blagnac (TLS). Transfert confortable et rapide vers le 4e aéroport de France. Départ garanti, même de nuit.',
    seoContent: 'L\'aéroport de Toulouse-Blagnac (TLS) est le 4e aéroport français, avec plus de 9 millions de passagers par an. Il dessert de nombreuses destinations en France, en Europe, en Amérique du Nord et au Maghreb. Compagnies : Air France, Transavia, Volotea, EasyJet, Ryanair, Iberia, Lufthansa, British Airways et bien d\'autres.',
    seoContent2: 'ATC TAXI VTC Narbonne propose des transferts aller-retour vers Toulouse-Blagnac depuis Narbonne et toute l\'Aude. À 160 km de Narbonne, soit environ 1h30 de trajet par l\'A61, nos véhicules spacieux sont idéaux pour les familles et les voyageurs d\'affaires. Service disponible pour tous les horaires, y compris les départs très matinaux (4h, 5h du matin) et les arrivées tardives.',
    seoContent3: 'Tarif fixe Narbonne – Toulouse Blagnac : 170 à 200€ aller simple. Tous péages inclus, sans surprise. Pour les groupes (jusqu\'à 7 personnes), nos minivans offrent le maximum de confort. Réservation recommandée 48h à l\'avance pour les vols matinaux. Paiement CB ou espèces, facture disponible.',
    tips: ['Départ de nuit possible', 'Suivi vol Toulouse-Blagnac', 'Véhicule spacieux 7 places', 'Climatisation premium'],
    faq: [
      { q: 'Quel est le tarif taxi Narbonne – Toulouse Blagnac ?', a: 'Le tarif fixe Narbonne – Toulouse Blagnac est de 170 à 200€ aller simple, péages inclus. Pour un devis précis, contactez-nous au 07 68 30 33 03.' },
      { q: 'Peut-on réserver un taxi pour un vol à 6h du matin depuis Toulouse ?', a: 'Absolument ! ATC TAXI VTC est disponible 24h/24. Pour un vol à 6h, il faut partir de Narbonne vers 4h du matin. Nous assurons ces départs très matinaux sans surcoût.' },
      { q: 'Taxi Narbonne – Toulouse Blagnac aller-retour possible ?', a: 'Oui, nous proposons des tarifs aller-retour avantageux. Contactez-nous pour un devis personnalisé incluant votre retour.' },
      { q: 'Combien de bagages peut-on transporter ?', a: 'Nos véhicules standard acceptent 4 passagers avec leurs bagages. Pour les groupes ou les nombreux bagages, nos minivans 7 places offrent plus d\'espace.' },
    ],
  },
  'carcassonne': {
    name: 'Aéroport de Carcassonne',
    code: 'CCF',
    distance: '60 km', duration: '45 min', price: '130 – 150 €',
    heroImage: 'https://images.unsplash.com/photo-1767053853581-895341cd45d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Aéroport Carcassonne CCF piste avion nuit – Taxi Narbonne Aéroport Carcassonne',
    description: 'Taxi Narbonne – Aéroport de Carcassonne (CCF). Aéroport le plus proche de Narbonne, idéal pour les vols low-cost. Tarif économique, service rapide.',
    seoContent: 'L\'aéroport de Carcassonne-Salvaza (CCF) est l\'aéroport le plus proche de Narbonne, à seulement 60 km. Il desservi principalement des destinations européennes avec Ryanair (Dublin, Manchester, Londres Stansted, Édimbourg, Bruxelles, Porto...) et d\'autres compagnies charter. C\'est la solution la plus économique pour rejoindre un aéroport depuis Narbonne.',
    seoContent2: 'ATC TAXI VTC Narbonne propose des transferts vers Carcassonne Aéroport en seulement 45 minutes de trajet par l\'A61. Tarif fixe : 80 à 100€ depuis Narbonne centre, péages inclus. Service disponible 24h/24 avec suivi de vol en temps réel. Nos chauffeurs connaissent parfaitement l\'aéroport CCF et ses différents terminaux.',
    seoContent3: 'Pour les arrivées à l\'aéroport de Carcassonne, nous vous attendons dans le hall d\'arrivées avec un panneau nominatif. Attente gratuite jusqu\'à 30 minutes après le débarquement. L\'aéroport CCF est à seulement 45 minutes de Narbonne : un gain de temps et d\'argent considérable par rapport aux aéroports plus éloignés.',
    tips: ['Aéroport le plus proche', 'Tarif le plus économique', 'Trajet rapide 45 min', 'Vols Ryanair low-cost'],
    faq: [
      { q: 'Quel est le tarif taxi Narbonne – Aéroport de Carcassonne ?', a: 'Le tarif fixe Narbonne – Aéroport Carcassonne (CCF) est de 80 à 100€, péages inclus. Appelez le 07 68 30 33 03 pour un devis selon votre adresse.' },
      { q: 'Quelles compagnies volent depuis Carcassonne ?', a: 'Principalement Ryanair vers Dublin, Manchester, Londres Stansted, Édimbourg, Bruxelles, Porto, Valence et d\'autres destinations européennes.' },
      { q: 'Combien de temps prend le taxi Narbonne – Carcassonne Aéroport ?', a: 'Environ 45 minutes par l\'A61. Nous recommandons de partir 1h30 avant votre heure d\'embarquement pour arriver confortablement.' },
      { q: 'Taxi depuis les communes de l\'Aude vers Carcassonne Aéroport ?', a: 'Oui, nous prenons les passagers depuis toutes les communes (Gruissan, Leucate, Sigean, Port-la-Nouvelle, etc.). Tarif adapté selon votre localisation.' },
    ],
  },
  'beziers': {
    name: 'Aéroport Béziers Cap d\'Agde',
    code: 'BZR',
    distance: '55 km', duration: '50 min', price: '80 – 100 €',
    heroImage: 'https://images.unsplash.com/photo-1767053853581-895341cd45d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Aéroport Béziers Cap d\'Agde BZR – Taxi Narbonne Béziers Aéroport',
    description: 'Taxi Narbonne – Aéroport de Béziers Cap d\'Agde (BZR). Transfert rapide et confortable vers cet aéroport régional en plein développement.',
    seoContent: 'L\'aéroport de Béziers Cap d\'Agde (BZR) est un aéroport régional méditerranéen en plein développement, desservant des destinations touristiques européennes principalement en été. Situé à 55 km de Narbonne, le trajet dure environ 50 minutes par l\'A9. Des compagnies comme Ryanair, Jet2 et d\'autres charters y opèrent vers le Royaume-Uni, l\'Irlande et l\'Europe.',
    seoContent2: 'ATC TAXI VTC Narbonne propose des transferts vers Béziers Aéroport depuis Narbonne et toute la région. Service particulièrement adapté pour les vols saisonniers vers les îles britanniques et l\'Europe du Nord. Tarif fixe : 75 à 95€ depuis Narbonne, péages inclus. Disponible 24h/24.',
    seoContent3: 'Pour vos arrivées à l\'aéroport de Béziers, nous vous attendons avec un panneau nominatif. Le parking longue durée de l\'aéroport BZR est gratuit si vous venez nous déposer à pied. Notre service de taxi Narbonne-Béziers Aéroport est ponctuel, propre et professionnel.',
    tips: ['50 min depuis Narbonne', 'Tarif compétitif', 'Vols saisonniers été', 'Service ponctuel garanti'],
    faq: [
      { q: 'Quel est le prix du taxi Narbonne – Aéroport Béziers ?', a: 'Le tarif fixe est de 80 à 100€ depuis Narbonne, péages inclus. Contactez-nous au 07 68 30 33 03 pour un devis précis.' },
      { q: 'Quelles compagnies volent depuis Béziers ?', a: 'Principalement des compagnies charter et low-cost en été : Ryanair, Jet2, TUI fly, etc. Vers le Royaume-Uni, l\'Irlande, les Pays-Bas et d\'autres destinations.' },
      { q: 'Taxi Béziers Aéroport depuis Gruissan ou Leucate ?', a: 'Oui, nous desservons toutes les communes de l\'Aude. Tarif adapté selon votre localisation de départ.' },
    ],
  },
  'barcelone': {
    name: 'Aéroport de Barcelone-El Prat',
    code: 'BCN',
    distance: '260 km', duration: '2h30', price: '580 – 600 €',
    heroImage: 'https://images.unsplash.com/photo-1616668724171-3c165d49be04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Aéroport Barcelone El Prat BCN terminal – Taxi Narbonne Barcelone aéroport',
    description: 'Taxi Narbonne – Aéroport de Barcelone El Prat (BCN). Transfert longue distance vers le 4e aéroport européen. Tarif fixe, chauffeur bilingue, départ garanti.',
    seoContent: 'L\'aéroport de Barcelone-El Prat (BCN) est le 4e aéroport d\'Europe et le 2e d\'Espagne, avec plus de 50 millions de passagers par an. Il dessert des centaines de destinations mondiales depuis ses 3 terminaux (T1, T2A, T2B, T2C). À 220 km de Narbonne, c\'est un choix idéal pour les vols long-courriers vers l\'Amérique, l\'Asie, l\'Afrique ou les îles.',
    seoContent2: 'ATC TAXI VTC Narbonne propose des transferts directs vers l\'aéroport BCN depuis Narbonne et toute l\'Aude. Notre chauffeur francophone gère les péages autoroutiers (A9, AP-7) et le passage de la frontière franco-espagnole. Tarif fixe tout compris (péages) : 270 à 320€ selon l\'adresse de départ. Pas de compteur, pas de surprise.',
    seoContent3: 'Pour vos arrivées à l\'aéroport de Barcelone, nous vous attendons dans le hall d\'arrivées du terminal correspondant à votre vol avec un panneau à votre nom. Attente gratuite en cas de retard. Pour les groupes familiaux ou les voyages d\'affaires, nos véhicules 7 places offrent tout le confort nécessaire pour ce trajet de 2h30.',
    tips: ['4e aéroport d\'Europe', 'Tarif tout inclus péages', 'Chauffeur bilingue', 'Panneau nominatif arrivée'],
    faq: [
      { q: 'Quel est le tarif taxi Narbonne – Aéroport Barcelone El Prat ?', a: 'Le tarif fixe Narbonne – Barcelone El Prat (BCN) est de 580 à 600€, péages inclus. Pour un devis précis selon votre adresse, appelez le 07 68 30 33 03.' },
      { q: 'Combien de temps dure le trajet Narbonne – Barcelone Aéroport ?', a: 'Environ 2h30 dans des conditions normales. En période de trafic intense (été, week-ends), prévoir 3 heures. Nous partons toujours avec une marge suffisante pour vos correspondances.' },
      { q: 'Peut-on réserver un taxi pour un vol tôt le matin depuis Barcelone ?', a: 'Absolument ! Nous sommes disponibles 24h/24. Pour un vol à 7h à Barcelone, il faut partir de Narbonne vers 4h du matin. Nous assurons ces départs nocturnes sans surcoût.' },
      { q: 'Le taxi peut-il aller à plusieurs terminaux à Barcelone El Prat ?', a: 'Oui, nous connaissons parfaitement les 3 terminaux de l\'aéroport BCN (T1, T2). Précisez votre terminal lors de la réservation pour que le chauffeur vous dépose au bon endroit.' },
      { q: 'Taxi Barcelone depuis Gruissan, Leucate ou Sigean ?', a: 'Oui, nous prenons les passagers depuis toutes les communes de l\'Aude. Le tarif est légèrement ajusté selon votre localisation de départ. Devis gratuit au 07 68 30 33 03.' },
    ],
  },
};

export function AirportPage() {
  const location = useLocation();
  // Extract slug from pathname: /taxi-aeroport-montpellier → montpellier
  const slug = location.pathname.replace(/^\/taxi-aeroport-/, '') || '';
  const data = slug ? airportData[slug] : null;

  const airportName = data?.name ?? `Aéroport ${slug?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) ?? ''}`;
  const airportCode = data?.code ?? '';
  const seoDescription = `Taxi Narbonne → ${airportName}${airportCode ? ` (${airportCode})` : ''}. ${data?.description ?? ''} Tarif fixe, suivi vol, disponible 24h/24. Réservez au ${PHONE_DISPLAY}.`;

  const airportSchema = {
    '@context': 'https://schema.org',
    '@type': ['TaxiService', 'LocalBusiness'],
    name: `ATC TAXI VTC Narbonne – Transfert Aéroport ${airportName}`,
    description: data?.description ?? '',
    telephone: '+33768303303',
    url: `https://www.atc-taxi-vtc.com/taxi-aeroport-${slug}`,
    image: 'https://www.atc-taxi-vtc.com/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Narbonne',
      addressLocality: 'Narbonne',
      postalCode: '11100',
      addressRegion: 'Occitanie',
      addressCountry: 'FR',
    },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      opens: '00:00',
      closes: '23:59',
    }],
    priceRange: '€€€',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '200', bestRating: '5' },
  };

  const faqSchema = data?.faq && data.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  } : null;

  return (
    <div style={{ backgroundColor: '#060F1E' }} className="min-h-screen">
      <SEOHead
        title={`Taxi Narbonne → ${airportName}${airportCode ? ` (${airportCode})` : ''} | Tarif Fixe – ATC TAXI VTC`}
        description={seoDescription.substring(0, 160)}
        canonical={`/taxi-aeroport-${slug}`}
        keywords={`taxi narbonne ${airportName.toLowerCase()}, transfert narbonne aéroport, taxi aéroport narbonne, navette aéroport narbonne, vtc aéroport narbonne, taxi ${airportCode?.toLowerCase()} narbonne`}
        schema={faqSchema ? [airportSchema, faqSchema] : airportSchema}
      />

      {/* ── HERO with full airport image ── */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden" style={{ paddingTop: '80px' }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={data?.heroImage ?? 'https://images.unsplash.com/photo-1767053853581-895341cd45d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400'}
            alt={data?.heroAlt ?? `Taxi Narbonne ${airportName}`}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(6,15,30,0.35) 0%, rgba(6,15,30,0.65) 40%, rgba(6,15,30,0.92) 75%, rgba(6,15,30,1) 100%)',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-16 pt-32">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-5">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="hover:text-white transition-colors">Aéroports</span>
            <span>/</span>
            <span style={{ color: TEAL }}>{airportName}</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5"
              style={{ background: `rgba(58,180,177,0.2)`, border: `1px solid rgba(58,180,177,0.5)`, color: TEAL }}>
              <Plane size={14} />
              Transfert Aéroport
              {airportCode && <span className="ml-1 px-2 py-0.5 rounded font-mono text-xs" style={{ background: 'rgba(58,180,177,0.3)' }}>{airportCode}</span>}
            </div>

            <h1 className="text-white mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1 }}>
              Taxi Narbonne → {airportName}
            </h1>

            {data && (
              <div className="flex flex-wrap gap-4 mb-5">
                <span className="flex items-center gap-1 text-gray-300 text-sm">
                  <MapPin size={13} style={{ color: TEAL }} /> {data.distance}
                </span>
                <span className="flex items-center gap-1 text-gray-300 text-sm">
                  <Clock size={13} style={{ color: TEAL }} /> {data.duration}
                </span>
                <span className="flex items-center gap-1 font-bold text-sm" style={{ color: TEAL }}>
                  💶 Tarif fixe : {data.price}
                </span>
                <span className="flex items-center gap-1 text-sm" style={{ color: '#fbbf24' }}>
                  ⭐⭐⭐⭐⭐ Service 5/5
                </span>
              </div>
            )}

            <p className="text-gray-200 mb-8 leading-relaxed max-w-2xl" style={{ fontSize: '1.05rem' }}>
              {data?.description ?? `Taxi professionnel depuis Narbonne vers ${airportName}. Service premium 24h/24, ponctualité garantie, suivi de vol inclus.`}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${PHONE}`}
                className="flex items-center gap-2 px-6 py-4 rounded-full font-bold text-white text-base shadow-lg hover:scale-105 transition-transform"
                style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}>
                <Plane size={17} /> Réserver – {PHONE_DISPLAY}
              </a>
              <a href="https://wa.me/33768303303?text=Bonjour%2C%20je%20souhaite%20r%C3%A9server%20un%20taxi%20pour%20l%27a%C3%A9roport."
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-4 rounded-full font-bold text-white text-base bg-green-600 hover:bg-green-500 transition-colors shadow-lg">
                <MessageCircle size={17} /> WhatsApp
              </a>
              {/* Google Review Button */}
              <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-4 rounded-full font-bold text-sm shadow-lg hover:scale-105 transition-transform"
                style={{ background: '#ffffff', color: '#1a1a1a' }}
                aria-label="Laisser un avis Google ATC TAXI VTC">
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Laisser un avis ⭐
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Tips bar ── */}
      {data?.tips && (
        <div style={{ background: '#0A1931', borderTop: '1px solid rgba(58,180,177,0.15)', borderBottom: '1px solid rgba(58,180,177,0.15)' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {data.tips.map((tip) => (
                <div key={tip} className="flex items-start gap-2 p-3 rounded-xl text-sm"
                  style={{ background: 'rgba(58,180,177,0.08)', border: `1px solid rgba(58,180,177,0.15)` }}>
                  <CheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: TEAL }} />
                  <span className="text-gray-200">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="space-y-10">

          {/* Why ATC section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: <Clock size={22} style={{ color: TEAL }} />, title: 'Disponible 24h/24', desc: 'Départs très matinaux, arrivées tardives, nuits et jours fériés. Réponse garantie en 5 min.' },
              { icon: <Shield size={22} style={{ color: TEAL }} />, title: 'Tarif fixe garanti', desc: `Prix convenu : ${data?.price ?? '€€€'}. Tout compris (péages). Aucune surprise à l'arrivée.` },
              { icon: <Award size={22} style={{ color: TEAL }} />, title: '⭐⭐⭐⭐⭐ Note 5/5', desc: 'Plus de 200 avis Google vérifiés. Chauffeurs professionnels, ponctuels et discrets.' },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-2xl"
                style={{ background: '#0D2040', border: `1px solid rgba(58,180,177,0.15)` }}>
                <div className="mb-3">{item.icon}</div>
                <h3 className="text-white font-bold mb-2 text-base">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </section>

          {/* Inclusions */}
          <section className="p-7 rounded-2xl" style={{ background: '#0D2040', border: `1px solid rgba(58,180,177,0.3)` }}>
            <h2 className="text-white font-bold mb-5" style={{ fontSize: '1.3rem' }}>Ce qui est inclus dans votre transfert {airportName}</h2>
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
          </section>

          {/* SEO Content */}
          <section>
            <h2 className="text-white font-bold mb-5" style={{ fontSize: '1.6rem' }}>
              Pourquoi choisir ATC TAXI VTC pour votre transfert vers {airportName} ?
            </h2>
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed text-base">
                {data?.seoContent ?? `ATC TAXI VTC Narbonne est spécialisé dans les transferts aéroport depuis Narbonne et toute l'Aude. Nos chauffeurs expérimentés connaissent parfaitement les routes et les aéroports régionaux.`}
              </p>
              <p className="text-gray-300 leading-relaxed text-base">
                {data?.seoContent2 ?? 'Nous garantissons une ponctualité absolue grâce au suivi de vos vols en temps réel. En cas de retard, votre chauffeur adapte automatiquement l\'heure de prise en charge, sans surcoût.'}
              </p>
              <p className="text-gray-300 leading-relaxed text-base">
                {data?.seoContent3 ?? 'Nos tarifs fixes sont convenus à l\'avance, sans surprises ni compteur. Paiement CB ou espèces accepté. Facture disponible sur demande pour les déplacements professionnels.'}
              </p>
            </div>
          </section>

          {/* FAQ */}
          {data?.faq && data.faq.length > 0 && (
            <section>
              <h2 className="text-white font-bold mb-5" style={{ fontSize: '1.5rem' }}>
                Questions fréquentes – Taxi Narbonne {airportName}
              </h2>
              <div className="space-y-3">
                {data.faq.map((faq, i) => {
                  const [open, setOpen] = [false, () => {}];
                  return (
                    <details key={i} className="rounded-xl overflow-hidden group"
                      style={{ background: '#0D2040', border: `1px solid rgba(255,255,255,0.08)` }}>
                      <summary className="cursor-pointer flex items-center justify-between p-5 text-white font-semibold list-none"
                        style={{ outline: 'none' }}>
                        <span className="pr-4">{faq.q}</span>
                        <CheckCircle size={16} className="flex-shrink-0" style={{ color: TEAL }} />
                      </summary>
                      <div className="px-5 pb-4 text-gray-300 text-sm border-t border-white/5 pt-3 leading-relaxed">{faq.a}</div>
                    </details>
                  );
                })}
              </div>
            </section>
          )}

          {/* CTA box */}
          <div className="p-8 rounded-2xl text-center"
            style={{ background: `linear-gradient(135deg, rgba(58,180,177,0.15), rgba(58,180,177,0.05))`, border: `1px solid rgba(58,180,177,0.4)` }}>
            <Plane size={32} className="mx-auto mb-3" style={{ color: TEAL }} />
            <h3 className="text-white font-bold text-xl mb-2">Réservez votre taxi {airportName}</h3>
            <p className="text-gray-300 mb-2">Tarif fixe {data?.price} · Suivi vol inclus · Disponible 24h/24</p>
            <p className="text-gray-400 text-sm mb-6">Vous avez aimé notre service ? Laissez-nous un avis Google !</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-lg shadow-lg hover:scale-105 transition-transform"
                style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}>
                <Phone size={18} /> {PHONE_DISPLAY}
              </a>
              <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-bold text-sm hover:scale-105 transition-transform"
                style={{ background: '#ffffff', color: '#1a1a1a' }}>
                ⭐ Laisser un avis Google
              </a>
            </div>
          </div>

          {/* Internal links */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Taxi Narbonne', href: '/taxi-narbonne' },
              { label: 'Taxi Gare Narbonne', href: '/taxi-gare-narbonne' },
              { label: '✈ Montpellier', href: '/taxi-aeroport-montpellier' },
              { label: '✈ Toulouse', href: '/taxi-aeroport-toulouse' },
              { label: '✈ Carcassonne', href: '/taxi-aeroport-carcassonne' },
              { label: '✈ Barcelone', href: '/taxi-aeroport-barcelone' },
              { label: '✈ Béziers', href: '/taxi-aeroport-beziers' },
              { label: 'Zones desservies', href: '/zones-desservies' },
              { label: 'Contact', href: '/contact' },
            ].filter(l => l.href !== `/taxi-aeroport-${slug}`).map((link) => (
              <Link key={link.href} to={link.href}
                className="text-sm px-4 py-2 rounded-full transition-colors hover:text-white"
                style={{ border: `1px solid rgba(58,180,177,0.3)`, color: TEAL }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
