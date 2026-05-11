import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, X, ChevronUp } from 'lucide-react';

const PHONE = '0768303303';
const PHONE_DISPLAY = '07 68 30 33 03';
const WHATSAPP_BASE = 'https://wa.me/33768303303';
const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJNxGmHW6soSARohmCBp-l8xQ&source=g.page.m.nr._&laa=nmx-review-solicitation-recommendation-card';

const TEAL = '#3AB4B1';
const TEAL_DARK = '#2A9490';

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

const quickMessages = [
  { label: '🚖 Réserver un taxi', msg: 'Bonjour, je souhaite réserver un taxi.' },
  { label: '🚉 Taxi Gare Narbonne', msg: 'Bonjour, j\'ai besoin d\'un taxi pour la gare de Narbonne.' },
  { label: '🏥 Taxi conventionné', msg: 'Bonjour, je cherche un taxi conventionné CPAM.' },
  { label: '✈️ Taxi aéroport', msg: 'Bonjour, je souhaite un taxi pour l\'aéroport.' },
];

export function FloatingWidgets() {
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackSent, setCallbackSent] = useState(false);

  const handleCallback = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Rappel demandé pour le numéro : ${callbackPhone}`);
    window.open(`${WHATSAPP_BASE}?text=${msg}`, '_blank');
    setCallbackSent(true);
    setTimeout(() => {
      setCallbackSent(false);
      setCallbackOpen(false);
      setCallbackPhone('');
    }, 3000);
  };

  return (
    <>
      {/* Phone floating button */}
      <motion.a
        href={`tel:${PHONE}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        className="fixed bottom-24 left-4 z-40 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl text-white"
        style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}
        aria-label={`Appeler ATC Taxi ${PHONE_DISPLAY}`}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Phone size={22} />
        </motion.div>
      </motion.a>

      {/* Google Reviews floating button */}
      <motion.a
        href={GOOGLE_REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.6, type: 'spring' }}
        className="fixed bottom-44 right-4 z-40 flex items-center gap-2 px-3 py-2 rounded-full shadow-2xl"
        style={{ background: '#ffffff', border: '1px solid #dadce0' }}
        aria-label="Laisser un avis Google"
      >
        <GoogleGLogo size={16} />
        <span className="text-xs font-semibold text-gray-800 whitespace-nowrap">Laisser un avis</span>
        <span className="text-yellow-400 text-xs">★★★★★</span>
      </motion.a>

      {/* Callback widget */}
      <AnimatePresence>
        {callbackOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-44 left-4 z-40 w-72 rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: '#111111', border: `1px solid rgba(58,180,177,0.4)` }}
          >
            <div className="px-4 py-3 flex items-center justify-between" style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}>
              <span className="text-white font-bold text-sm">Être rappelé en &lt;5 min</span>
              <button onClick={() => setCallbackOpen(false)} className="text-white">
                <X size={16} />
              </button>
            </div>
            {callbackSent ? (
              <div className="p-4 text-center text-green-400">
                ✅ Message envoyé ! On vous rappelle très vite.
              </div>
            ) : (
              <form onSubmit={handleCallback} className="p-4 space-y-3">
                <p className="text-gray-300 text-xs">Laissez votre numéro, nous vous rappelons immédiatement.</p>
                <input
                  type="tel"
                  placeholder="Votre numéro de téléphone"
                  value={callbackPhone}
                  onChange={(e) => setCallbackPhone(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: `1px solid rgba(58,180,177,0.3)` }}
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg font-bold text-sm text-white"
                  style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}
                >
                  Être rappelé maintenant
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setCallbackOpen(!callbackOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
        className="fixed bottom-6 left-4 z-40 flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl text-white text-sm font-bold"
        style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}
      >
        <ChevronUp size={16} className={`transition-transform ${callbackOpen ? 'rotate-180' : ''}`} />
        Rappel immédiat
      </motion.button>

      {/* WhatsApp widget */}
      <AnimatePresence>
        {whatsappOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-4 z-40 w-72 rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: '#111111', border: '1px solid rgba(37,211,102,0.4)' }}
          >
            <div className="px-4 py-3 flex items-center justify-between bg-green-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <MessageCircle size={16} className="text-green-700" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">ATC TAXI Narbonne</p>
                  <p className="text-green-200 text-xs">● En ligne maintenant</p>
                </div>
              </div>
              <button onClick={() => setWhatsappOpen(false)} className="text-white">
                <X size={16} />
              </button>
            </div>
            <div className="p-4">
              <div
                className="inline-block px-3 py-2 rounded-2xl rounded-tl-none text-white text-sm mb-4"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                Bonjour 👋 Comment puis-je vous aider ?
              </div>
              <p className="text-gray-400 text-xs mb-3">Messages rapides :</p>
              <div className="space-y-2">
                {quickMessages.map((qm) => (
                  <a
                    key={qm.label}
                    href={`${WHATSAPP_BASE}?text=${encodeURIComponent(qm.msg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setWhatsappOpen(false)}
                    className="block w-full text-left px-3 py-2 rounded-lg text-sm text-white transition-colors hover:bg-green-900"
                    style={{ border: '1px solid rgba(37,211,102,0.3)' }}
                  >
                    {qm.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setWhatsappOpen(!whatsappOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.4, type: 'spring' }}
        className="fixed bottom-6 right-4 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-green-600 hover:bg-green-500 shadow-2xl transition-colors"
        aria-label="WhatsApp ATC Taxi Narbonne"
      >
        <MessageCircle size={26} className="text-white" />
      </motion.button>
    </>
  );
}