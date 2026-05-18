import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  route('/', './components/Layout.tsx', [
    index('./pages/Home.tsx'),

    route('services', './pages/Services.tsx'),
    route('contact', './pages/Contact.tsx'),
    route('zones-desservies', './pages/ZonesDesservies.tsx'),
    route('avis-clients', './pages/AvisClients.tsx'),
    route('taxi-narbonne', './pages/TaxiNarbonne.tsx'),
    route('reserver-taxi-narbonne', './pages/Reservation.tsx'),

    // 🚖 GARE (pages dédiées = plus de duplicate ID)
    route('taxi-gare-narbonne', './pages/gare/Narbonne.tsx'),
    route('taxi-gare-de-narbonne', './pages/gare/NarbonneDe.tsx'),
    route('taxi-narbonne-reservation-24h-gare-aeroport', './pages/gare/Reservation.tsx'),

    // ✈️ AÉROPORTS (1 fichier par page = SAFE)
    route('taxi-aeroport-montpellier', './pages/aeroport/Montpellier.tsx'),
    route('taxi-aeroport-toulouse', './pages/aeroport/Toulouse.tsx'),
    route('taxi-aeroport-carcassonne', './pages/aeroport/Carcassonne.tsx'),
    route('taxi-aeroport-beziers', './pages/aeroport/Beziers.tsx'),
    route('taxi-aeroport-barcelone', './pages/aeroport/Barcelone.tsx'),

    // 📍 ZONES (1 fichier par zone = SAFE SEO)
    route('taxi-gruissan', './pages/geo/Gruissan.tsx'),
    route('taxi-leucate', './pages/geo/Leucate.tsx'),
    route('taxi-sigean', './pages/geo/Sigean.tsx'),
    route('taxi-port-la-nouvelle', './pages/geo/PortLaNouvelle.tsx'),
    route('taxi-narbonne-plage', './pages/geo/NarbonnePlage.tsx'),
    route('taxi-peyriac-de-mer', './pages/geo/PeyriacDeMer.tsx'),
    route('taxi-bages', './pages/geo/Bages.tsx'),
    route('taxi-carcassonne', './pages/geo/Carcassonne.tsx'),
    route('taxi-beziers-cap-dagde', './pages/geo/BeziersCapDAgde.tsx'),
    route('taxi-narbonne-barcelone', './pages/geo/NarbonneBarcelone.tsx'),
    route('taxi-coursan', './pages/geo/Coursan.tsx'),
    route('taxi-vsl-narbonne', './pages/geo/VSLNarbonne.tsx'),
    route('taxi-reserve-africaine-sigean', './pages/geo/ReserveAfricaine.tsx'),
    route('taxi-argeliers', './pages/geo/Argeliers.tsx'),
    route('taxi-ginestas', './pages/geo/Ginestas.tsx'),
    route('taxi-bize-minervois', './pages/geo/BizeMinervois.tsx'),
    route('taxi-cuxac-daude', './pages/geo/CuxacDAude.tsx'),
    route('taxi-vinassan', './pages/geo/Vinassan.tsx'),
    route('taxi-armissan', './pages/geo/Armissan.tsx'),
    route('taxi-le-somail', './pages/geo/LeSomail.tsx'),

    route('*', './pages/NotFound.tsx'),
  ]),
] satisfies RouteConfig
