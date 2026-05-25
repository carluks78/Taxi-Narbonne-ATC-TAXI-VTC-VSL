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

// ─── LANGUES ───────────────────────────────────────────────────────────────
type LangKey = 'fr' | 'en' | 'es' | 'pt' | 'de' | 'it' | 'nl' | 'ar';

const LANGUAGES: { key: LangKey; flag: string; label: string }[] = [
  { key: 'fr', flag: '🇫🇷', label: 'Français' },
  { key: 'en', flag: '🇬🇧', label: 'English' },
  { key: 'es', flag: '🇪🇸', label: 'Español' },
  { key: 'pt', flag: '🇵🇹', label: 'Português' },
  { key: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { key: 'it', flag: '🇮🇹', label: 'Italiano' },
  { key: 'nl', flag: '🇳🇱', label: 'Nederlands' },
  { key: 'ar', flag: '🇲🇦', label: 'العربية' },
];

type QuickMsg = { label: string; msg: string };

const QUICK_MESSAGES: Record<LangKey, QuickMsg[]> = {
  fr: [
    { label: '🚖 Réserver un taxi maintenant', msg: 'Bonjour, je souhaite réserver un taxi maintenant. Pouvez-vous me prendre en charge ?' },
    { label: '✈️ Transfert aéroport', msg: "Bonjour, j'ai besoin d'un taxi pour un transfert aéroport. Pouvez-vous m'aider ?" },
    { label: '🚉 Taxi gare de Narbonne', msg: "Bonjour, j'ai besoin d'un taxi pour la gare de Narbonne. Quelle est votre disponibilité ?" },
    { label: '💊 Transport médical CPAM', msg: "Bonjour, j'ai besoin d'un transport médical conventionné CPAM. Êtes-vous disponible ?" },
    { label: '💶 Demander un tarif', msg: 'Bonjour, pouvez-vous m\'indiquer le tarif pour un trajet ?' },
  ],
  en: [
    { label: '🚖 Book a taxi now', msg: 'Hello, I would like to book a taxi right now. Can you pick me up?' },
    { label: '✈️ Airport transfer', msg: 'Hello, I need a taxi for an airport transfer. Can you help me?' },
    { label: '🚉 Narbonne train station', msg: 'Hello, I need a taxi to Narbonne train station. Are you available?' },
    { label: '🏨 Hotel transfer', msg: 'Hello, I need a taxi transfer to my hotel. Can you assist me?' },
    { label: '💶 Get a price quote', msg: 'Hello, could you give me a price for a journey?' },
  ],
  es: [
    { label: '🚖 Reservar un taxi ahora', msg: 'Hola, me gustaría reservar un taxi ahora mismo. ¿Puede recogerme?' },
    { label: '✈️ Traslado al aeropuerto', msg: 'Hola, necesito un taxi para un traslado al aeropuerto. ¿Puede ayudarme?' },
    { label: '🚉 Estación de tren Narbona', msg: 'Hola, necesito un taxi a la estación de tren de Narbona. ¿Está disponible?' },
    { label: '🏨 Traslado al hotel', msg: 'Hola, necesito un taxi para ir a mi hotel. ¿Puede asistirme?' },
    { label: '💶 Pedir un presupuesto', msg: 'Hola, ¿podría darme el precio para un trayecto?' },
  ],
  pt: [
    { label: '🚖 Reservar um táxi agora', msg: 'Olá, gostaria de reservar um táxi agora. Pode me buscar?' },
    { label: '✈️ Transfer para o aeroporto', msg: 'Olá, preciso de um táxi para o aeroporto. Pode ajudar-me?' },
    { label: '🚉 Estação de comboios de Narbonne', msg: 'Olá, preciso de um táxi para a estação de Narbonne. Está disponível?' },
    { label: '🏨 Transfer para o hotel', msg: 'Olá, preciso de um táxi para o meu hotel. Pode ajudar?' },
    { label: '💶 Pedir um orçamento', msg: 'Olá, pode dar-me o preço para uma viagem?' },
  ],
  de: [
    { label: '🚖 Taxi jetzt buchen', msg: 'Hallo, ich möchte jetzt ein Taxi buchen. Können Sie mich abholen?' },
    { label: '✈️ Flughafentransfer', msg: 'Hallo, ich brauche ein Taxi für einen Flughafentransfer. Können Sie helfen?' },
    { label: '🚉 Bahnhof Narbonne', msg: 'Hallo, ich brauche ein Taxi zum Bahnhof Narbonne. Sind Sie verfügbar?' },
    { label: '🏨 Hoteltransfer', msg: 'Hallo, ich brauche ein Taxi zu meinem Hotel. Können Sie helfen?' },
    { label: '💶 Preis anfragen', msg: 'Hallo, können Sie mir den Preis für eine Fahrt nennen?' },
  ],
  it: [
    { label: '🚖 Prenota un taxi ora', msg: 'Ciao, vorrei prenotare un taxi adesso. Può venire a prendermi?' },
    { label: '✈️ Transfer aeroporto', msg: "Ciao, ho bisogno di un taxi per un transfer in aeroporto. Può aiutarmi?" },
    { label: '🚉 Stazione di Narbona', msg: 'Ciao, ho bisogno di un taxi per la stazione di Narbona. È disponibile?' },
    { label: '🏨 Transfer in hotel', msg: 'Ciao, ho bisogno di un taxi per il mio hotel. Può aiutarmi?' },
    { label: '💶 Chiedere un preventivo', msg: 'Ciao, può darmi il prezzo per un tragitto?' },
  ],
  nl: [
    { label: '🚖 Taxi nu boeken', msg: 'Hallo, ik wil nu een taxi boeken. Kunt u mij ophalen?' },
    { label: '✈️ Luchthaventransfer', msg: 'Hallo, ik heb een taxi nodig voor een luchthaventransfer. Kunt u helpen?' },
    { label: '🚉 Station Narbonne', msg: 'Hallo, ik heb een taxi nodig naar het station van Narbonne. Bent u beschikbaar?' },
    { label: '🏨 Hoteltransfer', msg: 'Hallo, ik heb een taxi nodig naar mijn hotel. Kunt u helpen?' },
    { label: '💶 Prijs opvragen', msg: 'Hallo, kunt u mij de prijs voor een rit geven?' },
  ],
  ar: [
    { label: '🚖 حجز سيارة أجرة الآن', msg: 'مرحباً، أريد حجز سيارة أجرة الآن. هل يمكنك استقبالي؟' },
    { label: '✈️ نقل إلى المطار', msg: 'مرحباً، أحتاج سيارة أجرة للمطار. هل يمكنك المساعدة؟' },
    { label: '🚉 محطة قطار ناربون', msg: 'مرحباً، أحتاج سيارة أجرة إلى محطة ناربون. هل أنت متاح؟' },
    { label: '🏨 نقل إلى الفندق', msg: 'مرحباً، أحتاج سيارة أجرة إلى فندقي. هل يمكنك المساعدة؟' },
    { label: '💶 طلب سعر', msg: 'مرحباً، هل يمكنك إعطائي سعر الرحلة؟' },
  ],
};

const GREETINGS: Record<LangKey, string> = {
  fr: 'Bonjour 👋 Comment puis-je vous aider ?',
  en: 'Hello 👋 How can I help you?',
  es: 'Hola 👋 ¿Cómo puedo ayudarle?',
  pt: 'Olá 👋 Como posso ajudá-lo?',
  de: 'Hallo 👋 Wie kann ich Ihnen helfen?',
  it: 'Ciao 👋 Come posso aiutarti?',
  nl: 'Hallo 👋 Hoe kan ik u helpen?',
  ar: 'مرحباً 👋 كيف يمكنني مساعدتك؟',
};

const QUICK_LABEL: Record<LangKey, string> = {
  fr: 'Messages rapides :',
  en: 'Quick messages:',
  es: 'Mensajes rápidos:',
  pt: 'Mensagens rápidas:',
  de: 'Schnellnachrichten:',
  it: 'Messaggi rapidi:',
  nl: 'Snelle berichten:',
  ar: 'رسائل سريعة:',
};

const ONLINE_LABEL: Record<LangKey, string> = {
  fr: 'En ligne maintenant',
  en: 'Online now',
  es: 'En línea ahora',
  pt: 'Online agora',
  de: 'Jetzt online',
  it: 'Online adesso',
  nl: 'Nu online',
  ar: 'متصل الآن',
};

const BACK_LABEL: Record<LangKey, string> = {
  fr: '← Retour',
  en: '← Back',
  es: '← Volver',
  pt: '← Voltar',
  de: '← Zurück',
  it: '← Indietro',
  nl: '← Terug',
  ar: 'رجوع ←',
};

// ─── COMPOSANT PRINCIPAL ────────────────────────────────────────────────────
export function FloatingWidgets() {
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [lang, setLang] = useState<LangKey | null>(null);
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

  const closeWhatsapp = () => {
    setWhatsappOpen(false);
    setLang(null);
  };

  return (
    <>
      {/* ── Bouton téléphone ── */}
      <motion.a
        href={`tel:${PHONE}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        className="fixed bottom-24 left-4 z-40 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl text-white"
        style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}
        aria-label={`Appeler ATC Taxi ${PHONE_DISPLAY}`}
      >
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
          <Phone size={22} />
        </motion.div>
      </motion.a>

      {/* ── Bouton avis Google ── */}
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

      {/* ── Widget rappel ── */}
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
              <button onClick={() => setCallbackOpen(false)} className="text-white"><X size={16} /></button>
            </div>
            {callbackSent ? (
              <div className="p-4 text-center text-green-400">✅ Message envoyé ! On vous rappelle très vite.</div>
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

      {/* ── Widget WhatsApp multilingue ── */}
      <AnimatePresence>
        {whatsappOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-4 z-40 w-72 rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: '#111111', border: '1px solid rgba(37,211,102,0.4)' }}
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between bg-green-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <MessageCircle size={16} className="text-green-700" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">ATC TAXI Narbonne</p>
                  <p className="text-green-200 text-xs">
                    ● {lang ? ONLINE_LABEL[lang] : 'En ligne maintenant'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {lang && (
                  <button onClick={() => setLang(null)} className="text-green-200 text-xs underline">
                    {BACK_LABEL[lang]}
                  </button>
                )}
                <button onClick={closeWhatsapp} className="text-white">
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="p-4">
              {/* Sélection de langue */}
              {!lang ? (
                <>
                  <div
                    className="inline-block px-3 py-2 rounded-2xl rounded-tl-none text-white text-sm mb-4"
                    style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                  >
                    👋 Choisissez votre langue / Choose your language
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {LANGUAGES.map(({ key, flag, label }) => (
                      <button
                        key={key}
                        onClick={() => setLang(key)}
                        className="flex flex-col items-center justify-center py-2 rounded-xl text-white text-xl transition-all hover:scale-110 active:scale-95"
                        style={{ border: '1px solid rgba(37,211,102,0.4)', background: 'rgba(37,211,102,0.1)' }}
                        title={label}
                      >
                        {flag}
                        <span className="text-[9px] mt-0.5 text-gray-400 leading-tight">{label}</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="inline-block px-3 py-2 rounded-2xl rounded-tl-none text-white text-sm mb-4"
                    style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  >
                    {GREETINGS[lang]}
                  </div>
                  <p className="text-gray-400 text-xs mb-3" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                    {QUICK_LABEL[lang]}
                  </p>
                  <div className="space-y-2">
                    {QUICK_MESSAGES[lang].map((qm) => (
                      <a
                        key={qm.label}
                        href={`${WHATSAPP_BASE}?text=${encodeURIComponent(qm.msg)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeWhatsapp}
                        className="block w-full text-left px-3 py-2 rounded-lg text-sm text-white transition-colors hover:bg-green-900"
                        style={{ border: '1px solid rgba(37,211,102,0.3)' }}
                        dir={lang === 'ar' ? 'rtl' : 'ltr'}
                      >
                        {qm.label}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bulle langues au-dessus du bouton WhatsApp ── */}
      <AnimatePresence>
        {!whatsappOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 2 }}
            className="fixed bottom-24 right-4 z-39 flex items-center gap-1 px-2 py-1 rounded-full shadow-lg pointer-events-none"
            style={{ background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(37,211,102,0.3)' }}
          >
            {LANGUAGES.map(({ key, flag }) => (
              <span key={key} className="text-sm" title={key}>
                {flag}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bouton WhatsApp avec point rouge clignotant ── */}
      <div className="fixed bottom-6 right-4 z-40">
        {/* Point rouge clignotant */}
        <span className="absolute top-0 right-0 z-50">
          <span className="block w-3 h-3 rounded-full bg-red-500" style={{ animation: 'ping 1.2s cubic-bezier(0,0,0.2,1) infinite', position: 'absolute' }} />
          <span className="block w-3 h-3 rounded-full bg-red-500 relative" />
        </span>

        <motion.button
          onClick={() => setWhatsappOpen(!whatsappOpen)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.4, type: 'spring' }}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-green-600 hover:bg-green-500 shadow-2xl transition-colors"
          aria-label="WhatsApp ATC Taxi Narbonne"
        >
          <MessageCircle size={26} className="text-white" />
        </motion.button>
      </div>

      {/* ── Keyframes pour le ping ── */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </>
  );
}
