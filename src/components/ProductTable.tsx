import { ProductType } from "../types/types"

type ProductTableProps = {
  products: ProductType[],
  onEdit: (id: number) => void,
  onDelete: (id: number, product_type: string) => void
}

export default function ProductsTable({products, onEdit, onDelete}: ProductTableProps) {
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
        <td>{product.id}</td>
        <td>{product.product_type}</td>
        <td>{product.name}</td>
        <td>{product.brand}</td>
        <td>{product.price}</td>
        <td>{product.created_at}</td>
        <td>{product.updated_at}</td>
        <td>
          <button onClick={() => onEdit(product.id)}>Edit</button>
          <button onClick={() => onDelete(product.id, product.product_type)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
 )
}