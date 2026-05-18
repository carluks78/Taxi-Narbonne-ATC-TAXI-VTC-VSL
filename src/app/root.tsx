import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import "../styles/index.css";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FloatingWidgets } from "./components/FloatingWidgets";

export default function Root() {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>
        <Header />

        <main>
          <Outlet />
        </main>

        <FloatingWidgets />
        <Footer />

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
