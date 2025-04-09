import { useState } from "react";
import { Product, ProductFormValues } from "../types/types";

export default function ProductForm() {
 const [formData, setFormData] = useState<ProductFormValues>({
  name: '',
  description: '',
  price: 0,
  brand: '',
  image: '',
  product_type: 'telescope',
  telescope_type: undefined,
  optical_design: undefined,
  mount_type: undefined
 });

 return (
  <form action="">
   <div>
    <label htmlFor="product_type">Product Type:</label>
    <select
     id="product_type"
     name="product_type"
     value={formData.product_type}
     required
    >
     <option value="telescope">Telescope</option>
     <option value="mount">Mount</option>
    </select>
   </div>

   <div>
    <label htmlFor="name">Name</label>
    <input
     type="text"
     id="name"
     name="name"
     value={formData.name}
     required
    />
   </div>

   <div>
    <label htmlFor="description">Description</label>
    <input
     type="text"
     id="description"
     name="description"
     value={formData.description}
     required
    />
   </div>

   <div>
    <label htmlFor="brand">Brand</label>
    <input
     type="text"
     id="brand"
     name="brand"
     value={formData.brand}
     required
    />
   </div>

   <div>
    <label htmlFor="price">Price</label>
    <input
     type="number"
     id="price"
     name="price"
     value={formData.price}
     required
    />
   </div>

   <div>
    <label htmlFor="image">Image</label>
    <input
     type="text"
     id="image"
     name="image"
     value={formData.image}
     required
    />
   </div>

   {formData.product_type === 'telescope' ? (
    <>
     <div>
      <label htmlFor="telescope_type">Telescope Type</label>
      <select
       id=""
       name="telescope_type"
       value={formData.telescope_type}
       required
      >
       <option value="Refractor">Refractor</option>
       <option value="Reflector">Reflector</option>
      </select>
     </div>

     <div>
      <label htmlFor="optical_design">Optical Design</label>
      <select
       id="optical_design"
       name="optical_design"
       value={formData.optical_design}
       required
      >
       <option value="Achromat">Achromat</option>
       <option value="Apochromat">Apochromat</option>
       <option value="Newton">Newton</option>
       <option value="Catadioptric">Catadioptric</option>
      </select>
     </div>
    </>
   ) : (
    <>
     <div>
      <label htmlFor="mount_type">Mount Type</label>
      <select
       id="mount_type"
       name="mount_type"
       value={formData.mount_type}
      >
       <option value="Alt-azimuth">Alt-azimuth</option>
       <option value="Alt-azimuth with GoTo">Alt-azimuth with GoTo</option>
       <option value="Equatorial">Equatorial</option>
       <option value="Equatorial with GoTo">Equatorial with GoTo</option>
      </select>
     </div>
    </>
   )}
  </form>

 )
}