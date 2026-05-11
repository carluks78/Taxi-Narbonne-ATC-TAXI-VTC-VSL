import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, X, ChevronUp } from 'lucide-react';

const PHONE = '0768303303';
const PHONE_DISPLAY = '07 68 30 33 03';
const WHATSAPP_BASE = 'https://wa.me/33768303303';

const TEAL = '#3AB4B1';
const TEAL_DARK = '#2A9490';

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
