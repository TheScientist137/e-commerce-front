import { useState } from 'react';
import { useAuthContext } from '../hooks/useContext';
import { NewTelescope, NewMount } from '../types/types';
import { getItem, setItem } from '../utils/localStorage';
import { useShopContext } from '../hooks/useContext';
import {
  addTelescopeService,
  addMountService,
  deleteMountService,
  deleteTelescopeService
} from '../services/adminService';

// Comprobar el uso de ProtectedRoute para mejorar el rendering !!!!!!!!!!
export default function AdminPanel() {
  const token = getItem('token');
  const { isAdmin } = useAuthContext();
  const { telescopes, mounts, setMounts, setTelescopes } = useShopContext();
  const [newTelescope, setNewTelescope] = useState<NewTelescope>({
    name: '',
    description: '',
    price: 0,
    brand: '',
    image: '',
    telescope_type_id: 1,
    optical_design_id: 1
  });
  const [newMount, setNewMount] = useState<NewMount>({
    name: '',
    description: '',
    price: 0,
    brand: '',
    image: '',
    mount_type_id: 1,
  })

  // --- ADD A NEW TELESCOPE / MOUNT
  const handleTelescopeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTelescope(prevData => ({ ...prevData, [event.target.name]: event.target.value }));
  }

  const handleMountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMount(prevData => ({ ...prevData, [event.target.name]: event.target.value }));
  }

  const handleTelescopeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const addedTelescope = await addTelescopeService(newTelescope, token);
      const updatedTelescopes = [addedTelescope, ...telescopes];
      setTelescopes(updatedTelescopes);
      setItem('telescopes', updatedTelescopes);
      setNewTelescope({
        name: '',
        description: '',
        price: 0,
        brand: '',
        image: '',
        telescope_type_id: 1,
        optical_design_id: 1
      });
    } catch (error) {
      console.error('Error adding new telescope', error);
      throw error;
    }
  }

  const handleMountSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const addedMount = await addMountService(newMount, token);
      const updatedMounts = [addedMount, ...mounts];
      setMounts(updatedMounts);
      setItem('mounts', updatedMounts);
      setNewMount({
        name: '',
        description: '',
        price: 0,
        brand: '',
        image: '',
        mount_type_id: 1,
      })
    } catch (error) {
      console.error('Error adding new mount', error);
      throw error;
    }
  }

  // DELETE AN EXISTING TELESCOPE / MOUNT
  const handleDeleteTelescope = async (id: number) => {
    window.confirm('Are you sure you want to delete this telescope?');
    try {
      await deleteTelescopeService(id, token);
      const updatedTelescopes = telescopes.filter(telescope => telescope.id !== id);
      setTelescopes(updatedTelescopes);
      setItem('telescopes', updatedTelescopes);
    } catch (error) {
      console.error('Error deleting this telescope', error);
      throw error;
    }
  }

  const handleDeleteMount = async (id: number) => {
    window.confirm('Are you sure you want to delete this mount?');
    try {
      await deleteMountService(id, token);
      const updatedMounts = mounts.filter(mount => mount.id !== id);
      setMounts(updatedMounts);
      setItem('mounts', updatedMounts);
    } catch (error) {
      console.error('Error deleting mount', error);
      throw error;
    }
  }

  // UPDATE AN EXISTING TELESCOPE / MOUNT

  // Configurar ProtectedRoute => Solucion mas estable
  if (!isAdmin) {
    return <div>You do not have rights to access this page</div>
  }

  // Just one form -- manage different types of products
  return (
    <div>
      <h2>Admin Panel</h2>

      <div>
        <h3>Add new telescope</h3>
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

      <div>
        <h3>Add new mount</h3>
        <form onSubmit={handleMountSubmit}>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name='name'
            value={newMount.name}
            onChange={handleMountChange}
            required />

          <label htmlFor="description">Description: </label>
          <input
            type="text"
            name='description'
            value={newMount.description}
            onChange={handleMountChange}
            required />

          <label htmlFor="price">Price: </label>
          <input
            type="number"
            min='0'
            step='0.01'
            name='price'
            value={newMount.price}
            onChange={handleMountChange}
            required />

          <label htmlFor="brand">Brand: </label>
          <input
            type="text"
            name='brand'
            value={newMount.brand}
            onChange={handleMountChange}
            required />

          <label htmlFor="image">Image: </label>
          <input
            type="text"
            name='image'
            value={newMount.image}
            onChange={handleMountChange} />

          <label htmlFor="mount_type_id">Telescope Type: </label>
          <input
            type="number"
            name='mount_type_id'
            min='1'
            max='2'
            value={newMount.mount_type_id}
            onChange={handleMountChange}
            required />

          <button>Add</button>
        </form>
      </div>

      <div>
        <h3>Existing Telescopes</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {telescopes.map((telescope) => (
              <tr key={telescope.id}>
                <td>{telescope.name}</td>
                <td>{telescope.brand}</td>
                <td>{telescope.price}</td>
                <td>
                  <button onClick={() => handleDeleteTelescope(telescope.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div>
        <h3>Existing Mounts</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {mounts.map((mount) => (
              <tr key={mount.id}>
                <td>{mount.name}</td>
                <td>{mount.brand}</td>
                <td>{mount.price}</td>
                <td>
                  <button onClick={() => handleDeleteMount(mount.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}