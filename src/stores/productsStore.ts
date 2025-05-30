import { create } from "zustand";

import {
  getProductsService,
  getTelescopesService,
  getMountsService,
  getEyepiecesService,
  getFiltersService,
  getProductFiltersService,
} from "../services/shopService.ts";

import {
  removeItemSessionStorage,
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

type FilterItemsCategoryType =
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
export type MountFiltersType = {
  buildType: string | null;
  brand: string | null;
};
export type EyepieceFiltersType = {
  buildType: string | null;
  brand: string | null;
};
export type FilterFiltersType = {
  buildType: string | null;
  brand: string | null;
};

export type SubFiltersType = {
  name: string;
  image_url: string;
  category: string;
};

export type FilterItemsSubCategoryType =
  | TelescopeFiltersType
  | MountFiltersType
  | EyepieceFiltersType
  | FilterFiltersType;

type ProductsStateType = {
  products: ProductType[];
  telescopes: TelescopeType[];
  mounts: MountType[];
  eyepieces: EyepieceType[];
  filters: FilterType[];
  filteredProducts: FilterItemsCategoryType;
  selectedCategory: string | null;
  telescopeFilters: TelescopeFiltersType;
  mountFilters: MountFiltersType;
  eyepieceFilters: EyepieceFiltersType;
  filterFilters: FilterFiltersType;
  subFilters: SubFiltersType[];
  sortBy: string;

  setProducts: (products: ProductType[]) => void;
  setTelescopes: (telescopes: TelescopeType[]) => void;
  setMounts: (mounts: MountType[]) => void;
  setEyepieces: (eyepieces: EyepieceType[]) => void;
  setFilters: (filters: FilterType[]) => void;
  setFilteredProducts: (filteredProducts: FilterItemsCategoryType) => void;
  setSelectedCategory: (category: string | null) => void;
  setTelescopeFilters: (filters: TelescopeFiltersType) => void;
  setMountFilters: (filters: MountFiltersType) => void;
  setEyepieceFilters: (filters: EyepieceFiltersType) => void;
  setFilterFilters: (filters: FilterFiltersType) => void;
  setSubFilters: (subFilters: SubFiltersType[]) => void;
  setSortBy: (sortBy: string) => void;

  fetchProducts: () => Promise<void>;
  clearProductFilters: () => void;
  filterProductsByCategory: (category: string) => void;
  filterProductsBySubCategory: (
    category: string,
    updatedFilters: FilterItemsSubCategoryType,
  ) => void;
  sortFilteredProducts: (sortBy: string) => void;
};

export const useProductsStore = create<ProductsStateType>((set, get) => ({
  // STATE
  products: [],
  telescopes: [],
  mounts: [],
  eyepieces: [],
  filters: [],

  filteredProducts: [],
  selectedCategory: "",

  telescopeFilters: {
    opticalDesign: null,
    mountType: null,
    brand: null,
  },
  mountFilters: {
    buildType: null,
    brand: null,
  },
  eyepieceFilters: {
    buildType: null,
    brand: null,
  },
  filterFilters: {
    buildType: null,
    brand: null,
  },
  subFilters: [],
  sortBy: "a-z",

  // STATE SETTERS
  setProducts: (products) => {
    set({ products });
    setItemLocalStorage("products", products);
  },
  setTelescopes: (telescopes) => {
    set({ telescopes: telescopes });
    setItemLocalStorage("telescopes", telescopes);
  },
  setMounts: (mounts) => {
    set({ mounts: mounts });
    setItemLocalStorage("mounts", mounts);
  },
  setEyepieces: (eyepieces) => {
    set({ eyepieces: eyepieces });
    setItemLocalStorage("eyepieces", eyepieces);
  },
  setFilters: (filters) => {
    set({ filters: filters });
    setItemLocalStorage("filters", filters);
  },

  setFilteredProducts: (items) => set({ filteredProducts: items }),
  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
    setItemSessionStorage("category", category);
  },

  setTelescopeFilters: (filters) => {
    set({ telescopeFilters: filters });
    setItemSessionStorage("productFilters", filters);
  },
  setMountFilters: (filters) => {
    set({ mountFilters: filters });
    setItemSessionStorage("productFilters", filters);
  },
  setEyepieceFilters: (filters) => {
    set({ eyepieceFilters: filters });
    setItemSessionStorage("productFilters", filters);
  },
  setFilterFilters: (filters) => {
    set({ filterFilters: filters });
    setItemSessionStorage("productFilters", filters);
  },
  setSubFilters: (subFilters) => {
    set({ subFilters: subFilters });
    setItemLocalStorage("subFilters", subFilters);
  },

  setSortBy: (sortBy) => {
    set({ sortBy: sortBy });
    setItemSessionStorage("sortBy", sortBy);
  },

  // FUNCTIONS
  fetchProducts: async () => {
    const {
      setProducts,
      setTelescopes,
      setMounts,
      setEyepieces,
      setFilters,
      setSubFilters,
    } = get();

    try {
      const productsData = await getProductsService();
      const telescopesData = await getTelescopesService();
      const mountsData = await getMountsService();
      const eyepiecesData = await getEyepiecesService();
      const filtersData = await getFiltersService();
      const prodctFiltersData = await getProductFiltersService();

      setProducts(productsData);
      setTelescopes(telescopesData);
      setMounts(mountsData);
      setEyepieces(eyepiecesData);
      setFilters(filtersData);
      setSubFilters(prodctFiltersData);
    } catch (error) {
      removeItemLocalStorage("products");
      removeItemLocalStorage("telescopes");
      removeItemLocalStorage("mounts");
      removeItemLocalStorage("eyepieces");
      removeItemLocalStorage("filters");
      removeItemLocalStorage("subFilters");
      console.error("Error fetching products", error);
    }
  },
  clearProductFilters: () => {
    set({
      telescopeFilters: { opticalDesign: null, mountType: null, brand: null },
      mountFilters: { mountType: null, brand: null },
      eyepieceFilters: { buildType: null, brand: null },
      filterFilters: { buildType: null, brand: null },
    });
    set({ sortBy: "a-z" });
    removeItemSessionStorage("productFilters");
    removeItemSessionStorage("sortBy");
  },
  filterProductsByCategory: (category) => {
    const {
      products,
      telescopes,
      mounts,
      eyepieces,
      filters,
      setSelectedCategory,
      clearProductFilters,
      sortFilteredProducts,
    } = get();

    let filtered: FilterItemsCategoryType = [];
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

    clearProductFilters();
    setSelectedCategory(category);
    set({ filteredProducts: filtered });
    sortFilteredProducts("a-z");
  },
  filterProductsBySubCategory: (category, updatedFilters) => {
    const {
      telescopes,
      mounts,
      eyepieces,
      filters,
      setTelescopeFilters,
      setMountFilters,
      setEyepieceFilters,
      setFilterFilters,
    } = get();

    if (category === "telescopes") {
      const updatedTelescopeFilters = updatedFilters as TelescopeFiltersType;
      const { opticalDesign, mountType, brand } = updatedTelescopeFilters;

      let filtered = [...telescopes];
      if (opticalDesign) {
        filtered = filtered.filter(
          (telescope) =>
            telescope.optical_design === opticalDesign,
        );
      }
      if (mountType) {
        filtered = filtered.filter(
          (telescope) => 
            telescope.mount_type === mountType,
        );
      }
      if (brand) {
        filtered = filtered.filter((telescope) => telescope.brand === brand);
      }

      setTelescopeFilters(updatedTelescopeFilters);
      set({ filteredProducts: filtered });
      return;
    }
    if (category === "mounts") {
      const updatedMountFilters = updatedFilters as MountFiltersType;
      const { buildType, brand } = updatedMountFilters;

      let filtered = [...mounts];
      if (buildType) {
        filtered = filtered.filter(
          (mount) => mount.build_type === buildType,
        );
      }
      if (brand) {
        filtered = filtered.filter((mount) => mount.brand === brand);
      }

      set({ filteredProducts: filtered });
      setMountFilters(updatedMountFilters);
      return;
    }
    if (category === "eyepieces") {
      const updatedEyepieceFilters = updatedFilters as EyepieceFiltersType;
      const { buildType, brand } = updatedEyepieceFilters;

      let filtered = [...eyepieces];
      if (buildType) {
        filtered = filtered.filter(
          (eyepiece) => eyepiece.build_type === buildType,
        );
      }
      if (brand) {
        filtered = filtered.filter((eyepiece) => eyepiece.brand === brand);
      }

      setEyepieceFilters(updatedEyepieceFilters);
      set({ filteredProducts: filtered });
      return;
    }
    if (category === "filters") {
      const updatedFiltersFilters = updatedFilters as FilterFiltersType;
      const { buildType, brand } = updatedFiltersFilters;

      let filtered = [...filters];
      if (buildType) {
        filtered = filtered.filter(
          (filter) => filter.filter_type === buildType,
        );
      }
      if (brand) {
        filtered = filtered.filter((filter) => filter.brand === brand);
      }

      setFilterFilters(updatedFiltersFilters);
      set({ filteredProducts: filtered });
      return;
    }
  },
  sortFilteredProducts: (sortBy) => {
    const { filteredProducts, setSortBy } = get();

    let sortFiltered = [...filteredProducts];
    if (sortBy === "a-z") {
      sortFiltered = sortFiltered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "z-a") {
      sortFiltered = sortFiltered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "low-high") {
      sortFiltered = sortFiltered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-low") {
      sortFiltered = sortFiltered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "old-new") {
      sortFiltered = sortFiltered.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );
    } else if (sortBy === "new-old") {
      sortFiltered = sortFiltered.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    }

    setSortBy(sortBy);
    set({ filteredProducts: sortFiltered });
  },
}));
