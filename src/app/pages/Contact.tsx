import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export async function loader() {
  return null;
}

const PHONE = '0768303303';
const PHONE_DISPLAY = '07 68 30 33 03';
const EMAIL = 'atctaxi11@gmail.com';
const WHATSAPP = 'https://wa.me/33768303303';
const TEAL = '#3AB4B1';
const TEAL_DARK = '#2A9490';

export function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', date: '', from: '', to: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Bonjour, je suis ${form.name}. Départ: ${form.from}. Arrivée: ${form.to}. Date: ${form.date}. Téléphone: ${form.phone}. Email: ${form.email}. Message: ${form.message}`;
    window.open(`${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
    setSent(true);
  };

  return (
    <div style={{ backgroundColor: '#060F1E' }} className="min-h-screen pt-28">
      <SEOHead
        title="Contact & Réservation Taxi Narbonne | ATC TAXI VTC – Devis Gratuit"
        description="Contactez ATC TAXI VTC Narbonne pour réserver votre taxi ou demander un devis gratuit. Disponible 24h/24, 7j/7. Appelez le 07 68 30 33 03 ou envoyez un message WhatsApp."
        canonical="/contact"
        keywords="contact taxi narbonne, réserver taxi narbonne, devis taxi narbonne, atc taxi contact, taxi narbonne téléphone, réservation taxi aude"
      />

      <section className="py-16 text-center px-4 sm:px-6" style={{ background: 'linear-gradient(180deg, #0A1931 0%, #060F1E 100%)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: TEAL }}>Contact</span>
          <h1 className="text-white mt-3 mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
            Réservez votre Taxi Narbonne
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Disponible 24h/24 – 7j/7. Réponse garantie en moins de 5 minutes.
          </p>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info */}
          <div className="lg:col-span-2 space-y-5">
            {[
              { icon: <Phone size={20} />, title: 'Téléphone', content: PHONE_DISPLAY, href: `tel:${PHONE}` },
              { icon: <MessageCircle size={20} />, title: 'WhatsApp', content: 'Envoyer un message', href: WHATSAPP },
              { icon: <Mail size={20} />, title: 'Email', content: EMAIL, href: `mailto:${EMAIL}` },
              { icon: <MapPin size={20} />, title: 'Zone', content: 'Narbonne, Aude (11), Hérault (34)', href: null },
              { icon: <Clock size={20} />, title: 'Disponibilité', content: '24h/24 – 7j/7 – Jours fériés', href: null },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 rounded-2xl"
                style={{ background: '#0D2040', border: `1px solid rgba(58,180,177,0.2)` }}>
                <div className="flex-shrink-0" style={{ color: TEAL }}>{item.icon}</div>
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">{item.title}</p>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer" className="text-white font-semibold hover:text-white/80 transition-colors">
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-white font-semibold">{item.content}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="flex gap-3 pt-2">
              <a href={`tel:${PHONE}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-bold text-white text-sm"
                style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}>
                <Phone size={16} /> Appeler
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-bold text-white text-sm bg-green-600 hover:bg-green-500 transition-colors">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>

            {/* SEO text */}
            <div className="pt-4 space-y-3 text-gray-400 text-sm leading-relaxed">
              <p>
                ATC TAXI VTC Narbonne intervient dans tout le département de l'Aude et l'Hérault. Réservez votre taxi à Narbonne, Gruissan, Leucate, Sigean, Port-la-Nouvelle ou pour vos transferts vers les aéroports de Montpellier, Toulouse et Carcassonne.
              </p>
              <p>
                Notre service de taxi conventionné CPAM est disponible sur prescription médicale pour vos transports sanitaires. Contactez-nous dès maintenant pour un devis gratuit et sans engagement.
              </p>
            </div>

            {/* Internal links */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                { label: 'Taxi Narbonne', href: '/taxi-narbonne' },
                { label: 'Services', href: '/services' },
                { label: 'Zones', href: '/zones-desservies' },
              ].map((link) => (
                <Link key={link.href} to={link.href}
                  className="text-xs px-3 py-1.5 rounded-full transition-colors hover:text-white"
                  style={{ border: `1px solid rgba(58,180,177,0.3)`, color: TEAL }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 rounded-2xl p-6 sm:p-8"
            style={{ background: '#0D2040', border: `1px solid rgba(58,180,177,0.2)` }}>
            <h2 className="text-white font-bold mb-6" style={{ fontSize: '1.4rem' }}>Demande de réservation / Devis</h2>
            {sent ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <p className="text-white font-bold text-xl mb-2">Message envoyé !</p>
                <p className="text-gray-300">Nous vous contactons dans les 5 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'name', label: 'Nom complet', type: 'text', placeholder: 'Jean Dupont' },
                    { name: 'phone', label: 'Téléphone', type: 'tel', placeholder: '06 12 34 56 78' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-gray-400 text-xs mb-1">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.name as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-colors"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                      />
                    </div>
                  ))}
                </div>

                {[
                  { name: 'from', label: 'Départ', placeholder: 'Ex: Narbonne centre', type: 'text' },
                  { name: 'to', label: 'Destination', placeholder: 'Ex: Aéroport Montpellier', type: 'text' },
                  { name: 'date', label: 'Date & heure souhaitée', placeholder: '', type: 'datetime-local' },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-gray-400 text-xs mb-1">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.name as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-gray-400 text-xs mb-1">Message (optionnel)</label>
                  <textarea
                    placeholder="Informations complémentaires, nombre de passagers, bagages..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none resize-none"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold text-white text-base"
                  style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}
                >
                  <Send size={16} />
                  Envoyer ma demande
                </button>
                <p className="text-gray-500 text-xs text-center">Réponse garantie en moins de 5 minutes</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
