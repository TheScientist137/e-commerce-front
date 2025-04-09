import { BrowserRouter, Routes, Route } from "react-router";
import { ShopContextProvider } from "./context/ShopContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import Dashboard from "./components/Dashboard.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import ShopPage from "./pages/ShopPage.tsx";
import SelectedProductPage from './pages/SelectedProductPage.tsx';
import ShoppingCartPage from "./pages/ShoppingCartPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import AdminPanelPage from "./pages/AdminPanelPage.tsx"
import ProtectedRoute from "./components/ProtectedRoute.tsx";

export default function App() {
  return (
    <AuthProvider>
      <ShopContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Dashboard />}>
              {/* Shop Routes */}
              <Route index element={<ShopPage />} />
              <Route path="product" element={<SelectedProductPage />} />
              <Route path="cart" element={<ShoppingCartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />

              {/* Authentication Routes */}
              <Route path="signup" element={<SignupPage />} />
              <Route path="login" element={<LoginPage />} />

              {/* Admin Route -- Create and implement ProtectedRoute */}
              <Route element={<ProtectedRoute />}>
                <Route path="admin" element={<AdminPanelPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ShopContextProvider>
    </AuthProvider>
  )
}


