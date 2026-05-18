import { Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      {/* HEADER */}
      <header>Ton header ici</header>

      <Outlet />

      {/* FOOTER */}
      <footer>Ton footer ici</footer>
    </>
  );
}
