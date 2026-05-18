import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingWidgets } from "../components/FloatingWidgets";

export default function Layout() {
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
