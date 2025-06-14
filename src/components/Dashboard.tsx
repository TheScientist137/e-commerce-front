import { useState, useEffect } from "react";
import { Outlet } from "react-router";

import { useProductsStore } from "../stores/productsStore";
import { useUiStore } from "../stores/uiStore";

import Navbar from "./Navbar";
import Footer from "./Footer";
import CategoriesMenu from "./CategoriesMenu";

// SPA Initialization
// This component is responsible for initializing the application state
export default function Dashboard() {
  const [initialized, setInitialized] = useState<boolean>(false);
  const {
    products,
    telescopes,
    mounts,
    eyepieces,
    filters,
    fetchProducts,
    initializeFromStorage,
  } = useProductsStore();
  const { isMenuOpen, isLoginModalOpen, isSignUpModalOpen } = useUiStore();

  useEffect(() => {
    const initialize = async () => {
      if (
        products.length &&
        telescopes.length &&
        mounts.length &&
        eyepieces.length &&
        filters.length
      ) {
        initializeFromStorage();
        setInitialized(true);
      } else {
        await fetchProducts();
        initializeFromStorage();
        setInitialized(true);
      }
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Effect to block body scroll effect when menus are open
  useEffect(() => {
    if (isMenuOpen || isLoginModalOpen || isSignUpModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Limpieza del efecto
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, isLoginModalOpen, isSignUpModalOpen]);

  // No render anything until data is iniatialized
  if (!initialized) return null;
  return (
    <div className="flex h-screen flex-col text-slate-800 dark:text-indigo-50">
      <header className="fixed top-0 h-[60px] w-full bg-slate-200 p-4 dark:bg-gray-900">
        <Navbar />
      </header>

      <CategoriesMenu />

      <main className="mt-[60px] flex-grow bg-white p-4 dark:bg-gray-950 font-space">
        <Outlet />
      </main>

      <footer className="flex items-center justify-between bg-slate-200 px-4 py-4 dark:bg-gray-900">
        <Footer />
      </footer>
    </div>
  );
}
