import { Outlet, Link } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Dashboard() {

 return (
  <main className="dashboard">
   <h1><Link to='/'>TelescopEcommerce</Link></h1>
   <Navbar />
   <Outlet />
   <Footer />
  </main>
 )
}