import { useShopContext } from '../hooks/useContext.ts';

export default function FilterButtons() {
 const {
  selectedCategory,
  filterProducts,
  productsTypes
 } = useShopContext();

 return (
  <div>
   <div>
    <button onClick={() => filterProducts('products')}>All Products</button>
    <button onClick={() => filterProducts('telescopes', 'all types', 'all optical designs')}>Telescopes</button>
    <button onClick={() => filterProducts('mounts', 'all types')}>Mounts</button>
   </div>

   {selectedCategory === 'telescopes' && (
    <div>
     <div>
      {productsTypes.telescopeTypes.map((type) => (
       <button key={type.id} onClick={() => filterProducts('telescopes', type.type)}>
        {type.type}
       </button>
      ))}
     </div>
     <div>
      {productsTypes.opticalDesigns.map((design) => (
       <button key={design.id} onClick={() => filterProducts('telescopes', 'all types', design.type)}>
        {design.type}
       </button>
      ))}
     </div>
    </div>
   )}

   {selectedCategory === 'mounts' && (
    <div>
     <div>
      {productsTypes.mountTypes.map((type) => (
       <button key={type.id} onClick={() => filterProducts('mounts', type.type)}>
        {type.type}
       </button>
      ))}
     </div>
    </div>
   )}
  </div>
 )
}