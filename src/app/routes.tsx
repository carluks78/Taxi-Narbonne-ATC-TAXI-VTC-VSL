import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("", "./routes/_layout.tsx", [
    index("./pages/Home.tsx"),

    route("services", "./pages/Services.tsx"),
    route("contact", "./pages/Contact.tsx"),
    route("zones-desservies", "./pages/ZonesDesservies.tsx"),
    route("avis-clients", "./pages/AvisClients.tsx"),

    route("taxi-narbonne", "./pages/TaxiNarbonne.tsx"),

    // Taxi gare + alias
    route("taxi-gare-narbonne", "./pages/TaxiGare.tsx"),
    route("taxi-gare-de-narbonne", "./pages/TaxiGare.tsx", { id: "taxi-gare-de-narbonne" }),
    route("taxi-narbonne-reservation-24h-gare-aeroport", "./pages/TaxiGare.tsx", { id: "taxi-gare-reservation" }),

    route("reserver-taxi-narbonne", "./pages/Reservation.tsx"),

    // ✅ ROUTE DYNAMIQUE (IMPORTANT)
    route("taxi/:city", "./pages/GeoPage.tsx"),

    route("*", "./pages/NotFound.tsx"),
  ]),
] satisfies RouteConfig;
