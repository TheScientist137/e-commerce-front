import { useState } from 'react';
import { useAuthContext } from '../hooks/useContext';
import { Telescope, Mount } from '../types/types';

export default function AdminPanel() {
 const { isAdmin } = useAuthContext();
 const [newTelescope, setNewTelescope] = useState<Omit<Telescope, 'id'>>({
  name: '',
  description: '',
  price: 0,
  brand: '',
  image: '',
  telescope_type: '',
  telescope_type_description: '',
  optical_design_type: ''
 });

 const [newMount, setNewMount] = useState<Omit<Mount, 'id'>>({
  name: '',
  description: '',
  price: 0,
  brand: '',
  image: '',
  mount_type: '',
  mount_type_description: ''
 })

 const handleTelescopeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setNewTelescope(prevData => ({ ...prevData, [event.target.name]: event.target.value }));
 }

 const handleMountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setNewMount(prevData => ({ ...prevData, [event.target.name]: event.target.value }));
 }

 const handleTelescopeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
 }

 const handleMountSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
 }

 // Handle update telescope data
 // Handle update mount data
 // Handle delete telescope data
 // Handle delete mount data

 if (!isAdmin) {
  return <div>You do not have rights to access this page</div>
 }
 return (
  <div>
   <h2>Admin Panel</h2>

   <div>
    <h3>Manage Telescopes</h3>
    <form onSubmit={handleTelescopeSubmit}>
     <label htmlFor="">Name: </label>
     <input type="text" value={newTelescope.name} onChange={handleTelescopeChange} />

     <label htmlFor="">Description: </label>
     <input type="text" value={newTelescope.description} onChange={handleTelescopeChange} />

     <label htmlFor="">Price: </label>
     <input type="text" value={newTelescope.price} onChange={handleTelescopeChange} />

     <label htmlFor="">Brand: </label>
     <input type="text" value={newTelescope.brand} onChange={handleTelescopeChange} />

     <label htmlFor="">Image: </label>
     <input type="text" value={newTelescope.image} onChange={handleTelescopeChange} />

     <label htmlFor="">Telescope Type: </label>
     <input type="text" value={newTelescope.telescope_type} onChange={handleTelescopeChange} />

     <label htmlFor="">Telescope Type Description: </label>
     <input type="text" value={newTelescope.telescope_type_description} onChange={handleTelescopeChange} />

     <label htmlFor="">Optical Design Type: </label>
     <input type="text" value={newTelescope.optical_design_type} onChange={handleTelescopeChange} />
    </form>
   </div>

   <div>
    <h3>Manage Mounts</h3>
    <form onSubmit={handleMountSubmit}>
     <label htmlFor="">Name: </label>
     <input type="text" value={newMount.name} onChange={handleMountChange} />

     <label htmlFor="">Description: </label>
     <input type="text" value={newMount.description} onChange={handleMountChange} />

     <label htmlFor="">Price: </label>
     <input type="text" value={newMount.price} onChange={handleMountChange} />

     <label htmlFor="">Brand: </label>
     <input type="text" value={newMount.brand} onChange={handleMountChange} />

     <label htmlFor="">Image: </label>
     <input type="text" value={newMount.image} onChange={handleMountChange} />

     <label htmlFor="">Telescope Type: </label>
     <input type="text" value={newMount.mount_type} onChange={handleMountChange} />

     <label htmlFor="">Telescope Type Description: </label>
     <input type="text" value={newMount.mount_type_description} onChange={handleMountChange} />
    </form>
   </div>
  </div>
 )
}