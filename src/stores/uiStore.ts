import { create } from "zustand";
import {
  getItemLocalStorage,
  setItemLocalStorage,
} from "../utils/localStorage";

const getInitialDarkMode = (): boolean => {
  const savedTheme = getItemLocalStorage("theme");
  if (savedTheme === "dark") return true;
  if (savedTheme === "light") return false;
  // If no theme saved on localStorage
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

type uiStoreType = {
  darkMode: boolean;

  isMenuOpen: boolean;
  isFiltersMenuOpen: boolean;
  isSortMenuOpen: boolean;

  isLoginModalOpen: boolean;
  isSignUpModalOpen: boolean;

  openTelescopeFilters: {
    isOpticalDesignFiltersOpen: false;
    isMountTypeFiltersOpen: false;
    isBrandFiltersOpen: false;
  };
  openMountFilters: {
    isMountTypeFiltersOpen: false;
    isBrandFiltersOpen: false;
  };
  openEyepieceFilters: {
    isBuildTypeFiltersOpen: false;
    isBrandFiltersOpen: false;
  };
  openFilterFilters: {
    isBuildTypeFiltersOpen: false;
    isBrandFiltersOpen: false;
  };

  setDarkMode: (isActive: boolean) => void;

  setIsMenuOpen: (isOpen: boolean) => void;
  setIsFiltersMenuOpen: (isOpen: boolean) => void;
  setIsSortMenuOpen: (isOpen: boolean) => void;

  setIsLoginModalOpen: (isOpen: boolean) => void;
  setIsSignupModalOpen: (isOpen: boolean) => void;

  setOpenTelescopeFilters: (
    key: keyof uiStoreType["openTelescopeFilters"],
    value: boolean,
  ) => void;
  setOpenMountFilters: (
    key: keyof uiStoreType["openMountFilters"],
    value: boolean,
  ) => void;
  setOpenEyepieceFilters: (
    key: keyof uiStoreType["openEyepieceFilters"],
    value: boolean,
  ) => void;
  setOpenFilterFilters: (
    key: keyof uiStoreType["openFilterFilters"],
    value: boolean,
  ) => void;
};

export const useUiStore = create<uiStoreType>((set) => {
  const initialDarkMode = getInitialDarkMode();
  // Aplica la clase al crear el store (Carga la aplicacion/Renders)
  if (typeof window !== "undefined") {
    if (initialDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return {
    darkMode: initialDarkMode,

    isMenuOpen: false,
    isFiltersMenuOpen: false,
    isSortMenuOpen: false,

    isLoginModalOpen: false,
    isSignUpModalOpen: false,

    openTelescopeFilters: {
      isOpticalDesignFiltersOpen: false,
      isMountTypeFiltersOpen: false,
      isBrandFiltersOpen: false,
    },
    openMountFilters: {
      isMountTypeFiltersOpen: false,
      isBrandFiltersOpen: false,
    },
    openEyepieceFilters: {
      isBuildTypeFiltersOpen: false,
      isBrandFiltersOpen: false,
    },
    openFilterFilters: {
      isBuildTypeFiltersOpen: false,
      isBrandFiltersOpen: false,
    },

    setDarkMode: (isActive) => {
      set({ darkMode: isActive });
      if (isActive) {
        document.documentElement.classList.add("dark");
        setItemLocalStorage("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        setItemLocalStorage("theme", "light");
      }
    },

    setIsMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
    setIsFiltersMenuOpen: (isOpen) => set({ isFiltersMenuOpen: isOpen }),
    setIsSortMenuOpen: (isOpen) => set({ isSortMenuOpen: isOpen }),

    setIsLoginModalOpen: (isOpen) => set({ isLoginModalOpen: isOpen }),
    setIsSignupModalOpen: (isOpen) => set({ isSignUpModalOpen: isOpen }),

    setOpenTelescopeFilters: (key, value) =>
      set((state) => ({
        openTelescopeFilters: { ...state.openTelescopeFilters, [key]: value },
      })),
    setOpenMountFilters: (key, value) =>
      set((state) => ({
        openMountFilters: { ...state.openMountFilters, [key]: value },
      })),
    setOpenEyepieceFilters: (key, value) =>
      set((state) => ({
        openEyepieceFilters: { ...state.openEyepieceFilters, [key]: value },
      })),
    setOpenFilterFilters: (key, value) =>
      set((state) => ({
        openFilterFilters: { ...state.openFilterFilters, [key]: value },
      })),
  };
});
