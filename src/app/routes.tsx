import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { ZonesDesservies } from './pages/ZonesDesservies';
import { AvisClients } from './pages/AvisClients';
import { TaxiNarbonne } from './pages/TaxiNarbonne';
import { TaxiGare } from './pages/TaxiGare';
import { GeoPage } from './pages/GeoPage';
import { AirportPage } from './pages/AirportPage';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      // ── Pages principales ──
      { index: true, Component: Home },
      { path: 'services', Component: Services },
      { path: 'contact', Component: Contact },
      { path: 'zones-desservies', Component: ZonesDesservies },
      { path: 'avis-clients', Component: AvisClients },
      { path: 'taxi-narbonne', Component: TaxiNarbonne },

      // ── Pages Gare ──
      { path: 'taxi-gare-narbonne', Component: TaxiGare },
      { path: 'taxi-gare-de-narbonne', Component: TaxiGare },
      { path: 'taxi-narbonne-reservation-24h-gare-aeroport', Component: TaxiGare },

      // ── Pages Aéroports (routes explicites) ──
      { path: 'taxi-aeroport-montpellier', Component: AirportPage },
      { path: 'taxi-aeroport-toulouse', Component: AirportPage },
      { path: 'taxi-aeroport-carcassonne', Component: AirportPage },
      { path: 'taxi-aeroport-beziers', Component: AirportPage },
      { path: 'taxi-aeroport-barcelone', Component: AirportPage },

      // ── Pages Zones Desservies (routes explicites) ──
      { path: 'taxi-gruissan', Component: GeoPage },
      { path: 'taxi-leucate', Component: GeoPage },
      { path: 'taxi-sigean', Component: GeoPage },
      { path: 'taxi-port-la-nouvelle', Component: GeoPage },
      { path: 'taxi-narbonne-plage', Component: GeoPage },
      { path: 'taxi-peyriac-de-mer', Component: GeoPage },
      { path: 'taxi-bages', Component: GeoPage },
      { path: 'taxi-carcassonne', Component: GeoPage },
      { path: 'taxi-beziers-cap-dagde', Component: GeoPage },
      { path: 'taxi-narbonne-barcelone', Component: GeoPage },
      { path: 'taxi-coursan', Component: GeoPage },
      { path: 'taxi-vsl-narbonne', Component: GeoPage },
      { path: 'taxi-reserve-africaine-sigean', Component: GeoPage },
      { path: 'taxi-argeliers', Component: GeoPage },
      { path: 'taxi-ginestas', Component: GeoPage },
      { path: 'taxi-bize-minervois', Component: GeoPage },
      { path: 'taxi-cuxac-daude', Component: GeoPage },
      { path: 'taxi-vinassan', Component: GeoPage },
      { path: 'taxi-armissan', Component: GeoPage },
      { path: 'taxi-le-somail', Component: GeoPage },

      // ── Fallback ──
      { path: '*', Component: NotFound },
    ],
  },
]);
