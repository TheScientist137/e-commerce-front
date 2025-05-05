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
  filteredProducts: ProductType[] | TelescopeType[] | MountType[] | EyepieceType[] | FilterType[];
  selectedCategory: string;
  cartItems: CartItemType[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  fetchProducts: () => Promise<void>;
  filterProducts: ({
    category,
    brand,
    opticalDesign,
    telescopeMountType,
    mountType,
    eyepieceType,
    filterType
  }: {
    category: string;
    brand?: string;
    opticalDesign?: string;
    telescopeMountType?: string;
    mountType?: string;
    eyepieceType?: string;
    filterType?: string;
  }
  ) => void;
  addToCart: (product: ProductType) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  calculateTotalPrice: () => number;
  getUniqueBrands: () => string[];
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

  const filterProducts = ({
    category,
    brand,
    opticalDesign,
    telescopeMountType,
    mountType,
    eyepieceType,
    filterType
  }: {
    category: string;
    brand?: string;
    opticalDesign?: string;
    telescopeMountType?: string;
    mountType?: string;
    eyepieceType?: string;
    filterType?: string;
  }) => {
    let filtered: any[] = [];

    // Filter products by categopry
    if (category === 'products') {
      filtered = products;
    } else if (category === 'telescopes') {
      filtered = telescopes;
    }
    else if (category === 'mounts') {
      filtered = mounts;
    }
    else if (category === 'eyepieces') {
      filtered = eyepieces;
    }
    else if (category === 'filters') {
      filtered = filters;
    }

    // Apply brand filter if provided
    if (brand) {
      filtered = filtered.filter((product) => product.brand === brand);
    }

    // Apply category filters if provided
    if (category === "telescopes") {
      if (opticalDesign) {
        filtered = filtered.filter(
          (telescope) => telescope.telescopeData.optical_design === opticalDesign
        );
      } else if (telescopeMountType) {
        filtered = filtered.filter(
          (telescope) => telescope.telescopeData.mount_type === telescopeMountType
        );
      }
    } else if (category === "mounts" && mountType) {
      filtered = filtered.filter(
        (mount) => mount.mountData.mount_type === mountType);
    } else if (category === "eyepieces" && eyepieceType) {
      filtered = filtered.filter(
        (eyepiece) => eyepiece.eyepieceData.eyepiece_type === eyepieceType
      );
    } else if (category === "filters" && filterType) {
      filtered = filtered.filter(
        (filter) => filter.filterData.filter_type === filterType
      );
    }

    setFilteredProducts(filtered);
    setSelectedCategory(category);
  };

  // Understand/Improve
  const getUniqueBrands = () => {
    let items: any[] = [];
    if (selectedCategory === "products") items = products;
    else if (selectedCategory === "telescopes") items = telescopes;
    else if (selectedCategory === "mounts") items = mounts;
    else if (selectedCategory === "eyepieces") items = eyepieces;
    else if (selectedCategory === "filters") items = filters;

    return Array.from(new Set(items.map((item) => item.brand)));
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

  // Understand/Improve
  // Calculate total filtered price
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => {
        const itemTotal = item.product.price * item.quantity;
        return parseFloat((total + itemTotal).toFixed(2));
      },
      0
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
        selectedCategory,
        cartItems,
        setCartItems,
        fetchProducts,
        filterProducts,
        addToCart,
        removeFromCart,
        updateQuantity,
        calculateTotalPrice,
        getUniqueBrands,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
