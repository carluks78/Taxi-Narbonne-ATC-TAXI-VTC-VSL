import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("/", "./src/app/root.tsx", [
    index("./src/app/pages/Home.tsx"),

    route("services", "./src/app/pages/Services.tsx"),
    route("contact", "./src/app/pages/Contact.tsx"),
    route("zones-desservies", "./src/app/pages/ZonesDesservies.tsx"),
    route("avis-clients", "./src/app/pages/AvisClients.tsx"),

    route("taxi-narbonne", "./src/app/pages/TaxiNarbonne.tsx"),
    route("reserver-taxi-narbonne", "./src/app/pages/Reservation.tsx"),

    route("taxi-gare/:slug", "./src/app/pages/TaxiGare.tsx"),

    route("taxi-aeroport-montpellier", "./src/app/pages/AirportPage.tsx"),
    route("taxi-aeroport-toulouse", "./src/app/pages/AirportPage.tsx"),
    route("taxi-aeroport-carcassonne", "./src/app/pages/AirportPage.tsx"),
    route("taxi-aeroport-beziers", "./src/app/pages/AirportPage.tsx"),
    route("taxi-aeroport-barcelone", "./src/app/pages/AirportPage.tsx"),

    route("taxi-gruissan", "./src/app/pages/GeoPage.tsx"),
    route("taxi-leucate", "./src/app/pages/GeoPage.tsx"),
    route("taxi-sigean", "./src/app/pages/GeoPage.tsx"),
    route("taxi-port-la-nouvelle", "./src/app/pages/GeoPage.tsx"),
    route("taxi-narbonne-plage", "./src/app/pages/GeoPage.tsx"),
    route("taxi-peyriac-de-mer", "./src/app/pages/GeoPage.tsx"),
    route("taxi-bages", "./src/app/pages/GeoPage.tsx"),
    route("taxi-carcassonne", "./src/app/pages/GeoPage.tsx"),
    route("taxi-beziers-cap-dagde", "./src/app/pages/GeoPage.tsx"),
    route("taxi-narbonne-barcelone", "./src/app/pages/GeoPage.tsx"),
    route("taxi-coursan", "./src/app/pages/GeoPage.tsx"),
    route("taxi-vsl-narbonne", "./src/app/pages/GeoPage.tsx"),
    route("taxi-reserve-africaine-sigean", "./src/app/pages/GeoPage.tsx"),
    route("taxi-argeliers", "./src/app/pages/GeoPage.tsx"),
    route("taxi-ginestas", "./src/app/pages/GeoPage.tsx"),
    route("taxi-bize-minervois", "./src/app/pages/GeoPage.tsx"),
    route("taxi-cuxac-daude", "./src/app/pages/GeoPage.tsx"),
    route("taxi-vinassan", "./src/app/pages/GeoPage.tsx"),
    route("taxi-armissan", "./src/app/pages/GeoPage.tsx"),
    route("taxi-le-somail", "./src/app/pages/GeoPage.tsx"),

    route("*", "./src/app/pages/NotFound.tsx"),
  ]),
] satisfies RouteConfig;
