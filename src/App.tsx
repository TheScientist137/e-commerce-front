import { BrowserRouter, Routes, Route } from "react-router";
import { ShopContextProvider } from "./context/ShopContext";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ShopPage from "./pages/ShopPage";
import TelescopesPage from "./pages/TelescopesPage";
import MountsPage from "./pages/MountsPage";
import ProductPage from "./pages/ProductPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import Dashboard from "./components/Dashboard";
import CheckoutPage from "./pages/CheckoutPage";
import AdminPanelPage from "./pages/AdminPanelPage"

export default function App() {
  return (
    <AuthProvider>
      <ShopContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Dashboard />}>
              {/* Shop Routes */}
              <Route index element={<ShopPage />} />
              <Route path="telescopes" element={<TelescopesPage />} />
              <Route path="mounts" element={<MountsPage />} />
              <Route path="product" element={<ProductPage />} />
              <Route path="cart" element={<ShoppingCartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              {/* Authentication Routes */}
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
              {/* Admin Route */}
              <Route path="admin" element={<AdminPanelPage />}>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ShopContextProvider>
    </AuthProvider>
  )
}


