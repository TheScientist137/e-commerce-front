import { ProductForm } from "../types/types.ts";

// Probar primero sin token!!!!
export const addProductService = async (newProduct: ProductForm, token: string) => {
 const response = await fetch('http://localhost:3000/api/admin/products', {
  method: 'POST',
  credentials: 'include',
  headers: {
   'Content-Type': 'application/json',
   'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(newProduct)
 });

 if (!response.ok) throw new Error('Failed to add new product');
 return await response.json();
}
