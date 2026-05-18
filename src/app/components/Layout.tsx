import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingWidgets } from "./FloatingWidgets";

export function Layout() {
  const { pathname } = useLocation();

  // 🔥 toujours remonter en haut quand tu changes de page
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [pathname]);

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
