import { BrowserRouter, Routes, Route } from "react-router";
import { GlobalContextProvider } from "./context/GlobalContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ShopPage from "./pages/ShopPage";
import TelescopePage from "./pages/TelescopePage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import Dashboard from "./components/Dashboard";

// Update router!!!! => react-router v7

export default function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          {/* Authentication Routes */}
          <Route index element={<Signup />} />
          <Route path="login" element={<Login />} />

          {/* Shop Dasboard Routes */}
          <Route element={<Dashboard />}>
            <Route path="telescopes" element={<ShopPage />} />
            <Route path="telescope/:id" element={<TelescopePage />} />
            <Route path="cart" element={<ShoppingCartPage />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </GlobalContextProvider>
  )
}


