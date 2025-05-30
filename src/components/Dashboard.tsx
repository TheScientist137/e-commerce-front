import { useState, useEffect } from "react";
import { Outlet } from "react-router";

import {
  FilterItemsSubCategoryType,
  SubFiltersType,
  useProductsStore,
} from "../stores/productsStore";
import { useCartStore } from "../stores/cartStore";
import { useUiStore } from "../stores/uiStore";

import {
  getItemLocalStorage,
  removeItemLocalStorage,
  setItemLocalStorage,
} from "../utils/localStorage";
import { getItemSessionStorage } from "../utils/sessionStorage";

import Navbar from "./Navbar";
import Footer from "./Footer";
import CategoriesMenu from "./CategoriesMenu";

import {
  ProductType,
  TelescopeType,
  MountType,
  EyepieceType,
  FilterType,
} from "../types/types";

export default function Dashboard() {
  const [initialized, setInitialized] = useState<boolean>(false);
  const {
    setProducts,
    setTelescopes,
    setMounts,
    setEyepieces,
    setFilters,
    setSubFilters,
    setSelectedCategory,
    setSortBy,
    fetchProducts,
    filterProductsByCategory,
    filterProductsBySubCategory,
    sortFilteredProducts,
  } = useProductsStore();
  const { cartItems } = useCartStore();
  const {
    isMenuOpen,
    isFiltersMenuOpen,
    isSortMenuOpen,
    isLoginModalOpen,
    isSignUpModalOpen,
  } = useUiStore();

  const getSavedDataFromLocalStorage = () => ({
    savedProducts: getItemLocalStorage<ProductType[]>("products"),
    savedTelescopes: getItemLocalStorage<TelescopeType[]>("telescopes"),
    savedMounts: getItemLocalStorage<MountType[]>("mounts"),
    savedEyepieces: getItemLocalStorage<EyepieceType[]>("eyepieces"),
    savedFilters: getItemLocalStorage<FilterType[]>("filters"),
    savedSubFilters: getItemLocalStorage<SubFiltersType[]>("subFilters"),
  });

  // Load data API or Local and Session Storage
  useEffect(() => {
    const {
      savedProducts,
      savedTelescopes,
      savedMounts,
      savedEyepieces,
      savedFilters,
      savedSubFilters
    } = getSavedDataFromLocalStorage();

    const savedCategory: string | null = getItemSessionStorage("category");
    const savedProductFilters: FilterItemsSubCategoryType | null =
      getItemSessionStorage("productFilters");
    const savedSortBy: string | null = getItemSessionStorage("sortBy");

    if (
      // Set saved products
      savedProducts &&
      savedTelescopes &&
      savedMounts &&
      savedEyepieces &&
      savedFilters &&
      savedSubFilters
    ) {
      setProducts(savedProducts);
      setTelescopes(savedTelescopes);
      setMounts(savedMounts);
      setEyepieces(savedEyepieces);
      setFilters(savedFilters);
      setSubFilters(savedSubFilters);
      

      // If savedCategory set savedCategory and filter products by SavedCategory
      if (savedCategory) {
        setSelectedCategory(savedCategory);
        filterProductsByCategory(savedCategory);
      }

      // If savedProductFilters filter filteredProducts applying the saved filters values
      if (savedProductFilters) {
        if (savedCategory === "telescopes") {
          filterProductsBySubCategory("telescopes", savedProductFilters);
        } else if (savedCategory === "mounts") {
          filterProductsBySubCategory("mounts", savedProductFilters);
        } else if (savedCategory === "eyepieces") {
          filterProductsBySubCategory("eyepieces", savedProductFilters);
        } else if (savedCategory === "filters") {
          filterProductsBySubCategory("filters", savedProductFilters);
        }
      }

      // If savedSortBy sort filteredProducts applying saved sortBy value
      if (savedSortBy) {
        setSortBy(savedSortBy);
        sortFilteredProducts(savedSortBy);
      }
    } else {
      // If no saved products call API and fetch products
      fetchProducts();
    }

    setInitialized(true);
  }, []);

  // Save cart filtered to localStorage whenever they change
  // Remove filtered from localStorage when cart is empty
  useEffect(() => {
    if (cartItems.length > 0) {
      setItemLocalStorage("cartItems", cartItems);
    } else {
      removeItemLocalStorage("cartItems");
    }
  }, [cartItems]);

  // Effect to block body scroll effect when menus are open
  useEffect(() => {
    if (
      isMenuOpen ||
      isFiltersMenuOpen ||
      isSortMenuOpen ||
      isLoginModalOpen ||
      isSignUpModalOpen
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
    isFiltersMenuOpen,
    isSortMenuOpen,
    isLoginModalOpen,
    isSignUpModalOpen,
  ]);

  // No render anything until data is iniatialized
  if (!initialized) return null;
  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 w-full bg-gray-400 p-4">
        <Navbar />
      </header>

      <CategoriesMenu />

      <main className="mt-[60px] flex-grow px-4">
        <Outlet />
      </main>

      <footer className="bg-gray-400 p-4">
        <Footer />
      </footer>
    </div>
  );
}
