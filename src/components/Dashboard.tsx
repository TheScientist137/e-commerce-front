import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";

export default function Dashboard() {

 return (
  <div className="dashboard">
   <Navbar />
   <Outlet />
   <Footer />
  </div>
 )
}