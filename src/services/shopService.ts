import { Product } from "../types/types.ts";

export const getProductsService = async (): Promise<Product[]> => {
 const response = await fetch('http://localhost:3000/api/shop/products', {
  credentials: 'include'
 });
 if (!response.ok) throw new Error('Failed to fetch products');
 const data = await response.json();
 return data.products;
}