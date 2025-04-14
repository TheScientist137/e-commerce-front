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
  filteredProducts: ProductType[] | TelescopeType[] | MountType[],
  selectedCategory: string,
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>,
  setTelescopes: React.Dispatch<React.SetStateAction<TelescopeType[]>>,
  setMounts: React.Dispatch<React.SetStateAction<MountType[]>>,
  setFilteredProducts: React.Dispatch<React.SetStateAction<ProductType[] | TelescopeType[] | MountType[]>>,
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>,
  fetchProducts: () => Promise<void>,
  filterProducts: (category: string, type: string, opticalDesign?: string) => void
}

export const ShopContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [telescopes, setTelescopes] = useState<TelescopeType[]>([]);
  const [mounts, setMounts] = useState<MountType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[] | TelescopeType[] | MountType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  // Save products, telescopes and mounts on localStorage?????
  const fetchProducts = async () => {
    try {
      const productsData = await getProductsService();
      const telescopesData = await getTelescopesService();
      const mountsData = await getMountsService();

      setProducts(productsData);
      setTelescopes(telescopesData);
      setMounts(mountsData);
      setFilteredProducts(productsData);
      // Save products, telescopes and mounts on localStorage
      setItem('products', productsData);
      setItem('telescopes', telescopesData);
      setItem('mounts', mountsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filterProducts = (category: string, type: string, opticalDesign?: string) => {
    setSelectedCategory(category);
    setSelectedType(type); // work on it later

    if (category === 'all') {
      setFilteredProducts(products);
      return;
    }
    if (category === 'telescopes') {
      if (type === 'all' && opticalDesign === 'all') {
        setFilteredProducts(telescopes);
      } else if (type !== 'all') {
        const filteredTelescopes = telescopes.filter((telescope) => telescope.telescope_type === type);
        setFilteredProducts(filteredTelescopes);
      } else if (opticalDesign !== 'all') {
        const filteredTelescopes = telescopes.filter((telescope) => telescope.optical_design_type === opticalDesign);
        setFilteredProducts(filteredTelescopes);
      }
    } else if (category === 'mounts') {
      if (type === 'all') {
        setFilteredProducts(mounts);
      } else {
        const filteredMounts = mounts.filter((mount) => mount.mount_type === type);
        setFilteredProducts(filteredMounts);
      }
    }
  }

  useEffect(() => {
    const savedProducts = getItem('products');
    const savedTelescopes = getItem('telescopes');
    const savedMounts = getItem('mounts');

    if (savedProducts && savedTelescopes && savedMounts) {
      setProducts(savedProducts);
      setTelescopes(savedTelescopes);
      setMounts(savedMounts);
      setFilteredProducts(savedProducts);
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
      filteredProducts,
      selectedCategory,
      cartItems,
      setProducts,
      setFilteredProducts,
      setSelectedCategory,
      fetchProducts,
      telescopes,
      mounts,
      setTelescopes,
      setMounts,
      filterProducts
    }}>
      {children}
    </ShopContext.Provider>)
}

