import { motion } from 'motion/react';
import { Link, useParams } from 'react-router';
import { Phone, MessageCircle, MapPin, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { SEOHead } from '../components/SEOHead';

const PHONE = '0768303303';
const PHONE_DISPLAY = '07 68 30 33 03';
const TEAL = '#3AB4B1';
const TEAL_DARK = '#2A9490';

type CityData = {
  city: string;
  dept: string;
  distance: string;
  duration: string;
  description: string;
  seoContent: string;
  highlights: string[];
  faq: { q: string; a: string }[];
};

const cityData: Record<string, CityData> = {
  'gruissan': {
    city: 'Gruissan', dept: 'Aude (11)', distance: '15 km', duration: '20 min',
    description: 'Taxi depuis Narbonne vers Gruissan. Village de pêcheurs authentique, plage des chalets, casino et port de plaisance. ATC TAXI VTC assure vos transferts vers Gruissan 24h/24.',
    seoContent: 'Gruissan est une commune balnéaire de l\'Aude, célèbre pour sa plage des chalets construits sur pilotis, son casino, son port de plaisance et son village médiéval avec la tour Barberousse. ATC TAXI VTC Narbonne dessert Gruissan village, Gruissan-Plage et les Chalets de Gruissan 24h/24. Notre taxi Narbonne-Gruissan est disponible pour vos transferts vers l\'aéroport de Montpellier, la gare SNCF de Narbonne et tous vos déplacements touristiques ou médicaux. Nous proposons également des trajets vers la réserve africaine de Sigean et les sites touristiques de l\'Aude.',
    highlights: ['Plage des chalets de Gruissan', 'Casino de Gruissan', 'Port de plaisance', 'Tour Barberousse'],
    faq: [
      { q: 'Combien coûte un taxi Narbonne – Gruissan ?', a: 'Le tarif Narbonne – Gruissan est d\'environ 25-35€ selon l\'adresse exacte et l\'horaire. Contactez-nous pour un devis précis.' },
      { q: 'Taxi Gruissan – Aéroport Montpellier ?', a: 'Oui, nous assurons les transferts depuis Gruissan vers l\'aéroport de Montpellier. Tarif estimé : 140-160€.' },
    ],
  },
  'leucate': {
    city: 'Leucate', dept: 'Aude (11)', distance: '25 km', duration: '30 min',
    description: 'Taxi depuis Narbonne vers Leucate, Port Leucate et La Franqui. Station balnéaire réputée pour la planche à voile et le kitesurf. Service taxi professionnel 24h/24.',
    seoContent: 'Leucate est une station balnéaire de l\'Aude connue pour ses spots de kitesurf et de windsurf, notamment à Port Leucate et La Franqui. ATC TAXI VTC Narbonne propose des transferts vers Leucate village, Leucate-Plage, Port Leucate et La Franqui depuis Narbonne. Notre taxi est disponible 24h/24 pour vos arrivées à la gare de Narbonne, vos transferts aéroport et vos déplacements médicaux conventionnés CPAM. Leucate est à 25 km de Narbonne, soit environ 30 minutes de trajet.',
    highlights: ['Port Leucate', 'La Franqui', 'Leucate Plage', 'Kitesurf & windsurf'],
    faq: [
      { q: 'Quelle est la distance Narbonne – Leucate en taxi ?', a: 'La distance est d\'environ 25 km pour 30 minutes de trajet. Tarif estimé : 35-45€.' },
      { q: 'Taxi Leucate – Aéroport Montpellier ?', a: 'Oui, transfert depuis Leucate vers Montpellier disponible. Tarif fixe sur demande au 07 68 30 33 03.' },
    ],
  },
  'sigean': {
    city: 'Sigean', dept: 'Aude (11)', distance: '20 km', duration: '25 min',
    description: 'Taxi vers Sigean et la Réserve Africaine de Sigean. ATC TAXI VTC assure vos transferts familiaux vers cette attraction touristique majeure de l\'Aude, 24h/24.',
    seoContent: 'Sigean est connue pour abriter la célèbre Réserve Africaine de Sigean, le plus grand parc animalier sauvage de France avec plus de 3 800 animaux sur 300 hectares. ATC TAXI VTC Narbonne propose des transferts vers Sigean et la Réserve Africaine depuis Narbonne, Leucate, Port-la-Nouvelle et toute la région. Notre taxi familial peut transporter jusqu\'à 7 personnes pour vos sorties à la réserve. Nous desservons également la clinique de Sigean et les établissements de santé du secteur.',
    highlights: ['Réserve africaine de Sigean', 'Étang de Bages', 'Sigean village', 'Clinique de Sigean'],
    faq: [
      { q: 'Taxi pour la Réserve Africaine de Sigean ?', a: 'Oui, nous assurons les transferts vers la Réserve Africaine de Sigean. Tarif depuis Narbonne : environ 30-40€.' },
      { q: 'Taxi Sigean depuis la gare de Narbonne ?', a: 'Oui, dépose à Sigean depuis la gare SNCF de Narbonne. Disponible 24h/24 au 07 68 30 33 03.' },
    ],
  },
  'port-la-nouvelle': {
    city: 'Port-la-Nouvelle', dept: 'Aude (11)', distance: '30 km', duration: '35 min',
    description: 'Taxi Narbonne – Port-la-Nouvelle. Premier port de pêche de Méditerranée. Transport professionnel pour le port, les entreprises et les particuliers de Port-la-Nouvelle.',
    seoContent: 'Port-la-Nouvelle est une ville portuaire de l\'Aude, connue pour son port de pêche méditerranéen, ses installations industrielles et énergétiques, et son développement comme hub logistique régional. ATC TAXI VTC Narbonne assure les transferts vers Port-la-Nouvelle depuis Narbonne, Gruissan, Sigean et toute la région. Notre service de taxi est particulièrement apprécié des professionnels travaillant dans la zone industrielle portuaire. Nous proposons également des déplacements médicaux conventionnés CPAM vers les établissements de santé.',
    highlights: ['Port de pêche', 'Port industriel', 'Plage', 'Zone d\'activités'],
    faq: [
      { q: 'Combien coûte le taxi Narbonne – Port-la-Nouvelle ?', a: 'Le tarif est d\'environ 40-55€ selon l\'horaire et l\'adresse exacte.' },
    ],
  },
  'peyriac-de-mer': {
    city: 'Peyriac-de-Mer', dept: 'Aude (11)', distance: '18 km', duration: '22 min',
    description: 'Taxi vers Peyriac-de-Mer, village pittoresque au bord de l\'étang de Bages. Découvrez ce joyau de la Narbonnaise avec ATC TAXI VTC Narbonne.',
    seoContent: 'Peyriac-de-Mer est un village médiéval pittoresque situé au bord de l\'étang de Bages, dans le Parc Naturel Régional de la Narbonnaise. Célèbre pour ses flamants roses, ses vignobles et son charme authentique, Peyriac-de-Mer est une destination prisée des touristes et des locaux. ATC TAXI VTC Narbonne propose des transferts vers Peyriac-de-Mer depuis Narbonne et toute la région. Service disponible 24h/24 pour vos sorties touristiques, déplacements médicaux et transferts gare.',
    highlights: ['Étang de Bages', 'Village médiéval', 'Flamants roses', 'Vignobles AOC'],
    faq: [
      { q: 'Taxi pour l\'étang de Bages depuis Narbonne ?', a: 'Oui, Peyriac-de-Mer est à 18 km de Narbonne. Tarif environ 25-35€.' },
    ],
  },
  'carcassonne': {
    city: 'Carcassonne', dept: 'Aude (11)', distance: '60 km', duration: '55 min',
    description: 'Taxi Narbonne – Carcassonne. Transferts vers la Cité médiévale, la gare de Carcassonne et l\'aéroport Carcassonne. Tarif fixe, véhicule premium.',
    seoContent: 'Carcassonne est une ville emblématique de l\'Aude, classée au Patrimoine Mondial de l\'UNESCO pour sa Cité médiévale. ATC TAXI VTC Narbonne propose des transferts vers Carcassonne depuis Narbonne en environ 55 minutes. Nous desservons la Cité médiévale, le centre-ville, la gare SNCF de Carcassonne et l\'aéroport de Carcassonne-Salvaza (CCF). Notre taxi Narbonne-Carcassonne est disponible 24h/24 pour vos visites touristiques, déplacements professionnels et transferts aéroport.',
    highlights: ['Cité médiévale UNESCO', 'Gare de Carcassonne', 'Aéroport Carcassonne', 'Canal du Midi'],
    faq: [
      { q: 'Quel est le tarif d\'un taxi Narbonne – Carcassonne ?', a: 'Le trajet Narbonne–Carcassonne coûte environ 80-100€ aller simple. Demandez un devis au 07 68 30 33 03.' },
      { q: 'Taxi Narbonne – Aéroport de Carcassonne ?', a: 'Oui, transfert vers l\'aéroport Carcassonne (CCF). Tarif fixe ~90€ depuis Narbonne. Suivi de vol inclus.' },
    ],
  },
  'beziers-cap-dagde': {
    city: 'Béziers & Cap d\'Agde', dept: 'Hérault (34)', distance: '55 km', duration: '50 min',
    description: 'Taxi Narbonne – Béziers et Cap d\'Agde. Transferts vers l\'aéroport de Béziers Méditerranée, Cap d\'Agde et toute la région de l\'Hérault. Service premium 24h/24.',
    seoContent: 'Béziers est une ville historique de l\'Hérault et Cap d\'Agde est la station balnéaire méditerranéenne la plus visitée du Languedoc. ATC TAXI VTC Narbonne propose des transferts vers Béziers, Cap d\'Agde, Agde et l\'aéroport de Béziers Méditerranée (BZR). Avec 55 km depuis Narbonne, soit environ 50 minutes de trajet, nos tarifs sont compétitifs et nos véhicules confortables. Service disponible 24h/24 pour vos vols, soins médicaux et déplacements professionnels.',
    highlights: ['Aéroport Béziers Méditerranée', 'Cap d\'Agde', 'Béziers centre', 'Canal du Midi'],
    faq: [
      { q: 'Prix du taxi Narbonne – Béziers ?', a: 'Le trajet coûte environ 70-90€. Pour l\'aéroport de Béziers, comptez 75-95€ selon l\'adresse de départ.' },
    ],
  },
  'narbonne-barcelone': {
    city: 'Barcelone', dept: 'Espagne', distance: '220 km', duration: '2h30',
    description: 'Taxi Narbonne – Barcelone. Transferts longue distance vers l\'aéroport El Prat de Barcelone, le port, Las Ramblas et le centre de Barcelone. Devis gratuit instantané.',
    seoContent: 'Barcelone, capitale de la Catalogne, est à seulement 220 km de Narbonne par l\'autoroute AP-7. ATC TAXI VTC Narbonne propose des transferts directs vers Barcelone : aéroport El Prat (BCN), port de Barcelone, Las Ramblas, Sagrada Familia, hôtels et adresses particulières. Notre taxi Narbonne-Barcelone est disponible 24h/24 pour vos vols, croisières et séjours touristiques. Tarif fixe convenu à l\'avance, sans surprise. Chauffeur francophone, connaissant parfaitement le trajet frontalier.',
    highlights: ['Aéroport El Prat Barcelone', 'Port de Barcelone', 'Centre de Barcelone', 'Transfert international'],
    faq: [
      { q: 'Quel est le prix d\'un taxi Narbonne – Barcelone ?', a: 'Le tarif Narbonne – Barcelone est d\'environ 250-300€ aller simple. Contactez-nous pour un devis précis selon votre destination exacte.' },
      { q: 'Combien de temps dure le trajet Narbonne – Barcelone ?', a: 'Comptez environ 2h30 à 3h de trajet selon le trafic et les contrôles frontaliers.' },
    ],
  },
  'coursan': {
    city: 'Coursan', dept: 'Aude (11)', distance: '10 km', duration: '12 min',
    description: 'Taxi Narbonne – Coursan. Commune voisine de Narbonne. Service de taxi rapide et économique pour tous vos déplacements locaux.',
    seoContent: 'Coursan est une commune de l\'Aude, limitrophe de Narbonne et facilement accessible par l\'autoroute A9. ATC TAXI VTC Narbonne dessert Coursan depuis Narbonne en environ 12 minutes. Notre service de taxi local est idéal pour les déplacements vers la gare de Narbonne, l\'hôpital, les centres commerciaux et les zones d\'activités. Tarifs économiques pour les courts trajets, disponible 24h/24.',
    highlights: ['Coursan village', 'Proche Narbonne', 'Accès autoroute A9', 'Zone d\'activités'],
    faq: [
      { q: 'Prix taxi Narbonne – Coursan ?', a: 'Coursan est à 10 km de Narbonne. Tarif estimé : 15-25€ selon l\'adresse.' },
    ],
  },
  'vsl-narbonne': {
    city: 'Transport VSL Narbonne', dept: 'Aude (11)', distance: 'Sur place', duration: 'Selon RDV',
    description: 'Transport VSL (Véhicule Sanitaire Léger) conventionné CPAM à Narbonne. Prise en charge Assurance Maladie pour vos rendez-vous médicaux, dialyse, chimiothérapie et soins réguliers.',
    seoContent: 'Le transport VSL (Véhicule Sanitaire Léger) conventionné par la CPAM permet aux patients de Narbonne et du Narbonnais de bénéficier de la prise en charge de leurs transports médicaux par l\'Assurance Maladie. ATC TAXI VTC Narbonne est agréé pour le transport sanitaire conventionné. Avec une prescription médicale de transport signée par votre médecin, nous assurons vos déplacements vers l\'hôpital de Narbonne, les cliniques, les centres de dialyse, les cabinets spécialisés et les centres de chimiothérapie, avec remboursement direct par la Sécu.',
    highlights: ['Conventionné CPAM', 'Prescription médicale', 'Dialyse & chimio', 'Hôpital Narbonne'],
    faq: [
      { q: 'Comment fonctionne le transport VSL conventionné ?', a: 'Avec une prescription médicale de transport, l\'Assurance Maladie prend en charge votre transport VSL. Appelez-nous pour organiser vos trajets médicaux.' },
      { q: 'Quels soins donnent droit au transport VSL ?', a: 'Dialyse, chimiothérapie, radiothérapie, hospitalisation, soins réguliers sur prescription et toute consultation nécessitant un transport sanitaire selon les critères CPAM.' },
    ],
  },
  'reserve-africaine-sigean': {
    city: 'Réserve Africaine Sigean', dept: 'Aude (11)', distance: '20 km', duration: '25 min',
    description: 'Taxi pour la Réserve Africaine de Sigean depuis Narbonne. Transport familial, groupes, touristes. Service 24h/24.',
    seoContent: 'La Réserve Africaine de Sigean est la plus grande réserve animalière de France en liberté, accueillant plus de 3 800 animaux sur 300 hectares dans le cadre naturel de l\'Aude méditerranéen. ATC TAXI VTC Narbonne propose des transferts vers la Réserve depuis Narbonne, Leucate, Gruissan et toutes les communes de la région. Idéal pour les familles avec enfants, les groupes et les touristes. Notre taxi peut accueillir jusqu\'à 7 passagers pour vos sorties familiales.',
    highlights: ['3800 animaux en liberté', '300 hectares', 'Transport familles', 'Groupes acceptés'],
    faq: [
      { q: 'Taxi depuis Narbonne vers la Réserve Africaine ?', a: 'Oui ! 20 km depuis Narbonne, environ 25 minutes. Tarif ~ 30-40€. Réservez au 07 68 30 33 03.' },
    ],
  },
};

export function GeoPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? cityData[slug] : null;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const city = data?.city ?? (slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Destination');
  const description = data?.description ?? `Taxi Narbonne – ${city}. Service de taxi professionnel ATC TAXI VTC disponible 24h/24. Réservez votre taxi au ${PHONE_DISPLAY}.`;
  const seoDescription = `Taxi Narbonne vers ${city} - ATC TAXI VTC. ${description.substring(0, 120)}... Disponible 24h/24. Appelez le ${PHONE_DISPLAY}.`;

  return (
    <div style={{ backgroundColor: '#060F1E' }} className="min-h-screen pt-28">
      <SEOHead
        title={`Taxi Narbonne – ${city} | ATC TAXI VTC – Transfert 24h/24`}
        description={seoDescription}
        canonical={`/taxi-${slug}`}
        keywords={`taxi narbonne ${city.toLowerCase()}, taxi ${city.toLowerCase()}, transfert narbonne ${city.toLowerCase()}, vtc narbonne ${city.toLowerCase()}, taxi aude ${city.toLowerCase()}`}
      />

      <section className="py-20 px-4 sm:px-6" style={{ background: 'linear-gradient(180deg, #0A1931 0%, #060F1E 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link to="/zones-desservies" className="hover:text-white transition-colors">Zones</Link>
            <span>/</span>
            <span style={{ color: TEAL }}>{city}</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={20} style={{ color: TEAL }} />
              <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: TEAL }}>Taxi {city}</span>
            </div>
            <h1 className="text-white mt-2 mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800 }}>
              Taxi Narbonne – {city}
            </h1>
            {data && (
              <div className="flex flex-wrap gap-4 mb-4">
                <span className="text-gray-400 text-sm">📍 {data.distance}</span>
                <span className="text-gray-400 text-sm">⏱ {data.duration}</span>
                <span className="text-gray-400 text-sm">🗺 {data.dept}</span>
              </div>
            )}
            <p className="text-gray-300 mb-8 leading-relaxed max-w-2xl">{description}</p>
            <div className="flex flex-wrap gap-4">
              <a href={`tel:${PHONE}`}
                className="flex items-center gap-2 px-7 py-4 rounded-full font-bold text-white text-lg"
                style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}>
                <Phone size={18} /> {PHONE_DISPLAY}
              </a>
              <a href={`https://wa.me/33768303303?text=Bonjour%2C%20je%20souhaite%20un%20taxi%20pour%20${encodeURIComponent(city)}.`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-4 rounded-full font-bold text-white text-lg bg-green-600 hover:bg-green-500 transition-colors">
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {data?.highlights && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {data.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 p-4 rounded-xl text-sm"
                style={{ background: '#0D2040', border: `1px solid rgba(58,180,177,0.15)` }}>
                <CheckCircle size={14} className="flex-shrink-0" style={{ color: TEAL }} />
                <span className="text-gray-200">{h}</span>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-8">
          <section>
            <h2 className="text-white font-bold mb-4" style={{ fontSize: '1.5rem' }}>
              Taxi Narbonne – {city} : Service professionnel
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {data?.seoContent ?? `ATC TAXI VTC Narbonne est votre partenaire transport pour rejoindre ${city} depuis Narbonne et l'Aude. Notre service de taxi professionnel est disponible 24h/24, 7j/7. Véhicules récents, chauffeurs certifiés, tarifs transparents. Réservation possible par téléphone ou WhatsApp.`}
            </p>
          </section>

          {data?.faq && data.faq.length > 0 && (
            <section>
              <h2 className="text-white font-bold mb-5" style={{ fontSize: '1.5rem' }}>
                Questions fréquentes – Taxi {city}
              </h2>
              <div className="space-y-3">
                {data.faq.map((faq, i) => (
                  <div key={i} className="rounded-xl overflow-hidden"
                    style={{ background: '#0D2040', border: `1px solid ${openFaq === i ? `rgba(58,180,177,0.4)` : 'rgba(255,255,255,0.08)'}` }}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left">
                      <span className="text-white font-semibold pr-4">{faq.q}</span>
                      {openFaq === i
                        ? <ChevronUp size={16} className="flex-shrink-0" style={{ color: TEAL }} />
                        : <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
                      }
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-4 text-gray-300 text-sm border-t border-white/5 pt-3">{faq.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          {[
            { label: 'Taxi Narbonne', href: '/taxi-narbonne' },
            { label: 'Toutes les zones', href: '/zones-desservies' },
            { label: 'Nos services', href: '/services' },
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
