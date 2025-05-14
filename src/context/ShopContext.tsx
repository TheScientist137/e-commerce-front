import { useEffect, useState } from "react";
import { ShopContext } from "./contexts.ts";
import {
  getProductsService,
  getTelescopesService,
  getMountsService,
  getEyepiecesService,
  getFiltersService,
} from "../services/shopService.ts";
import { getItem, removeItem, setItem } from "../utils/localStorage.ts";
import {
  getItemSessionStorage,
  setItemSessionStorage,
} from "../utils/sessionStorage.ts";
import {
  ProductType,
  CartItemType,
  TelescopeType,
  MountType,
  EyepieceType,
  FilterType,
} from "../types/types.ts";

type FilterItemsType =
  | ProductType[]
  | TelescopeType[]
  | MountType[]
  | EyepieceType[]
  | FilterType[];
type TelescopeFilters = {
  brand: null;
  opticalDesign: null;
  mountingType: null;
};
type MountFilters = { brand: null; mountingType: null };
type EyepieceFilters = { brand: null; buildType: null };
type FilterFilters = { brand: null; applicationArea: null };

// Move to types.ts ???
export type ShopContextType = {
  products: ProductType[];
  telescopes: TelescopeType[];
  mounts: MountType[];
  eyepieces: EyepieceType[];
  filters: FilterType[];
  filteredProducts: FilterItemsType;
  selectedCategory: string | null;
  telescopeFilters: TelescopeFilters;
  mountFilters: MountFilters;
  eyepieceFilters: EyepieceFilters;
  filterFilters: FilterFilters;
  cartItems: CartItemType[];

  setFilteredProducts: React.Dispatch<React.SetStateAction<FilterItemsType>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  applyFiltersForTelescopes: () => void;
  applyFiltersForMounts: () => void;
  applyFiltersForEyepieces: () => void;
  applyFiltersForFilters: () => void;
  updateTelescopesFilter: (key: string, value: string | null) => void;
  updateMountsFilter: (key: string, value: string | null) => void;
  updateEyepiecesFilter: (key: string, value: string | null) => void;
  updateFiltersFilter: (key: string, value: string | null) => void;

  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  fetchProducts: () => Promise<void>;
  filterProducts: (category: string) => void;
  addToCart: (product: ProductType) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  calculateTotalPrice: () => number;
};

export const ShopContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [telescopes, setTelescopes] = useState<TelescopeType[]>([]);
  const [mounts, setMounts] = useState<MountType[]>([]);
  const [eyepieces, setEyepieces] = useState<EyepieceType[]>([]);
  const [filters, setFilters] = useState<FilterType[]>([]);

  const [filteredProducts, setFilteredProducts] = useState<FilterItemsType>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const [telescopeFilters, setTelescopeFilters] = useState<TelescopeFilters>({
    brand: null,
    opticalDesign: null,
    mountingType: null,
  });
  const [mountFilters, setMountFilters] = useState<MountFilters>({
    brand: null,
    mountingType: null,
  });
  const [eyepieceFilters, setEyepieceFilters] = useState<EyepieceFilters>({
    brand: null,
    buildType: null,
  });
  const [filterFilters, setFilterFilters] = useState<FilterFilters>({
    brand: null,
    applicationArea: null,
  });

  const fetchProducts = async () => {
    try {
      // Fetch data from api and set it on state and localStorage
      const productsData = await getProductsService();
      const telescopesData = await getTelescopesService();
      const mountsData = await getMountsService();
      const eyepiecesData = await getEyepiecesService();
      const filtersData = await getFiltersService();

      setProducts(productsData);
      setTelescopes(telescopesData);
      setMounts(mountsData);
      setEyepieces(eyepiecesData);
      setFilters(filtersData);
      setFilteredProducts(productsData);

      productsData.length > 0
        ? setItem("products", productsData)
        : removeItem("products");
      telescopesData.length > 0
        ? setItem("telescopes", telescopesData)
        : removeItem("telescopes");
      mountsData.length > 0
        ? setItem("mounts", mountsData)
        : removeItem("mounts");
      eyepiecesData.length > 0
        ? setItem("eyepieces", eyepiecesData)
        : removeItem("eyepieces");
      filtersData.length > 0
        ? setItem("filters", filtersData)
        : removeItem("filters");
    } catch (error) {
      console.error("Error fetching products:", error);
      removeItem("products");
      removeItem("telescopes");
      removeItem("mounts");
    }
  };

  // Products Filter Functions
  const filterProducts = (category: string) => {
    let filtered: any[] = [];

    if (category === "products") filtered = [...products];
    else if (category === "telescopes") {
      filtered = [...telescopes];
      setTelescopeFilters({
        brand: null,
        opticalDesign: null,
        mountingType: null,
      });
      setItemSessionStorage("telescopeFilters", {
        brand: null,
        opticalDesign: null,
        mountingType: null,
      });
    } else if (category === "mounts") {
      filtered = [...mounts];
      setMountFilters({ brand: null, mountingType: null });
      setItemSessionStorage("mountFilters", {
        brand: null,
        mountingType: null,
      });
    } else if (category === "eyepieces") {
      filtered = [...eyepieces];
      setEyepieceFilters({ brand: null, buildType: null });
      setItemSessionStorage("eyepieceFilters", {
        brand: null,
        buildType: null,
      });
    } else if (category === "filters") {
      filtered = [...filters];
      setFilterFilters({ brand: null, applicationArea: null });
      setItemSessionStorage("filterFilters", {
        brand: null,
        applicationArea: null,
      });
    }

    setFilteredProducts(filtered);
    setSelectedCategory(category);
    setItemSessionStorage("savedCategory", category);
  };

  const applyFiltersForTelescopes = () => {
    let filtered: TelescopeType[] = [...telescopes];

    if (telescopeFilters.brand) {
      filtered = filtered.filter(
        (telescope) =>
          (telescope as TelescopeType).brand === telescopeFilters.brand
      );
    }
    if (telescopeFilters.opticalDesign) {
      filtered = filtered.filter(
        (telescope) =>
          (telescope as TelescopeType).telescopeData.optical_design ===
          telescopeFilters.opticalDesign
      );
    }
    if (telescopeFilters.mountingType) {
      filtered = filtered.filter(
        (telescope) =>
          (telescope as TelescopeType).telescopeData.mount_type ===
          telescopeFilters.mountingType
      );
    }

    setFilteredProducts(filtered);
  };

  const applyFiltersForMounts = () => {
    let filtered: MountType[] = [...mounts];

    if (mountFilters.brand) {
      filtered = filtered.filter(
        (mount) => (mount as MountType).brand === mountFilters.brand
      );
    }
    if (mountFilters.mountingType) {
      filtered = filtered.filter(
        (mount) =>
          (mount as MountType).mountData.mount_type ===
          mountFilters.mountingType
      );
    }

    setFilteredProducts(filtered);
  };

  const applyFiltersForEyepieces = () => {
    let filtered: EyepieceType[] = [...eyepieces];

    if (eyepieceFilters.brand) {
      filtered = filtered.filter(
        (eyepiece) => (eyepiece as EyepieceType).brand === eyepieceFilters.brand
      );
    }
    if (eyepieceFilters.buildType) {
      filtered = filtered.filter(
        (eyepiece) =>
          (eyepiece as EyepieceType).eyepieceData.eyepiece_type ===
          eyepieceFilters.buildType
      );
    }

    setFilteredProducts(filtered);
  };

  const applyFiltersForFilters = () => {
    let filtered: FilterType[] = [...filters];

    if (filterFilters.brand) {
      filtered = filtered.filter(
        (filter) => (filter as FilterType).brand === filterFilters.brand
      );
    }
    if (filterFilters.applicationArea) {
      filtered = filtered.filter(
        (area) =>
          (area as FilterType).filterData.filter_type ===
          filterFilters.applicationArea
      );
    }

    setFilteredProducts(filtered);
  };

  const updateTelescopesFilter = (key: string, value: string | null) => {
    const updatedTelescopeFilters = { ...telescopeFilters, [key]: value };
    setTelescopeFilters(updatedTelescopeFilters);
    setItemSessionStorage("telescopeFilters", updatedTelescopeFilters);
  };

  const updateMountsFilter = (key: string, value: string | null) => {
    const updatedMountFilters = { ...mountFilters, [key]: value };
    setMountFilters(updatedMountFilters);
    setItemSessionStorage("mountFilters", updatedMountFilters);
  };

  const updateEyepiecesFilter = (key: string, value: string | null) => {
    const updatedEyepieces = { ...eyepieceFilters, [key]: value };
    setEyepieceFilters(updatedEyepieces);
    setItemSessionStorage("eyepieceFilters", updatedEyepieces);
  };

  const updateFiltersFilter = (key: string, value: string | null) => {
    const updatedFilters = { ...filterFilters, [key]: value };
    setFilterFilters(updatedFilters);
    setItemSessionStorage("filterFilters", updatedFilters);
  };

  // Shopping Cart Functions
  const addToCart = (product: ProductType) => {
    const existingItem = cartItems.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = item.product.price * item.quantity;
      return parseFloat((total + itemTotal).toFixed(2));
    }, 0);
  };

  useEffect(() => {
    // Initialize products, telescopes, mounts and specifications from localStorage
    const savedProducts: ProductType[] | null = getItem("products");
    const savedTelescopes: TelescopeType[] | null = getItem("telescopes");
    const savedMounts: MountType[] | null = getItem("mounts");
    const savedEyepieces: EyepieceType[] | null = getItem("eyepieces");
    const savedFilters: FilterType[] | null = getItem("filters");

    if (
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
    } else {
      fetchProducts();
    }

    // Initialize category and products filters from sessionStorage
    const savedCategory: string | null = getItemSessionStorage("savedCategory");
    const savedTelescopeFilters: TelescopeFilters | null =
      getItemSessionStorage("telescopeFilters");
    const savedMountFilters: MountFilters | null =
      getItemSessionStorage("mountFilters");
    const savedEyepieceFilters: EyepieceFilters | null =
      getItemSessionStorage("eyepieceFilters");
    const savedFilterFilters: FilterFilters | null =
      getItemSessionStorage("filterFilters");

    if (savedCategory) {
      setSelectedCategory(savedCategory);

      if (savedCategory === "products") {
        setFilteredProducts(savedProducts || []);
      } else if (savedCategory === "telescopes" && savedTelescopeFilters) {
        setTelescopeFilters(savedTelescopeFilters);
        applyFiltersForTelescopes();
      } else if (savedCategory === "mounts" && savedMountFilters) {
        setMountFilters(savedMountFilters);
        applyFiltersForMounts();
      } else if (savedCategory === "eyepieces" && savedEyepieceFilters) {
        setEyepieceFilters(savedEyepieceFilters);
        applyFiltersForEyepieces();
      } else if (savedCategory === "filters" && savedFilterFilters) {
        setFilterFilters(savedFilterFilters);
        applyFiltersForFilters();
      }
    } else {
      // If no savedCategory => filter by all products
      savedProducts && setFilteredProducts(savedProducts);
    }

    // Initialize cart from localStorage
    const savedCartItems = getItem("cartItems");
    if (savedCartItems && Array.isArray(savedCartItems)) {
      setCartItems(savedCartItems);
    }
  }, []);

  // Save cart filtered to localStorage whenever they change
  // Remove filtered from localStorage when cart is empty
  useEffect(() => {
    if (cartItems.length > 0) {
      setItem("cartItems", cartItems);
    } else {
      removeItem("cartItems");
    }
  }, [cartItems]);

  return (
    <ShopContext.Provider
      value={{
        products,
        telescopes,
        mounts,
        eyepieces,
        filters,
        filteredProducts,
        telescopeFilters,
        mountFilters,
        eyepieceFilters,
        filterFilters,
        selectedCategory,
        cartItems,

        fetchProducts,
        filterProducts,
        setFilteredProducts,
        setSelectedCategory,

        applyFiltersForTelescopes,
        applyFiltersForMounts,
        applyFiltersForEyepieces,
        applyFiltersForFilters,
        updateTelescopesFilter,
        updateMountsFilter,
        updateEyepiecesFilter,
        updateFiltersFilter,

        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        calculateTotalPrice,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
