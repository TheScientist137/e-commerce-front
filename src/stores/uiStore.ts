import { create } from "zustand";

type uiStoreType = {
  isMenuOpen: boolean;
  isFiltersMenuOpen: boolean;
  isSortMenuOpen: boolean;
  isLoginModalOpen: boolean;
  isSignUpModalOpen: boolean;

  setIsMenuOpen: (isOpen: boolean) => void;
  setIsFiltersMenuOpen: (isOpen: boolean) => void;
  setIsSortMenuOpen: (isOpen: boolean) => void;
  setIsLoginModalOpen: (isOpen: boolean) => void;
  setIsSignupModalOpen: (isOpen: boolean) => void;
};

export const useUiStore = create<uiStoreType>((set) => ({
  isMenuOpen: false,
  isFiltersMenuOpen: false,
  isSortMenuOpen: false,
  isLoginModalOpen: false,
  isSignUpModalOpen: false,

  setIsMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
  setIsFiltersMenuOpen: (isOpen) => set({ isFiltersMenuOpen: isOpen }),
  setIsSortMenuOpen: (isOpen) => set({ isSortMenuOpen: isOpen }),
  setIsLoginModalOpen: (isOpen) => set({ isLoginModalOpen: isOpen }),
  setIsSignupModalOpen: (isOpen) => set({ isSignUpModalOpen: isOpen }),
}));
