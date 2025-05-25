import { create } from "zustand";

import {
  getProductsService,
  getTelescopesService,
  getMountsService,
  getEyepiecesService,
  getFiltersService,
} from "../services/shopService.ts";

import {
  getItemSessionStorage,
  setItemSessionStorage,
} from "../utils/sessionStorage";
import {
  removeItemLocalStorage,
  setItemLocalStorage,
} from "../utils/localStorage.ts";

import {
  ProductType,
  TelescopeType,
  MountType,
  EyepieceType,
  FilterType,
} from "../types/types";

type FilterItemsType =
  | ProductType[]
  | TelescopeType[]
  | MountType[]
  | EyepieceType[]
  | FilterType[];

export type TelescopeFiltersType = {
  opticalDesign: string | null;
  mountType: string | null;
  brand: string | null;
};

type ProductsStateType = {
  products: ProductType[];
  telescopes: TelescopeType[];
  mounts: MountType[];
  eyepieces: EyepieceType[];
  filters: FilterType[];
  filteredProducts: FilterItemsType;
  selectedCategory: string | null;

  telescopeFilters: TelescopeFiltersType;

  setProducts: (products: ProductType[]) => void;
  setTelescopes: (telescopes: TelescopeType[]) => void;
  setMounts: (mounts: MountType[]) => void;
  setEyepieces: (eyepieces: EyepieceType[]) => void;
  setFilters: (filters: FilterType[]) => void;
  setFilteredProducts: (filteredProducts: FilterItemsType) => void;
  setSelectedCategory: (category: string | null) => void;

  setTelescopeFilters: (filters: TelescopeFiltersType) => void;

  fetchProducts: () => Promise<void>;
  filterProductsByCategory: (category: string) => void;
  filterTelescopesBySubCategory: (
    telescopeFilters: TelescopeFiltersType,
  ) => void;
};

const initialTelescopeFilters = {
  opticalDesign: null,
  mountType: null,
  brand: null,
};
const savedTelescopeFilters = getItemSessionStorage("telescopeFilters");

export const useProductsStore = create<ProductsStateType>((set, get) => ({
  // STATE
  products: [],
  telescopes: [],
  mounts: [],
  eyepieces: [],
  filters: [],
  filteredProducts: [],
  selectedCategory: "",
  telescopeFilters: initialTelescopeFilters,

  // STATE SETTERS
  setProducts: (products) => set({ products }),
  setTelescopes: (telescopes) => set({ telescopes }),
  setMounts: (mounts) => set({ mounts }),
  setEyepieces: (eyepieces) => set({ eyepieces }),
  setFilters: (filters) => set({ filters }),
  setFilteredProducts: (items) => set({ filteredProducts: items }),
  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
    setItemSessionStorage("category", category);
  },
  setTelescopeFilters: (filters) => {
    set({ telescopeFilters: filters });
    setItemSessionStorage("telescopeFilters", filters);
  },

  // FUNCTIONS
  fetchProducts: async () => {
    try {
      const productsData = await getProductsService();
      const telescopesData = await getTelescopesService();
      const mountsData = await getMountsService();
      const eyepiecesData = await getEyepiecesService();
      const filtersData = await getFiltersService();

      set({
        products: productsData,
        telescopes: telescopesData,
        mounts: mountsData,
        eyepieces: eyepiecesData,
        filters: filtersData,
        filteredProducts: productsData,
        selectedCategory: "products",
      });

      productsData.length > 0
        ? setItemLocalStorage("products", productsData)
        : removeItemLocalStorage("products");
      telescopesData.length > 0
        ? setItemLocalStorage("telescopes", telescopesData)
        : removeItemLocalStorage("telescopes");
      mountsData.length > 0
        ? setItemLocalStorage("mounts", mountsData)
        : removeItemLocalStorage("mounts");
      eyepiecesData.length > 0
        ? setItemLocalStorage("eyepieces", eyepiecesData)
        : removeItemLocalStorage("eyepieces");
      filtersData.length > 0
        ? setItemLocalStorage("filters", filtersData)
        : removeItemLocalStorage("filters");

      setItemSessionStorage("category", " products");
    } catch (error) {
      removeItemLocalStorage("products");
      removeItemLocalStorage("telescopes");
      removeItemLocalStorage("mounts");
      removeItemLocalStorage("eyepieces");
      removeItemLocalStorage("filters");
      console.error("Error fetching products", error);
    }
  },
  filterProductsByCategory: (category) => {
    const {
      products,
      telescopes,
      mounts,
      eyepieces,
      filters,
      setSelectedCategory,
    } = get();

    let filtered: ProductType[] = [];
    if (category === "products") {
      filtered = [...products];
    } else if (category === "telescopes") {
      filtered = [...telescopes];
    } else if (category === "mounts") {
      filtered = [...mounts];
    } else if (category === "eyepieces") {
      filtered = [...eyepieces];
    } else if (category === "filters") {
      filtered = [...filters];
    }

    setSelectedCategory(category);
    set({ filteredProducts: filtered });
  },
  filterTelescopesBySubCategory: (updatedFilters) => {
    const { opticalDesign, mountType, brand } = updatedFilters;
    const { telescopes, setTelescopeFilters } = get();

    let filtered = [...telescopes];
    if (opticalDesign) {
      filtered = filtered.filter(
        (telescope) => telescope.telescopeData.optical_design === opticalDesign,
      );
    }
    if (mountType) {
      filtered = filtered.filter(
        (telescope) => telescope.telescopeData.mount_type === mountType,
      );
    }
    if (brand) {
      filtered = filtered.filter((telescope) => telescope.brand === brand);
    }

    setTelescopeFilters(updatedFilters);
    set({ filteredProducts: filtered });
  },
}));
