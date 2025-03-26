import { useShopContext } from "../hooks/useContext";
import { Link } from "react-router";
import { getItem } from "../utils/localStorage";
import { Telescope, Mount } from "../types/types";

export default function ProductPage() {
 const { setCartItems } = useShopContext();

 // Change to get selected products
 const selectedProduct: Telescope | Mount = getItem('selectedProduct');
 console.log(selectedProduct.image);

 // Add a product to the shopping cart or
 // increment quantity if the product already exists in the shopping cart
 const addToCart = (product: Telescope | Mount) => {
  if (!product) return;

  setCartItems((prevState) => {
   const existingItem = prevState.find(item => item.product.id === product.id);
   // If existingItem exists return a new array with the quantity of that item incremented
   if (existingItem) {
    return prevState.map(item =>
     item.product.id === product.id
      ? { ...item, quantity: item.quantity + 1 }
      : item
    ); // Otherwise return a new array with the prevState and the new item
   } else {
    return [...prevState, { product: product, quantity: 1 }];
   }
  });
 }

 return (
  <section>
   <Link to='/'>Back shop</Link>

   {selectedProduct ? (
    <div>
     <h3>{selectedProduct.name}</h3>
     <img src={selectedProduct.image} alt="image" />
     <p>{selectedProduct.brand}</p>
     <p>{selectedProduct.description}</p>
     <p>{selectedProduct.price}</p>
    </div>
   ) : (<p>Telescope not found</p>)}

   <button onClick={() => addToCart(selectedProduct)}>
    <Link to='/cart'>Add to cart</Link>
   </button>
  </section>
 )
}