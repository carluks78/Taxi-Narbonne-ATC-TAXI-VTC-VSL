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

    // 🚖 GARE
    route('taxi-gare-narbonne', './pages/gare/Narbonne.tsx'),
    route('taxi-gare-de-narbonne', './pages/gare/NarbonneDe.tsx'),

    // ✈️ AÉROPORTS
    route('taxi-aeroport-montpellier', './pages/aeroport/Montpellier.tsx'),
    route('taxi-aeroport-toulouse', './pages/aeroport/Toulouse.tsx'),
    route('taxi-aeroport-carcassonne', './pages/aeroport/Carcassonne.tsx'),
    route('taxi-aeroport-beziers', './pages/aeroport/Beziers.tsx'),
    route('taxi-aeroport-barcelone', './pages/aeroport/Barcelone.tsx'),

    // 📍 ZONES
    route('taxi-gruissan', './pages/geo/Gruissan.tsx'),
    route('taxi-leucate', './pages/geo/Leucate.tsx'),
    route('taxi-sigean', './pages/geo/Sigean.tsx'),
    route('taxi-narbonne-plage', './pages/geo/NarbonnePlage.tsx'),
    route('taxi-bages', './pages/geo/Bages.tsx'),
    route('taxi-vinassan', './pages/geo/Vinassan.tsx'),
    route('taxi-carcassonne', './pages/geo/Carcassonne.tsx'),

    route('*', './pages/NotFound.tsx'),
  ]),
] satisfies RouteConfig
