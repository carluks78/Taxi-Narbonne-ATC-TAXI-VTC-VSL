import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  route('/', './src/app/components/Layout.tsx', [

    // ── Pages principales ──
    index('./src/app/pages/Home.tsx'),
    route('services',                './src/app/pages/Services.tsx'),
    route('contact',                 './src/app/pages/Contact.tsx'),
    route('zones-desservies',        './src/app/pages/ZonesDesservies.tsx'),
    route('avis-clients',            './src/app/pages/AvisClients.tsx'),
    route('taxi-narbonne',           './src/app/pages/TaxiNarbonne.tsx'),
    route('reserver-taxi-narbonne',  './src/app/pages/Reservation.tsx'),

    // ── Pages Gare ──
route('taxi-gare-narbonne',                          './src/app/pages/TaxiGare.tsx'),
route('taxi-gare-de-narbonne',                       './src/app/pages/TaxiGare.tsx', { id: 'taxi-gare-de-narbonne' }),
route('taxi-narbonne-reservation-24h-gare-aeroport', './src/app/pages/TaxiGare.tsx', { id: 'taxi-gare-reservation' }),

// ── Pages Aéroports ──
route('taxi-aeroport-montpellier',  './src/app/pages/AirportPage.tsx'),
route('taxi-aeroport-toulouse',     './src/app/pages/AirportPage.tsx', { id: 'airport-toulouse' }),
route('taxi-aeroport-carcassonne',  './src/app/pages/AirportPage.tsx', { id: 'airport-carcassonne' }),
route('taxi-aeroport-beziers',      './src/app/pages/AirportPage.tsx', { id: 'airport-beziers' }),
route('taxi-aeroport-barcelone',    './src/app/pages/AirportPage.tsx', { id: 'airport-barcelone' }),

// ── Pages Zones Desservies ──
route('taxi-gruissan',                 './src/app/pages/GeoPage.tsx'),
route('taxi-leucate',                  './src/app/pages/GeoPage.tsx', { id: 'geo-leucate' }),
route('taxi-sigean',                   './src/app/pages/GeoPage.tsx', { id: 'geo-sigean' }),
route('taxi-port-la-nouvelle',         './src/app/pages/GeoPage.tsx', { id: 'geo-port-la-nouvelle' }),
route('taxi-narbonne-plage',           './src/app/pages/GeoPage.tsx', { id: 'geo-narbonne-plage' }),
route('taxi-peyriac-de-mer',           './src/app/pages/GeoPage.tsx', { id: 'geo-peyriac-de-mer' }),
route('taxi-bages',                    './src/app/pages/GeoPage.tsx', { id: 'geo-bages' }),
route('taxi-carcassonne',              './src/app/pages/GeoPage.tsx', { id: 'geo-carcassonne' }),
route('taxi-beziers-cap-dagde',        './src/app/pages/GeoPage.tsx', { id: 'geo-beziers' }),
route('taxi-narbonne-barcelone',       './src/app/pages/GeoPage.tsx', { id: 'geo-barcelone' }),
route('taxi-coursan',                  './src/app/pages/GeoPage.tsx', { id: 'geo-coursan' }),
route('taxi-vsl-narbonne',             './src/app/pages/GeoPage.tsx', { id: 'geo-vsl' }),
route('taxi-reserve-africaine-sigean', './src/app/pages/GeoPage.tsx', { id: 'geo-reserve' }),
route('taxi-argeliers',                './src/app/pages/GeoPage.tsx', { id: 'geo-argeliers' }),
route('taxi-ginestas',                 './src/app/pages/GeoPage.tsx', { id: 'geo-ginestas' }),
route('taxi-bize-minervois',           './src/app/pages/GeoPage.tsx', { id: 'geo-bize' }),
route('taxi-cuxac-daude',              './src/app/pages/GeoPage.tsx', { id: 'geo-cuxac' }),
route('taxi-vinassan',                 './src/app/pages/GeoPage.tsx', { id: 'geo-vinassan' }),
route('taxi-armissan',                 './src/app/pages/GeoPage.tsx', { id: 'geo-armissan' }),
route('taxi-le-somail',                './src/app/pages/GeoPage.tsx', { id: 'geo-somail' }),

    // ── Fallback 404 ──
    route('*', './src/app/pages/NotFound.tsx'),
  ]),
] satisfies RouteConfig
