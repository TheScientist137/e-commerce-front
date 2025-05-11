import { Outlet } from "react-router";
import { useShopContext } from "../hooks/useContext.ts";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Dashboard() {

  return (
    <main className="dashboard">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
