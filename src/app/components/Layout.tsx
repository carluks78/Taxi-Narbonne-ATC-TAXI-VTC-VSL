import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingWidgets } from "./FloatingWidgets";

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#060F1E" }}>
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
