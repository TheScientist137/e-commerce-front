import { BrowserRouter, Routes, Route } from "react-router";
import { GlobalContextProvider } from "./context/GlobalContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ShopPage from "./pages/ShopPage";
import TelescopePage from "./pages/TelescopePage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import Dashboard from "./components/Dashboard";
import CheckoutPage from "./pages/CheckoutPage";
// import ProtectedRoute from "./components/ProtectedRoute";

// Update router!!!! => react-router v7 --  see documentation

export default function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          {/* Authentication Routes */}
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />

          {/* Shop Dasboard Routes -- Crear Protected Routes */}
          <Route element={<Dashboard />}>
            <Route index element={<ShopPage />} />
            <Route path="telescope" element={<TelescopePage />} />
            <Route path="cart" element={<ShoppingCartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  )
}


