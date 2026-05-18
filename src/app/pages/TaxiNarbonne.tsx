import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  Phone,
  MessageCircle,
  CheckCircle,
  MapPin,
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useState } from 'react';
import { SEOHead } from '../components/SEOHead';

const PHONE = '0768303303';
const PHONE_DISPLAY = '07 68 30 33 03';
const WHATSAPP = 'https://wa.me/33768303303';
const TEAL = '#3AB4B1';
const TEAL_DARK = '#2A9490';

const faqs = [
  {
    q: 'Comment appeler un taxi à Narbonne ?',
    a: `Appelez le ${PHONE_DISPLAY} disponible 24h/24 7j/7. Réponse garantie en moins de 5 minutes. Ou envoyez un message WhatsApp pour une réponse immédiate.`
  },
  {
    q: "Quel est le tarif d'un taxi à Narbonne ?",
    a: "Les tarifs varient selon la distance et l'horaire. Comptez environ 15-25€ pour un trajet en ville, 40-60€ pour la gare vers un hôtel extérieur. Contactez-nous pour un devis précis."
  },
  {
    q: "Le taxi de Narbonne est-il disponible la nuit ?",
    a: "Oui, ATC TAXI VTC Narbonne est disponible 24h/24, 7j/7, y compris la nuit, les weekends et les jours fériés."
  },
  {
    q: "Proposez-vous le taxi conventionné à Narbonne ?",
    a: "Oui, nous sommes agréés pour le transport médical conventionné CPAM. Apportez votre prescription médicale et la prise en charge est effectuée directement."
  },
  {
    q: "Desservez-vous les communes autour de Narbonne ?",
    a: "Oui, nous desservons Gruissan, Leucate, Sigean, Port-la-Nouvelle, Peyriac-de-Mer, Coursan, Vinassan, Bages et toutes les communes de l'Aude."
  },
  {
    q: "Taxi Narbonne pour les aéroports ?",
    a: "Nous desservons les aéroports de Montpellier (1h, ~130€), Toulouse-Blagnac (1h30, ~185€), Carcassonne (45 min, ~90€) et Barcelone (2h30, ~275€)."
  }
];

export default function TaxiNarbonne() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#060F1E' }} className="min-h-screen pt-28">

      <SEOHead
        title="Taxi Narbonne 24h/24 | ATC TAXI VTC – Réservation Immédiate"
        description="Taxi Narbonne professionnel disponible 24h/24, 7j/7. Conventionné CPAM, transferts gare SNCF et aéroports."
        canonical="/taxi-narbonne"
        keywords="taxi narbonne, taxi narbonne 24h"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'TaxiService',
          name: 'Taxi Narbonne – ATC TAXI VTC',
          telephone: '+33768303303'
        }}
      />

      {/* HERO */}
      <section className="py-20 px-4 sm:px-6" style={{ background: 'linear-gradient(180deg, #0A1931 0%, #060F1E 100%)' }}>
        <div className="max-w-4xl mx-auto">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

            <h1 className="text-white mt-3 mb-4" style={{ fontSize: '2.2rem', fontWeight: 800 }}>
              Taxi Narbonne – VTC 24h/24 disponible maintenant
            </h1>

            <p className="text-gray-300 mb-8 max-w-2xl">
              ATC TAXI VTC Narbonne est votre taxi de confiance dans l'Aude.
            </p>

            <div className="flex flex-wrap gap-4">

              <a
                href={`tel:${PHONE}`}
                className="flex items-center gap-2 px-7 py-4 rounded-full font-bold text-white text-lg"
                style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}
              >
                <Phone size={18} /> {PHONE_DISPLAY}
              </a>

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-4 rounded-full font-bold text-white text-lg bg-green-600"
              >
                <MessageCircle size={18} /> WhatsApp
              </a>

            </div>

          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">

        {/* KEY POINTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">

          {[
            'Taxi Narbonne disponible 24h/24 – 7j/7',
            'Conventionné CPAM – Transport médical VSL',
            'Transferts Gare SNCF Narbonne',
            'Aéroports Montpellier, Toulouse, Carcassonne'
          ].map((point) => (
            <div
              key={point}
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{ background: '#0D2040', border: '1px solid rgba(58,180,177,0.15)' }}
            >
              <CheckCircle size={16} style={{ color: TEAL }} />
              <span className="text-gray-200 text-sm">{point}</span>
            </div>
          ))}

        </div>

        {/* FAQ */}
        <div className="mt-12">

          <h2 className="text-white font-bold mb-6">FAQ – Taxi Narbonne</h2>

          <div className="space-y-3">

            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden"
                style={{
                  background: '#0D2040',
                  border: `1px solid ${openFaq === i ? 'rgba(58,180,177,0.4)' : 'rgba(255,255,255,0.08)'}`
                }}
              >

                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between p-5 text-left text-white"
                >
                  {faq.q}
                  {openFaq === i ? <ChevronUp /> : <ChevronDown />}
                </button>

                {openFaq === i && (
                  <div className="px-5 pb-4 text-gray-300 text-sm border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}

              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}
