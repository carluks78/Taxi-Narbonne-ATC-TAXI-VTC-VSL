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
  'narbonne-plage': {
    city: 'Narbonne Plage', dept: 'Aude (11)', distance: '15 km', duration: '18 min',
    description: 'Taxi Narbonne – Narbonne Plage. Accès direct à la plage du Mateille, Narbonne Plage et La Seïche. Service taxi 24h/24, idéal pour touristes et résidents.',
    seoContent: 'Narbonne Plage est la station balnéaire de Narbonne, accessible en environ 15 minutes depuis le centre-ville. Elle comprend la plage du Mateille, une des plus belles plages de l\'Aude, ainsi que La Seïche et l\'ensemble du littoral narbonnais. ATC TAXI VTC Narbonne propose des transferts vers Narbonne Plage 24h/24 depuis la gare de Narbonne, l\'hôpital, le centre-ville et toutes les communes environnantes. Notre service de taxi est particulièrement utilisé pendant la saison estivale pour les touristes souhaitant rejoindre la plage sans voiture. Nous proposons aussi des navettes régulières entre Narbonne et Narbonne Plage à tarif préférentiel. La plage du Mateille, classée parmi les plus propres de la région Occitanie, est à seulement 15 km de Narbonne par la route des Cabanes. ATC TAXI VTC assure également des transferts depuis les campings de Narbonne Plage vers la gare, les aéroports et les sites touristiques de l\'Aude. Disponible 7j/7, nous répondons à toutes les demandes dans les 5 minutes. Tarifs fixes, sans surprise, paiement CB accepté.',
    highlights: ['Plage du Mateille', 'La Seïche', 'Station balnéaire', 'Navettes estivales'],
    faq: [
      { q: 'Combien coûte un taxi Narbonne – Narbonne Plage ?', a: 'Le trajet Narbonne centre – Narbonne Plage coûte environ 20-30€ selon l\'adresse exacte et l\'horaire. Contactez-nous pour un devis précis.' },
      { q: 'Taxi depuis la gare de Narbonne vers Narbonne Plage ?', a: 'Oui ! Depuis la gare SNCF de Narbonne, comptez environ 18-20 minutes pour rejoindre Narbonne Plage. Tarif ~25-30€. Réservez au 07 68 30 33 03.' },
      { q: 'Y a-t-il un taxi de nuit entre Narbonne et Narbonne Plage ?', a: 'Oui, ATC TAXI VTC Narbonne est disponible 24h/24, 7j/7. Appelez ou envoyez un WhatsApp à tout moment.' },
    ],
  },
  'argeliers': {
    city: 'Argeliers', dept: 'Aude (11)', distance: '22 km', duration: '25 min',
    description: 'Taxi Narbonne – Argeliers. Village viticole du Narbonnais, berceau du mouvement des vignerons du Midi. Transport professionnel 24h/24 dans tout l\'Aude.',
    seoContent: 'Argeliers est un village viticole de l\'Aude situé dans le Narbonnais, à environ 22 km de Narbonne. Ce village historique est connu pour avoir été le berceau de la révolte des vignerons du Midi en 1907, menée par Marcelin Albert. Entouré de vignobles AOC Minervois, Argeliers est une commune paisible appréciée pour son authenticité et son patrimoine viticole. ATC TAXI VTC Narbonne dessert Argeliers et toutes les communes environnantes du Narbonnais. Notre service de taxi est disponible 24h/24 pour vos déplacements vers Narbonne, la gare SNCF, l\'hôpital et les aéroports de la région. Nous assurons également des transferts médicaux conventionnés CPAM depuis Argeliers vers les établissements de santé de Narbonne et de la région. Chauffeurs expérimentés, véhicules récents et climatisés, tarifs transparents pour tous vos trajets depuis Argeliers.',
    highlights: ['Village viticole AOC', 'Histoire vigneronne 1907', 'Narbonnais authentique', 'Transferts médicaux'],
    faq: [
      { q: 'Taxi Argeliers – Narbonne, quel tarif ?', a: 'Argeliers est à environ 22 km de Narbonne. Tarif estimé : 30-40€. Appelez le 07 68 30 33 03 pour un devis précis.' },
      { q: 'Taxi conventionné CPAM depuis Argeliers ?', a: 'Oui, ATC TAXI VTC propose le transport médical conventionné depuis Argeliers avec prise en charge Assurance Maladie sur prescription médicale.' },
    ],
  },
  'ginestas': {
    city: 'Ginestas', dept: 'Aude (11)', distance: '28 km', duration: '30 min',
    description: 'Taxi Narbonne – Ginestas. Commune du Minervois dans l\'Aude. Service taxi professionnel 24h/24 pour tous vos déplacements locaux, médicaux et touristiques.',
    seoContent: 'Ginestas est une commune de l\'Aude, située dans le Minervois, à environ 28 km de Narbonne en direction de Béziers. Ce village tranquille est niché entre vignobles et garrigue, avec un accès facile à la D607. ATC TAXI VTC Narbonne propose des transferts depuis Ginestas vers Narbonne, Béziers, Carcassonne et tous les aéroports de la région (Montpellier, Toulouse, Carcassonne). Notre service de taxi couvre Ginestas et toutes les communes du Minervois narbonnais. Disponible 24h/24, nos chauffeurs professionnels vous emmènent partout dans l\'Aude et l\'Hérault. Nous assurons les transports médicaux conventionnés CPAM depuis Ginestas vers les hôpitaux et cliniques du Narbonnais. Tarifs fixés à l\'avance, pas de mauvaise surprise. Paiement CB accepté, réservation WhatsApp possible.',
    highlights: ['Village du Minervois', 'Vignobles AOC', 'Accès D607', 'Transferts médicaux CPAM'],
    faq: [
      { q: 'Quel est le prix d\'un taxi depuis Ginestas vers Narbonne ?', a: 'Ginestas est à environ 28 km de Narbonne. Tarif estimé : 35-50€. Contactez-nous au 07 68 30 33 03 pour un devis gratuit.' },
      { q: 'Taxi Ginestas – Aéroport Montpellier ?', a: 'Oui, nous assurons les transferts depuis Ginestas vers l\'aéroport de Montpellier Méditerranée. Tarif fixe disponible sur demande.' },
    ],
  },
  'bize-minervois': {
    city: 'Bize-Minervois', dept: 'Aude (11)', distance: '32 km', duration: '35 min',
    description: 'Taxi Narbonne – Bize-Minervois. Village pittoresque au bord du Brian dans le Minervois audois. Transferts professionnels 24h/24, tarifs fixés à l\'avance.',
    seoContent: 'Bize-Minervois est un village pittoresque de l\'Aude, niché dans les gorges du Brian au cœur du Minervois. Réputé pour ses gorges sauvages, ses eaux cristallines et son atmosphère médiévale, Bize-Minervois est une destination prisée des randonneurs et amoureux de nature. À environ 32 km de Narbonne, ce village est desservi par ATC TAXI VTC Narbonne 24h/24. Nous proposons des transferts depuis Bize-Minervois vers Narbonne, la gare SNCF, l\'hôpital, et les aéroports de Montpellier, Toulouse et Carcassonne. Notre taxi peut également vous emmener vers les sites touristiques du Minervois et de l\'Aude. Le transport médical conventionné CPAM est également disponible depuis Bize-Minervois pour vos rendez-vous médicaux réguliers. Chauffeurs professionnels, véhicules confortables et climatisés.',
    highlights: ['Gorges du Brian', 'Village médiéval', 'Minervois audois', 'Randonnée & nature'],
    faq: [
      { q: 'Taxi Bize-Minervois – Narbonne, combien ?', a: 'Bize-Minervois est à environ 32 km de Narbonne. Tarif estimé : 45-60€. Appelez le 07 68 30 33 03 pour un devis gratuit.' },
      { q: 'Taxi médicaux depuis Bize-Minervois ?', a: 'Oui, nous proposons le transport VSL conventionné CPAM depuis Bize-Minervois vers les établissements de santé de Narbonne et de la région.' },
    ],
  },
  'cuxac-daude': {
    city: 'Cuxac-d\'Aude', dept: 'Aude (11)', distance: '12 km', duration: '15 min',
    description: 'Taxi Narbonne – Cuxac-d\'Aude. Commune du Narbonnais proche de Narbonne. Service de taxi rapide et économique 24h/24 pour tous vos déplacements.',
    seoContent: 'Cuxac-d\'Aude est une commune du Narbonnais, idéalement située à seulement 12 km de Narbonne, sur les rives de l\'Aude. Ce village dynamique est entouré de vignobles et de plaines agricoles, avec un accès facile depuis la RD6113. ATC TAXI VTC Narbonne dessert Cuxac-d\'Aude 24h/24 pour tous vos déplacements : gare de Narbonne, hôpital, centres commerciaux, aéroports. À seulement 15 minutes de trajet, Cuxac-d\'Aude bénéficie d\'une proximité idéale avec Narbonne. Nos tarifs pour les courts trajets sont particulièrement compétitifs. Nous assurons également les transports médicaux conventionnés CPAM depuis Cuxac-d\'Aude vers les établissements de santé du Narbonnais. Service disponible 7j/7, réponse garantie en moins de 5 minutes. Paiement CB accepté, facture disponible sur demande.',
    highlights: ['12 km de Narbonne', 'Village du Narbonnais', 'Rives de l\'Aude', 'Taxi économique'],
    faq: [
      { q: 'Prix taxi Cuxac-d\'Aude – Narbonne ?', a: 'Cuxac-d\'Aude est à seulement 12 km de Narbonne. Tarif estimé : 18-28€ selon l\'adresse. Contactez-nous au 07 68 30 33 03.' },
      { q: 'Taxi Cuxac-d\'Aude – Gare de Narbonne ?', a: 'Oui ! Dépose à la gare SNCF de Narbonne depuis Cuxac-d\'Aude en environ 15 minutes. Disponible 24h/24.' },
    ],
  },
  'vinassan': {
    city: 'Vinassan', dept: 'Aude (11)', distance: '8 km', duration: '12 min',
    description: 'Taxi Narbonne – Vinassan. Commune limitrophe de Narbonne dans l\'Aude. Transport rapide et économique 24h/24 pour la gare, l\'hôpital et tous vos déplacements.',
    seoContent: 'Vinassan est une commune de l\'Aude, limitrophe de Narbonne et parfaitement desservie par ATC TAXI VTC. Située à seulement 8 km du centre de Narbonne, Vinassan est une commune résidentielle dynamique avec un accès direct à l\'autoroute A9. Notre taxi Narbonne-Vinassan est le moyen le plus pratique pour rejoindre la gare SNCF de Narbonne, l\'hôpital, les zones commerciales et les aéroports de la région. À seulement 12 minutes de trajet, nos tarifs pour Vinassan sont parmi les plus compétitifs de la région. ATC TAXI VTC est agréé pour le transport médical conventionné CPAM depuis Vinassan, ce qui permet la prise en charge de vos transports vers les établissements de santé sur prescription médicale. Disponible 24h/24, 7j/7, réponse en moins de 5 minutes. Réservation par téléphone ou WhatsApp.',
    highlights: ['8 km de Narbonne', 'Accès autoroute A9', 'Commune résidentielle', 'VSL conventionné'],
    faq: [
      { q: 'Taxi Vinassan – Narbonne, quel prix ?', a: 'Vinassan est à 8 km de Narbonne. Tarif estimé : 15-22€. Appelez le 07 68 30 33 03 pour un devis immédiat.' },
      { q: 'Taxi Vinassan – Aéroport Montpellier ?', a: 'Oui, nous assurons les transferts depuis Vinassan vers l\'aéroport de Montpellier. Tarif fixe, disponible sur demande.' },
    ],
  },
  'armissan': {
    city: 'Armissan', dept: 'Aude (11)', distance: '15 km', duration: '18 min',
    description: 'Taxi Narbonne – Armissan. Village dans les Corbières audoises. Service taxi 24h/24 pour tous vos trajets locaux, médicaux et vers les aéroports.',
    seoContent: 'Armissan est un village des Corbières audoises, situé à environ 15 km de Narbonne, entre vignobles et garrigue méditerranéenne. Ce village pittoresque est connu pour ses paysages de Corbières et son vignoble AOC. ATC TAXI VTC Narbonne dessert Armissan 24h/24, 7j/7. Nos transferts depuis Armissan couvrent la gare SNCF de Narbonne, l\'hôpital, les cliniques et les aéroports de Montpellier, Toulouse et Carcassonne. Armissan est à seulement 18 minutes de Narbonne, ce qui en fait un trajet rapide et économique. Le transport médical conventionné CPAM est disponible depuis Armissan pour vos rendez-vous de dialyse, chimiothérapie et consultations spécialisées. Véhicules confortables, chauffeurs professionnels, tarifs transparents.',
    highlights: ['Village des Corbières', 'Vignoble AOC', 'Paysages méditerranéens', 'Transport CPAM'],
    faq: [
      { q: 'Prix taxi Armissan – Narbonne ?', a: 'Armissan est à 15 km de Narbonne. Tarif estimé : 20-30€. Contactez-nous au 07 68 30 33 03.' },
      { q: 'Taxi depuis Armissan pour un rendez-vous médical ?', a: 'Oui, nous proposons le transport VSL conventionné CPAM depuis Armissan. Sur prescription médicale, l\'Assurance Maladie peut prendre en charge votre transport.' },
    ],
  },
  'bages': {
    city: 'Bages', dept: 'Aude (11)', distance: '8 km', duration: '10 min',
    description: 'Taxi Narbonne – Bages. Village au bord de l\'étang de Bages, dans le Parc Naturel Régional de la Narbonnaise. Service taxi rapide 24h/24 depuis Narbonne.',
    seoContent: 'Bages est un village de charme de l\'Aude, niché au bord de l\'étang de Bages dans le Parc Naturel Régional de la Narbonnaise. Ce village pittoresque, connu pour ses flamants roses, ses vignobles et sa gastronomie locale (avec notamment la célèbre auberge du Village), est situé à seulement 8 km de Narbonne. ATC TAXI VTC Narbonne dessert Bages en environ 10 minutes. Notre service de taxi est idéal pour les touristes souhaitant visiter le village depuis Narbonne, pour les déplacements médicaux conventionnés CPAM, et pour les transferts vers la gare SNCF de Narbonne et les aéroports de la région. Le village de Bages, souvent cité parmi les plus beaux villages de l\'Aude, est une destination privilégiée pour les promenades au bord de l\'étang et la dégustation de vins AOC. Réservation immédiate au 07 68 30 33 03.',
    highlights: ['Étang de Bages', 'Flamants roses', 'Gastronomie locale', 'PNR Narbonnaise'],
    faq: [
      { q: 'Taxi Narbonne – Bages, combien ça coûte ?', a: 'Bages est à seulement 8 km de Narbonne. Tarif estimé : 15-22€. Appelez le 07 68 30 33 03.' },
      { q: 'Comment aller à Bages depuis la gare de Narbonne en taxi ?', a: 'Depuis la gare SNCF de Narbonne, Bages est à environ 10 minutes en taxi (8 km). Nous pouvons vous y déposer à n\'importe quelle heure du jour ou de la nuit.' },
    ],
  },
  'le-somail': {
    city: 'Le Somail', dept: 'Aude (11)', distance: '22 km', duration: '25 min',
    description: 'Taxi Narbonne – Le Somail. Port fluvial historique sur le Canal du Midi, Patrimoine Mondial UNESCO. Service taxi 24h/24 pour touristes et résidents.',
    seoContent: 'Le Somail est un hameau de Saint-Nazaire-d\'Aude, situé sur le Canal du Midi classé au Patrimoine Mondial de l\'UNESCO. Ce port fluvial pittoresque, avec son pont du XVIIe siècle, ses platanes centenaires et son célèbre bouquiniste flottant, est une étape incontournable du Canal du Midi. Situé à environ 22 km de Narbonne, Le Somail est desservi par ATC TAXI VTC Narbonne 24h/24. Nous proposons des transferts vers Le Somail depuis Narbonne, la gare SNCF, les aéroports et les villages environnants pour vos visites touristiques, sorties en bateau ou déplacements professionnels. Le Canal du Midi, long de 360 km, relie Toulouse à l\'étang de Thau et traverse l\'Aude de nombreuses communes. ATC TAXI VTC Narbonne vous emmène découvrir ce patrimoine exceptionnel. Réservation au 07 68 30 33 03 ou par WhatsApp.',
    highlights: ['Canal du Midi UNESCO', 'Port fluvial historique', 'Bouquiniste flottant', 'Platanes centenaires'],
    faq: [
      { q: 'Taxi depuis Narbonne vers Le Somail ?', a: 'Le Somail est à 22 km de Narbonne sur le Canal du Midi. Tarif estimé : 30-40€. Réservez au 07 68 30 33 03.' },
      { q: 'Taxi Le Somail – Gare de Narbonne ?', a: 'Oui, depuis Le Somail (Canal du Midi), nous vous déposons à la gare SNCF de Narbonne en environ 25 minutes. Disponible 24h/24.' },
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
    <div style={{ backgroundColor: '#060F1E' }} className="min-h-screen pt-28">
      <SEOHead
        title={`Taxi Narbonne – ${city} | ATC TAXI VTC – Transfert 24h/24`}
        description={seoDescription}
        canonical={`/taxi-${slug}`}
        keywords={`taxi narbonne ${city.toLowerCase()}, taxi ${city.toLowerCase()}, transfert narbonne ${city.toLowerCase()}, vtc narbonne ${city.toLowerCase()}, taxi aude ${city.toLowerCase()}`}
        schema={faqSchema ? [localBusinessSchema, faqSchema] : localBusinessSchema}
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