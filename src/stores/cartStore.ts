import { create } from "zustand";
import { ProductType } from "../types/types";

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

export const useCartStore = create<CartStoreType>((set, get) => ({
  // STATE AND SETTER
  cartItems: [],
  setCartItems: (items) => set({ cartItems: items }),

  // FUNCTIONS
  addToCart: (product) => {
    const cartItems = get().cartItems;
    const existing = cartItems.find((item) => item.product.id === product.id);
    if (existing) {
      set({
        cartItems: cartItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      });
    } else {
      set({ cartItems: [...cartItems, { product, quantity: 1 }] });
    }
  },
  removeFromCart: (productId) => {
    set({
      cartItems: get().cartItems.filter(
        (item) => item.product.id !== productId,
      ),
    });
  },
  updateQuantity: (productId, quantity) => {
    if (quantity < 1) {
      get().removeFromCart(productId);
      return;
    }
    set({
      cartItems: get().cartItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    });
  },
  calculateTotalPrice: () => {
    const cartItems = get().cartItems;
    return cartItems.reduce((total, item) => {
      const itemTotal = item.product.price * item.quantity;
      return parseFloat((total + itemTotal).toFixed(2));
    }, 0);
  },
}));
