import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getProductByIdService } from "../services/shopService.ts";
import { MountType, TelescopeType } from "../types/types.ts";
import { useShopContext } from "../hooks/useContext.ts";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useShopContext();
  const [selectedProduct, setSelectedProduct] = useState<TelescopeType | MountType | null>(null)


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          throw new Error('Id is missing');
        }
        const productData = await getProductByIdService(id);
        setSelectedProduct(productData);
      } catch (error) {
        console.error('Error fetching product by id', error);
      }
    }
    fetchProduct();
  }, [id])

  if (!selectedProduct) {
    return <div>Loading product...</div>
  }
  return (
    <section>
      <Link to='/'>Back shop</Link>

      <div>
        <h3>{selectedProduct.brand}</h3>
        <h3>{selectedProduct.name}</h3>
        <img src={selectedProduct.image} alt="product image" />
        <p>{selectedProduct.price}</p>
        <button onClick={() => addToCart(selectedProduct)}>
          <Link to='/cart'>ADD TO CART</Link>
        </button>
      </div>
      <div>
        <h3>Product Description</h3>
        <p>{selectedProduct.description}</p>
      </div>
      <div>
        <h3>Specifications</h3>
        {selectedProduct.product_type === 'telescope' && (
          <div>
            <p>Telescope Type: {(selectedProduct as TelescopeType).telescope_type}</p>
            <p>{(selectedProduct as TelescopeType).telescope_type_description}</p>
            <p>Optical Design: {(selectedProduct as TelescopeType).optical_design_type}</p>
            <p>{(selectedProduct as TelescopeType).optical_design_description}</p>
          </div>
        )}
        {selectedProduct.product_type === 'mount' && (
          <div>
            <p>Mount Type: {(selectedProduct as MountType).mount_type}</p>
            <p>{(selectedProduct as MountType).mount_type_description}</p>
          </div>
        )}
      </div>

    </section>
  )
}
