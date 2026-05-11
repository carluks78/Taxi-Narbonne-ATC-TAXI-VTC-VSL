import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router';
import { Phone, MessageCircle, MapPin, CheckCircle, ChevronDown, ChevronUp, Star, Clock, Shield, Award } from 'lucide-react';
import { useState } from 'react';
import { SEOHead } from '../components/SEOHead';

const PHONE = '0768303303';
const PHONE_DISPLAY = '07 68 30 33 03';
const TEAL = '#3AB4B1';
const TEAL_DARK = '#2A9490';
const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJNxGmHW6soSARohmCBp-l8xQ&source=g.page.m.nr._&laa=nmx-review-solicitation-recommendation-card';

type CityData = {
  city: string;
  dept: string;
  distance: string;
  duration: string;
  description: string;
  seoContent: string;
  seoContent2?: string;
  seoContent3?: string;
  highlights: string[];
  faq: { q: string; a: string }[];
  heroImage: string;
  heroAlt: string;
};

const cityData: Record<string, CityData> = {
  'gruissan': {
    city: 'Gruissan', dept: 'Aude (11)', distance: '15 km', duration: '20 min',
    heroImage: 'https://images.unsplash.com/photo-1697464960895-7979baf9e029?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Plage de Gruissan – Taxi Narbonne Gruissan ATC TAXI VTC',
    description: 'Taxi depuis Narbonne vers Gruissan. Village de pêcheurs authentique, plage des chalets, casino et port de plaisance. ATC TAXI VTC assure vos transferts vers Gruissan 24h/24.',
    seoContent: 'Gruissan est une commune balnéaire de l\'Aude, célèbre pour sa plage des chalets construits sur pilotis, son casino, son port de plaisance et son village médiéval avec la tour Barberousse. ATC TAXI VTC Narbonne dessert Gruissan village, Gruissan-Plage et les Chalets de Gruissan 24h/24. Notre taxi Narbonne-Gruissan est disponible pour vos transferts vers l\'aéroport de Montpellier, la gare SNCF de Narbonne et tous vos déplacements touristiques ou médicaux.',
    seoContent2: 'Avec seulement 15 km entre Narbonne et Gruissan, le trajet s\'effectue en environ 20 minutes. Notre service de taxi est particulièrement prisé des touristes pendant la saison estivale, qui souhaitent rejoindre la plage des Chalets ou le Casino de Gruissan depuis leur hôtel de Narbonne. Nous proposons également des transferts depuis la gare SNCF de Narbonne directement à votre logement à Gruissan.',
    seoContent3: 'ATC TAXI VTC Narbonne est agréé pour le transport médical conventionné CPAM depuis Gruissan vers les établissements de santé de Narbonne et de la région. Nos véhicules récents et climatisés vous garantissent un voyage confortable, et nos tarifs sont transparents : convenus à l\'avance, sans surprise. Paiement CB accepté. Réservation possible 24h/24 par téléphone ou WhatsApp.',
    highlights: ['Plage des chalets de Gruissan', 'Casino de Gruissan', 'Port de plaisance', 'Tour Barberousse'],
    faq: [
      { q: 'Combien coûte un taxi Narbonne – Gruissan ?', a: 'Le tarif Narbonne – Gruissan est d\'environ 25-35€ selon l\'adresse exacte et l\'horaire. Contactez-nous pour un devis précis au 07 68 30 33 03.' },
      { q: 'Taxi Gruissan – Aéroport Montpellier ?', a: 'Oui, nous assurons les transferts depuis Gruissan vers l\'aéroport de Montpellier Méditerranée. Tarif estimé : 140-160€. Suivi de vol inclus, attente gratuite en cas de retard.' },
      { q: 'Y a-t-il un taxi de nuit entre Narbonne et Gruissan ?', a: 'Oui ! ATC TAXI VTC Narbonne est disponible 24h/24, 7j/7. Que ce soit à 6h du matin ou minuit, appelez le 07 68 30 33 03 ou envoyez un message WhatsApp.' },
      { q: 'Taxi Gruissan – Gare de Narbonne ?', a: 'Absolument. Nous assurons les transferts depuis Gruissan village, Gruissan-Plage et les Chalets de Gruissan vers la gare SNCF de Narbonne.' },
    ],
  },
  'leucate': {
    city: 'Leucate', dept: 'Aude (11)', distance: '25 km', duration: '30 min',
    heroImage: 'https://images.unsplash.com/photo-1660151174677-d318b92cfa3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Kitesurf Leucate Méditerranée – Taxi Narbonne Leucate ATC TAXI VTC',
    description: 'Taxi depuis Narbonne vers Leucate, Port Leucate et La Franqui. Station balnéaire réputée pour la planche à voile et le kitesurf. Service taxi professionnel 24h/24.',
    seoContent: 'Leucate est une station balnéaire de l\'Aude connue mondialement pour ses spots de kitesurf et de windsurf, notamment à Port Leucate et La Franqui. Avec des vents réguliers et une mer parfaite, Leucate accueille chaque année des milliers de pratiquants et de touristes. ATC TAXI VTC Narbonne propose des transferts vers Leucate village, Leucate-Plage, Port Leucate et La Franqui depuis Narbonne.',
    seoContent2: 'Notre taxi est disponible 24h/24 pour vos arrivées à la gare de Narbonne, vos transferts aéroport et vos déplacements médicaux conventionnés CPAM. Leucate est à 25 km de Narbonne, soit environ 30 minutes de trajet par la RN9 ou l\'A9. Que vous arriviez par l\'aéroport de Montpellier, Toulouse ou Carcassonne, nous vous conduisons directement à votre hébergement à Leucate.',
    seoContent3: 'ATC TAXI VTC Narbonne dispose de véhicules spacieux pouvant transporter jusqu\'à 7 passagers avec bagages et matériel de sport (planche, kitesurf, etc.). Nos tarifs pour Leucate sont fixes et transparents. Réservez à l\'avance pour garantir votre place, surtout en haute saison estivale.',
    highlights: ['Port Leucate', 'La Franqui', 'Leucate Plage', 'Kitesurf & windsurf'],
    faq: [
      { q: 'Quelle est la distance Narbonne – Leucate en taxi ?', a: 'La distance est d\'environ 25 km pour 30 minutes de trajet. Tarif estimé : 35-45€ selon l\'adresse exacte.' },
      { q: 'Taxi Leucate – Aéroport Montpellier ?', a: 'Oui, transfert depuis Leucate vers Montpellier disponible. Tarif fixe sur demande au 07 68 30 33 03. Nous suivons votre vol en temps réel.' },
      { q: 'Taxi avec transport de matériel de kitesurf ?', a: 'Oui, nos véhicules spacieux peuvent transporter votre matériel de kitesurf ou windsurf. Signalez-le lors de la réservation pour prévoir le bon véhicule.' },
    ],
  },
  'sigean': {
    city: 'Sigean', dept: 'Aude (11)', distance: '20 km', duration: '25 min',
    heroImage: 'https://images.unsplash.com/photo-1759031218375-63726471d975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Réserve Africaine de Sigean animaux sauvages – Taxi Narbonne Sigean',
    description: 'Taxi vers Sigean et la Réserve Africaine de Sigean. ATC TAXI VTC assure vos transferts familiaux vers cette attraction touristique majeure de l\'Aude, 24h/24.',
    seoContent: 'Sigean est connue pour abriter la célèbre Réserve Africaine de Sigean, le plus grand parc animalier sauvage de France avec plus de 3 800 animaux sur 300 hectares. Lions, rhinocéros, hippopotames, ours polaires : la réserve propose une expérience unique en France. ATC TAXI VTC Narbonne propose des transferts vers Sigean et la Réserve Africaine depuis Narbonne et toute la région.',
    seoContent2: 'Notre taxi familial peut transporter jusqu\'à 7 personnes pour vos sorties à la réserve. Nous desservons également la clinique de Sigean et les établissements de santé du secteur, avec prise en charge CPAM sur prescription médicale. Sigean est à seulement 20 km de Narbonne, un trajet rapide en toute sérénité.',
    seoContent3: 'En plus de la Réserve Africaine, Sigean possède un charmant village médiéval, des étangs méditerranéens magnifiques et une position privilégiée entre mer et garrigue. ATC TAXI VTC est votre partenaire pour explorer ce territoire unique de l\'Aude. Disponible 7j/7, réponse garantie en moins de 5 minutes.',
    highlights: ['Réserve africaine de Sigean', 'Étang de Bages', 'Sigean village', 'Clinique de Sigean'],
    faq: [
      { q: 'Taxi pour la Réserve Africaine de Sigean ?', a: 'Oui, nous assurons les transferts vers la Réserve Africaine de Sigean. Tarif depuis Narbonne : environ 30-40€. Nous pouvons vous attendre sur place si vous souhaitez un aller-retour.' },
      { q: 'Taxi Sigean depuis la gare de Narbonne ?', a: 'Oui, dépose à Sigean depuis la gare SNCF de Narbonne. Disponible 24h/24 au 07 68 30 33 03. Tarif estimé : 28-38€.' },
      { q: 'Combien de passagers peut prendre le taxi pour Sigean ?', a: 'Nos véhicules familiaux peuvent accueillir jusqu\'à 7 passagers avec bagages. Idéal pour les familles souhaitant visiter la Réserve Africaine.' },
    ],
  },
  'port-la-nouvelle': {
    city: 'Port-la-Nouvelle', dept: 'Aude (11)', distance: '30 km', duration: '35 min',
    heroImage: 'https://images.unsplash.com/photo-1717940726344-05e5af5058da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Port industriel maritime – Taxi Narbonne Port-la-Nouvelle ATC TAXI VTC',
    description: 'Taxi Narbonne – Port-la-Nouvelle. Premier port de pêche de Méditerranée. Transport professionnel pour le port, les entreprises et les particuliers de Port-la-Nouvelle.',
    seoContent: 'Port-la-Nouvelle est une ville portuaire de l\'Aude, connue pour son port de pêche méditerranéen, ses installations industrielles et énergétiques (éolien offshore, hydrogène vert), et son développement comme hub logistique régional. ATC TAXI VTC Narbonne assure les transferts vers Port-la-Nouvelle depuis Narbonne, Gruissan, Sigean et toute la région.',
    seoContent2: 'Notre service de taxi est particulièrement apprécié des professionnels travaillant dans la zone industrielle portuaire et des techniciens des éoliennes en mer. Nous proposons des transferts 24h/24, y compris pour les horaires décalés et les départs très matinaux. Tarifs professionnels disponibles pour les trajets réguliers.',
    seoContent3: 'ATC TAXI VTC Narbonne propose également des déplacements médicaux conventionnés CPAM depuis Port-la-Nouvelle vers les établissements de santé de Narbonne. Port-la-Nouvelle est aussi une belle destination balnéaire avec sa plage et son boulevard de bord de mer. Réservation facile par téléphone ou WhatsApp.',
    highlights: ['Port de pêche', 'Port industriel & éolien', 'Plage', 'Zone d\'activités'],
    faq: [
      { q: 'Combien coûte le taxi Narbonne – Port-la-Nouvelle ?', a: 'Le tarif est d\'environ 40-55€ selon l\'horaire et l\'adresse exacte. Tarifs professionnels disponibles pour les déplacements réguliers.' },
      { q: 'Taxi Port-la-Nouvelle vers l\'aéroport de Montpellier ?', a: 'Oui ! Transfert depuis Port-la-Nouvelle vers l\'aéroport de Montpellier disponible. Tarif estimé 150-170€. Appelez le 07 68 30 33 03.' },
      { q: 'Taxi de nuit disponible pour les travailleurs du port ?', a: 'Absolument. Nous sommes disponibles 24h/24, 7j/7 pour les horaires décalés et les départs très matinaux des travailleurs portuaires.' },
    ],
  },
  'peyriac-de-mer': {
    city: 'Peyriac-de-Mer', dept: 'Aude (11)', distance: '18 km', duration: '22 min',
    heroImage: 'https://images.unsplash.com/photo-1730657292779-42d2fbdba382?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Flamants roses étang de Bages – Taxi Narbonne Peyriac-de-Mer',
    description: 'Taxi vers Peyriac-de-Mer, village pittoresque au bord de l\'étang de Bages. Découvrez ce joyau de la Narbonnaise avec ATC TAXI VTC Narbonne.',
    seoContent: 'Peyriac-de-Mer est un village médiéval pittoresque situé au bord de l\'étang de Bages, dans le Parc Naturel Régional de la Narbonnaise. Célèbre pour ses flamants roses, ses vignobles AOC et son charme authentique, Peyriac-de-Mer est une destination prisée des touristes et des photographes de nature. Les couchers de soleil sur l\'étang de Bages depuis Peyriac sont parmi les plus beaux du Languedoc.',
    seoContent2: 'ATC TAXI VTC Narbonne propose des transferts vers Peyriac-de-Mer depuis Narbonne et toute la région. Service disponible 24h/24 pour vos sorties touristiques, déplacements médicaux et transferts gare. À seulement 18 km de Narbonne, Peyriac-de-Mer est facilement accessible grâce à notre service de taxi professionnel.',
    seoContent3: 'Le Parc Naturel Régional de la Narbonnaise en Méditerranée, dont fait partie Peyriac-de-Mer, est un territoire exceptionnel pour les amoureux de nature. Flamants roses, aigrettes, hérons, canards : l\'étang de Bages est un paradis pour les ornithologues. ATC TAXI VTC est là pour vous y emmener en toute tranquillité.',
    highlights: ['Étang de Bages', 'Village médiéval', 'Flamants roses', 'Vignobles AOC'],
    faq: [
      { q: 'Taxi pour l\'étang de Bages depuis Narbonne ?', a: 'Oui, Peyriac-de-Mer est à 18 km de Narbonne. Tarif environ 25-35€. Parfait pour une excursion naturaliste ou touristique.' },
      { q: 'Taxi Peyriac-de-Mer – Gare de Narbonne ?', a: 'Oui, depuis Peyriac-de-Mer, rejoignez la gare SNCF de Narbonne en environ 22 minutes. Disponible 24h/24 au 07 68 30 33 03.' },
    ],
  },
  'carcassonne': {
    city: 'Carcassonne', dept: 'Aude (11)', distance: '60 km', duration: '55 min',
    heroImage: 'https://images.unsplash.com/photo-1647700310392-17a7546cd724?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Cité médiévale de Carcassonne UNESCO – Taxi Narbonne Carcassonne',
    description: 'Taxi Narbonne – Carcassonne. Transferts vers la Cité médiévale, la gare de Carcassonne et l\'aéroport Carcassonne. Tarif fixe, véhicule premium.',
    seoContent: 'Carcassonne est une ville emblématique de l\'Aude, classée au Patrimoine Mondial de l\'UNESCO pour sa Cité médiévale. Avec ses 52 tours et ses 3 km de remparts parfaitement conservés, la Cité de Carcassonne est l\'un des monuments les plus visités de France, attirant plus de 2 millions de visiteurs chaque année. ATC TAXI VTC Narbonne propose des transferts vers Carcassonne depuis Narbonne en environ 55 minutes.',
    seoContent2: 'Nous desservons la Cité médiévale, le centre-ville (bastide Saint-Louis), la gare SNCF de Carcassonne et l\'aéroport de Carcassonne-Salvaza (CCF). Notre taxi Narbonne-Carcassonne est disponible 24h/24 pour vos visites touristiques, déplacements professionnels et transferts aéroport. Le 14 juillet, le feu d\'artifice de Carcassonne est le plus grand de France : nous vous y emmenons et ramenons en toute sécurité.',
    seoContent3: 'L\'aéroport de Carcassonne est desservi par Ryanair vers de nombreuses destinations européennes. ATC TAXI VTC assure le transfert depuis Narbonne vers l\'aéroport CCF en 45 minutes environ, avec suivi de vol et attente gratuite. Nos tarifs Narbonne-Carcassonne sont parmi les plus compétitifs de la région.',
    highlights: ['Cité médiévale UNESCO', 'Gare de Carcassonne', 'Aéroport CCF Ryanair', 'Canal du Midi'],
    faq: [
      { q: 'Quel est le tarif d\'un taxi Narbonne – Carcassonne ?', a: 'Le trajet Narbonne–Carcassonne coûte environ 80-100€ aller simple. Demandez un devis précis au 07 68 30 33 03.' },
      { q: 'Taxi Narbonne – Aéroport de Carcassonne ?', a: 'Oui, transfert vers l\'aéroport Carcassonne (CCF). Tarif fixe ~90€ depuis Narbonne. Suivi de vol inclus, attente gratuite si retard.' },
      { q: 'Taxi pour le feu d\'artifice de Carcassonne le 14 juillet ?', a: 'Oui ! Nous proposons des transferts spéciaux pour le feu d\'artifice du 14 juillet à Carcassonne. Réservez bien à l\'avance car ces dates sont très demandées.' },
      { q: 'Combien de temps dure le trajet Narbonne – Carcassonne ?', a: 'Environ 55 minutes par l\'autoroute A61. En cas de travaux ou d\'évènements, prévoir 1h10. Nous vous conseillons de partir 30 minutes plus tôt pour les vols.' },
    ],
  },
  'beziers-cap-dagde': {
    city: 'Béziers & Cap d\'Agde', dept: 'Hérault (34)', distance: '55 km', duration: '50 min',
    heroImage: 'https://images.unsplash.com/photo-1730279246188-37e40031c7e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Ville de Béziers et Cap d\'Agde Hérault – Taxi Narbonne Béziers',
    description: 'Taxi Narbonne – Béziers et Cap d\'Agde. Transferts vers l\'aéroport de Béziers Méditerranée, Cap d\'Agde et toute la région de l\'Hérault. Service premium 24h/24.',
    seoContent: 'Béziers est une ville historique de l\'Hérault, berceau du rugby, ville de la gastronomie occitane et cité du Canal du Midi. Cap d\'Agde est la station balnéaire méditerranéenne la plus visitée du Languedoc, avec son port de plaisance, son parc aquatique Aqualand et ses plages de sable fin. ATC TAXI VTC Narbonne propose des transferts vers Béziers, Cap d\'Agde, Agde et l\'aéroport de Béziers Méditerranée (BZR).',
    seoContent2: 'Avec 55 km depuis Narbonne, soit environ 50 minutes de trajet, nos tarifs sont compétitifs et nos véhicules confortables. Service disponible 24h/24 pour vos vols, soins médicaux et déplacements professionnels. Nous desservons également les plages de Marseillan, Vias, Vendres et toute la côte héraultaise.',
    seoContent3: 'L\'aéroport de Béziers Méditerranée (BZR) est en plein développement avec de nouvelles liaisons européennes. ATC TAXI VTC Narbonne propose des transferts depuis Narbonne vers l\'aéroport BZR en 50 minutes. Paiement CB accepté, facture disponible sur demande pour les professionnels.',
    highlights: ['Aéroport Béziers Méditerranée', 'Cap d\'Agde', 'Béziers centre', 'Canal du Midi'],
    faq: [
      { q: 'Prix du taxi Narbonne – Béziers ?', a: 'Le trajet coûte environ 70-90€. Pour l\'aéroport de Béziers, comptez 75-95€ selon l\'adresse de départ.' },
      { q: 'Taxi Narbonne – Cap d\'Agde ?', a: 'Oui, transfert depuis Narbonne vers Cap d\'Agde disponible. Tarif estimé 80-100€. Parfait pour rejoindre le port ou les plages de Cap d\'Agde.' },
      { q: 'Taxi Narbonne – Aéroport Béziers ?', a: 'Transfert disponible. Tarif depuis Narbonne : 75-95€. Suivi de vol inclus. Appelez le 07 68 30 33 03 ou WhatsApp.' },
    ],
  },
  'narbonne-barcelone': {
    city: 'Barcelone', dept: 'Espagne', distance: '220 km', duration: '2h30',
    heroImage: 'https://images.unsplash.com/photo-1571278103789-a36c181e3932?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Barcelone Sagrada Familia Espagne – Taxi Narbonne Barcelone longue distance',
    description: 'Taxi Narbonne – Barcelone. Transferts longue distance vers l\'aéroport El Prat de Barcelone, le port, Las Ramblas et le centre de Barcelone. Devis gratuit instantané.',
    seoContent: 'Barcelone, capitale de la Catalogne et deuxième ville d\'Espagne, est à seulement 220 km de Narbonne par l\'autoroute AP-7. ATC TAXI VTC Narbonne propose des transferts directs vers Barcelone : aéroport El Prat (BCN), port de Barcelone (croisières), Las Ramblas, Sagrada Familia, Barceloneta, hôtels et adresses particulières dans toute la ville.',
    seoContent2: 'Notre taxi Narbonne-Barcelone est disponible 24h/24 pour vos vols, croisières et séjours touristiques. Tarif fixe convenu à l\'avance, sans surprise, tout compris (péages autoroutes). Chauffeur francophone, connaissant parfaitement le trajet transfrontalier. Nous gérons tous les passages de frontière et péages pour vous.',
    seoContent3: 'Pour un voyage en groupe, nous disposons de véhicules pouvant accueillir jusqu\'à 7 personnes avec bagages. Barcelone regorge d\'attraits : Parc Güell, Tibidabo, Camp Nou, le Barri Gòtic, les plages... ATC TAXI VTC vous y emmène confortablement depuis Narbonne. Retour possible le même jour ou selon vos besoins.',
    highlights: ['Aéroport El Prat Barcelone', 'Port de Barcelone', 'Centre de Barcelone', 'Transfert international'],
    faq: [
      { q: 'Quel est le prix d\'un taxi Narbonne – Barcelone ?', a: 'Le tarif Narbonne – Barcelone est d\'environ 250-300€ aller simple, tout compris (péages). Contactez-nous pour un devis précis selon votre destination exacte.' },
      { q: 'Combien de temps dure le trajet Narbonne – Barcelone ?', a: 'Comptez environ 2h30 à 3h de trajet selon le trafic et les contrôles frontaliers. Nous partons avec suffisamment de marge pour vos correspondances.' },
      { q: 'Taxi depuis Narbonne vers l\'aéroport de Barcelone El Prat ?', a: 'Oui, transfert direct vers l\'aéroport BCN de Barcelone. Tarif ~270-320€. Suivi de votre vol, panneau nominatif à l\'arrivée si besoin.' },
      { q: 'Taxi Narbonne – Port de Barcelone croisières ?', a: 'Absolument ! Nous assurons les transferts vers le port de Barcelone pour vos embarquements de croisières. Réservez à l\'avance pour garantir votre place.' },
    ],
  },
  'coursan': {
    city: 'Coursan', dept: 'Aude (11)', distance: '10 km', duration: '12 min',
    heroImage: 'https://images.unsplash.com/photo-1760372059338-b503bfd850df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Vignobles Aude Coursan – Taxi Narbonne Coursan ATC TAXI VTC',
    description: 'Taxi Narbonne – Coursan. Commune voisine de Narbonne. Service de taxi rapide et économique pour tous vos déplacements locaux.',
    seoContent: 'Coursan est une commune de l\'Aude, limitrophe de Narbonne et facilement accessible par l\'autoroute A9. Entourée de vignobles AOC et de plaines agricoles, Coursan est une commune dynamique avec ses zones commerciales, son marché et ses espaces de vie. ATC TAXI VTC Narbonne dessert Coursan depuis Narbonne en environ 12 minutes.',
    seoContent2: 'Notre service de taxi local est idéal pour les déplacements vers la gare de Narbonne, l\'hôpital, les centres commerciaux et les zones d\'activités. À seulement 10 km de Narbonne, Coursan bénéficie d\'une proximité idéale avec la capitale audoise. Nos tarifs pour les courts trajets sont particulièrement compétitifs.',
    seoContent3: 'ATC TAXI VTC est agréé pour le transport médical conventionné CPAM depuis Coursan, ce qui permet la prise en charge de vos transports vers les établissements de santé sur prescription médicale. Disponible 24h/24, 7j/7, réponse en moins de 5 minutes. Paiement CB accepté, facture disponible.',
    highlights: ['Coursan village', 'Proche Narbonne', 'Accès autoroute A9', 'Zone d\'activités'],
    faq: [
      { q: 'Prix taxi Narbonne – Coursan ?', a: 'Coursan est à 10 km de Narbonne. Tarif estimé : 15-25€ selon l\'adresse. Idéal pour les déplacements vers la gare ou les commerces.' },
      { q: 'Taxi Coursan – Gare SNCF Narbonne ?', a: 'Oui, dépose à la gare SNCF de Narbonne depuis Coursan en 12 minutes. Disponible 24h/24 au 07 68 30 33 03.' },
    ],
  },
  'vsl-narbonne': {
    city: 'Transport VSL Narbonne', dept: 'Aude (11)', distance: 'Sur place', duration: 'Selon RDV',
    heroImage: 'https://images.unsplash.com/photo-1759429025886-74fc0ea762e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Taxi VSL conventionné CPAM Narbonne – ATC TAXI VTC transport médical',
    description: 'Transport VSL (Véhicule Sanitaire Léger) conventionné CPAM à Narbonne. Prise en charge Assurance Maladie pour vos rendez-vous médicaux, dialyse, chimiothérapie et soins réguliers.',
    seoContent: 'Le transport VSL (Véhicule Sanitaire Léger) conventionné par la CPAM permet aux patients de Narbonne et du Narbonnais de bénéficier de la prise en charge de leurs transports médicaux par l\'Assurance Maladie. ATC TAXI VTC Narbonne est agréé pour le transport sanitaire conventionné dans tout l\'Aude.',
    seoContent2: 'Avec une prescription médicale de transport signée par votre médecin, nous assurons vos déplacements vers l\'hôpital de Narbonne, les cliniques, les centres de dialyse, les cabinets spécialisés et les centres de chimiothérapie, avec remboursement direct par l\'Assurance Maladie. Nous travaillons en lien direct avec les établissements de santé pour coordonner les prises en charge.',
    seoContent3: 'Notre flotte de véhicules sanitaires est équipée pour accueillir les patients à mobilité réduite (PMR), en fauteuil roulant ou en brancard selon les besoins. Nos chauffeurs sont formés aux gestes de premiers secours et au transport de personnes fragilisées. Tarifs réglementés, aucun dépassement, prise en charge Sécurité Sociale.',
    highlights: ['Conventionné CPAM', 'Prescription médicale', 'Dialyse & chimio', 'Hôpital Narbonne'],
    faq: [
      { q: 'Comment fonctionne le transport VSL conventionné ?', a: 'Avec une prescription médicale de transport (formulaire S3140), l\'Assurance Maladie prend en charge votre transport VSL. Appelez-nous pour organiser vos trajets médicaux au 07 68 30 33 03.' },
      { q: 'Quels soins donnent droit au transport VSL ?', a: 'Dialyse, chimiothérapie, radiothérapie, hospitalisation, soins réguliers sur prescription et toute consultation nécessitant un transport sanitaire selon les critères CPAM.' },
      { q: 'Le taxi est-il remboursé pour aller à l\'hôpital de Narbonne ?', a: 'Oui, sous condition d\'une prescription médicale de transport. Le médecin remplit le formulaire CERFA approprié et l\'Assurance Maladie rembourse directement selon votre taux.' },
    ],
  },
  'reserve-africaine-sigean': {
    city: 'Réserve Africaine Sigean', dept: 'Aude (11)', distance: '20 km', duration: '25 min',
    heroImage: 'https://images.unsplash.com/photo-1759031218375-63726471d975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Réserve Africaine de Sigean animaux en liberté – Taxi Narbonne Réserve Sigean',
    description: 'Taxi pour la Réserve Africaine de Sigean depuis Narbonne. Transport familial, groupes, touristes. Service 24h/24.',
    seoContent: 'La Réserve Africaine de Sigean est la plus grande réserve animalière de France en liberté, accueillant plus de 3 800 animaux sur 300 hectares dans le cadre naturel de l\'Aude méditerranéen. Lions en liberté, rhinocéros blancs, hippopotames, ours polaires, flamants roses : une expérience africaine à seulement 20 km de Narbonne.',
    seoContent2: 'ATC TAXI VTC Narbonne propose des transferts vers la Réserve depuis Narbonne, Leucate, Gruissan et toutes les communes de la région. Idéal pour les familles avec enfants, les groupes et les touristes. Notre taxi peut accueillir jusqu\'à 7 passagers pour vos sorties familiales. Nous pouvons vous attendre sur place ou vous récupérer après votre visite.',
    seoContent3: 'La Réserve Africaine de Sigean est ouverte toute l\'année. En été, mieux vaut arriver tôt pour profiter de la fraîcheur et voir les animaux actifs. ATC TAXI VTC vous recommande de réserver votre taxi à l\'avance pour garantir votre place, surtout en juillet-août où la demande est forte.',
    highlights: ['3800 animaux en liberté', '300 hectares', 'Transport familles', 'Groupes acceptés'],
    faq: [
      { q: 'Taxi depuis Narbonne vers la Réserve Africaine ?', a: 'Oui ! 20 km depuis Narbonne, environ 25 minutes. Tarif ~ 30-40€. Réservez au 07 68 30 33 03.' },
      { q: 'Le taxi peut-il attendre pendant la visite de la Réserve ?', a: 'Oui, nous pouvons attendre ou revenir vous chercher. Comptez environ 3 à 4 heures pour une visite complète de la Réserve Africaine de Sigean.' },
    ],
  },
  'narbonne-plage': {
    city: 'Narbonne Plage', dept: 'Aude (11)', distance: '15 km', duration: '18 min',
    heroImage: 'https://images.unsplash.com/photo-1761125263507-0b8d8bfb8337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Narbonne Plage côte méditerranéenne Aude – Taxi Narbonne Plage',
    description: 'Taxi Narbonne – Narbonne Plage. Accès direct à la plage du Mateille, Narbonne Plage et La Seïche. Service taxi 24h/24, idéal pour touristes et résidents.',
    seoContent: 'Narbonne Plage est la station balnéaire de Narbonne, accessible en environ 15 minutes depuis le centre-ville. Elle comprend la plage du Mateille, une des plus belles plages de l\'Aude, classée parmi les plus propres de la région Occitanie, ainsi que La Seïche et l\'ensemble du littoral narbonnais. Le label Pavillon Bleu récompense la qualité de ses eaux.',
    seoContent2: 'ATC TAXI VTC Narbonne propose des transferts vers Narbonne Plage 24h/24 depuis la gare de Narbonne, l\'hôpital, le centre-ville et toutes les communes environnantes. Notre service de taxi est particulièrement utilisé pendant la saison estivale pour les touristes souhaitant rejoindre la plage sans voiture. Nous proposons aussi des navettes régulières entre Narbonne et Narbonne Plage à tarif préférentiel.',
    seoContent3: 'Les campings de Narbonne Plage accueillent chaque année des milliers de vacanciers. ATC TAXI VTC assure les transferts depuis les campings vers la gare, les aéroports et les sites touristiques de l\'Aude. Disponible 7j/7, nous répondons à toutes les demandes dans les 5 minutes. Tarifs fixes, paiement CB accepté.',
    highlights: ['Plage du Mateille', 'La Seïche', 'Station balnéaire', 'Navettes estivales'],
    faq: [
      { q: 'Combien coûte un taxi Narbonne – Narbonne Plage ?', a: 'Le trajet Narbonne centre – Narbonne Plage coûte environ 20-30€ selon l\'adresse exacte et l\'horaire. Contactez-nous pour un devis précis.' },
      { q: 'Taxi depuis la gare de Narbonne vers Narbonne Plage ?', a: 'Oui ! Depuis la gare SNCF de Narbonne, comptez environ 18-20 minutes pour rejoindre Narbonne Plage. Tarif ~25-30€. Réservez au 07 68 30 33 03.' },
      { q: 'Y a-t-il un taxi de nuit entre Narbonne et Narbonne Plage ?', a: 'Oui, ATC TAXI VTC Narbonne est disponible 24h/24, 7j/7. Appelez ou envoyez un WhatsApp à tout moment.' },
    ],
  },
  'argeliers': {
    city: 'Argeliers', dept: 'Aude (11)', distance: '22 km', duration: '25 min',
    heroImage: 'https://images.unsplash.com/photo-1760372059338-b503bfd850df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Vignobles Languedoc Aude Argeliers – Taxi Narbonne Argeliers',
    description: 'Taxi Narbonne – Argeliers. Village viticole du Narbonnais, berceau du mouvement des vignerons du Midi. Transport professionnel 24h/24 dans tout l\'Aude.',
    seoContent: 'Argeliers est un village viticole de l\'Aude situé dans le Narbonnais, à environ 22 km de Narbonne. Ce village historique est connu pour avoir été le berceau de la révolte des vignerons du Midi en 1907, menée par Marcelin Albert – un événement fondateur pour la viticulture française. Entouré de vignobles AOC Minervois, Argeliers est une commune paisible appréciée pour son authenticité et son patrimoine viticole.',
    seoContent2: 'ATC TAXI VTC Narbonne dessert Argeliers et toutes les communes environnantes du Narbonnais. Notre service de taxi est disponible 24h/24 pour vos déplacements vers Narbonne, la gare SNCF, l\'hôpital et les aéroports de la région. Les tarifs sont clairs, convenus à l\'avance, sans mauvaise surprise.',
    seoContent3: 'Nous assurons également des transferts médicaux conventionnés CPAM depuis Argeliers vers les établissements de santé de Narbonne et de la région. Chauffeurs expérimentés, véhicules récents et climatisés. Réservation possible par téléphone au 07 68 30 33 03 ou via WhatsApp.',
    highlights: ['Village viticole AOC', 'Histoire vigneronne 1907', 'Narbonnais authentique', 'Transferts médicaux'],
    faq: [
      { q: 'Taxi Argeliers – Narbonne, quel tarif ?', a: 'Argeliers est à environ 22 km de Narbonne. Tarif estimé : 30-40€. Appelez le 07 68 30 33 03 pour un devis précis.' },
      { q: 'Taxi conventionné CPAM depuis Argeliers ?', a: 'Oui, ATC TAXI VTC propose le transport médical conventionné depuis Argeliers avec prise en charge Assurance Maladie sur prescription médicale.' },
    ],
  },
  'ginestas': {
    city: 'Ginestas', dept: 'Aude (11)', distance: '28 km', duration: '30 min',
    heroImage: 'https://images.unsplash.com/photo-1761125263507-0b8d8bfb8337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Méditerranée Languedoc étang – Taxi Narbonne Ginestas ATC TAXI VTC',
    description: 'Taxi Narbonne – Ginestas. Commune du Minervois dans l\'Aude. Service taxi professionnel 24h/24 pour tous vos déplacements locaux, médicaux et touristiques.',
    seoContent: 'Ginestas est une commune de l\'Aude, située dans le Minervois, à environ 28 km de Narbonne en direction de Béziers. Ce village tranquille est niché entre vignobles et garrigue, avec un accès facile à la D607 et un environnement méditerranéen préservé. ATC TAXI VTC Narbonne propose des transferts depuis Ginestas vers Narbonne, Béziers, Carcassonne et tous les aéroports de la région.',
    seoContent2: 'Notre service de taxi couvre Ginestas et toutes les communes du Minervois narbonnais. Disponible 24h/24, nos chauffeurs professionnels vous emmènent partout dans l\'Aude et l\'Hérault. Tarifs fixés à l\'avance, pas de mauvaise surprise. Paiement CB accepté, réservation WhatsApp possible.',
    seoContent3: 'Nous assurons les transports médicaux conventionnés CPAM depuis Ginestas vers les hôpitaux et cliniques du Narbonnais. Pour vos rendez-vous de dialyse, chimiothérapie ou consultations spécialisées, notre service est là pour vous. Réponse garantie en moins de 5 minutes.',
    highlights: ['Village du Minervois', 'Vignobles AOC', 'Accès D607', 'Transferts médicaux CPAM'],
    faq: [
      { q: 'Quel est le prix d\'un taxi depuis Ginestas vers Narbonne ?', a: 'Ginestas est à environ 28 km de Narbonne. Tarif estimé : 35-50€. Contactez-nous au 07 68 30 33 03 pour un devis gratuit.' },
      { q: 'Taxi Ginestas – Aéroport Montpellier ?', a: 'Oui, nous assurons les transferts depuis Ginestas vers l\'aéroport de Montpellier Méditerranée. Tarif fixe disponible sur demande.' },
    ],
  },
  'bize-minervois': {
    city: 'Bize-Minervois', dept: 'Aude (11)', distance: '32 km', duration: '35 min',
    heroImage: 'https://images.unsplash.com/photo-1645390841042-77720e06e2b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Canal rivière Languedoc Bize-Minervois gorges – Taxi Narbonne Bize',
    description: 'Taxi Narbonne – Bize-Minervois. Village pittoresque au bord du Brian dans le Minervois audois. Transferts professionnels 24h/24, tarifs fixés à l\'avance.',
    seoContent: 'Bize-Minervois est un village pittoresque de l\'Aude, niché dans les gorges du Brian au cœur du Minervois. Réputé pour ses gorges sauvages, ses eaux cristallines et son atmosphère médiévale, Bize-Minervois est une destination prisée des randonneurs et amoureux de nature. Les baignades dans le Brian, les sentiers de randonnée et les vignobles AOC Minervois font de ce village un lieu unique.',
    seoContent2: 'À environ 32 km de Narbonne, ce village est desservi par ATC TAXI VTC Narbonne 24h/24. Nous proposons des transferts depuis Bize-Minervois vers Narbonne, la gare SNCF, l\'hôpital, et les aéroports de Montpellier, Toulouse et Carcassonne. Notre taxi peut également vous emmener vers les sites touristiques du Minervois et de l\'Aude.',
    seoContent3: 'Le transport médical conventionné CPAM est également disponible depuis Bize-Minervois pour vos rendez-vous médicaux réguliers. Chauffeurs professionnels, véhicules confortables et climatisés. Pour les groupes et les familles, nos véhicules 7 places sont idéaux pour explorer le Minervois.',
    highlights: ['Gorges du Brian', 'Village médiéval', 'Minervois audois', 'Randonnée & nature'],
    faq: [
      { q: 'Taxi Bize-Minervois – Narbonne, combien ?', a: 'Bize-Minervois est à environ 32 km de Narbonne. Tarif estimé : 45-60€. Appelez le 07 68 30 33 03 pour un devis gratuit.' },
      { q: 'Taxi médicaux depuis Bize-Minervois ?', a: 'Oui, nous proposons le transport VSL conventionné CPAM depuis Bize-Minervois vers les établissements de santé de Narbonne et de la région.' },
    ],
  },
  'cuxac-daude': {
    city: 'Cuxac-d\'Aude', dept: 'Aude (11)', distance: '12 km', duration: '15 min',
    heroImage: 'https://images.unsplash.com/photo-1761125263507-0b8d8bfb8337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Paysage Languedoc Aude – Taxi Narbonne Cuxac-d\'Aude ATC TAXI VTC',
    description: 'Taxi Narbonne – Cuxac-d\'Aude. Commune du Narbonnais proche de Narbonne. Service de taxi rapide et économique 24h/24 pour tous vos déplacements.',
    seoContent: 'Cuxac-d\'Aude est une commune du Narbonnais, idéalement située à seulement 12 km de Narbonne, sur les rives de l\'Aude. Ce village dynamique est entouré de vignobles et de plaines agricoles, avec un accès facile depuis la RD6113. Marché hebdomadaire animé, commerces de proximité, vie de village authentique : Cuxac-d\'Aude est une commune résidentielle appréciée.',
    seoContent2: 'ATC TAXI VTC Narbonne dessert Cuxac-d\'Aude 24h/24 pour tous vos déplacements : gare de Narbonne, hôpital, centres commerciaux, aéroports. À seulement 15 minutes de trajet, Cuxac-d\'Aude bénéficie d\'une proximité idéale avec Narbonne. Nos tarifs pour les courts trajets sont particulièrement compétitifs.',
    seoContent3: 'Nous assurons également les transports médicaux conventionnés CPAM depuis Cuxac-d\'Aude vers les établissements de santé du Narbonnais. Service disponible 7j/7, réponse garantie en moins de 5 minutes. Paiement CB accepté, facture disponible sur demande.',
    highlights: ['12 km de Narbonne', 'Village du Narbonnais', 'Rives de l\'Aude', 'Taxi économique'],
    faq: [
      { q: 'Prix taxi Cuxac-d\'Aude – Narbonne ?', a: 'Cuxac-d\'Aude est à seulement 12 km de Narbonne. Tarif estimé : 18-28€ selon l\'adresse. Contactez-nous au 07 68 30 33 03.' },
      { q: 'Taxi Cuxac-d\'Aude – Gare de Narbonne ?', a: 'Oui ! Dépose à la gare SNCF de Narbonne depuis Cuxac-d\'Aude en environ 15 minutes. Disponible 24h/24.' },
    ],
  },
  'vinassan': {
    city: 'Vinassan', dept: 'Aude (11)', distance: '8 km', duration: '12 min',
    heroImage: 'https://images.unsplash.com/photo-1760372059338-b503bfd850df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Vignobles Aude Vinassan – Taxi Narbonne Vinassan ATC TAXI VTC',
    description: 'Taxi Narbonne – Vinassan. Commune limitrophe de Narbonne dans l\'Aude. Transport rapide et économique 24h/24 pour la gare, l\'hôpital et tous vos déplacements.',
    seoContent: 'Vinassan est une commune de l\'Aude, limitrophe de Narbonne et parfaitement desservie par ATC TAXI VTC. Située à seulement 8 km du centre de Narbonne, Vinassan est une commune résidentielle dynamique avec un accès direct à l\'autoroute A9. Les vignobles environnants produisent des vins AOC Coteaux du Languedoc reconnus.',
    seoContent2: 'Notre taxi Narbonne-Vinassan est le moyen le plus pratique pour rejoindre la gare SNCF de Narbonne, l\'hôpital, les zones commerciales et les aéroports de la région. À seulement 12 minutes de trajet, Vinassan est une des communes les mieux desservies du Narbonnais par notre service.',
    seoContent3: 'ATC TAXI VTC est agréé pour le transport médical conventionné CPAM depuis Vinassan, ce qui permet la prise en charge de vos transports vers les établissements de santé sur prescription médicale. Disponible 24h/24, 7j/7, réponse en moins de 5 minutes. Réservation par téléphone ou WhatsApp.',
    highlights: ['8 km de Narbonne', 'Accès autoroute A9', 'Commune résidentielle', 'VSL conventionné'],
    faq: [
      { q: 'Taxi Vinassan – Narbonne, quel prix ?', a: 'Vinassan est à 8 km de Narbonne. Tarif estimé : 15-22€. Appelez le 07 68 30 33 03 pour un devis immédiat.' },
      { q: 'Taxi Vinassan – Aéroport Montpellier ?', a: 'Oui, nous assurons les transferts depuis Vinassan vers l\'aéroport de Montpellier. Tarif fixe, disponible sur demande.' },
    ],
  },
  'armissan': {
    city: 'Armissan', dept: 'Aude (11)', distance: '15 km', duration: '18 min',
    heroImage: 'https://images.unsplash.com/photo-1697464960895-7979baf9e029?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Côte méditerranéenne Corbières Aude Armissan – Taxi Narbonne Armissan',
    description: 'Taxi Narbonne – Armissan. Village dans les Corbières audoises. Service taxi 24h/24 pour tous vos trajets locaux, médicaux et vers les aéroports.',
    seoContent: 'Armissan est un village des Corbières audoises, situé à environ 15 km de Narbonne, entre vignobles et garrigue méditerranéenne. Ce village pittoresque est connu pour ses paysages de Corbières, son vignoble AOC Corbières et ses panoramas sur les étangs narbonnais et la mer Méditerranée. La position d\'Armissan entre mer et collines en fait un lieu privilégié.',
    seoContent2: 'ATC TAXI VTC Narbonne dessert Armissan 24h/24, 7j/7. Nos transferts depuis Armissan couvrent la gare SNCF de Narbonne, l\'hôpital, les cliniques et les aéroports de Montpellier, Toulouse et Carcassonne. Armissan est à seulement 18 minutes de Narbonne, ce qui en fait un trajet rapide et économique.',
    seoContent3: 'Le transport médical conventionné CPAM est disponible depuis Armissan pour vos rendez-vous de dialyse, chimiothérapie et consultations spécialisées. Véhicules confortables, chauffeurs professionnels, tarifs transparents. Réservez par téléphone ou WhatsApp.',
    highlights: ['Village des Corbières', 'Vignoble AOC', 'Paysages méditerranéens', 'Transport CPAM'],
    faq: [
      { q: 'Prix taxi Armissan – Narbonne ?', a: 'Armissan est à 15 km de Narbonne. Tarif estimé : 20-30€. Contactez-nous au 07 68 30 33 03.' },
      { q: 'Taxi depuis Armissan pour un rendez-vous médical ?', a: 'Oui, nous proposons le transport VSL conventionné CPAM depuis Armissan. Sur prescription médicale, l\'Assurance Maladie peut prendre en charge votre transport.' },
    ],
  },
  'bages': {
    city: 'Bages', dept: 'Aude (11)', distance: '8 km', duration: '10 min',
    heroImage: 'https://images.unsplash.com/photo-1769524503968-edb3a31b05a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Village de bord d\'étang Bages Languedoc – Taxi Narbonne Bages',
    description: 'Taxi Narbonne – Bages. Village au bord de l\'étang de Bages, dans le Parc Naturel Régional de la Narbonnaise. Service taxi rapide 24h/24 depuis Narbonne.',
    seoContent: 'Bages est un village de charme de l\'Aude, niché au bord de l\'étang de Bages dans le Parc Naturel Régional de la Narbonnaise. Ce village pittoresque, connu pour ses flamants roses, ses vignobles et sa gastronomie locale (avec notamment la célèbre auberge du Village), est situé à seulement 8 km de Narbonne. Les ruelles médiévales et les couchers de soleil sur l\'étang font de Bages un incontournable de l\'Aude.',
    seoContent2: 'ATC TAXI VTC Narbonne dessert Bages en environ 10 minutes. Notre service de taxi est idéal pour les touristes souhaitant visiter le village depuis Narbonne, pour les déplacements médicaux conventionnés CPAM, et pour les transferts vers la gare SNCF de Narbonne et les aéroports de la région.',
    seoContent3: 'Le village de Bages, souvent cité parmi les plus beaux villages de l\'Aude, est une destination privilégiée pour les promenades au bord de l\'étang et la dégustation de vins AOC. Réservation immédiate au 07 68 30 33 03. Disponible 24h/24, même les jours fériés.',
    highlights: ['Étang de Bages', 'Flamants roses', 'Gastronomie locale', 'PNR Narbonnaise'],
    faq: [
      { q: 'Taxi Narbonne – Bages, combien ça coûte ?', a: 'Bages est à seulement 8 km de Narbonne. Tarif estimé : 15-22€. Appelez le 07 68 30 33 03.' },
      { q: 'Comment aller à Bages depuis la gare de Narbonne en taxi ?', a: 'Depuis la gare SNCF de Narbonne, Bages est à environ 10 minutes en taxi (8 km). Nous pouvons vous y déposer à n\'importe quelle heure.' },
    ],
  },
  'le-somail': {
    city: 'Le Somail', dept: 'Aude (11)', distance: '22 km', duration: '25 min',
    heroImage: 'https://images.unsplash.com/photo-1645390841042-77720e06e2b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    heroAlt: 'Canal du Midi platanes bateau Languedoc – Taxi Narbonne Le Somail',
    description: 'Taxi Narbonne – Le Somail. Port fluvial historique sur le Canal du Midi, Patrimoine Mondial UNESCO. Service taxi 24h/24 pour touristes et résidents.',
    seoContent: 'Le Somail est un hameau de Saint-Nazaire-d\'Aude, situé sur le Canal du Midi classé au Patrimoine Mondial de l\'UNESCO. Ce port fluvial pittoresque, avec son pont du XVIIe siècle, ses platanes centenaires et son célèbre bouquiniste flottant, est une étape incontournable du Canal du Midi. Chaque année, des milliers de plaisanciers et touristes s\'arrêtent au Somail lors de leur navigation sur le canal.',
    seoContent2: 'Situé à environ 22 km de Narbonne, Le Somail est desservi par ATC TAXI VTC Narbonne 24h/24. Nous proposons des transferts vers Le Somail depuis Narbonne, la gare SNCF, les aéroports et les villages environnants pour vos visites touristiques, sorties en bateau ou déplacements professionnels.',
    seoContent3: 'Le Canal du Midi, long de 360 km, relie Toulouse à l\'étang de Thau et traverse l\'Aude de nombreuses communes. ATC TAXI VTC Narbonne vous emmène découvrir ce patrimoine exceptionnel. Réservation au 07 68 30 33 03 ou par WhatsApp. Navettes possibles entre plusieurs écluses du Canal du Midi.',
    highlights: ['Canal du Midi UNESCO', 'Port fluvial historique', 'Bouquiniste flottant', 'Platanes centenaires'],
    faq: [
      { q: 'Taxi depuis Narbonne vers Le Somail ?', a: 'Le Somail est à 22 km de Narbonne sur le Canal du Midi. Tarif estimé : 30-40€. Réservez au 07 68 30 33 03.' },
      { q: 'Taxi Le Somail – Gare de Narbonne ?', a: 'Oui, depuis Le Somail (Canal du Midi), nous vous déposons à la gare SNCF de Narbonne en environ 25 minutes. Disponible 24h/24.' },
    ],
  },
};

export function GeoPage() {
  const location = useLocation();
  // Extract slug from pathname: /taxi-gruissan → gruissan, /taxi-narbonne-barcelone → narbonne-barcelone
  const slug = location.pathname.replace(/^\/taxi-/, '') || '';
  const data = slug ? cityData[slug] : null;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const city = data?.city ?? (slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Destination');
  const description = data?.description ?? `Taxi Narbonne – ${city}. Service de taxi professionnel ATC TAXI VTC disponible 24h/24. Réservez votre taxi au ${PHONE_DISPLAY}.`;
  const seoDescription = `Taxi Narbonne vers ${city} - ATC TAXI VTC. ${description.substring(0, 120)}... Disponible 24h/24. Appelez le ${PHONE_DISPLAY}.`;
  const heroImage = data?.heroImage ?? 'https://images.unsplash.com/photo-1697464960895-7979baf9e029?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400';
  const heroAlt = data?.heroAlt ?? `Taxi Narbonne vers ${city}`;

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['TaxiService', 'LocalBusiness'],
    name: `ATC TAXI VTC Narbonne – Taxi ${city}`,
    description: description,
    telephone: '+33768303303',
    url: `https://www.atc-taxi-vtc.com/taxi-${slug}`,
    image: 'https://www.atc-taxi-vtc.com/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Narbonne',
      addressLocality: 'Narbonne',
      postalCode: '11100',
      addressRegion: 'Occitanie',
      addressCountry: 'FR',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 43.1837, longitude: 3.0029 },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      opens: '00:00',
      closes: '23:59',
    }],
    priceRange: '€€',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '200', bestRating: '5' },
    areaServed: [
      { '@type': 'City', name: 'Narbonne' },
      { '@type': 'City', name: city },
    ],
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
        title={`Taxi Narbonne – ${city} | ATC TAXI VTC – Transfert 24h/24`}
        description={seoDescription}
        canonical={`/taxi-${slug}`}
        keywords={`taxi narbonne ${city.toLowerCase()}, taxi ${city.toLowerCase()}, transfert narbonne ${city.toLowerCase()}, vtc narbonne ${city.toLowerCase()}, taxi aude ${city.toLowerCase()}`}
        schema={faqSchema ? [localBusinessSchema, faqSchema] : localBusinessSchema}
      />

      {/* ── HERO with full image ── */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden" style={{ paddingTop: '80px' }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={heroAlt}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(6,15,30,0.35) 0%, rgba(6,15,30,0.6) 40%, rgba(6,15,30,0.92) 75%, rgba(6,15,30,1) 100%)',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-16 pt-32">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-5">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link to="/zones-desservies" className="hover:text-white transition-colors">Zones desservies</Link>
            <span>/</span>
            <span style={{ color: TEAL }}>{city}</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5"
              style={{ background: `rgba(58,180,177,0.2)`, border: `1px solid rgba(58,180,177,0.5)`, color: TEAL }}>
              <MapPin size={14} />
              Taxi {city} – Narbonne
            </div>

            <h1 className="text-white mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1 }}>
              Taxi Narbonne – {city}
            </h1>

            {data && (
              <div className="flex flex-wrap gap-4 mb-5">
                <span className="flex items-center gap-1 text-gray-300 text-sm">
                  <MapPin size={13} style={{ color: TEAL }} /> {data.distance}
                </span>
                <span className="flex items-center gap-1 text-gray-300 text-sm">
                  <Clock size={13} style={{ color: TEAL }} /> {data.duration}
                </span>
                <span className="flex items-center gap-1 text-gray-300 text-sm">
                  <Shield size={13} style={{ color: TEAL }} /> {data.dept}
                </span>
                <span className="flex items-center gap-1 text-sm font-semibold" style={{ color: TEAL }}>
                  ⭐⭐⭐⭐⭐ Service 5/5
                </span>
              </div>
            )}

            <p className="text-gray-200 mb-8 leading-relaxed max-w-2xl" style={{ fontSize: '1.05rem' }}>
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${PHONE}`}
                className="flex items-center gap-2 px-6 py-4 rounded-full font-bold text-white text-base shadow-lg hover:scale-105 transition-transform"
                style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}>
                <Phone size={17} /> {PHONE_DISPLAY}
              </a>
              <a href={`https://wa.me/33768303303?text=Bonjour%2C%20je%20souhaite%20un%20taxi%20pour%20${encodeURIComponent(city)}.`}
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

      {/* ── Highlights bar ── */}
      {data?.highlights && (
        <div style={{ background: '#0A1931', borderTop: '1px solid rgba(58,180,177,0.15)', borderBottom: '1px solid rgba(58,180,177,0.15)' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {data.highlights.map((h) => (
                <div key={h} className="flex items-center gap-2 p-3 rounded-xl text-sm"
                  style={{ background: 'rgba(58,180,177,0.08)', border: `1px solid rgba(58,180,177,0.15)` }}>
                  <CheckCircle size={14} className="flex-shrink-0" style={{ color: TEAL }} />
                  <span className="text-gray-200">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="space-y-10">

          {/* Why ATC TAXI section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: <Clock size={22} style={{ color: TEAL }} />, title: 'Disponible 24h/24', desc: '7j/7 – Réponse en moins de 5 minutes. Même les nuits, week-ends et jours fériés.' },
              { icon: <Shield size={22} style={{ color: TEAL }} />, title: 'Tarif fixe garanti', desc: 'Prix convenu à l\'avance, sans surprises ni compteur. Paiement CB accepté.' },
              { icon: <Award size={22} style={{ color: TEAL }} />, title: 'Note 5/5 ⭐⭐⭐⭐⭐', desc: 'Plus de 200 avis clients vérifiés. Chauffeurs professionnels certifiés.' },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-2xl"
                style={{ background: '#0D2040', border: `1px solid rgba(58,180,177,0.15)` }}>
                <div className="mb-3">{item.icon}</div>
                <h3 className="text-white font-bold mb-2 text-base">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </section>

          {/* Main SEO Content */}
          <section>
            <h2 className="text-white font-bold mb-5" style={{ fontSize: '1.6rem' }}>
              Taxi Narbonne – {city} : Service professionnel de confiance
            </h2>
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed text-base">
                {data?.seoContent ?? `ATC TAXI VTC Narbonne est votre partenaire transport pour rejoindre ${city} depuis Narbonne et l'Aude. Notre service de taxi professionnel est disponible 24h/24, 7j/7. Véhicules récents, chauffeurs certifiés, tarifs transparents.`}
              </p>
              {data?.seoContent2 && (
                <p className="text-gray-300 leading-relaxed text-base">{data.seoContent2}</p>
              )}
              {data?.seoContent3 && (
                <p className="text-gray-300 leading-relaxed text-base">{data.seoContent3}</p>
              )}
            </div>
          </section>

          {/* Services included */}
          <section className="p-7 rounded-2xl" style={{ background: '#0D2040', border: `1px solid rgba(58,180,177,0.25)` }}>
            <h2 className="text-white font-bold mb-5" style={{ fontSize: '1.3rem' }}>
              Nos services pour votre trajet Narbonne – {city}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Prise en charge à domicile ou hôtel',
                'Aide aux bagages incluse',
                'Véhicule récent, propre et climatisé',
                'Chauffeur professionnel certifié',
                'Transport familles jusqu\'à 7 passagers',
                'Transport VSL conventionné CPAM',
                'Transferts gare SNCF Narbonne',
                'Transferts aéroports (Montpellier, Toulouse…)',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Star size={12} className="flex-shrink-0" style={{ color: TEAL }} />
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
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
                      <div className="px-5 pb-4 text-gray-300 text-sm border-t border-white/5 pt-3 leading-relaxed">{faq.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA Box */}
          <div className="p-8 rounded-2xl text-center"
            style={{ background: `linear-gradient(135deg, rgba(58,180,177,0.15), rgba(58,180,177,0.05))`, border: `1px solid rgba(58,180,177,0.4)` }}>
            <h3 className="text-white font-bold text-xl mb-2">Réservez votre taxi pour {city}</h3>
            <p className="text-gray-300 mb-6">Tarif fixe · Disponible 24h/24 · Réponse immédiate</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-lg shadow-lg"
                style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}>
                <Phone size={18} /> {PHONE_DISPLAY}
              </a>
              <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-bold text-sm"
                style={{ background: '#ffffff', color: '#1a1a1a' }}>
                ⭐ Donnez votre avis
              </a>
            </div>
          </div>

          {/* Internal links */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Taxi Narbonne', href: '/taxi-narbonne' },
              { label: 'Toutes les zones', href: '/zones-desservies' },
              { label: 'Nos services', href: '/services' },
              { label: '✈ Aéroport Montpellier', href: '/taxi-aeroport-montpellier' },
              { label: '✈ Aéroport Toulouse', href: '/taxi-aeroport-toulouse' },
              { label: '✈ Aéroport Carcassonne', href: '/taxi-aeroport-carcassonne' },
              { label: 'Taxi Gare Narbonne', href: '/taxi-gare-narbonne' },
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
    </div>
  );
}
