import { MountType, ProductType, TelescopeType } from "../types/types.ts";

export const getProductsService = async (): Promise<ProductType[]> => {
 const response = await fetch('http://localhost:3000/api/shop/products', {
  credentials: 'include'
 });
 if (!response.ok) throw new Error('Failed to fetch products');
 const data = await response.json();
 return data.products;
}

export const getTelescopesService = async (): Promise<TelescopeType[]> => {
 const response = await fetch('http://localhost:3000/api/shop/telescopes', {
  credentials: 'include'
 });
 if (!response.ok) throw new Error('Failed to fetch telescopes');
 const data = await response.json();
 return data.telescopes;
}

export const getMountsService = async (): Promise<MountType[]> => {
 const response = await fetch('http://localhost:3000/api/shop/mounts', {
  credentials: 'include'
 });
 if (!response.ok) throw new Error('Failed to fetch mounts');
 const data = await response.json();
 return data.mounts;
}