import { ProductFormType } from "../types/types.ts";

type ProductFormProps = {
 formData: ProductFormType,
 editingProductId: number | null,
 onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
 onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
 onSubmit: (event: React.FormEvent) => void,
 onCancelEdit: () => void
}

export default function ProductForm({
 formData,
 editingProductId,
 onChange,
 onImageChange,
 onSubmit,
 onCancelEdit
}: ProductFormProps) {

 return (
  <form onSubmit={onSubmit}>
   <div>
    <label htmlFor="name">Name</label>
    <input
     type="text"
     id="name"
     name="name"
     value={formData.name}
     onChange={onChange}
     required
    />
   </div>

   <div>
    <label htmlFor="description">Description</label>
    <textarea
     id="description"
     name="description"
     value={formData.description}
     onChange={onChange}
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
     onChange={onChange}
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
     onChange={onChange}
     required
    />
   </div>

   <div>
    <label htmlFor="image">Image</label>
    <input
     type="file"
     accept="image/*"
     id="image"
     name="image"
     onChange={onImageChange}
     required
    />
   </div>

   <div>
    <label htmlFor="product_type">Product Type:</label>
    <select
     id="product_type"
     name="product_type"
     value={formData.product_type}
     onChange={onChange}
     required
    >
     <option value="telescope">Telescope</option>
     <option value="mount">Mount</option>
    </select>
   </div>

   {formData.product_type === 'telescope' ? (
    <>
     <div>
      <label htmlFor="telescope_type">Telescope Type</label>
      <select
       id="telescope_type"
       name="telescope_type_id"
       value={formData.telescope_type_id}
       onChange={onChange}
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
       name="optical_design_id"
       value={formData.optical_design_id}
       onChange={onChange}
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
       name="mount_type_id"
       value={formData.mount_type_id}
       onChange={onChange}
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

   <button type="submit">{editingProductId ? 'UPDATE' : 'ADD'}</button>
   {editingProductId && <button type="button" onClick={() => onCancelEdit()}>CANCEL</button>}
  </form>
 )
}