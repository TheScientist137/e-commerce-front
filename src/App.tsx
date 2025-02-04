import { BrowserRouter, Routes, Route } from "react-router";
import { GlobalContextProvider } from "./context/GlobalContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ShopPage from "./pages/ShopPage";
import TelescopePage from "./pages/TelescopePage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>

        <Routes>
          {/* Authentication Routes */}
          <Route index element={<Signup />} />
          <Route path="login" element={<Login />} />

          {/* Shop Dasboard Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Dashboard />}>
              <Route path="telescopes" element={<ShopPage />} />
              <Route path="telescope/:id" element={<TelescopePage />} />
              <Route path="cart" element={<ShoppingCartPage />} />
            </Route>
          </Route>
        </Routes>
        
      </BrowserRouter>
    </GlobalContextProvider>
  )
}


