import { useEffect, useState } from "react";
import { ShopContext } from "./contexts.ts";
import {
  getProductsService,
  getTelescopesService,
  getMountsService,
  getEyepiecesService,
  getFiltersService
} from "../services/shopService.ts";
import { getItem, removeItem, setItem } from "../utils/localStorage.ts";
import {
  ProductType,
  CartItemType,
  TelescopeType,
  MountType,
  EyepieceType,
  FilterType,
} from "../types/types.ts";

// Move to types.ts ???
export type ShopContextType = {
  products: ProductType[];
  telescopes: TelescopeType[];
  mounts: MountType[];
  eyepieces: EyepieceType[];
  filters: FilterType[];
  cartItems: CartItemType[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  filteredProducts: ProductType[] | TelescopeType[] | MountType[] | EyepieceType[] | FilterType[];
  selectedCategory: string;
  fetchProducts: () => Promise<void>;
  filterProducts: (category: string) => void;
  filterTelescopes: (opticalDesign?: string, mountType?: string) => void;
  filterMounts: (mountType?: string) => void;
  filterEyepieces: (eyepieceType?: string) => void;
  filterFilters: (filterType?: string) => void;
  addToCart: (product: ProductType) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
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
  const [filteredProducts, setFilteredProducts] = useState<
    ProductType[] | TelescopeType[] | MountType[] | EyepieceType[] | FilterType[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("products");
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const fetchProducts = async () => {
    try {
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

      // Improve
      if (productsData.length > 0) {
        setItem("products", productsData);
      } else {
        removeItem("products");
      }
      if (telescopesData.length > 0) {
        setItem("telescopes", telescopesData);
      } else {
        removeItem("telescopes");
      }
      if (mountsData.length > 0) {
        setItem("mounts", mountsData);
      } else {
        removeItem("mounts");
      }
      if (eyepiecesData.length > 0) {
        setItem("eyepieces", eyepiecesData);
      } else {
        removeItem("eyepieces");
      }
      if (filtersData.length > 0) {
        setItem("filters", filtersData);
      }

    } catch (error) {
      console.error("Error fetching products:", error);
      removeItem("products");
      removeItem("telescopes");
      removeItem("mounts");
    }
  };

  const filterTelescopes = (opticalDesign?: string, mountType?: string) => {
    if (opticalDesign) {
      const filteredTelescopes = telescopes.filter(
        (telescope) => telescope.telescopeData.optical_design === opticalDesign
      );
      setFilteredProducts(filteredTelescopes);
    } else if (mountType) {
      const filteredTelescopes = telescopes.filter(
        (telescope) => telescope.telescopeData.mount_type === mountType
      );
      setFilteredProducts(filteredTelescopes);
    }
  }

  const filterMounts = (mountType?: string) => {
    if (mountType) {
      const filteredMounts = mounts.filter(
        (mount) => mount.mountData.mount_type === mountType
      );
      setFilteredProducts(filteredMounts);
    }
  }
  const filterEyepieces = (eyepieceType?: string) => {
    if (eyepieceType) {
      const filteredEyepieces = eyepieces.filter(
        (eyepiece) => eyepiece.eyepieceData.eyepiece_type === eyepieceType
      );
      setFilteredProducts(filteredEyepieces);
    }
  }

  const filterFilters = (filterType?: string) => {
    if (filterType) {
      const filteredFilters = filters.filter(
        (filter) => filter.filterData.filter_type === filterType
      );
      setFilteredProducts(filteredFilters);
    }
  }

  // Mejorar
  const filterProducts = (category: string) => {
    // Products Filters
    setSelectedCategory(category);
    if (category === "products") {
      setFilteredProducts(products);
      // Telescopes Filters
    } else if (category === "telescopes") {
      setFilteredProducts(telescopes);
      // Mounts Filters
    } else if (category === "mounts") {
      setFilteredProducts(mounts);
      // Eyepieces Filters
    } else if (category === "eyepieces") {
      setFilteredProducts(eyepieces);
      // Filters Filters
    } else if (category === "filters") {
      setFilteredProducts(filters);
    }
  };




  // Add product to cart (IMPROVE !!!)
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

  // Remove product from cart
  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  // Update product quantity
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


  useEffect(() => {
    // Initialize products, telescopes, mounts and specifications from localStorage
    const savedProducts: ProductType[] | null = getItem("products");
    const savedTelescopes: TelescopeType[] | null = getItem("telescopes");
    const savedMounts: MountType[] | null = getItem("mounts");
    const savedEyepieces: EyepieceType[] | null = getItem("eyepieces");
    const savedFilters: FilterType[] | null = getItem("filters");

    if (savedProducts && savedTelescopes && savedMounts && savedEyepieces && savedFilters) {
      setProducts(savedProducts);
      setTelescopes(savedTelescopes);
      setMounts(savedMounts);
      setEyepieces(savedEyepieces);
      setFilters(savedFilters);
      setFilteredProducts(savedProducts);
    } else {
      fetchProducts();
    }

    // Initialize cart from localStorage
    const savedCartItems = getItem("cartItems");
    if (savedCartItems && Array.isArray(savedCartItems)) {
      setCartItems(savedCartItems);
    }
  }, []);

  // Save cart items to localStorage whenever they change
  // Remove items from localStorage when cart is empty
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
        selectedCategory,
        cartItems,
        setCartItems,
        fetchProducts,
        filterProducts,
        filterTelescopes,
        filterMounts,
        filterEyepieces,
        filterFilters,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
