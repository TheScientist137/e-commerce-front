import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CategoriesMenu from "./CategoriesMenu";
import FiltersMenu from "./FiltersMenu";

export default function Dashboard() {

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 w-full bg-gray-400 p-4">
        <Navbar />
      </header>

      <CategoriesMenu />
      <FiltersMenu />

      <main className="mt-[60px] flex-grow px-4">
        <Outlet />
      </main>
      <footer className="bg-gray-400 p-4">
        <Footer />
      </footer>
    </div>
  );
}
