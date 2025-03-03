import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";

export default function Dashboard() {

 return (
  <main className="dashboard">
   <Navbar />
   <Outlet />
   <Footer />
  </main>
 )
}