import { create } from "zustand";

type uiStoreType = {
  isMenuOpen: boolean;
  isFiltersMenuOpen: boolean;
  isSortMenuOpen: boolean;

  setIsMenuOpen: (isOpen: boolean) => void;
  setIsFiltersMenuOpen: (isOpen: boolean) => void;
  setIsSortMenuOpen: (isOpen: boolean) => void;
};

export const useUiStore = create<uiStoreType>((set) => ({
  isMenuOpen: false,
  isFiltersMenuOpen: false,
  isSortMenuOpen: false,

  setIsMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
  setIsFiltersMenuOpen: (isOpen) => set({ isFiltersMenuOpen: isOpen }),
  setIsSortMenuOpen: (isOpen) => set({ isSortMenuOpen: isOpen }),
}));
