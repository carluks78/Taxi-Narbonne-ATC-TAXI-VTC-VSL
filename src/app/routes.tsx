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

    route('taxi-gare-narbonne', './pages/TaxiGare.tsx')

    route('taxi-aeroport-montpellier', './pages/AirportPage.tsx'),
    route('taxi-aeroport-toulouse', './pages/AirportPage.tsx'),
    route('taxi-aeroport-carcassonne', './pages/AirportPage.tsx'),
    route('taxi-aeroport-beziers', './pages/AirportPage.tsx'),
    route('taxi-aeroport-barcelone', './pages/AirportPage.tsx'),

    route('taxi-gruissan', './pages/GeoPage.tsx'),
    route('taxi-leucate', './pages/GeoPage.tsx'),
    route('taxi-sigean', './pages/GeoPage.tsx'),
    route('taxi-port-la-nouvelle', './pages/GeoPage.tsx'),
    route('taxi-narbonne-plage', './pages/GeoPage.tsx'),
    route('taxi-peyriac-de-mer', './pages/GeoPage.tsx'),
    route('taxi-bages', './pages/GeoPage.tsx'),
    route('taxi-carcassonne', './pages/GeoPage.tsx'),
    route('taxi-beziers-cap-dagde', './pages/GeoPage.tsx'),
    route('taxi-narbonne-barcelone', './pages/GeoPage.tsx'),
    route('taxi-coursan', './pages/GeoPage.tsx'),
    route('taxi-vsl-narbonne', './pages/GeoPage.tsx'),
    route('taxi-reserve-africaine-sigean', './pages/GeoPage.tsx'),
    route('taxi-argeliers', './pages/GeoPage.tsx'),
    route('taxi-ginestas', './pages/GeoPage.tsx'),
    route('taxi-bize-minervois', './pages/GeoPage.tsx'),
    route('taxi-cuxac-daude', './pages/GeoPage.tsx'),
    route('taxi-vinassan', './pages/GeoPage.tsx'),
    route('taxi-armissan', './pages/GeoPage.tsx'),
    route('taxi-le-somail', './pages/GeoPage.tsx'),

    route('*', './pages/NotFound.tsx'),
  ]),
] satisfies RouteConfig
