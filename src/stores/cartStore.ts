import { create } from "zustand";
import { ProductType } from "../types/types";
import {
  setItemLocalStorage,
  getItemLocalStorage,
  removeItemLocalStorage,
} from "../utils/localStorage";

export type CartItemType = {
  product: ProductType;
  quantity: number;
};
type CartStoreType = {
  cartItems: CartItemType[];
  setCartItems: (items: CartItemType[]) => void;
  addToCart: (product: ProductType) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  calculateTotalPrice: () => number;
};

const initialCart: CartItemType[] = getItemLocalStorage("cartItems") || [];

export const useCartStore = create<CartStoreType>((set, get) => ({
  // STATE AND SETTER
  cartItems: initialCart,
  setCartItems: (items) => {
    set({ cartItems: items });
    if (items.length > 0) {
      setItemLocalStorage("cartItems", items);
    } else {
      removeItemLocalStorage("cartItems");
    }
  },
  // FUNCTIONS
  addToCart: (product) => {
    const cartItems = get().cartItems;
    const existing = cartItems.find((item) => item.product.id === product.id);

    if (existing) {
      // Si ya existe agrega 1 a la cantidad
      const newCartItems = cartItems.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      set({ cartItems: newCartItems });
      setItemLocalStorage("cartItems", newCartItems);
    } else {
      // Si no existe agrega el producto con cantidad 1
      const newCartitems = [...cartItems, { product, quantity: 1 }];
      set({ cartItems: newCartitems });
      setItemLocalStorage("cartItems", newCartitems);
    }
  },
  removeFromCart: (productId) => {
    const { cartItems } = get();

    const newCartItems = cartItems.filter(
      (item) => item.product.id !== productId,
    );

    set({ cartItems: newCartItems });
    setItemLocalStorage("cartItems", newCartItems);
  },
  updateQuantity: (productId, quantity) => {
    const { cartItems, removeFromCart } = get();

    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    const newCartItems = cartItems.map((item) =>
      item.product.id === productId ? { ...item, quantity: quantity } : item,
    );

    set({ cartItems: newCartItems });
    setItemLocalStorage("cartItems", newCartItems);
  },
  calculateTotalPrice: () => {
    const { cartItems } = get();

    const totalPrice = cartItems.reduce((total, item) => {
      const itemTotal = item.product.price * item.quantity;
      return parseFloat((total + itemTotal).toFixed(2));
    }, 0);

    return totalPrice;
  },
}));
