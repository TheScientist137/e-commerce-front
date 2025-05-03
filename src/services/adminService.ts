export const addProductService = async (newProduct: FormData, token: string) => {
 const response = await fetch('http://localhost:3000/api/admin/products', {
  method: 'POST',
  credentials: 'include',
  headers: {
   'Authorization': `Bearer ${token}`
  },
  body: newProduct
 });
 if (!response.ok) {
  throw new Error('Failed to add new product');
 }
 const result = await response.json();
 return result;
}

export const updateProductService = async (
    id: number, 
    token: string, 
    updatedProduct: FormData
) => {
 const response = await fetch(`http://localhost:3000/api/admin/products/${id}`, {
  method: 'PUT',
  credentials: 'include',
  headers: {
   'Authorization': `Bearer ${token}`
  },
  body: updatedProduct
 });
 if (!response.ok) {
  throw new Error('Failed to update product');
 }
 const result = await response.json();
 return result;
}

export const deleteProductService = async (
 id: number,
 token: string,
 data: {
  productType: string,
  image_public_id: string
 }
) => {
 const response = await fetch(`http://localhost:3000/api/admin/products/${id}`, {
  method: 'DELETE',
  credentials: 'include',
  headers: {
   'Content-Type': 'application/json',
   'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
   productType: data.productType,
   image_public_id: data.image_public_id
  })
 });
 if (!response.ok) {
  throw new Error('Failed to delete product');
 }
 const result = await response.json();
 return result;
}