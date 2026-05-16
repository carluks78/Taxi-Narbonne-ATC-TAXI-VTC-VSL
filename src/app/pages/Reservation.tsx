import { useState, useRef, useEffect } from 'react';
import { ReactNode } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin, Plane, Train, Users, CalendarDays, Clock,
  Phone, CheckCircle2, ArrowRight, Info, MessageCircle,
  Star, Shield, Zap, Calendar, Send, Car, Heart,
  RefreshCw, ChevronDown, Navigation, Award, PawPrint,
} from 'lucide-react';

// ── Constants ─────────────────────────────────────────────────────────────────
const TEAL = '#3AB4B1';
const TEAL_DARK = '#2A9490';
const WA_PHONE = '33768303303';

// ── Form Types ─────────────────────────────────────────────────────────────────
interface BookingFormData {
  tripType: 'aller-simple' | 'aller-retour';
  departure: string;
  destination: string;
  date: string;
  time: string;
  returnDate: string;
  returnTime: string;
  passengers: string;
  luggage: string;
  hasAnimals: string;
  animalDescription: string;
  isPMR: string;
  isAirport: boolean;
  isGare: boolean;
  name: string;
  phone: string;
  email: string;
  notes: string;
  // Airport-specific
  flightNumber: string;
  airline: string;
  terminal: string;
  luggageCount: string;
  // Train-specific
  trainNumber: string;
  trainArrivalTime: string;
  trainOrigin: string;
}

// ── URL Builders ───────────────────────────────────────────────────────────────
function buildGCalURL(data: BookingFormData): string {
  const [yr = '2026', mo = '01', dy = '01'] = (data.date || '2026-01-01').split('-');
  const [hr = '08', mn = '00'] = (data.time || '08:00').split(':');
  const endHr = String((parseInt(hr) + 1) % 24).padStart(2, '0');
  const startDT = `${yr}${mo}${dy}T${hr}${mn}00`;
  const endDT = `${yr}${mo}${dy}T${endHr}${mn}00`;

  const title = `Taxi ATC – ${data.name} – ${data.departure} → ${data.destination}`;
  let details = `Réservation ATC TAXI VTC Narbonne\nDépart : ${data.departure}\nDestination : ${data.destination}\nPassagers : ${data.passengers} | Bagages : ${data.luggage}`;
  if (data.flightNumber) details += `\nN° vol : ${data.flightNumber}${data.airline ? ` (${data.airline})` : ''}${data.terminal ? ` – ${data.terminal}` : ''}`;
  if (data.trainNumber) details += `\nN° train : ${data.trainNumber}${data.trainArrivalTime ? ` – arrivée ${data.trainArrivalTime}` : ''}`;
  details += `\n\nClient : ${data.name} – ${data.phone}`;
  if (data.notes) details += `\nNotes : ${data.notes}`;
  details += `\n\nRéservé sur atctaxivtcnarbonne.fr`;

  // No &add= → no Google Meet invite. Chauffeur opens this link on his own device.
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDT}/${endDT}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(data.departure)}`;
}

function buildWhatsApp(data: BookingFormData): string {
  const gcalLink = buildGCalURL(data);

  let msg = `🚖 *RÉSERVATION ATC TAXI NARBONNE*\n\n`;
  msg += `*Type :* ${data.tripType === 'aller-retour' ? 'Aller-retour' : 'Aller simple'}\n`;
  msg += `*Départ :* ${data.departure}\n`;
  msg += `*Destination :* ${data.destination}\n`;
  if (data.date) {
    try {
      const d = new Date(data.date + 'T12:00:00');
      msg += `*Date :* ${d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}\n`;
    } catch { msg += `*Date :* ${data.date}\n`; }
  }
  msg += `*Heure :* ${data.time}\n`;
  if (data.tripType === 'aller-retour' && data.returnDate) {
    msg += `*Retour :* ${data.returnDate} à ${data.returnTime || '—'}\n`;
  }
  msg += `\n*Passagers :* ${data.passengers}\n`;
  msg += `*Bagages :* ${data.luggage} bagage(s)\n`;
  if (data.hasAnimals === 'yes') msg += `*Animal :* Oui${data.animalDescription ? ` – ${data.animalDescription}` : ''}\n`;
  if (data.isPMR === 'yes') msg += `*PMR :* Oui\n`;

  if (data.isAirport) {
    msg += `\n✈️ *Informations vol :*\n`;
    if (data.flightNumber) msg += `  N° vol : ${data.flightNumber}\n`;
    if (data.airline) msg += `  Compagnie : ${data.airline}\n`;
    if (data.terminal) msg += `  Terminal : ${data.terminal}\n`;
    if (data.luggageCount) msg += `  Bagages soute : ${data.luggageCount}\n`;
  }

  if (data.isGare) {
    msg += `\n🚉 *Informations train :*\n`;
    if (data.trainNumber) msg += `  N° train : ${data.trainNumber}\n`;
    if (data.trainArrivalTime) msg += `  Heure arrivée : ${data.trainArrivalTime}\n`;
    if (data.trainOrigin) msg += `  Provenance : ${data.trainOrigin}\n`;
  }

  msg += `\n📞 *Client :*\n`;
  msg += `  ${data.name} – ${data.phone}\n`;
  if (data.email) msg += `  ${data.email}\n`;
  if (data.notes) msg += `\n💬 ${data.notes}\n`;

  // Chauffeur can tap this link to add the event to his own Google Calendar
  msg += `\n📅 *Ajouter à Google Agenda (chauffeur) :*\n${gcalLink}\n`;
  msg += `\n_via atctaxivtcnarbonne.fr_`;

  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`;
}

// ── Nominatim Autocomplete ─────────────────────────────────────────────────────
interface NominatimResult { place_id: number; display_name: string; }

function formatAddress(item: any): string {
  const a = item.address;

  const street = a.road || a.pedestrian || a.footway || '';
  const number = a.house_number || '';
  const city = a.city || a.town || a.village || '';
  const postcode = a.postcode || '';

  return `${street}${number ? ' ' + number : ''}, ${postcode} ${city}, France`.trim();
}

function AddressAutocomplete({
  value,
  onChange,
  onBlur,
  placeholder,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder: string;
  error?: string;
}) {
  const [inputVal, setInputVal] = useState(value || '');
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keep in sync with RHF value
  useEffect(() => { setInputVal(value || ''); }, [value]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleChange = (v: string) => {
    setInputVal(v);
    onChange(v);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (v.length < 3) { setSuggestions([]); setOpen(false); return; }
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(v)}&format=json&limit=6&addressdetails=1&countrycodes=fr`,
          { headers: { 'Accept-Language': 'fr' } }
        );
        const data: NominatimResult[] = await res.json();
        setSuggestions(data);
        setOpen(data.length > 0);
      } catch { /* silently ignore network errors */ }
      finally { setLoading(false); }
    }, 420);
  };

  const select = (item: any) => {
  const label = formatAddress(item);
  setInputVal(label);
  onChange(label);
  setSuggestions([]);
  setOpen(false);
};

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        <MapPin
          size={14}
          style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: TEAL, pointerEvents: 'none' }}
        />
        <input
          type="text"
          value={inputVal}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete="off"
          style={{
            width: '100%',
            backgroundColor: '#ffffff',
            border: error ? '1.5px solid #f87171' : '1.5px solid #D1D5DB',
            borderRadius: '0.5rem',
            color: '#111827',
            padding: '0.65rem 0.875rem 0.65rem 2.2rem',
            fontSize: '0.875rem',
            outline: 'none',
            transition: 'border-color 0.15s',
          }}
          onFocusCapture={(e) => (e.currentTarget.style.borderColor = TEAL)}
          onBlurCapture={(e) => (e.currentTarget.style.borderColor = error ? '#f87171' : '#D1D5DB')}
        />
        {loading && (
          <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}>
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
        )}
      </div>

      <AnimatePresence>
        {open && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.14 }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 2px)',
              left: 0, right: 0,
              zIndex: 200,
              background: '#ffffff',
              border: '1.5px solid #E5E7EB',
              borderRadius: '0.5rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
              overflow: 'hidden',
            }}
          >
            {suggestions.map((item, i) => (
              <button
                key={item.place_id}
                type="button"
                onMouseDown={() => select(item)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 8,
                  width: '100%',
                  padding: '9px 12px',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  borderBottom: i < suggestions.length - 1 ? '1px solid #F3F4F6' : 'none',
                  cursor: 'pointer',
                  color: '#111827',
                  fontSize: '0.8rem',
                  lineHeight: 1.4,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#F0FDFB')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
              >
                <MapPin size={12} style={{ color: TEAL, flexShrink: 0, marginTop: 2 }} />
                <span>{formatAddress(item.display_name)}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p style={{ color: '#f87171', fontSize: '0.73rem', marginTop: 4 }}>{error}</p>}
    </div>
  );
}

// ── Shared Styles ─────────────────────────────────────────────────────────────
const darkInput: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#0A111E',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '0.5rem',
  color: '#ffffff',
  padding: '0.65rem 0.875rem',
  fontSize: '1rem',
  fontSize: '0.875rem',
  outline: 'none',
};

const whiteInput: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#ffffff',
  border: '1.5px solid #D1D5DB',
  borderRadius: '0.5rem',
  color: '#111827',
  padding: '0.65rem 0.875rem',
  fontSize: '1rem',
  fontSize: '0.875rem',
  outline: 'none',
  colorScheme: 'light' as never,
};

// ── Sub-components ────────────────────────────────────────────────────────────
function SectionTitle({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 pb-2.5 mb-4 border-b" style={{ borderColor: 'rgba(58,180,177,0.2)' }}>
      <span style={{ color: TEAL }}>{icon}</span>
      <span className="text-sm" style={{ color: TEAL }}>{children}</span>
    </div>
  );
}

function FieldLabel({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs mb-1.5" style={{ color: '#9CA3AF' }}>
      {children}{required && <span style={{ color: TEAL }}> *</span>}
    </label>
  );
}

function SmartBlock({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.22 }}
          style={{ overflow: 'hidden' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Toggle({ label, sublabel, checked, onChange }: { label: string; sublabel: string; checked: boolean; onChange: (v: boolean) => void; }) {
  return (
    <label
      className="flex items-center gap-3 p-3 rounded-xl cursor-pointer select-none transition-all"
      style={{
        border: `1.5px solid ${checked ? TEAL : 'rgba(255,255,255,0.1)'}`,
        background: checked ? 'rgba(58,180,177,0.08)' : 'rgba(255,255,255,0.02)',
      }}
    >
      <div
        className="relative flex-shrink-0"
        style={{ width: 36, height: 20 }}
        onClick={() => onChange(!checked)}
      >
        <div
          className="absolute inset-0 rounded-full transition-all"
          style={{ background: checked ? TEAL : '#374151' }}
        />
        <div
          className="absolute top-0.5 rounded-full bg-white transition-all"
          style={{ width: 16, height: 16, left: checked ? 18 : 2 }}
        />
      </div>
      <div>
        <div className="text-xs text-white">{label}</div>
        <div className="text-xs text-gray-500">{sublabel}</div>
      </div>
    </label>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: '#0D1520', border: '1px solid rgba(255,255,255,0.07)' }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left gap-4">
        <span className="text-sm text-white">{question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ flexShrink: 0 }}>
          <ChevronDown size={15} style={{ color: TEAL }} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <p className="px-4 pb-4 text-sm text-gray-400 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Success Screen ────────────────────────────────────────────────────────────
function SuccessScreen({ data, onReset }: { data: BookingFormData; onReset: () => void }) {
  const waUrl = buildWhatsApp(data);

  return (
    <div style={{ backgroundColor: '#060F1E', minHeight: '100vh', paddingTop: '90px' }}>
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(58,180,177,0.15)', border: `2px solid ${TEAL}` }}
        >
          <CheckCircle2 size={38} style={{ color: TEAL }} />
        </motion.div>

        <h1 className="text-3xl text-white mb-2">Demande prête !</h1>
        <p className="text-gray-400 text-sm mb-1">
          <strong className="text-white">{data.departure}</strong>
        </p>
        <p className="text-gray-500 text-sm mb-8">
          → <strong className="text-white">{data.destination}</strong> · {data.date} à {data.time}
        </p>

        <div className="rounded-2xl p-6 mb-5" style={{ background: '#0D1520', border: '1px solid rgba(58,180,177,0.2)' }}>
          <p className="text-sm text-gray-300 mb-5">
            Envoyez votre réservation directement au chauffeur :
          </p>
          <div className="space-y-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-xl text-white font-bold transition-all hover:opacity-90 hover:scale-[1.01]"
              style={{ background: '#25D366', boxShadow: '0 4px 16px rgba(37,211,102,0.3)' }}
            >
              <MessageCircle size={20} />
              Confirmer par WhatsApp
            </a>
            <a
              href="tel:0768303303"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-xl text-white font-bold transition-all hover:opacity-90 hover:scale-[1.01]"
              style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})`, boxShadow: `0 4px 16px rgba(58,180,177,0.3)` }}
            >
              <Phone size={20} />
              Confirmer par téléphone : 07 68 30 33 03
            </a>
          </div>
        </div>

        <div className="rounded-xl p-4 mb-8 text-left" style={{ background: 'rgba(58,180,177,0.06)', border: '1px solid rgba(58,180,177,0.18)' }}>
          <div className="flex items-start gap-2">
            <Info size={13} style={{ color: TEAL, flexShrink: 0, marginTop: 2 }} />
            <p className="text-xs text-gray-400 leading-relaxed">
              Le message WhatsApp contient tous vos détails de trajet ainsi qu'un <strong className="text-gray-300">lien Google Agenda</strong> que le chauffeur peut taper pour ajouter directement la course à son propre calendrier — sans invitation, sans Google Meet.
            </p>
          </div>
        </div>

        <button
          onClick={onReset}
          className="text-sm text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1.5 mx-auto"
        >
          <RefreshCw size={13} />
          Faire une nouvelle réservation
        </button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export function Reservation() {
  const [submitted, setSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);

  const { register, handleSubmit, watch, control, setValue, formState: { errors } } = useForm<BookingFormData>({
    defaultValues: {
      tripType: 'aller-simple',
      passengers: '1',
      luggage: '1',
      luggageCount: '1',
      hasAnimals: 'no',
      isPMR: 'no',
      isAirport: false,
      isGare: false,
    },
  });

  const tripType = watch('tripType');
  const isAirport = watch('isAirport');
  const isGare = watch('isGare');
  const hasAnimals = watch('hasAnimals');

  const onSubmit = (data: BookingFormData) => {
    setBookingData(data);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Comment réserver un taxi à Narbonne en ligne ?', acceptedAnswer: { '@type': 'Answer', text: "Remplissez notre formulaire en ligne avec vos adresses de départ et destination, la date et l'heure souhaitées. Envoyez votre demande par WhatsApp ou appelez le 07 68 30 33 03. Réponse garantie en moins de 5 minutes, 24h/24 7j/7." } },
      { '@type': 'Question', name: 'Proposez-vous le taxi pour les aéroports depuis Narbonne ?', acceptedAnswer: { '@type': 'Answer', text: "Oui, ATC TAXI assure des transferts vers Montpellier (MPL), Toulouse-Blagnac (TLS), Carcassonne (CCF), Béziers (BZR) et Barcelone El Prat (BCN). Service avec suivi des vols en temps réel." } },
      { '@type': 'Question', name: 'Le taxi est-il conventionné CPAM ?', acceptedAnswer: { '@type': 'Answer', text: "Oui, ATC TAXI est agréé et conventionné par l'Assurance Maladie. Sur prescription médicale, vos transports vers hôpitaux et centres de soins peuvent être pris en charge." } },
      { '@type': 'Question', name: 'Acceptez-vous les animaux de compagnie ?', acceptedAnswer: { '@type': 'Answer', text: 'Oui, les animaux sont les bienvenus. Précisez-le lors de votre réservation.' } },
      { '@type': 'Question', name: "Quel est le délai minimum pour réserver ?", acceptedAnswer: { '@type': 'Answer', text: "Pour une course immédiate, appelez directement. Pour les transferts aéroport ou gare, une réservation à l'avance est recommandée." } },
      { '@type': 'Question', name: 'Quels modes de paiement acceptez-vous ?', acceptedAnswer: { '@type': 'Answer', text: 'Carte bancaire, espèces et virement. Pour les transports CPAM conventionnés, prise en charge directe sur ordonnance.' } },
    ],
  };

  const taxiServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    name: 'ATC TAXI VTC Narbonne – Réservation en ligne',
    description: 'Réservez votre taxi à Narbonne : aéroport, gare SNCF, hôpital, longue distance. 24h/24 7j/7. Conventionné CPAM.',
    telephone: '+33768303303',
    email: 'atctaxi11@gmail.com',
    url: 'https://atctaxivtcnarbonne.fr/reserver-taxi-narbonne',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '48' },
  };

  if (submitted && bookingData) {
    return <SuccessScreen data={bookingData} onReset={() => { setSubmitted(false); setBookingData(null); }} />;
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <Helmet>
        <title>Réserver un Taxi à Narbonne – ATC TAXI VTC 24h/24 – Réservation en ligne</title>
        <meta name="description" content="Réservez votre taxi à Narbonne en ligne : aéroport, gare SNCF, hôpital, longue distance. ATC TAXI VTC 24h/24 7j/7. Conventionné CPAM. Réponse en moins de 5 min." />
        <meta name="keywords" content="réserver taxi Narbonne, réservation taxi Narbonne en ligne, taxi Narbonne aéroport, taxi gare Narbonne SNCF, VTC Narbonne réservation" />
        <link rel="canonical" href="https://atctaxivtcnarbonne.fr/reserver-taxi-narbonne" />
        <meta property="og:title" content="Réserver un Taxi à Narbonne – ATC TAXI VTC 24h/24" />
        <meta property="og:description" content="Formulaire de réservation de taxi à Narbonne. Aéroport, gare, hôpital, longue distance. Conventionné CPAM. Réponse garantie en 5 minutes." />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(taxiServiceSchema)}</script>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </Helmet>

      <div style={{ backgroundColor: '#060F1E', minHeight: '100vh', paddingTop: '90px' }}>

        {/* ── Hero ── */}
        <section style={{ background: 'linear-gradient(160deg, #0D1A2E 0%, #111827 60%, #0A1628 100%)' }} className="py-14 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs mb-5" style={{ background: 'rgba(58,180,177,0.12)', border: '1px solid rgba(58,180,177,0.3)', color: TEAL }}>
              <Zap size={12} />
              Réservation en ligne – Confirmation en moins de 5 minutes
            </div>
            <h1 className="text-4xl sm:text-5xl text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
              Réserver un Taxi à <span style={{ color: TEAL }}>Narbonne</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              ATC TAXI VTC Narbonne — Chauffeur professionnel disponible <strong className="text-white">24h/24, 7j/7</strong>. Transferts aéroport, gare SNCF, hôpital, tourisme et longue distance dans tout le sud de la France et en Espagne.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: Shield, text: 'Conventionné CPAM' },
                { icon: Star, text: 'Noté 5/5 sur Google' },
                { icon: Clock, text: 'Disponible 24h/24' },
                { icon: Award, text: 'Chauffeur professionnel' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-gray-300" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <Icon size={13} style={{ color: TEAL }} />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Main Layout ── */}
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── Form ── */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="rounded-2xl overflow-hidden" style={{ background: '#0D1520', border: '1px solid rgba(58,180,177,0.15)' }}>
                <div className="px-6 py-4 flex items-center gap-2 border-b" style={{ borderColor: 'rgba(58,180,177,0.15)', background: 'rgba(58,180,177,0.05)' }}>
                  <CalendarDays size={18} style={{ color: TEAL }} />
                  <h2 className="text-white text-base">Formulaire de réservation de taxi</h2>
                </div>

                <div className="p-6 space-y-9">

                  {/* ── 1. Type de trajet ── */}
                  <section>
                    <SectionTitle icon={<Car size={15} />}>Type de trajet</SectionTitle>
                    <div className="grid grid-cols-2 gap-3">
                      {([{ val: 'aller-simple', label: 'Aller simple' }, { val: 'aller-retour', label: 'Aller-retour' }] as const).map(({ val, label }) => (
                        <label key={val} className="flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-all select-none" style={{ border: `2px solid ${tripType === val ? TEAL : 'rgba(255,255,255,0.1)'}`, background: tripType === val ? 'rgba(58,180,177,0.08)' : 'rgba(255,255,255,0.02)' }}>
                          <input type="radio" value={val} {...register('tripType')} className="sr-only" />
                          <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: tripType === val ? TEAL : '#555' }}>
                            {tripType === val && <div className="w-2 h-2 rounded-full" style={{ background: TEAL }} />}
                          </div>
                          <span className="text-sm text-white">{label}</span>
                        </label>
                      ))}
                    </div>
                  </section>

                  {/* ── 2. Départ / Destination ── */}
                  <section>
                    <SectionTitle icon={<MapPin size={15} />}>Départ & Destination</SectionTitle>
                    <p className="text-xs text-gray-500 mb-3 -mt-2">Saisissez une adresse, ville, aéroport ou lieu-dit. Les suggestions apparaissent automatiquement.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel required>Adresse de départ</FieldLabel>
                        <Controller
                          name="departure"
                          control={control}
                          rules={{ required: 'Lieu de départ requis' }}
                          render={({ field }) => (
                            <AddressAutocomplete
                              value={field.value || ''}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              placeholder="Ex : 12 Rue de la Gare, Narbonne"
                              error={errors.departure?.message}
                            />
                          )}
                        />
                      </div>
                      <div>
                        <FieldLabel required>Adresse de destination</FieldLabel>
                        <Controller
                          name="destination"
                          control={control}
                          rules={{ required: 'Destination requise' }}
                          render={({ field }) => (
                            <AddressAutocomplete
                              value={field.value || ''}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              placeholder="Ex : Aéroport Montpellier-Méditerranée"
                              error={errors.destination?.message}
                            />
                          )}
                        />
                      </div>
                    </div>

                    {/* Toggles spéciaux */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      <Controller
                        name="isAirport"
                        control={control}
                        render={({ field }) => (
                          <Toggle
                            label="✈ Trajet inclut un aéroport"
                            sublabel="N° vol, compagnie, terminal…"
                            checked={!!field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      <Controller
                        name="isGare"
                        control={control}
                        render={({ field }) => (
                          <Toggle
                            label="🚉 Trajet inclut une gare SNCF"
                            sublabel="N° train, heure d'arrivée…"
                            checked={!!field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    {/* SMART : Champs Aéroport */}
                    <SmartBlock show={!!isAirport}>
                      <div className="mt-4 p-4 rounded-xl" style={{ background: 'rgba(58,180,177,0.07)', border: '1px solid rgba(58,180,177,0.25)' }}>
                        <div className="flex items-center gap-2 mb-3">
                          <Plane size={14} style={{ color: TEAL }} />
                          <span className="text-sm" style={{ color: TEAL }}>Informations de vol</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <FieldLabel>N° de vol</FieldLabel>
                            <input {...register('flightNumber')} placeholder="Ex : FR1234" style={darkInput} />
                          </div>
                          <div>
                            <FieldLabel>Compagnie aérienne</FieldLabel>
                            <input {...register('airline')} placeholder="Ex : Air France" style={darkInput} />
                          </div>
                          <div>
                            <FieldLabel>Terminal</FieldLabel>
                            <input {...register('terminal')} placeholder="Ex : Terminal 1" style={darkInput} />
                          </div>
                        </div>
                        <div className="mt-3 max-w-xs">
                          <FieldLabel>Bagages en soute</FieldLabel>
                          <select {...register('luggageCount')} style={{ ...darkInput, cursor: 'pointer' }}>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                              <option key={n} value={String(n)}>{n} bagage{n !== 1 ? 's' : ''} en soute</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </SmartBlock>

                    {/* SMART : Champs Gare */}
                    <SmartBlock show={!!isGare}>
                      <div className="mt-4 p-4 rounded-xl" style={{ background: 'rgba(58,180,177,0.07)', border: '1px solid rgba(58,180,177,0.25)' }}>
                        <div className="flex items-center gap-2 mb-3">
                          <Train size={14} style={{ color: TEAL }} />
                          <span className="text-sm" style={{ color: TEAL }}>Informations de train</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <FieldLabel>N° de train</FieldLabel>
                            <input {...register('trainNumber')} placeholder="Ex : TGV 6201" style={darkInput} />
                          </div>
                          <div>
                            <FieldLabel>Heure d'arrivée du train</FieldLabel>
                            <input type="time" {...register('trainArrivalTime')} style={darkInput} />
                          </div>
                          <div>
                            <FieldLabel>Ville de provenance</FieldLabel>
                            <input {...register('trainOrigin')} placeholder="Ex : Paris Gare de Lyon" style={darkInput} />
                          </div>
                        </div>
                      </div>
                    </SmartBlock>
                  </section>

                  {/* ── 3. Date & Heure ── */}
                  <section>
                    <SectionTitle icon={<CalendarDays size={15} />}>Date & Heure</SectionTitle>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel required>Date de la course</FieldLabel>
                        <input
                          type="date"
                          min={today}
                          {...register('date', { required: 'Date requise' })}
                          style={whiteInput}
                        />
                        {errors.date && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.date.message}</p>}
                      </div>
                      <div>
                        <FieldLabel required>Heure de prise en charge</FieldLabel>
                        <input
                          type="time"
                          {...register('time', { required: 'Heure requise' })}
                          style={whiteInput}
                        />
                        {errors.time && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.time.message}</p>}
                      </div>
                    </div>

                    {/* SMART : Retour */}
                    <SmartBlock show={tripType === 'aller-retour'}>
                      <div className="mt-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="flex items-center gap-2 mb-3">
                          <RefreshCw size={13} style={{ color: TEAL }} />
                          <span className="text-sm text-gray-300">Date et heure du retour</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <FieldLabel>Date de retour</FieldLabel>
                            <input type="date" min={today} {...register('returnDate')} style={whiteInput} />
                          </div>
                          <div>
                            <FieldLabel>Heure de retour</FieldLabel>
                            <input type="time" {...register('returnTime')} style={whiteInput} />
                          </div>
                        </div>
                      </div>
                    </SmartBlock>
                  </section>

                  {/* ── 4. Passagers & Options ── */}
                  <section>
                    <SectionTitle icon={<Users size={15} />}>Passagers & Options</SectionTitle>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <FieldLabel required>Passagers</FieldLabel>
                        <select {...register('passengers')} style={{ ...darkInput, cursor: 'pointer' }}>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <option key={n} value={String(n)}>{n} personne{n !== 1 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <FieldLabel>Bagages</FieldLabel>
                        <select {...register('luggage')} style={{ ...darkInput, cursor: 'pointer' }}>
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <option key={n} value={String(n)}>{n} bagage{n !== 1 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <FieldLabel>Animal de compagnie</FieldLabel>
                        <select {...register('hasAnimals')} style={{ ...darkInput, cursor: 'pointer' }}>
                          <option value="no">Non</option>
                          <option value="yes">Oui</option>
                        </select>
                      </div>
                      <div>
                        <FieldLabel>Besoin PMR</FieldLabel>
                        <select {...register('isPMR')} style={{ ...darkInput, cursor: 'pointer' }}>
                          <option value="no">Non</option>
                          <option value="yes">Oui – PMR</option>
                        </select>
                      </div>
                    </div>

                    <SmartBlock show={hasAnimals === 'yes'}>
                      <div className="mt-3">
                        <FieldLabel>Description de l'animal</FieldLabel>
                        <input {...register('animalDescription')} placeholder="Ex : Chien labrador taille moyenne, laisse et cage" style={darkInput} />
                      </div>
                    </SmartBlock>
                  </section>

                  {/* ── 5. Coordonnées ── */}
                  <section>
                    <SectionTitle icon={<Phone size={15} />}>Vos coordonnées</SectionTitle>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel required>Nom complet</FieldLabel>
                        <input {...register('name', { required: 'Votre nom est requis' })} placeholder="Prénom Nom" style={darkInput} />
                        {errors.name && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.name.message}</p>}
                      </div>
                      <div>
                        <FieldLabel required>Téléphone</FieldLabel>
                        <input
                          type="tel"
                          {...register('phone', {
                            required: 'Votre numéro est requis',
                            pattern: { value: /^[+\d\s\-()/]{6,20}$/, message: 'Numéro invalide' },
                          })}
                          placeholder="06 xx xx xx xx"
                          style={darkInput}
                        />
                        {errors.phone && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.phone.message}</p>}
                      </div>
                      <div className="sm:col-span-2">
                        <FieldLabel>Email (optionnel)</FieldLabel>
                        <input type="email" {...register('email')} placeholder="votre@email.fr" style={darkInput} />
                      </div>
                      <div className="sm:col-span-2">
                        <FieldLabel>Informations complémentaires</FieldLabel>
                        <textarea {...register('notes')} rows={3} placeholder="Adresse exacte, instructions particulières, demandes spéciales..." style={{ ...darkInput, resize: 'vertical' }} />
                      </div>
                    </div>
                  </section>

                  {/* Submit */}
                  <div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-white font-bold text-base transition-all hover:opacity-90 hover:scale-[1.01] active:scale-[0.99]"
                      style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})`, boxShadow: `0 4px 24px rgba(58,180,177,0.35)` }}
                    >
                      <Send size={18} />
                      Envoyer ma demande de réservation
                      <ArrowRight size={18} />
                    </button>
                    <p className="text-center text-xs text-gray-600 mt-3">
                      Réponse garantie en moins de 5 minutes · Disponible 24h/24 · 07 68 30 33 03
                    </p>
                  </div>

                </div>
              </div>
            </form>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-5">
            {/* Contact rapide */}
            <div className="rounded-2xl p-5" style={{ background: '#0D1520', border: '1px solid rgba(58,180,177,0.15)' }}>
              <h3 className="text-white text-sm mb-4 flex items-center gap-2">
                <Phone size={15} style={{ color: TEAL }} />
                Réservation directe
              </h3>
              <a href="tel:0768303303" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-bold text-sm mb-2.5 transition-all hover:opacity-90" style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}>
                <Phone size={15} />
                07 68 30 33 03
              </a>
              <a href="https://wa.me/33768303303" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90" style={{ background: '#25D366' }}>
                <MessageCircle size={15} />
                WhatsApp
              </a>
              <div className="mt-4 pt-4 border-t space-y-2" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                {['Réponse en moins de 5 min', 'Service 24h/24 – 7j/7', 'Devis gratuit & sans engagement'].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs text-gray-400">
                    <CheckCircle2 size={12} style={{ color: TEAL, flexShrink: 0 }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="rounded-2xl p-5" style={{ background: '#0D1520', border: '1px solid rgba(58,180,177,0.15)' }}>
              <h3 className="text-white text-sm mb-4">Tous nos services</h3>
              {[
                { icon: Plane, label: 'Transfert aéroport', desc: 'Montpellier, Toulouse, BCN…', href: '/taxi-aeroport-montpellier' },
                { icon: Train, label: 'Taxi gare SNCF', desc: 'Narbonne, Carcassonne…', href: '/taxi-gare-narbonne' },
                { icon: Heart, label: 'Transport CPAM / VSL', desc: 'Conventionné Assurance Maladie', href: '/taxi-vsl-narbonne' },
                { icon: Navigation, label: 'Longue distance', desc: 'France entière & Espagne', href: '/taxi-narbonne-barcelone' },
                { icon: Users, label: 'Transport PMR', desc: 'Véhicule adapté', href: '/services' },
                { icon: Car, label: 'Mise à disposition', desc: "À l'heure ou à la journée", href: '/services' },
                { icon: PawPrint, label: 'Animaux acceptés', desc: 'Sur réservation', href: '/reserver-taxi-narbonne' },
              ].map(({ icon: Icon, label, desc, href }) => (
                <Link key={label} to={href} className="flex items-start gap-3 py-2.5 border-b transition-opacity hover:opacity-80" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(58,180,177,0.12)' }}>
                    <Icon size={13} style={{ color: TEAL }} />
                  </div>
                  <div>
                    <div className="text-xs text-white">{label}</div>
                    <div className="text-xs text-gray-500">{desc}</div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Témoignage */}
            <div className="rounded-2xl p-5" style={{ background: '#0D1520', border: '1px solid rgba(58,180,177,0.15)' }}>
              <div className="flex gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill={TEAL} style={{ color: TEAL }} />)}
              </div>
              <p className="text-xs text-gray-300 leading-relaxed mb-2">
                "Excellent chauffeur, toujours ponctuel. Prise en charge impeccable à la gare de Narbonne. Je recommande sans hésiter."
              </p>
              <p className="text-xs text-gray-500">— Isabelle M., Narbonne</p>
            </div>
          </div>
        </div>

        {/* ── Comment ça marche ── */}
        <section className="max-w-5xl mx-auto px-4 py-10">
          <h2 className="text-2xl text-white text-center mb-2">Comment réserver votre taxi à Narbonne ?</h2>
          <p className="text-gray-400 text-sm text-center mb-8 max-w-xl mx-auto">Simple, rapide et confirmé en moins de 5 minutes.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { step: '1', title: 'Remplissez le formulaire', desc: "Saisissez vos adresses, date et heure. Les champs s'adaptent si vous allez à l'aéroport ou à la gare.", icon: Send },
              { step: '2', title: 'Confirmation en 5 min', desc: 'Votre chauffeur ATC TAXI vous rappelle ou répond par WhatsApp avec tarif et confirmation.', icon: Phone },
              { step: '3', title: 'Prise en charge ponctuelle', desc: "Votre chauffeur arrive à l'heure. Véhicule confortable, conduite sereine jusqu'à destination.", icon: CheckCircle2 },
            ].map(({ step, title, desc, icon: Icon }) => (
              <div key={step} className="rounded-2xl p-6 text-center" style={{ background: '#0D1520', border: '1px solid rgba(58,180,177,0.12)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(58,180,177,0.12)', border: `2px solid ${TEAL}` }}>
                  <Icon size={20} style={{ color: TEAL }} />
                </div>
                <div className="text-xs mb-1" style={{ color: TEAL }}>Étape {step}</div>
                <h3 className="text-white text-sm mb-2">{title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Disponibilités ── */}
        <AvailabilityGrid />

        {/* ── SEO Text Block ── */}
        <section className="max-w-4xl mx-auto px-4 py-10">
          <div className="rounded-2xl p-8" style={{ background: '#0D1520', border: '1px solid rgba(58,180,177,0.12)' }}>
            <h2 className="text-2xl text-white mb-6">Réserver un taxi à Narbonne – ATC TAXI VTC</h2>
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
              <p><strong className="text-white">ATC TAXI VTC Narbonne</strong> est votre service de taxi et VTC de référence dans le département de l'Aude (11). Notre équipe est disponible <strong className="text-white">24 heures sur 24, 7 jours sur 7</strong> pour tous vos déplacements locaux, régionaux et internationaux.</p>
              <p>Que vous ayez besoin d'un <strong className="text-white">taxi pour l'aéroport de Montpellier</strong>, d'un transfert vers la <strong className="text-white">gare SNCF de Narbonne</strong>, d'un <strong className="text-white">transport médical conventionné CPAM</strong> ou d'une longue distance vers Barcelone, notre chauffeur professionnel prend en charge votre trajet dans les meilleures conditions.</p>
              <p>Notre <strong className="text-white">formulaire de réservation intelligent</strong> s'adapte à votre trajet : activez le switch "aéroport" pour renseigner votre numéro de vol, compagnie et terminal ; activez "gare" pour indiquer le numéro de train et l'heure d'arrivée. Saisissez n'importe quelle adresse — l'autocomplete vous propose les résultats en temps réel.</p>
              <p>ATC TAXI dessert <strong className="text-white">Narbonne, Gruissan, Leucate, Sigean, Port-la-Nouvelle, Narbonne Plage, Carcassonne, Béziers, Montpellier, Perpignan et Barcelone</strong>, ainsi que toutes les communes du Narbonnais. Nos véhicules récents et confortables vous garantissent un voyage serein.</p>
              <p>Taxi <strong className="text-white">agréé et conventionné par l'Assurance Maladie (CPAM)</strong>, nous assurons également les transports sanitaires (VSL), les transports de personnes à mobilité réduite (PMR) et les mises à disposition à l'heure ou à la journée.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { label: 'Taxi Narbonne', href: '/taxi-narbonne' },
                  { label: 'Taxi Gare Narbonne', href: '/taxi-gare-narbonne' },
                  { label: 'Taxi VSL CPAM', href: '/taxi-vsl-narbonne' },
                  { label: 'Aéroport Montpellier', href: '/taxi-aeroport-montpellier' },
                  { label: 'Aéroport Toulouse', href: '/taxi-aeroport-toulouse' },
                  { label: 'Taxi Barcelone', href: '/taxi-narbonne-barcelone' },
                ].map(({ label, href }) => (
                  <Link key={href} to={href} className="text-xs px-3 py-2 rounded-lg transition-colors hover:text-white text-center" style={{ color: TEAL, background: 'rgba(58,180,177,0.08)', border: '1px solid rgba(58,180,177,0.2)' }}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-2xl text-white mb-2 text-center">Questions fréquentes – Réservation taxi Narbonne</h2>
          <p className="text-gray-500 text-sm text-center mb-8">Tout ce que vous devez savoir avant de réserver votre taxi.</p>
          <div className="space-y-3">
            {[
              { q: 'Comment réserver un taxi à Narbonne en ligne ?', a: "Saisissez vos adresses de départ et destination dans le formulaire, choisissez la date et l'heure. Après validation, envoyez votre demande par WhatsApp ou appelez le 07 68 30 33 03. Confirmation en moins de 5 minutes." },
              { q: 'Quels sont vos tarifs pour un taxi à Narbonne ?', a: "Nos tarifs sont calculés selon le tarif préfectoral en vigueur dans l'Aude (11). Ils varient selon la distance, l'heure et le type de prestation. Appelez-nous au 07 68 30 33 03 pour un devis personnalisé et gratuit." },
              { q: 'Proposez-vous des transferts vers tous les aéroports ?', a: "Oui. ATC TAXI assure les transferts depuis Narbonne vers Montpellier (MPL), Toulouse-Blagnac (TLS), Carcassonne (CCF), Béziers (BZR) et Barcelone El Prat (BCN). Nous suivons les vols en temps réel." },
              { q: 'Le taxi est-il conventionné CPAM pour les transports médicaux ?', a: "Oui, ATC TAXI est agréé et conventionné par l'Assurance Maladie. Sur prescription médicale, vos transports vers hôpitaux et cliniques (dialyse, chimio, radio…) peuvent être pris en charge directement." },
              { q: 'Acceptez-vous les animaux de compagnie à bord ?', a: "Oui, les animaux sont les bienvenus. Cochez 'Oui' dans le formulaire et décrivez votre animal pour que nous puissions nous y préparer." },
              { q: 'Proposez-vous un service pour personnes à mobilité réduite (PMR) ?', a: "Oui. Cochez 'Oui – PMR' dans le formulaire. Notre chauffeur prend en charge les passagers en fauteuil roulant ou ayant des difficultés de mobilité." },
              { q: "Comment le chauffeur reçoit-il la réservation dans son Google Agenda ?", a: "Lorsque vous envoyez votre demande par WhatsApp, le message contient un lien Google Agenda pré-rempli. Le chauffeur appuie dessus depuis son téléphone et ajoute directement la course à son propre calendrier — sans invitation, sans Google Meet." },
            ].map(({ q, a }) => <FaqItem key={q} question={q} answer={a} />)}
          </div>
        </section>

        {/* ── CTA Final ── */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="rounded-2xl p-8 text-center" style={{ background: 'linear-gradient(135deg, rgba(58,180,177,0.12), rgba(42,148,144,0.06))', border: '1px solid rgba(58,180,177,0.25)' }}>
            <h2 className="text-2xl text-white mb-2">Besoin d'un taxi à Narbonne maintenant ?</h2>
            <p className="text-gray-400 text-sm mb-6">Appelez-nous directement — disponibles 24h/24 et 7j/7.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:0768303303" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-bold transition-all hover:scale-105" style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})`, boxShadow: `0 4px 24px rgba(58,180,177,0.35)` }}>
                <Phone size={18} />07 68 30 33 03
              </a>
              <a href="https://wa.me/33768303303" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-bold transition-all hover:scale-105" style={{ background: '#25D366' }}>
                <MessageCircle size={18} />WhatsApp
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

// ── Availability Grid ─────────────────────────────────────────────────────────
function AvailabilityGrid() {
  const [weekOffset, setWeekOffset] = useState(0);

  const SLOTS = [
    { key: 'morning', label: 'Matin', time: '06h – 12h', icon: '🌅' },
    { key: 'afternoon', label: 'Après-midi', time: '12h – 19h', icon: '☀️' },
    { key: 'evening', label: 'Soir / Nuit', time: '19h – 06h', icon: '🌙' },
  ];

  const getDays = () => {
    const days: Date[] = [];
    const base = new Date();
    base.setDate(base.getDate() + weekOffset * 7);
    const dow = base.getDay() === 0 ? 6 : base.getDay() - 1;
    base.setDate(base.getDate() - dow);
    for (let i = 0; i < 7; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const days = getDays();
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const DAY_NAMES = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const MONTHS = ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 'juil', 'août', 'sep', 'oct', 'nov', 'déc'];

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="rounded-2xl overflow-hidden" style={{ background: '#0D1520', border: '1px solid rgba(58,180,177,0.15)' }}>
        <div className="px-6 py-4 border-b flex flex-col sm:flex-row sm:items-center gap-3" style={{ borderColor: 'rgba(58,180,177,0.15)' }}>
          <div className="flex items-center gap-2">
            <Calendar size={16} style={{ color: TEAL }} />
            <h2 className="text-white text-sm">Disponibilités ATC TAXI Narbonne</h2>
          </div>
          <div className="sm:ml-auto flex items-center gap-2">
            <button onClick={() => setWeekOffset((w) => Math.max(0, w - 1))} disabled={weekOffset === 0} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 transition-all hover:text-white disabled:opacity-30" style={{ background: 'rgba(255,255,255,0.06)' }}>‹</button>
            <span className="text-xs text-gray-400 min-w-[110px] text-center">
              {days[0].getDate()} {MONTHS[days[0].getMonth()]} – {days[6].getDate()} {MONTHS[days[6].getMonth()]}
            </span>
            <button onClick={() => setWeekOffset((w) => Math.min(4, w + 1))} disabled={weekOffset >= 4} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 transition-all hover:text-white disabled:opacity-30" style={{ background: 'rgba(255,255,255,0.06)' }}>›</button>
          </div>
        </div>

        <div className="px-4 pb-4 overflow-x-auto">
          <div className="min-w-[520px] pt-3">
            <div className="grid mb-2" style={{ gridTemplateColumns: '90px repeat(7, 1fr)', gap: 4 }}>
              <div />
              {days.map((d, i) => {
                const isToday = d.getTime() === today.getTime();
                const isPast = d < today;
                return (
                  <div key={i} className="text-center py-1.5 rounded-lg" style={{ background: isToday ? 'rgba(58,180,177,0.12)' : 'transparent' }}>
                    <div className="text-xs" style={{ color: isToday ? TEAL : isPast ? '#374151' : '#9CA3AF' }}>{DAY_NAMES[i]}</div>
                    <div className="text-sm" style={{ color: isToday ? TEAL : isPast ? '#374151' : '#fff' }}>{d.getDate()}</div>
                  </div>
                );
              })}
            </div>
            {SLOTS.map((slot) => (
              <div key={slot.key} className="grid mb-2" style={{ gridTemplateColumns: '90px repeat(7, 1fr)', gap: 4 }}>
                <div className="flex flex-col justify-center pr-2">
                  <div className="text-xs text-gray-300">{slot.icon} {slot.label}</div>
                  <div className="text-xs text-gray-600">{slot.time}</div>
                </div>
                {days.map((d, i) => {
                  const isPast = d < today;
                  const isPastSlot = d.getTime() === today.getTime() && slot.key === 'morning' && new Date().getHours() >= 12;
                  const unavail = isPast || isPastSlot;
                  return (
                    <div key={i} className="rounded-lg py-3 text-center text-xs" style={{ background: unavail ? 'rgba(255,255,255,0.02)' : 'rgba(58,180,177,0.1)', border: unavail ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(58,180,177,0.3)', color: unavail ? '#374151' : TEAL }}>
                      {unavail ? '—' : '✓'}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 pb-5">
          <div className="flex items-start gap-2 p-3 rounded-lg" style={{ background: 'rgba(58,180,177,0.05)', border: '1px solid rgba(58,180,177,0.15)' }}>
            <Info size={13} style={{ color: TEAL, flexShrink: 0, marginTop: 2 }} />
            <p className="text-xs text-gray-400 leading-relaxed">
              Disponibilité indicative — aucune donnée de l'agenda n'est exposée. Pour confirmation immédiate, appelez le{' '}
              <a href="tel:0768303303" style={{ color: TEAL }}>07 68 30 33 03</a> ou contactez-nous par{' '}
              <a href="https://wa.me/33768303303" target="_blank" rel="noopener noreferrer" style={{ color: TEAL }}>WhatsApp</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
