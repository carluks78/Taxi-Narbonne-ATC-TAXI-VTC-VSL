import { motion } from "motion/react";
import { Link } from "react-router";
import {
  Phone,
  MessageCircle,
  CheckCircle,
  MapPin,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { SEOHead } from "../components/SEOHead";

const PHONE = "0768303303";
const PHONE_DISPLAY = "07 68 30 33 03";
const WHATSAPP = "https://wa.me/33768303303";
const TEAL = "#3AB4B1";
const TEAL_DARK = "#2A9490";

const faqs = [
  {
    q: "Comment appeler un taxi à Narbonne ?",
    a: `Appelez le ${PHONE_DISPLAY} disponible 24h/24 7j/7.`,
  },
  {
    q: "Quel est le tarif d'un taxi à Narbonne ?",
    a: "Les tarifs varient selon la distance et l'horaire.",
  },
  {
    q: "Le taxi est-il disponible la nuit ?",
    a: "Oui, 24h/24 7j/7.",
  },
];

export default function TaxiNarbonne() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-28" style={{ backgroundColor: "#060F1E" }}>
      <SEOHead
        title="Taxi Narbonne 24h/24 | ATC TAXI VTC"
        description="Taxi Narbonne disponible 24h/24"
        canonical="/taxi-narbonne"
        keywords="taxi narbonne"
        schema={{
          "@context": "https://schema.org",
          "@type": "TaxiService",
          name: "Taxi Narbonne",
          telephone: "+33768303303",
        }}
      />

      {/* HERO */}
      <section
        className="py-20 px-4 sm:px-6"
        style={{ background: "linear-gradient(180deg, #0A1931 0%, #060F1E 100%)" }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-white text-3xl font-bold">
              Taxi Narbonne – VTC 24h/24
            </h1>

            <p className="text-gray-300 mt-4">
              Service de taxi disponible 24h/24.
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href={`tel:${PHONE}`}
                className="px-6 py-3 rounded-full text-white font-bold"
                style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}
              >
                <Phone size={16} /> {PHONE_DISPLAY}
              </a>

              <a
                href={WHATSAPP}
                className="px-6 py-3 rounded-full text-white bg-green-600"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* FAQ */}
        <h2 className="text-white text-xl font-bold mb-4">FAQ</h2>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden"
              style={{ background: "#0D2040" }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex justify-between p-4 text-left text-white"
              >
                {faq.q}
                {openFaq === i ? <ChevronUp /> : <ChevronDown />}
              </button>

              {openFaq === i && (
                <div className="p-4 text-gray-300 border-t border-white/10">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
