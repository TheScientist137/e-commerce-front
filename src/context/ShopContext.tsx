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
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;

  fetchProducts: () => Promise<void>;
  filterProductsByCategory: (category: string) => void;
  filterTelescopesBySubCategory: (
    subCategory: string,
    value: string | null,
  ) => void;

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

  const [initialized, setInitialized] = useState<boolean>(false);

  const [telescopeFilters, setTelescopeFilters] = useState<TelescopeFilters>({
    opticalDesign: null,
    mountingType: null,
    brand: null,
  });
  const [mountFilters, setMountFilters] = useState<MountFilters>({
    mountingType: null,
    brand: null,
  });
  const [eyepieceFilters, setEyepieceFilters] = useState<EyepieceFilters>({
    buildType: null,
    brand: null,
  });
  const [filterFilters, setFilterFilters] = useState<FilterFilters>({
    applicationArea: null,
    brand: null,
  });

  const getSavedDataFromLocalStorage = () => ({
    savedProducts: getItem<ProductType[]>("products"),
    savedTelescopes: getItem<TelescopeType[]>("telescopes"),
    savedMounts: getItem<MountType[]>("mounts"),
    savedEyepieces: getItem<EyepieceType[]>("eyepieces"),
    savedFilters: getItem<FilterType[]>("filters"),
  });

  useEffect(() => {
    // Initialize products, telescopes, mounts and specifications from localStorage
    const {
      savedProducts,
      savedTelescopes,
      savedMounts,
      savedEyepieces,
      savedFilters,
    } = getSavedDataFromLocalStorage();
    const savedCategory: string | null = getItemSessionStorage("category");

    // Filter products in base on last category visited
    // If no category or category === products, filter by all products
    // If no categories on localStorage call fetchPwroducts function
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

      filterProductsByCategory(savedCategory || "products");
    } else {
      fetchProducts();
    }

    // Initialize cart from localStorage
    const savedCartItems = getItem("cartItems");
    if (savedCartItems && Array.isArray(savedCartItems)) {
      setCartItems(savedCartItems);
    }

    // Indicamos que la carga inicial (api o localStorage) ya terminó
    setInitialized(true);
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

      setSelectedCategory("products");
      setItemSessionStorage("category", "products");
    } catch (error) {
      console.error("Error fetching products:", error);
      removeItem("products");
      removeItem("telescopes");
      removeItem("mounts");
    }
  };

  const filterProductsByCategory = (category: string) => {
    const {
      savedProducts,
      savedTelescopes,
      savedMounts,
      savedEyepieces,
      savedFilters,
    } = getSavedDataFromLocalStorage();

    if (category === "products" && savedProducts) {
      setFilteredProducts(savedProducts);
    } else if (category === "telescopes" && savedTelescopes) {
      setFilteredProducts(savedTelescopes);
    } else if (category === "mounts" && savedMounts) {
      setFilteredProducts(savedMounts);
    } else if (category === "eyepieces" && savedEyepieces) {
      setFilteredProducts(savedEyepieces);
    } else if (category === "filters" && savedFilters) {
      setFilteredProducts(savedFilters);
    }

    setSelectedCategory(category);
    setItemSessionStorage("category", category);
  };

  const filterTelescopesBySubCategory = (
    subCategory: string,
    value: string | null,
  ) => {
    const updatedTelescopeFilters = {
      ...telescopeFilters,
      [subCategory]: value,
    };
    setTelescopeFilters(updatedTelescopeFilters);

    let filtered = [...telescopes];

    if (updatedTelescopeFilters.opticalDesign) {
      filtered = filtered.filter(
        (telescope) =>
          telescope.telescopeData.optical_design ===
          updatedTelescopeFilters.opticalDesign,
      );
    }
    if (updatedTelescopeFilters.mountingType) {
      filtered = filtered.filter(
        (telescope) =>
          telescope.telescopeData.mount_type ===
          updatedTelescopeFilters.mountingType,
      );
    }
    if (updatedTelescopeFilters.brand) {
      filtered = filtered.filter(
        (telescope) => telescope.brand === updatedTelescopeFilters.brand,
      );
    }

    setFilteredProducts(filtered);
    setItemSessionStorage('subCategories', updatedTelescopeFilters);
  };

  // Shopping Cart Functions
  const addToCart = (product: ProductType) => {
    const existingItem = cartItems.find(
      (item) => item.product.id === product.id,
    );
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId),
    );
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = item.product.price * item.quantity;
      return parseFloat((total + itemTotal).toFixed(2));
    }, 0);
  };

  // No renderizamos nada hasta que la carga inicial termine
  if (!initialized) return null;

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

        setFilteredProducts,
        setCartItems,

        fetchProducts,
        filterProductsByCategory,
        setSelectedCategory,
        filterTelescopesBySubCategory,

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
