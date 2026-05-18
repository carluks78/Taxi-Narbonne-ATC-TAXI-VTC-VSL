import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Phone, MessageCircle, CheckCircle, MapPin, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { SEOHead } from '../components/SEOHead';

export default function TaxiNarbonne() {
  return (
    <div style={{ minHeight: "100vh", background: "yellow" }}>
      <h1>TAXI NARBONNE PAGE TEST</h1>
    </div>
  );
}

const PHONE = '0768303303';
const PHONE_DISPLAY = '07 68 30 33 03';
const WHATSAPP = 'https://wa.me/33768303303';
const TEAL = '#3AB4B1';
const TEAL_DARK = '#2A9490';

const faqs = [
  { q: 'Comment appeler un taxi à Narbonne ?', a: `Appelez le ${PHONE_DISPLAY} disponible 24h/24 7j/7. Réponse garantie en moins de 5 minutes. Ou envoyez un message WhatsApp pour une réponse immédiate.` },
  { q: 'Quel est le tarif d\'un taxi à Narbonne ?', a: 'Les tarifs varient selon la distance et l\'horaire. Comptez environ 15-25€ pour un trajet en ville, 40-60€ pour la gare vers un hôtel extérieur. Contactez-nous pour un devis précis.' },
  { q: 'Le taxi de Narbonne est-il disponible la nuit ?', a: 'Oui, ATC TAXI VTC Narbonne est disponible 24h/24, 7j/7, y compris la nuit, les weekends et les jours fériés.' },
  { q: 'Proposez-vous le taxi conventionné à Narbonne ?', a: 'Oui, nous sommes agréés pour le transport médical conventionné CPAM. Apportez votre prescription médicale et la prise en charge est effectuée directement.' },
  { q: 'Desservez-vous les communes autour de Narbonne ?', a: 'Oui, nous desservons Gruissan, Leucate, Sigean, Port-la-Nouvelle, Peyriac-de-Mer, Coursan, Vinassan, Bages et toutes les communes de l\'Aude.' },
  { q: 'Taxi Narbonne pour les aéroports ?', a: 'Nous desservons les aéroports de Montpellier (1h, ~130€), Toulouse-Blagnac (1h30, ~185€), Carcassonne (45 min, ~90€) et Barcelone (2h30, ~275€).' },
];

  return (
    <div style={{ backgroundColor: '#060F1E' }} className="min-h-screen pt-28">
      <SEOHead
        title="Taxi Narbonne 24h/24 | ATC TAXI VTC – Réservation Immédiate"
        description="Taxi Narbonne professionnel disponible 24h/24, 7j/7. Conventionné CPAM, transferts gare SNCF et aéroports. Chauffeurs certifiés, véhicules premium. Appelez le 07 68 30 33 03."
        canonical="/taxi-narbonne"
        keywords="taxi narbonne, taxi narbonne 24h, vtc narbonne, taxi narbonne pas cher, réserver taxi narbonne, taxi narbonne aéroport, taxi narbonne gare, taxi narbonne conventionné, chauffeur narbonne, narbonne taxi"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'TaxiService',
          name: 'Taxi Narbonne – ATC TAXI VTC',
          telephone: '+33768303303',
          address: { '@type': 'PostalAddress', addressLocality: 'Narbonne', postalCode: '11100', addressCountry: 'FR' },
          aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '200' },
          openingHours: 'Mo-Su 00:00-23:59',
          description: 'Taxi Narbonne 24h/24 – Service professionnel, conventionné CPAM, transferts gare et aéroport.',
        }}
      />

      {/* Hero */}
      <section className="py-20 px-4 sm:px-6" style={{ background: 'linear-gradient(180deg, #0A1931 0%, #060F1E 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link to="/" className="transition-colors hover:text-white">Accueil</Link>
            <span>/</span>
            <span style={{ color: TEAL }}>Taxi Narbonne</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: TEAL }}>Taxi Narbonne</span>
            <h1 className="text-white mt-3 mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800 }}>
              Taxi Narbonne – VTC 24h/24 disponible maintenant
            </h1>
            <p className="text-gray-300 mb-8 leading-relaxed max-w-2xl">
              ATC TAXI VTC Narbonne est votre taxi de confiance dans l'Aude. Taxi conventionné CPAM, transferts gare SNCF de Narbonne, aéroports Montpellier, Toulouse et Carcassonne. Service disponible 24h/24, 7j/7, week-ends et jours fériés.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={`tel:${PHONE}`}
                className="flex items-center gap-2 px-7 py-4 rounded-full font-bold text-white text-lg"
                style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}>
                <Phone size={18} /> {PHONE_DISPLAY}
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-4 rounded-full font-bold text-white text-lg bg-green-600 hover:bg-green-500 transition-colors">
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Key points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {[
            'Taxi Narbonne disponible 24h/24 – 7j/7',
            'Conventionné CPAM – Transport médical VSL',
            'Transferts Gare SNCF Narbonne',
            'Aéroports Montpellier, Toulouse, Carcassonne',
            'Paiement carte bancaire accepté',
            'Véhicules premium récents et climatisés',
            'Chauffeurs professionnels certifiés',
            'Tarifs transparents sans surprise',
          ].map((point) => (
            <div key={point} className="flex items-center gap-3 p-4 rounded-xl"
              style={{ background: '#0D2040', border: `1px solid rgba(58,180,177,0.15)` }}>
              <CheckCircle size={16} className="flex-shrink-0" style={{ color: TEAL }} />
              <span className="text-gray-200 text-sm">{point}</span>
            </div>
          ))}
        </div>

        {/* H2 sections */}
        <div className="space-y-10">
          <section>
            <h2 className="text-white font-bold mb-4" style={{ fontSize: '1.5rem' }}>
              Taxi Narbonne : Service premium 24h/24
            </h2>
            <p className="text-gray-300 leading-relaxed">
              ATC TAXI VTC Narbonne est une société de taxi professionnelle basée à Narbonne, dans le département de l'Aude (11). Nous proposons un service de taxi et VTC haut de gamme, disponible 24 heures sur 24, 7 jours sur 7, y compris les nuits, les week-ends et les jours fériés. Notre flotte de véhicules récents et climatisés, conduite par des chauffeurs certifiés et courtois, garantit un transport confortable et sécurisé pour tous vos déplacements à Narbonne et dans toute la région Occitanie.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-4" style={{ fontSize: '1.5rem' }}>
              Taxi conventionné CPAM Narbonne
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Notre service de <strong>taxi VSL conventionné par l'Assurance Maladie</strong> permet aux patients de Narbonne et du Narbonnais de bénéficier de transports médicaux pris en charge par la Sécurité Sociale. Avec une prescription médicale de transport, nous assurons vos déplacements vers l'hôpital de Narbonne, les cliniques, les cabinets médicaux, les centres de dialyse et de chimiothérapie. Nous travaillons également avec les mutuelles de santé pour faciliter vos démarches administratives.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-4" style={{ fontSize: '1.5rem' }}>
              Zones desservies autour de Narbonne
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Depuis Narbonne, nous intervenons dans tout le département de l'Aude et l'Hérault : Gruissan, Leucate, Sigean, Port-la-Nouvelle, Peyriac-de-Mer, Coursan, Vinassan, Marcorignan, Bages, Montredon-des-Corbières, et bien d'autres communes.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Narbonne', 'Gruissan', 'Leucate', 'Sigean', 'Port-la-Nouvelle', 'Carcassonne', 'Béziers', 'Montpellier'].map((city) => (
                <span key={city} className="flex items-center gap-1 text-xs text-gray-300 px-3 py-1.5 rounded-full"
                  style={{ background: `rgba(58,180,177,0.1)`, border: `1px solid rgba(58,180,177,0.25)` }}>
                  <MapPin size={10} style={{ color: TEAL }} /> {city}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-white font-bold mb-4" style={{ fontSize: '1.5rem' }}>
              Tarifs taxi Narbonne – Transparence garantie
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Chez ATC TAXI VTC Narbonne, nous pratiquons des <strong>tarifs transparents et compétitifs</strong>. Nos prix sont basés sur le tarif officiel des taxis de l'Aude, avec un tarif de prise en charge, un tarif kilométrique et une majoration de nuit/dimanche conforme à la réglementation. Pour les transferts aéroport et les longues distances, nous proposons des <strong>tarifs fixes</strong> convenus à l'avance, sans surprise. Paiement accepté en espèces, par carte bancaire ou par virement pour les entreprises.
            </p>
          </section>

          {/* Stars */}
          <div className="p-6 rounded-2xl text-center" style={{ background: '#0D2040', border: `1px solid rgba(58,180,177,0.3)` }}>
            <div className="flex justify-center gap-1 mb-2">
              {[1,2,3,4,5].map(s => <Star key={s} size={24} style={{ fill: TEAL, color: TEAL }} />)}
            </div>
            <p className="text-white font-bold text-lg">Note 5/5 – Plus de 200 avis clients vérifiés</p>
            <p className="text-gray-400 text-sm mt-1">Taxi Narbonne le mieux noté de l'Aude</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-white font-bold mb-6" style={{ fontSize: '1.5rem' }}>FAQ – Taxi Narbonne</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ background: '#0D2040', border: `1px solid ${openFaq === i ? `rgba(58,180,177,0.4)` : 'rgba(255,255,255,0.08)'}` }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
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
        </div>

        {/* Internal links */}
        <div className="mt-12">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">Pages liées</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Taxi Gare Narbonne', href: '/taxi-gare-narbonne' },
              { label: 'Taxi Conventionné CPAM', href: '/taxi-vsl-narbonne' },
              { label: 'Aéroport Montpellier', href: '/taxi-aeroport-montpellier' },
              { label: 'Aéroport Toulouse', href: '/taxi-aeroport-toulouse' },
              { label: 'Zones desservies', href: '/zones-desservies' },
              { label: 'Avis clients', href: '/avis-clients' },
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
