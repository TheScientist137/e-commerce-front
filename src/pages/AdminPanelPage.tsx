import { useState } from "react";
import { useShopContext } from "../hooks/useContext.ts"
import { addProductService } from "../services/adminService.ts";
import { getItem } from "../utils/localStorage.ts";
import { ProductForm } from "../types/types.ts";

export default function AdminPanelPage() {
  const { products } = useShopContext();
  const [formData, setFormData] = useState<ProductForm>({
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const token = getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      const addedProduct = await addProductService(formData, token);
      console.log('Product added succesfully', addedProduct);
      alert('Product added succesfully');
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

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Type</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.product_type}</td>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.price}</td>
              <td>{product.created_at}</td>
              <td>{product.updated_at}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="image">Image</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="product_type">Product Type:</label>
          <select
            id="product_type"
            name="product_type"
            value={formData.product_type}
            onChange={handleChange}
            required
          >
            <option value="telescope">Telescope</option>
            <option value="mount">Mount</option>
          </select>
        </div>

        {formData.product_type === 'telescope' ? (
          <>
            <div>
              <label htmlFor="telescope_type">Telescope Type</label>
              <select
                id=""
                name="telescope_type"
                value={formData.telescope_type_id}
                onChange={handleChange}
                required
              >
                <option value={1}>Refractor</option>
                <option value={2}>Reflector</option>
              </select>
            </div>

            <div>
              <label htmlFor="optical_design">Optical Design</label>
              <select
                id="optical_design"
                name="optical_design"
                value={formData.optical_design_id}
                onChange={handleChange}
                required
              >
                <option value={1}>Achromat</option>
                <option value={2}>Apochromat</option>
                <option value={3}>Newton</option>
                <option value={4}>Catadioptric</option>
              </select>
            </div>
          </>
        ) : (
          <>
            <div>
              <label htmlFor="mount_type">Mount Type</label>
              <select
                id="mount_type"
                name="mount_type"
                value={formData.mount_type_id}
                onChange={handleChange}
                required
              >
                <option value={1}>Alt-azimuth</option>
                <option value={2}>Alt-azimuth with GoTo</option>
                <option value={3}>Equatorial</option>
                <option value={4}>Equatorial with GoTo</option>
              </select>
            </div>
          </>
        )}

        <button type="submit">Add</button>
      </form>
    </section>
  )
} 