import { create } from "zustand";

type uiStoreType = {
  isMenuOpen: boolean;
  isFiltersMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  setIsFiltersMenuOpen: (isOpen: boolean) => void;
};

export const useUiStore = create<uiStoreType>((set) => ({
  isMenuOpen: false,
  isFiltersMenuOpen: false,
  setIsMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
  setIsFiltersMenuOpen: (isOpen) => set({ isFiltersMenuOpen: isOpen }),
}));
