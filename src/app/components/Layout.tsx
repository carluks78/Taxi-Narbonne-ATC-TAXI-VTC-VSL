import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingWidgets } from "./FloatingWidgets";

export default function Layout() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#060F1E" }}
    >
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
