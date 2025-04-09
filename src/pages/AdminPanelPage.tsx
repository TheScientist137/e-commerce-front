import { useShopContext } from "../hooks/useContext"
import { addTelescopeService } from "../services/adminService";

export default function AdminPanelPage() {
  const { products } = useShopContext();

  const handleCreateProduct = async (formData) => {
    try {
      
    } catch (error) {
      console.error('Error creating new product', error);
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
        <thead></thead>
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
    </section>
  )
} 