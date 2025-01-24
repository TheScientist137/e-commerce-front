import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ShopPage from "./pages/ShopPage";
import TelescopePage from "./pages/TelescopePage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ¿¿¿ Create Index Route ??? */}
          <Route index element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="shop" element={<ProtectedRoute />}>
            <Route path="telescopes" element={<ShopPage />} />
            <Route path="telescope/:id" element={<TelescopePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}


