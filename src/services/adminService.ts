import { ProductFormType } from "../types/types.ts";

export const addProductService = async (newProduct: ProductFormType, token: string) => {
 const response = await fetch('http://localhost:3000/api/admin/products', {
  method: 'POST',
  credentials: 'include',
  headers: {
   'Content-Type': 'application/json',
   'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(newProduct)
 });
 if (!response.ok) {
  throw new Error('Failed to add new product');
 }
 const result = await response.json();
 return result;
}

export const updateProductService = async (id: number, token: string, updatedProduct: ProductFormType) => {
 const response = await fetch(`http://localhost:3000/api/admin/products/${id}`, {
  method: 'PUT',
  credentials: 'include',
  headers: {
   'Content-Type': 'application/json',
   'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(updatedProduct)
 });
 if (!response.ok) {
  throw new Error('Failed to update product');
 }
 const result = await response.json();
 return result;
}

export const deleteProductService = async (id: number, token: string, productType: { product_type: string }) => {
 const response = await fetch(`http://localhost:3000/api/admin/products/${id}`, {
  method: 'DELETE',
  credentials: 'include',
  headers: {
   'Content-Type': 'application/json',
   'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(productType)
 });
 if (!response.ok) {
  throw new Error('Failed to delete product');
 }
 const result = await response.json();
 return result;
}