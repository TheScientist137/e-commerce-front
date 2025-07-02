import { create } from "zustand";

import {
  getProductsService,
  getTelescopesService,
  getMountsService,
  getEyepiecesService,
  getFiltersService,
  getProductsFiltersService,
} from "../services/shopService.ts";

import {
  getItemSessionStorage,
  removeItemSessionStorage,
  setItemSessionStorage,
} from "../utils/sessionStorage";
import {
  getItemLocalStorage,
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

export type ProductsFiltersType = {
  name: string;
  image_url: string;
  category: string;
  description: string;
};
export type ProductsBrandsType = {
  name: string;
  image_url: string;
};

export type FilterItemsSubCategoryType =
  | TelescopeFiltersType
  | MountFiltersType
  | EyepieceFiltersType
  | FilterFiltersType;

type ProductsStoreType = {
  products: ProductType[];
  telescopes: TelescopeType[];
  mounts: MountType[];
  eyepieces: EyepieceType[];
  filters: FilterType[];

  productFilters: ProductsFiltersType[];
  filteredProducts: FilterItemsCategoryType;
  selectedCategory: string | null;
  sortBy: string;

  telescopeFilters: TelescopeFiltersType;
  mountFilters: MountFiltersType;
  eyepieceFilters: EyepieceFiltersType;
  filterFilters: FilterFiltersType;

  currentPage: number;
  productsPerPage: number; 

  setCurrentPage: (page: number) => void; // Cambiar pagina
  getCurrentPageProducts: () => FilterItemsCategoryType; // Obtener productos de página actual
  getTotalPages: () => number; // Calcular total de páginas

  setProducts: (products: ProductType[]) => void;
  setTelescopes: (telescopes: TelescopeType[]) => void;
  setMounts: (mounts: MountType[]) => void;
  setEyepieces: (eyepieces: EyepieceType[]) => void;
  setFilters: (filters: FilterType[]) => void;

  setProductFilters: (filters: ProductsFiltersType[]) => void;
  setFilteredProducts: (filteredProducts: FilterItemsCategoryType) => void;
  setSelectedCategory: (category: string | null) => void;
  setSortBy: (sortBy: string) => void;

  setTelescopeFilters: (filters: TelescopeFiltersType) => void;
  setMountFilters: (filters: MountFiltersType) => void;
  setEyepieceFilters: (filters: EyepieceFiltersType) => void;
  setFilterFilters: (filters: FilterFiltersType) => void;

  fetchProducts: () => Promise<void>;
  initializeFromStorage: () => void;
  clearProductFilters: () => void;
  filterProductsByCategory: (category: string) => void;
  filterProductsBySubCategory: (
    category: string,
    updatedFilters: FilterItemsSubCategoryType,
  ) => void;
  sortFilteredProducts: (sortBy: string) => void;
  getIsFiltersActive: () => boolean;
};

export const useProductsStore = create<ProductsStoreType>((set, get) => ({
  // STATE
  products: getItemLocalStorage("products") || [],
  telescopes: getItemLocalStorage("telescopes") || [],
  mounts: getItemLocalStorage("mounts") || [],
  eyepieces: getItemLocalStorage("eyepieces") || [],
  filters: getItemLocalStorage("filters") || [],

  productFilters: getItemLocalStorage("productFilters") || [],
  filteredProducts: [],
  selectedCategory: getItemSessionStorage("category") || "",
  sortBy: getItemSessionStorage("sortBy") || "a-z",

  currentPage: 1,
  productsPerPage: 10,

  telescopeFilters: getItemSessionStorage("productFilters") || {
    opticalDesign: null,
    mountType: null,
    brand: null,
  },
  mountFilters: getItemSessionStorage("productFilters") || {
    buildType: null,
    brand: null,
  },
  eyepieceFilters: getItemSessionStorage("productFilters") || {
    buildType: null,
    brand: null,
  },
  filterFilters: getItemSessionStorage("productFilters") || {
    buildType: null,
    brand: null,
  },

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
  setProductFilters: (filters) => {
    set({ productFilters: filters });
    setItemLocalStorage("productFilters", filters);
  },
  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
    setItemSessionStorage("category", category);
  },
  setSortBy: (sortBy) => {
    set({ sortBy: sortBy });
    setItemSessionStorage("sortBy", sortBy);
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

  setCurrentPage: (page) => set({currentPage: page}),

  getCurrentPageProducts: () => {
    const {filteredProducts, currentPage, productsPerPage} = get();
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return currentProducts;
  },
  getTotalPages: () => {
    const {filteredProducts, productsPerPage} = get();
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return totalPages;
  },


  // FUNCTIONS
  fetchProducts: async () => {
    const {
      setProducts,
      setTelescopes,
      setMounts,
      setEyepieces,
      setFilters,
      setProductFilters,
    } = get();

    try {
      const productsData = await getProductsService();
      const telescopesData = await getTelescopesService();
      const mountsData = await getMountsService();
      const eyepiecesData = await getEyepiecesService();
      const filtersData = await getFiltersService();
      const productFiltersData = await getProductsFiltersService();

      setProducts(productsData);
      setTelescopes(telescopesData);
      setMounts(mountsData);
      setEyepieces(eyepiecesData);
      setFilters(filtersData);
      setProductFilters(productFiltersData);
    } catch (error) {
      removeItemLocalStorage("products");
      removeItemLocalStorage("telescopes");
      removeItemLocalStorage("mounts");
      removeItemLocalStorage("eyepieces");
      removeItemLocalStorage("filters");
      removeItemLocalStorage("productFilters");
      console.error("Error fetching products", error);
    }
  },
  initializeFromStorage: () => {
    const {
      setSelectedCategory,
      setSortBy,
      filterProductsByCategory,
      filterProductsBySubCategory,
      sortFilteredProducts,
    } = get();

    const savedCategory: string | null = getItemSessionStorage("category");
    const savedProductFilters: FilterItemsSubCategoryType | null =
      getItemSessionStorage("productFilters");
    const savedSortBy: string | null = getItemSessionStorage("sortBy");

    if (savedCategory) {
      setSelectedCategory(savedCategory);
      filterProductsByCategory(savedCategory);
    }
    if (savedCategory && savedProductFilters) {
      filterProductsBySubCategory(savedCategory, savedProductFilters);
    }
    if (savedSortBy) {
      setSortBy(savedSortBy);
      sortFilteredProducts(savedSortBy);
    }
  },
  clearProductFilters: () => {
    set({
      telescopeFilters: { opticalDesign: null, mountType: null, brand: null },
      mountFilters: { buildType: null, brand: null },
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
      setCurrentPage,
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
    setCurrentPage(1);
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
      setCurrentPage
    } = get();

    setCurrentPage(1);

    if (category === "telescopes") {
      const updatedTelescopeFilters = updatedFilters as TelescopeFiltersType;
      const { opticalDesign, mountType, brand } = updatedTelescopeFilters;

      let filtered = [...telescopes];
      if (opticalDesign) {
        filtered = filtered.filter(
          (telescope) => telescope.optical_design_name === opticalDesign,
        );
      }
      if (mountType) {
        filtered = filtered.filter(
          (telescope) => telescope.mount_type_name === mountType,
        );
      }
      if (brand) {
        filtered = filtered.filter(
          (telescope) => telescope.brand === brand,
        );
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
          (mount) => mount.build_type_name === buildType,
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
          (eyepiece) => eyepiece.build_type_name === buildType,
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
          (filter) => filter.build_type_name === buildType,
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
  getIsFiltersActive: () => {
    const { telescopeFilters, mountFilters, eyepieceFilters, filterFilters } =
      get();
    const isActive =
      telescopeFilters.opticalDesign ||
      telescopeFilters.mountType ||
      telescopeFilters.brand ||
      mountFilters.buildType ||
      mountFilters.brand ||
      eyepieceFilters.buildType ||
      eyepieceFilters.brand ||
      filterFilters.buildType ||
      filterFilters.brand;
    return Boolean(isActive);
  },
}));
