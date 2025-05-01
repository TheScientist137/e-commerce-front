import { useState } from "react";
import { useShopContext } from "../hooks/useContext.ts";
import {
  addProductService,
  updateProductService,
  deleteProductService,
} from "../services/adminService.ts";
import { getItem, removeItem } from "../utils/localStorage.ts";
import ProductForm from "../components/ProductForm.tsx";
import ProductTable from "../components/ProductTable.tsx";
import FormModal from "../components/FormModal.tsx";
import FilterButtons from "../components/FilterButtons.tsx";
import { ProductFormType } from "../types/types.ts";

export default function AdminPanelPage() {
  // We need to handle the erros and improve user experience
  const { products, fetchProducts, filteredProducts } = useShopContext();
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [showModalForm, setShowModalForm] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<ProductFormType>({
    name: "",
    description: "",
    brand: "",
    price: 0,
    image: "",
    product_type: "telescope",
    telescope_type_id: 1,
    optical_design_id: 1,
    mount_type_id: 1,
  });

  // HANDLERS
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]:
        event.target.type === "number"
          ? Number(event.target.value)
          : event.target.value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files[0]) {
      setImageFile(files[0]);
    }
  };

  const handleAdd = () => {
    setFormData({
      name: "",
      description: "",
      brand: "",
      price: 0,
      image: "",
      product_type: "telescope",
      telescope_type_id: 1,
      optical_design_id: 1,
      mount_type_id: 1,
    });
    setShowModalForm(true);
  };

  const handleEdit = (id: number) => {
    // Set form with specific product data for edit
    const product = products.find((product) => product.id === id);
    if (!product) {
      alert("Product not found");
      return;
    }
    setEditingProductId(id);
    const defaultFormData = {
      name: product.name,
      description: product.description,
      brand: product.brand,
      price: product.price,
      image: product.image || "",
      product_type: product.product_type,
      telescope_type_id: 1,
      optical_design_id: 1,
      mount_type_id: 1,
    };
    setFormData(defaultFormData);
    setShowModalForm(true);
  };

  const handleCancelEdit = () => {
    // Reset form data
    setFormData({
      name: "",
      description: "",
      brand: "",
      price: 0,
      image: "",
      product_type: "telescope",
      telescope_type_id: 1,
      optical_design_id: 1,
      mount_type_id: 1,
    });
    setEditingProductId(null);
    setShowModalForm(false);
  };

  const handleDelete = async (
    id: number,
    productType: string,
    image_public_id: string
  ) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    try {
      const token: string | null = getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
      await deleteProductService(id, token, {
        productType,
        image_public_id,
      });
      removeItem("products");
      await fetchProducts(); // Refresh table with updated data
      alert("Product deleted succesfully");
    } catch (error) {
      console.error("Error deleting product", error);
      alert("Error deleting product");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const token: string | null = getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
      if (!imageFile) {
        throw new Error("Image is required");
      }

      // Create FormData and add image data
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "image") {
          formDataToSend.append(key, String(value));
        }
      });
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      // If editing edit product else add product
      if (editingProductId) {
        const product = products.find(
          (product) => product.id === editingProductId
        );
        if (product) {
          formDataToSend.append("image_public_id", product.image_public_id);
        }

        await updateProductService(editingProductId, token, formDataToSend);
        alert("Product updated succesfully");
      } else {
        await addProductService(formDataToSend, token);
        alert("Product added succesfully");
      }
      await fetchProducts(); // Refresh table with updated data

      setShowModalForm(false);
      setEditingProductId(null);
      setImageFile(null);
    } catch (error) {
      console.error("Error adding new product", error);
      alert("Error adding product");
    }
  };

  // Mejorar despues;
  if (products.length === 0) return <p>No products found</p>;
  return (
    <section>
      <h2>Admin Panel</h2>

      <FilterButtons />
      <button onClick={handleAdd}>Add a new product</button>

      {products.length !== 0 ? (
        <ProductTable
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <p>No Products</p>
      )}

      <FormModal
        showModalForm={showModalForm}
        title={editingProductId ? "Update Product" : "Add Product"}
        onClose={handleCancelEdit}
      >
        <ProductForm
          formData={formData}
          editingProductId={editingProductId}
          onChange={handleChange}
          onImageChange={handleImageChange}
          onSubmit={handleSubmit}
          onCancelEdit={handleCancelEdit}
        />
      </FormModal>
    </section>
  );
}
