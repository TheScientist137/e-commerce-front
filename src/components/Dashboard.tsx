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
  const {
    isMenuOpen,
    isLoginModalOpen,
    isSignUpModalOpen,
    isFiltersMenuOpen,
    isSortMenuOpen,
  } = useUiStore();

  // Effect to initialize data from storage/API
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
  }, []);

  // Effect to block body scroll effect when menus are open
  useEffect(() => {
    if (
      isMenuOpen ||
      isLoginModalOpen ||
      isSignUpModalOpen ||
      isFiltersMenuOpen ||
      isSortMenuOpen
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Limpieza del efecto
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [
    isMenuOpen,
    isLoginModalOpen,
    isSignUpModalOpen,
    isFiltersMenuOpen,
    isSortMenuOpen,
  ]);

  // No render anything until data is iniatialized
  if (!initialized) return null;
  return (
    <div className="flex h-screen flex-col text-slate-800 dark:text-indigo-50">
      <header className="fixed flex items-center justify-between top-0 z-30 h-[60px] w-full bg-slate-200 p-4 dark:bg-gray-900 md:h-[70px] md:px-6 lg:h-[80px] lg:px-8">
        <Navbar />
      </header>

      <CategoriesMenu />

      <main className="font-space mt-[60px] flex-grow bg-white p-4 dark:bg-gray-950 md:mt-[70px] md:p-6 lg:mt-[80px] lg:p-8 xl:px-12">
        <Outlet />
      </main>

      <footer className="flex items-center justify-between bg-slate-200 px-4 py-4 dark:bg-gray-900 md:px-6 md:py-5 lg:px-8 lg:py-6">
        <Footer />
      </footer>
    </div>
  );
}
