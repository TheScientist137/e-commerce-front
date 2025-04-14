import { Link, useParams } from "react-router";
import { useShopContext } from '../hooks/useContext';

export default function ProductPage() {
  const { telescopes, mounts, addToCart } = useShopContext();
  const { id } = useParams();

  const products = [...telescopes, ...mounts];
  const selectedProduct = products.find(product => product.id === Number(id));

  console.log(selectedProduct);
  return (
    <section>
      <Link to='/'>Back shop</Link>

      {selectedProduct ? (
        <div>
          <div>
            <h2>{selectedProduct.name}</h2>
            <img src={selectedProduct.image} alt="image" />
            <p>{selectedProduct.brand}</p>
            <p>{selectedProduct.description}</p>
            <p>{selectedProduct.price}</p>
          </div>

          <div>
            <h3>Specific details</h3>
            {selectedProduct.product_type === 'telescope' && (
              <>
                <p>Telescope Type: {selectedProduct.telescope_type}</p>
                <p>Description: {selectedProduct.telescope_type_description}</p>
                <p>Optical Design: {selectedProduct.optical_design_type}</p>
                <p>Description: {selectedProduct.optical_design_description}</p>
              </>
            )}

            {selectedProduct.product_type === 'mount' && (
              <>
                <p>Mount Type: {selectedProduct.mount_type}</p>
                <p>Description: {selectedProduct.mount_type_description}</p>
              </>
            )}
          </ div>
        </div>
      ) : (<p>Telescope not found</p>)}

      <button onClick={() => addToCart(selectedProduct)}>
        <Link to='/cart'>Add to cart</Link>
      </button>
    </section>
  )
}