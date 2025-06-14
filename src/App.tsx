import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext.tsx";
import { useUiStore } from "./stores/uiStore.ts";

import Dashboard from "./components/Dashboard.tsx";
import HomePage from "./pages/HomePage.tsx";
import ShopPage from "./pages/ShopPage.tsx";
import SelectedProductPage from "./pages/SelectedProductPage.tsx";
import ShoppingCartPage from "./pages/ShoppingCartPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import AdminPanelPage from "./pages/AdminPanelPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

import AccountModal from "./components/AccountModal.tsx";
import LoginForm from "./components/LoginForm.tsx";
import SignupForm from "./components/SignupForm.tsx";

export default function App() {
  const {
    isLoginModalOpen,
    isSignUpModalOpen,
    setIsLoginModalOpen,
    setIsSignupModalOpen,
  } = useUiStore();

  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Login Modal */}
        <AccountModal
          title="Login"
          isOpen={isLoginModalOpen}
          onclose={() => setIsLoginModalOpen(false)}
        >
          <LoginForm />
        </AccountModal>
        {/* Signup Modal */}
        <AccountModal
          title="Signup"
          isOpen={isSignUpModalOpen}
          onclose={() => setIsSignupModalOpen(false)}
        >
          <SignupForm />
        </AccountModal>

        <Routes>
          <Route element={<Dashboard />}>
            {/* Home Page */}
            <Route index element={<HomePage />} />
            {/* Shop Routes */}
            <Route path="shop" element={<ShopPage />} />
            <Route path="product/:type/:id" element={<SelectedProductPage />} />
            <Route path="cart" element={<ShoppingCartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />

            {/* Admin Route -- Create and implement ProtectedRoute */}
            <Route element={<ProtectedRoute />}>
              <Route path="admin" element={<AdminPanelPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
