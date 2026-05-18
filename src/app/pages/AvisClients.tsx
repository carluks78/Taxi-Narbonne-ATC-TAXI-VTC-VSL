import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Star, MapPin, Phone } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export async function loader() {
  return {};
}

const PHONE = '0768303303';
const PHONE_DISPLAY = '07 68 30 33 03';
const TEAL = '#3AB4B1';
const TEAL_DARK = '#2A9490';
const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJNxGmHW6soSARohmCBp-l8xQ&source=g.page.m.nr._&laa=nmx-review-solicitation-recommendation-card';

function GoogleGLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

const reviews = [
  { name: 'Marie L.', city: 'Narbonne', date: 'Mars 2025', text: 'Service impeccable pour mon transfert à l\'aéroport de Montpellier. Ponctuel, véhicule propre, chauffeur très professionnel. Je recommande vivement !' },
  { name: 'Jean-Pierre M.', city: 'Gruissan', date: 'Avril 2025', text: 'Taxi conventionné pour mes rendez-vous médicaux. Toujours à l\'heure, très agréable. Merci ATC TAXI !' },
  { name: 'Sophie R.', city: 'Leucate', date: 'Février 2025', text: 'Excellent service de taxi pour rejoindre la gare de Narbonne. Prix correct, chauffeur sympa. Parfait !' },
  { name: 'Ahmed B.', city: 'Port-la-Nouvelle', date: 'Janvier 2025', text: 'J\'utilise ATC Taxi régulièrement pour mes déplacements professionnels. Fiable, rapide, professionnel. Top !' },
  { name: 'Isabelle T.', city: 'Sigean', date: 'Mars 2025', text: 'Transport pour la réserve africaine avec mes enfants. Super expérience, chauffeur adorable et ponctuel.' },
  { name: 'François D.', city: 'Narbonne', date: 'Avril 2025', text: 'Transfert de nuit vers Toulouse. Aucun souci, taxi à l\'heure pile, voyage très confortable.' },
  { name: 'Carole V.', city: 'Carcassonne', date: 'Février 2025', text: 'Taxi depuis Narbonne jusqu\'à Carcassonne. Tarif raisonnable, bon conducteur. Très bien !' },
  { name: 'Michel P.', city: 'Narbonne', date: 'Janvier 2025', text: 'J\'ai appelé à 5h du matin pour une urgence, ils ont répondu immédiatement ! Service exceptionnel.' },
  { name: 'Laure H.', city: 'Béziers', date: 'Mars 2025', text: 'Transfert aéroport Montpellier en heure de pointe. Chauffeur calme et efficace. Je recommande !' },
  { name: 'Robert N.', city: 'Peyriac-de-Mer', date: 'Décembre 2024', text: 'Taxi conventionné pour mes dialyses. Chauffeur toujours à l\'heure, très agréable. Merci pour ce service.' },
  { name: 'Christine F.', city: 'Leucate', date: 'Novembre 2024', text: 'Réservation simple par WhatsApp, ponctuel et professionnel. Tarif correct. Très contente !' },
  { name: 'David M.', city: 'Narbonne', date: 'Octobre 2024', text: 'Taxi pour l\'aéroport de Barcelone. Voyage très agréable, chauffeur parle espagnol. Super !' },
  { name: 'Sylvie B.', city: 'Gruissan', date: 'Octobre 2024', text: 'Service taxi premium, véhicule récent et propre, chauffeur courtois. ATC mérite sa note 5 étoiles.' },
  { name: 'Marc T.', city: 'Sigean', date: 'Septembre 2024', text: 'Transport médical pour ma mère. Chauffeur très attentionné et patient. Excellente prise en charge.' },
  { name: 'Nathalie L.', city: 'Port-la-Nouvelle', date: 'Septembre 2024', text: 'Taxi de nuit après un concert à Montpellier. Disponible immédiatement, tarif normal. Merci ATC !' },
  { name: 'Pierre C.', city: 'Narbonne', date: 'Août 2024', text: 'Mise à disposition chauffeur pour une journée. Très professionnel, connaît bien la région. Parfait !' },
  { name: 'Emma R.', city: 'Carcassonne', date: 'Juillet 2024', text: 'Transfert hôtel vers gare Narbonne. Ponctuel malgré le trafic d\'été. Je garde leur numéro.' },
  { name: 'Olivier K.', city: 'Narbonne', date: 'Juillet 2024', text: 'ATC Taxi mon taxi préféré sur Narbonne. Toujours disponible, toujours ponctuel. Bravo !' },
  { name: 'Françoise M.', city: 'Béziers', date: 'Juin 2024', text: 'Taxi PMR pour ma mère en fauteuil roulant. Véhicule adapté, chauffeur formé. Très satisfaite.' },
  { name: 'Thomas L.', city: 'Narbonne', date: 'Mai 2024', text: 'Service 5 étoiles ! Réponse immédiate, véhicule de qualité, chauffeur souriant. Parfait du début à la fin.' },
];

export function AvisClients() {
  return (
    <div style={{ backgroundColor: '#060F1E' }} className="min-h-screen pt-28">
      <SEOHead
        title="Avis Clients Taxi Narbonne | Note 5/5 – 200+ Avis Vérifiés | ATC TAXI VTC"
        description="Découvrez les avis clients d'ATC TAXI VTC Narbonne. Note 5/5 avec plus de 200 avis vérifiés. Taxi conventionné CPAM, gare, aéroport – Narbonne, Gruissan, Leucate, Sigean."
        canonical="/avis-clients"
        keywords="avis taxi narbonne, avis atc taxi vtc, témoignages taxi narbonne, note taxi narbonne, avis clients taxi aude, meilleur taxi narbonne"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'ATC TAXI VTC Narbonne',
          aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '200', bestRating: '5' },
        }}
      />

      <section className="py-16 text-center px-4 sm:px-6" style={{ background: 'linear-gradient(180deg, #0A1931 0%, #060F1E 100%)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: TEAL }}>Avis clients vérifiés</span>
          <h1 className="text-white mt-3 mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
            Ils nous font confiance
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex text-2xl" style={{ color: TEAL }}>{'★★★★★'}</div>
            <span className="text-gray-300 text-lg">Note 5/5 – 200+ avis vérifiés</span>
          </div>
          <p className="text-gray-400 text-sm">Taxi Narbonne – Service de qualité reconnu par nos clients</p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 8) * 0.06 }}
              className="p-5 rounded-2xl"
              style={{ background: '#0D2040', border: `1px solid rgba(58,180,177,0.2)` }}
            >
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} style={{ fill: TEAL, color: TEAL }} />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">"{review.text}"</p>
              <div className="flex items-center gap-2 mt-auto">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}>
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">{review.name}</p>
                  <p className="text-gray-500 text-xs flex items-center gap-1">
                    <MapPin size={9} />{review.city} · {review.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SEO content */}
        <div className="mt-16 space-y-4 text-gray-300 leading-relaxed max-w-3xl mx-auto">
          <h2 className="text-white font-bold" style={{ fontSize: '1.5rem' }}>
            ATC TAXI VTC Narbonne – Le taxi le mieux noté de l'Aude
          </h2>
          <p>
            Avec plus de <strong>200 avis clients</strong> et une note de <strong>5 étoiles sur 5</strong>, ATC TAXI VTC Narbonne s'impose comme le service de taxi de référence dans le département de l'Aude. Nos clients apprécient particulièrement notre ponctualité, le professionnalisme de nos chauffeurs et la qualité de notre flotte de véhicules récents et climatisés.
          </p>
          <p>
            Que ce soit pour un transport médical conventionné CPAM, un transfert à la gare SNCF de Narbonne, un départ à l'aéroport de Montpellier ou Toulouse, ou simplement pour un déplacement local à Narbonne et ses environs, nos clients reviennent régulièrement et nous recommandent à leurs proches.
          </p>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6">Vous avez voyagé avec ATC TAXI VTC Narbonne ?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-lg"
              style={{ background: `linear-gradient(135deg, ${TEAL}, ${TEAL_DARK})` }}>
              <Phone size={18} /> Réserver – {PHONE_DISPLAY}
            </a>
            {/* Google Reviews CTA */}
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-full font-bold transition-all hover:scale-105"
              style={{ background: '#ffffff', border: '2px solid #dadce0', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
              aria-label="Laisser un avis Google"
            >
              <GoogleGLogo size={22} />
              <span className="text-gray-800">Laisser nous un avis</span>
              <span className="text-yellow-400">★★★★★</span>
            </a>
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-lg transition-colors"
              style={{ border: `2px solid rgba(58,180,177,0.5)` }}>
              Demander un devis
            </Link>
          </div>
        </div>

        {/* Internal links */}
        <div className="mt-12 flex flex-wrap gap-3 justify-center">
          {[
            { label: 'Taxi Narbonne', href: '/taxi-narbonne' },
            { label: 'Services', href: '/services' },
            { label: 'Zones desservies', href: '/zones-desservies' },
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
