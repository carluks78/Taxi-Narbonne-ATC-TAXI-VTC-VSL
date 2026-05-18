import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  route('/', './pages/_layout.tsx', [

    index('./pages/Home.tsx'),
    route('services',                './pages/Services.tsx'),
    route('contact',                 './pages/Contact.tsx'),
    route('zones-desservies',        './pages/ZonesDesservies.tsx'),
    route('avis-clients',            './pages/AvisClients.tsx'),
    route('taxi-narbonne',           './pages/TaxiNarbonne.tsx'),
    route('reserver-taxi-narbonne',  './pages/Reservation.tsx'),

    route('taxi-gare-narbonne',                          './pages/TaxiGare.tsx'),
    route('taxi-gare-de-narbonne',                       './pages/TaxiGare.tsx', { id: 'taxi-gare-de-narbonne' }),
    route('taxi-narbonne-reservation-24h-gare-aeroport', './pages/TaxiGare.tsx', { id: 'taxi-gare-reservation' }),

    route('taxi-aeroport-montpellier',  './pages/AirportPage.tsx'),
    route('taxi-aeroport-toulouse',     './pages/AirportPage.tsx', { id: 'airport-toulouse' }),
    route('taxi-aeroport-carcassonne',  './pages/AirportPage.tsx', { id: 'airport-carcassonne' }),
    route('taxi-aeroport-beziers',      './pages/AirportPage.tsx', { id: 'airport-beziers' }),
    route('taxi-aeroport-barcelone',    './pages/AirportPage.tsx', { id: 'airport-barcelone' }),

    route('taxi-gruissan',                 './pages/GeoPage.tsx'),
    route('taxi-leucate',                  './pages/GeoPage.tsx', { id: 'geo-leucate' }),
    route('taxi-sigean',                   './pages/GeoPage.tsx', { id: 'geo-sigean' }),
    route('taxi-port-la-nouvelle',         './pages/GeoPage.tsx', { id: 'geo-port-la-nouvelle' }),
    route('taxi-narbonne-plage',           './pages/GeoPage.tsx', { id: 'geo-narbonne-plage' }),
    route('taxi-peyriac-de-mer',           './pages/GeoPage.tsx', { id: 'geo-peyriac-de-mer' }),
    route('taxi-bages',                    './pages/GeoPage.tsx', { id: 'geo-bages' }),
    route('taxi-carcassonne',              './pages/GeoPage.tsx', { id: 'geo-carcassonne' }),
    route('taxi-beziers-cap-dagde',        './pages/GeoPage.tsx', { id: 'geo-beziers' }),
    route('taxi-narbonne-barcelone',       './pages/GeoPage.tsx', { id: 'geo-barcelone' }),
    route('taxi-coursan',                  './pages/GeoPage.tsx', { id: 'geo-coursan' }),
    route('taxi-vsl-narbonne',             './pages/GeoPage.tsx', { id: 'geo-vsl' }),
    route('taxi-reserve-africaine-sigean', './pages/GeoPage.tsx', { id: 'geo-reserve' }),
    route('taxi-argeliers',                './pages/GeoPage.tsx', { id: 'geo-argeliers' }),
    route('taxi-ginestas',                 './pages/GeoPage.tsx', { id: 'geo-ginestas' }),
    route('taxi-bize-minervois',           './pages/GeoPage.tsx', { id: 'geo-bize' }),
    route('taxi-cuxac-daude',              './pages/GeoPage.tsx', { id: 'geo-cuxac' }),
    route('taxi-vinassan',                 './pages/GeoPage.tsx', { id: 'geo-vinassan' }),
    route('taxi-armissan',                 './pages/GeoPage.tsx', { id: 'geo-armissan' }),
    route('taxi-le-somail',                './pages/GeoPage.tsx', { id: 'geo-somail' }),

    route('*', './pages/NotFound.tsx'),
  ]),
] satisfies RouteConfig
