import { useState } from "react";
import { useShopContext } from "../hooks/useContext.ts"
import { addProductService, updateProductService, deleteProductService } from "../services/adminService.ts";
import { getItem } from "../utils/localStorage.ts";
import ProductForm from "../components/ProductForm.tsx";
import ProductTable from "../components/ProductTable.tsx";
import { ProductFormType } from "../types/types.ts";

export default function AdminPanelPage() {
  // We need to handle the erros and improve user experience
  const { products, fetchProducts } = useShopContext();
  const [editingProductId, setEditingProductId] = useState<number | null>(null)
  const [formData, setFormData] = useState<ProductFormType>({
    name: '',
    description: '',
    brand: '',
    price: 0,
    image: '',
    product_type: 'telescope',
    telescope_type_id: 1,
    optical_design_id: 1,
    mount_type_id: 1
  });

  //const telescopes = products.filter((product) => product.product_type === 'telescope');
  //console.log(telescopes);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.type === 'number' ? Number(event.target.value) : event.target.value
    }));
  }

  // Set form with specific product data for edit
  const handleEdit = (id: number) => {
    const product = products.find((product) => product.id === id);
    if (!product) {
      alert('Product not found');
      return;
    }
    setEditingProductId(id);
    // Set default vaules for telescope/mount specific fields
    const defaultFormData = {
      name: product.name,
      description: product.description,
      brand: product.brand,
      price: product.price,
      image: product.image,
      product_type: product.product_type,
      telescope_type_id: 1,
      optical_design_id: 1,
      mount_type_id: 1
    };
    setFormData(defaultFormData);
  }

  const handleCancelEdit = () => {
    // Reset form data
    setFormData({
      name: '',
      description: '',
      brand: '',
      price: 0,
      image: '',
      product_type: 'telescope',
      telescope_type_id: 1,
      optical_design_id: 1,
      mount_type_id: 1
    });
    setEditingProductId(null);
  }

  const handleDelete = async (id: number, product_type: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
    try {
      const token = getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      await deleteProductService(id, token, { product_type });
      await fetchProducts(); // Refresh table with updated data
      console.log('Product deleted succesfully');
      alert('Product deleted succesfully');
    } catch (error) {
      console.error('Error deleting product', error);
      alert('Error deleting product');
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const token = getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      // Edit product ot add product
      if (editingProductId) {
        const updatedProduct = await updateProductService(editingProductId, token, formData);
        await fetchProducts(); // Refresh table with updated data
        console.log('Product updated succesfully', updatedProduct);
        alert('Product updated succesfully');
      } else {
        const addedProduct = await addProductService(formData, token);
        await fetchProducts(); // Refresh table with updated data
        console.log('Product added succesfully', addedProduct);
        alert('Product added succesfully');
        setEditingProductId(null);
      }
    } catch (error) {
      console.error('Error adding new product', error);
      alert('Error adding product');
    }
  }

  if (products.length === 0) return <p>No products found</p>;
  return (
    <section>
      <h2>Admin Panel</h2>

      <div>
        <button>All</button>
        <button>Telescopes</button>
        <button>Mounts</button>
      </div>

      <button>Add a new product</button>

      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ProductForm
        formData={formData}
        editingProductId={editingProductId}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancelEdit={handleCancelEdit}
      />


    </section>
  )
} 