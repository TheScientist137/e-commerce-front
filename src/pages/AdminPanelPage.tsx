import { useState } from "react";
import { useShopContext } from "../hooks/useContext.ts"
import { addProductService, updateProductService, deleteProductService } from "../services/adminService.ts";
import { getItem } from "../utils/localStorage.ts";
import ProductForm from "../components/ProductForm.tsx";
import ProductTable from "../components/ProductTable.tsx";
import ModalForm from "../components/ModalForm.tsx";
import { ProductFormType, ProductType } from "../types/types.ts";

export default function AdminPanelPage() {
  // We need to handle the erros and improve user experience
  const { products, fetchProducts } = useShopContext();
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(products);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [showModalForm, setShowModalForm] = useState<boolean>(false);
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

  // Filter Products on table
  const telescopes = products.filter((product) => product.product_type === 'telescope');
  const mounts = products.filter((product) => product.product_type === 'mount');

  // HANDLERS
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.type === 'number' ? Number(event.target.value) : event.target.value
    }));
  }

  const handleAdd = () => {
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
    })
    setShowModalForm(true);
  }

  const handleEdit = (id: number) => {
    // Set form with specific product data for edit
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
    setShowModalForm(true)
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
    setShowModalForm(false);
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
        <button onClick={() => setFilteredProducts(products)}>All</button>
        <button onClick={() => setFilteredProducts(telescopes)}>Telescopes</button>
        <button onClick={() => setFilteredProducts(mounts)}>Mounts</button>
      </div>

      <button onClick={handleAdd}>Add a new product</button>

      <ProductTable
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ModalForm
        showModalForm={showModalForm}
        title={editingProductId ? 'Update Product' : 'Add Product'}
        onClose={handleCancelEdit}
      >

        <ProductForm
          formData={formData}
          editingProductId={editingProductId}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancelEdit={handleCancelEdit}
        />
      </ModalForm>
    </section>
  )
} 