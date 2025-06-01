import { useState } from "react";
import { Link } from "react-router";
import { ProductType } from "../types/types";

export default function ProductCard({ product }: { product: ProductType }) {
  const [showFullName, setShowFullName] = useState(false);
  const maxWords = 4;

  return (
    <div
      className="flex h-full flex-col justify-between rounded-lg  p-4 text-center shadow-lg inset-shadow-sm"
      key={product.id}
    >
      <div className="mb-3 flex h-auto w-full items-center justify-center overflow-hidden rounded border border-gray-400 bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex font-medium flex-grow flex-col justify-between mb-2">
        <div className="">
          <p className="text-gray-400 mb-2">{product.brand_name}</p>
          <h3 className="text-base">{product.name}</h3>
        </div>
        <p className="text-gray-600">{product.price} $</p>
      </div>

      <Link
        className="underline"
        to={`/product/${product.product_type}/${product.id}`}
      >
        View details
      </Link>
    </div>
  );
}
