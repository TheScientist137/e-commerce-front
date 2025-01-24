import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ShopPage from "./pages/ShopPage";
import TelescopePage from "./pages/TelescopePage";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ¿¿¿ Create Index Route ??? */}
          <Route index element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Dashboard />}>
              <Route path="telescopes" element={<ShopPage />} />
              <Route path="telescope/:id" element={<TelescopePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}


