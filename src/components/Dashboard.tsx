import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 w-full bg-gray-400 p-4">
        <Navbar />
      </header>
      <main className="flex-grow px-4 mt-[60px]">
        <Outlet />
      </main>
      <footer className="bg-gray-400 p-4">
        <Footer />
      </footer>
    </div>
  );
}
