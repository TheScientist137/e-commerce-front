import { ProductType } from "../types/types"

type ProductTableProps = {
  products: ProductType[],
  onEdit: (id: number) => void,
  onDelete: (id: number, product_type: string, image_public_id: string) => void
}

export default function ProductsTable({ products, onEdit, onDelete }: ProductTableProps) {

  return (
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
            <td>
              {product.image && (<img src={product.image} alt="image" style={{ maxWidth: '200px' }} />)}
            </td>
            <td>{product.id}</td>
            <td>{product.product_type}</td>
            <td>{product.name}</td>
            <td>{product.brand}</td>
            <td>{product.price}</td>
            <td>{new Date(product.created_at).toLocaleDateString()}</td>
            <td>{new Date(product.updated_at).toLocaleDateString()}</td>
            <td>
              <button onClick={() => onEdit(product.id)}>Edit</button>
              <button onClick={() => onDelete(product.id, product.product_type, product.image_public_id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}