import { useState } from 'react';
import { useAuthContext } from '../hooks/useContext';
import { addTelescopeService } from '../services/adminService';
import { NewTelescope } from '../types/types';
import { getItem } from '../utils/localStorage';
import { useShopContext } from '../hooks/useContext';

// Comprobar el uso de ProtectedRoute para mejorar el rendering !!!!!!!!!!
export default function AdminPanel() {
 const { isAdmin } = useAuthContext();
 // const { setTelescopes } = useShopContext();
 const [newTelescope, setNewTelescope] = useState<NewTelescope>({
  name: '',
  description: '',
  price: 0,
  brand: '',
  image: '',
  telescope_type_id: 1,
  optical_design_id: 1
 });

 const handleTelescopeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setNewTelescope(prevData => ({ ...prevData, [event.target.name]: event.target.value }));
 }


 const handleTelescopeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const token = getItem('token');
  try {
    await addTelescopeService(newTelescope, token);
   // setTelescopes(prev => [...prev, createdTelescope]);
  } catch (error) {
   console.error('Error adding new telescope', error);
   throw error;
  }
 }

 // Handle update telescope data
 // Handle update mount data
 // Handle delete telescope data
 // Handle delete mount data

 // Configurar ProtectedRoute => Solucion mas estable
 if (!isAdmin) {
  return <div>You do not have rights to access this page</div>
 }

 // Just one form -- manage different types of products
 return (
  <div>
   <h2>Admin Panel</h2>

   <div>
    <h3>Manage Telescopes</h3>
    <form onSubmit={handleTelescopeSubmit}>
     <label htmlFor="name">Name: </label>
     <input
      type="text"
      name='name'
      value={newTelescope.name}
      onChange={handleTelescopeChange}
      required />

     <label htmlFor="description">Description: </label>
     <input
      type="text"
      name='description'
      value={newTelescope.description}
      onChange={handleTelescopeChange}
      required />

     <label htmlFor="price">Price: </label>
     <input
      type="number"
      min='0'
      step='0.01'
      name='price'
      value={newTelescope.price}
      onChange={handleTelescopeChange}
      required />

     <label htmlFor="brand">Brand: </label>
     <input
      type="text"
      name='brand'
      value={newTelescope.brand}
      onChange={handleTelescopeChange}
      required />

     <label htmlFor="image">Image: </label>
     <input
      type="text"
      name='image'
      value={newTelescope.image}
      onChange={handleTelescopeChange} />

     <label htmlFor="telescope_type_id">Telescope Type: </label>
     <input
      type="number"
      name='telescope_type_id'
      min='1'
      max='2'
      value={newTelescope.telescope_type_id}
      onChange={handleTelescopeChange}
      required />

     <label htmlFor="optical_design_id">Optical Design Type: </label>
     <input
      type=" number"
      name='optical_design_id'
      value={newTelescope.optical_design_id}
      onChange={(e) => setNewTelescope(prev => ({
       ...prev, telescope_type_id: parseInt(e.target.value)
      }))}
      required />

     <button>Add</button>
    </form>
   </div>
  </div>
 )
}