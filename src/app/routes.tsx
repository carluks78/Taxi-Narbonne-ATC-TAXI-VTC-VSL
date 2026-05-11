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
      { index: true, Component: Home },
      { path: 'services', Component: Services },
      { path: 'contact', Component: Contact },
      { path: 'zones-desservies', Component: ZonesDesservies },
      { path: 'avis-clients', Component: AvisClients },
      { path: 'taxi-narbonne', Component: TaxiNarbonne },
      { path: 'taxi-gare-narbonne', Component: TaxiGare },
      { path: 'taxi-gare-de-narbonne', Component: TaxiGare },
      { path: 'taxi-narbonne-reservation-24h-gare-aeroport', Component: TaxiGare },
      { path: 'taxi-aeroport-:slug', Component: AirportPage },
      { path: 'taxi-:slug', Component: GeoPage },
      { path: '*', Component: NotFound },
    ],
  },
]);
