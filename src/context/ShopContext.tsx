import { useEffect, useState } from "react";
import { ShopContext } from "./contexts.ts";
import { getProductsService, getTelescopesService, getMountsService } from "../services/shopService.ts";
import { getItem, setItem } from "../utils/localStorage.ts";
import { ProductType, CartItemType, TelescopeType, MountType } from '../types/types.ts';

export type ShopContextType = {
  products: ProductType[],
  telescopes: TelescopeType[],
  mounts: MountType[],
  cartItems: CartItemType[],
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>,
  fetchProducts: () => Promise<void>,
  setTelescopes: React.Dispatch<React.SetStateAction<TelescopeType[]>>,
  setMounts: React.Dispatch<React.SetStateAction<MountType[]>>
 }

export const ShopContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [telescopes, setTelescopes] = useState<TelescopeType[]>([]);
  const [mounts, setMounts] = useState<MountType[]>([]);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  // Save products, telescopes and mounts on localStorage?????
  const fetchProducts = async () => {
    try {
      const productsData = await getProductsService();
      setProducts(productsData);
      setItem('products', productsData); // Save telescopes on localStorage
      const telescopesData = await getTelescopesService();
      setTelescopes(telescopesData);
      setItem('telescopes', telescopesData);
      const mountsData = await getMountsService();
      setMounts(mountsData);
      setItem('mounts', mountsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    // Check localStorage for savedProducts
    const savedProducts = getItem('products');
    if (savedProducts) {
      setProducts(savedProducts);
    } else {
      // If no data on localStorage fetch from API
      fetchProducts();
    }

    // Load cart items from localStorage 
    const savedCartItems = getItem('savedItems');
    if (savedCartItems) setCartItems(savedCartItems);
  }, []);

  return (
    <ShopContext.Provider value={{
      products,
      cartItems,
      setProducts,
      fetchProducts,
      telescopes,
      mounts,
      setTelescopes,
      setMounts
    }}>
      {children}
    </ShopContext.Provider>)
}

