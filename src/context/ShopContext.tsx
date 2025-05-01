import { useEffect, useState } from "react";
import { ShopContext } from "./contexts.ts";
import {
  getProductsService,
  getTelescopesService,
  getMountsService,
} from "../services/shopService.ts";
import { getItem, removeItem, setItem } from "../utils/localStorage.ts";
import {
  ProductType,
  CartItemType,
  TelescopeType,
  MountType,
  ProductsTypesType,
} from "../types/types.ts";

// Move to types.ts ???
export type ShopContextType = {
  products: ProductType[];
  telescopes: TelescopeType[];
  mounts: MountType[];
  cartItems: CartItemType[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  filteredProducts: ProductType[] | TelescopeType[] | MountType[];
  selectedCategory: string;
  productsTypes: ProductsTypesType;
  fetchProducts: () => Promise<void>;
  filterProducts: (
    category: string,
    type?: string,
    opticalDesign?: string
  ) => void;
  addToCart: (product: ProductType) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  calculateTotalPrice: () => number;
  formatPrice: (price: number) => string;
};

const initialProductsTypes: ProductsTypesType = {
  telescopeTypes: [],
  opticalDesigns: [],
  mountTypes: [],
};

export const ShopContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [telescopes, setTelescopes] = useState<TelescopeType[]>([]);
  const [mounts, setMounts] = useState<MountType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<
    ProductType[] | TelescopeType[] | MountType[]
  >([]);
  const [productsTypes, setProductsTypes] =
    useState<ProductsTypesType>(initialProductsTypes);
  const [selectedCategory, setSelectedCategory] = useState<string>("products");
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const fetchProducts = async () => {
    try {
      const productsData = await getProductsService();
      const telescopesData = await getTelescopesService();
      const mountsData = await getMountsService();

      setProducts(productsData);
      setTelescopes(telescopesData);
      setMounts(mountsData);
      setFilteredProducts(productsData);

      // Improve => (retrieve empty array???)

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
    } catch (error) {
      console.error("Error fetching products:", error);
      removeItem("products");
      removeItem("telescopes");
      removeItem("mounts");
    }
  };

  // MEJORAR
  // Filter products by category, type and optical design
  const filterProducts = (
    category: string,
    type?: string,
    opticalDesign?: string
  ) => {
    // Set Selected Product Category
    setSelectedCategory(category);

    if (category === "products") {
      setFilteredProducts(products);
      return;
    }
    if (category === "telescopes") {
      if (type === "all types" && opticalDesign === "all optical designs") {
        setFilteredProducts(telescopes);
      } else if (type !== "all types") {
        const filteredTelescopes = telescopes.filter(
          (telescope) => telescope.telescopeInfo.telescope_type === type
        );
        setFilteredProducts(filteredTelescopes);
      } else if (opticalDesign !== "all optical designs") {
        const filteredTelescopes = telescopes.filter(
          (telescope) => telescope.optical_design === opticalDesign
        );
        setFilteredProducts(filteredTelescopes);
      }
      return;
    }
    if (category === "mounts") {
      if (type === "all types") {
        setFilteredProducts(mounts);
      } else {
        const filteredMounts = mounts.filter(
          (mount) => mount.mount_type === type
        );
        setFilteredProducts(filteredMounts);
      }
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

  // Calculate total items price
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  // Format price with 2 decimal places
  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  useEffect(() => {
    // Initialize products, telescopes, mounts and specifications from localStorage
    const savedProducts: ProductType[] | null = getItem("products");
    const savedTelescopes: TelescopeType[] | null = getItem("telescopes");
    const savedMounts: MountType[] | null = getItem("mounts");
    const savedTypes: ProductsTypesType | null = getItem("types");

    if (savedProducts && savedTelescopes && savedMounts && savedTypes) {
      setProducts(savedProducts);
      setTelescopes(savedTelescopes);
      setMounts(savedMounts);
      setProductsTypes(savedTypes);
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
        productsTypes,
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
        formatPrice,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
