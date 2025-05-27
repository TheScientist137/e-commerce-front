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
  mountType: string | null;
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
    mountType: null,
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
  sortBy: "a-z",

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
  setSortBy: (sortBy) => {
    set({ sortBy: sortBy });
    setItemSessionStorage("sortBy", sortBy);
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
  clearProductFilters: () => {
    set({
      telescopeFilters: { opticalDesign: null, mountType: null, brand: null },
      mountFilters: { mountType: null, brand: null },
      eyepieceFilters: { buildType: null, brand: null },
      filterFilters: { buildType: null, brand: null },
    });
    removeItemSessionStorage("productFilters");
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
            telescope.telescopeData.optical_design === opticalDesign,
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

      setTelescopeFilters(updatedTelescopeFilters);
      set({ filteredProducts: filtered });
      return;
    }
    if (category === "mounts") {
      const updatedMountFilters = updatedFilters as MountFiltersType;
      const { mountType, brand } = updatedMountFilters;

      let filtered = [...mounts];
      if (mountType) {
        filtered = filtered.filter(
          (mount) => mount.mountData.mount_type === mountType,
        );
      }
      if (brand) {
        filtered = filtered.filter((mount) => mount.brand === brand);
      }

      setMountFilters(updatedMountFilters);
      set({ filteredProducts: filtered });
      return;
    }
    if (category === "eyepieces") {
      const updatedEyepieceFilters = updatedFilters as EyepieceFiltersType;
      const { buildType, brand } = updatedEyepieceFilters;

      let filtered = [...eyepieces];
      if (buildType) {
        filtered = filtered.filter(
          (eyepiece) => eyepiece.eyepieceData.eyepiece_type === buildType,
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
          (filter) => filter.filterData.filter_type === buildType,
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
