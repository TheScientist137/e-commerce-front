import Navbar from "./Navbar";
import { Outlet } from "react-router";

export default function Dashboard() {
 return (
  <>
   <Navbar />
   <Outlet />
  </>
 )
}