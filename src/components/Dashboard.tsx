import { Outlet, Link } from "react-router";
import { useShopContext } from "../hooks/useContext.ts";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Dashboard() {
  const { filterProducts } = useShopContext();

  return (
    <main className="dashboard">
      <h1>
        <Link to="/" onClick={() => filterProducts("products")}>
          TelescopEcommerce
        </Link>
      </h1>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
