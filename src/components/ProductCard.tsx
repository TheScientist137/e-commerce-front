import { Link } from "react-router";
import { ProductType } from "../types/types";

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <div
      className="flex h-full flex-col justify-between rounded-lg bg-slate-50 p-4 text-center shadow-lg dark:bg-slate-700"
      key={product.id}
    >
      {/* Product Image */}
      <div className="flex h-42 w-full items-center justify-center overflow-hidden rounded bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="my-4 flex flex-grow flex-col justify-between font-medium">
        <div className="">
          <p className="text-gray-400">{product.brand_name}</p>
          <h3 className="font-mono font-semibold my-2 text-sm">{product.name}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{product.price} $</p>
      </div>

      {/* Link to SelectedProductPage */}
      <Link
        className="underline"
        to={`/product/${product.product_type}/${product.id}`}
      >
        View details
      </Link>
    </div>
  );
}
