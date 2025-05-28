import { create } from "zustand";

type uiStoreType = {
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

export const useUiStore = create<uiStoreType>((set) => ({
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
}));
