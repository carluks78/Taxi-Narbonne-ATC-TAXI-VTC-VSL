import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  route('/', './src/app/root.tsx', [

    index('./src/app/pages/Home.tsx'),

    route('services', './src/app/pages/Services.tsx'),
    route('contact', './src/app/pages/Contact.tsx'),
    route('zones-desservies', './src/app/pages/ZonesDesservies.tsx'),
    route('avis-clients', './src/app/pages/AvisClients.tsx'),

    route('taxi-narbonne', './src/app/pages/TaxiNarbonne.tsx'),
    route('reserver-taxi-narbonne', './src/app/pages/Reservation.tsx'),

    // GARE (IMPORTANT: 1 fichier = 1 route conseillé)
    route('taxi-gare-narbonne', './src/app/pages/TaxiGare.tsx'),

    // AÉROPORTS
    route('taxi-aeroport/:slug', './src/app/pages/AirportPage.tsx'),

    // GEO
    route('taxi-gruissan', './src/app/pages/GeoPage.tsx', {
  id: 'geo-gruissan',
}),
route('taxi-leucate', './src/app/pages/GeoPage.tsx', {
  id: 'geo-leucate',
}),
route('taxi-sigean', './src/app/pages/GeoPage.tsx', {
  id: 'geo-sigean',
}),
route('taxi-port-la-nouvelle', './src/app/pages/GeoPage.tsx', {
  id: 'geo-port-la-nouvelle',
}),
route('taxi-narbonne-plage', './src/app/pages/GeoPage.tsx', {
  id: 'geo-narbonne-plage',
}),
route('taxi-carcassonne', './src/app/pages/GeoPage.tsx', {
  id: 'geo-carcassonne',
}),
route('taxi-beziers-cap-dagde', './src/app/pages/GeoPage.tsx', {
  id: 'geo-beziers',
}),
route('taxi-narbonne-barcelone', './src/app/pages/GeoPage.tsx', {
  id: 'geo-barcelone',
}),
route('taxi-coursan', './src/app/pages/GeoPage.tsx', {
  id: 'geo-coursan',
}),

    route('*', './src/app/pages/NotFound.tsx'),
  ]),
] satisfies RouteConfig
