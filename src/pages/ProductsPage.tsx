import { useShopContext } from "../hooks/useContext.ts"

export default function ProductsPage() {
 const { products } = useShopContext();
 console.log(products);
 return (
  <section>
   products
  </section>
 )
}