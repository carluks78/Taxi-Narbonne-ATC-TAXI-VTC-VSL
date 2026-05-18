import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import "../styles/index.css";
import { Layout } from "./components/Layout";

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
        <Layout>
          <Outlet />
        </Layout>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
