import { useState, useEffect } from "react";
import { Outlet } from "react-router";

import {
  FilterItemsSubCategoryType,
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
import FiltersMenu from "./FiltersMenu";

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
    fetchProducts,
    filterProductsByCategory,
    filterProductsBySubCategory,
  } = useProductsStore();
  const { cartItems } = useCartStore();
  const { isMenuOpen } = useUiStore();

  const getSavedDataFromLocalStorage = () => ({
    savedProducts: getItemLocalStorage<ProductType[]>("products"),
    savedTelescopes: getItemLocalStorage<TelescopeType[]>("telescopes"),
    savedMounts: getItemLocalStorage<MountType[]>("mounts"),
    savedEyepieces: getItemLocalStorage<EyepieceType[]>("eyepieces"),
    savedFilters: getItemLocalStorage<FilterType[]>("filters"),
  });

  useEffect(() => {
    const {
      savedProducts,
      savedTelescopes,
      savedMounts,
      savedEyepieces,
      savedFilters,
    } = getSavedDataFromLocalStorage();

    const savedCategory: string | null = getItemSessionStorage("category");
    const savedProductFilters: FilterItemsSubCategoryType | null =
      getItemSessionStorage("productFilters");

    if (
      // Set saved products
      savedProducts &&
      savedTelescopes &&
      savedMounts &&
      savedEyepieces &&
      savedFilters
    ) {
      setProducts(savedProducts);
      setTelescopes(savedTelescopes);
      setMounts(savedMounts);
      setEyepieces(savedEyepieces);
      setFilters(savedFilters);

      // If saved category filter products by category????????
      // ¿Seguir utilizando categoria products y mostrar todos los productos??????'
      filterProductsByCategory(savedCategory || "products");

      // Manage saved product filters
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
    } else {
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

  // Effect to block body scroll effect when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Limpieza del efecto
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // No render anything until data is iniatialized
  if (!initialized) return null;
  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 w-full bg-gray-400 p-4">
        <Navbar />
      </header>

      <CategoriesMenu />
      <FiltersMenu />

      <main className="mt-[60px] flex-grow px-4">
        <Outlet />
      </main>
      <footer className="bg-gray-400 p-4">
        <Footer />
      </footer>
    </div>
  );
}
