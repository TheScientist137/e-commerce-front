import { FormEvent, useState } from "react";
import { Product, ProductFormValues } from "../types/types";

export default function ProductForm() {
 const [formData, setFormData] = useState<ProductFormValues>({
  name: '',
  description: '',
  price: 0,
  brand: '',
  image: '',
  product_type: 'telescope',
  telescope_type: 1,
  optical_design: 1,
  mount_type: 1
 });

 const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
 }

 return (
  <form onSubmit={handleSubmit}>
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
       <option value={1}>Refractor</option>
       <option value={2}>Reflector</option>
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
       <option value={1}>Achromat</option>
       <option value={2}>Apochromat</option>
       <option value={3}>Newton</option>
       <option value={4}>Catadioptric</option>
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
       required
      >
       <option value={1}>Alt-azimuth</option>
       <option value={2}>Alt-azimuth with GoTo</option>
       <option value={3}>Equatorial</option>
       <option value={4}>Equatorial with GoTo</option>
      </select>
     </div>
    </>
   )}
  </form>

 )
}