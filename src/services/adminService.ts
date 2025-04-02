import { NewMount, NewTelescope } from "../types/types"

export const addTelescopeService = async (newTelescope: NewTelescope, token: string) => {
 const response = await fetch('http://localhost:3000/api/admin/telescopes', {
  method: 'POST',
  credentials: 'include',
  headers: {
   'Content-Type': 'application/json',
   'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(newTelescope)
 });

 if (!response) throw new Error('Failed to add new telescope');
 return await response.json();
}

export const deleteTelescopeService = async (id: number, token: string) => {
 const response = await fetch(`http://localhost:3000/api/admin/telescopes/${id}`, {
  method: 'DELETE',
  credentials: 'include',
  headers: {
   'Content-Type': 'application/json',
   'Authorization': `Bearer ${token}`
  }
 });

 if (!response.ok) throw new Error('Failed to delete telescope');
 return id;
}

export const addMountService = async (newMount: NewMount, token: string) => {
 const response = await fetch('http://localhost:3000/api/admin/mounts', {
  method: 'POST',
  credentials: 'include',
  headers: {
   'Content-Type': 'application/json',
   'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(newMount)
 });

 if (!response) throw new Error('Failed to add new mount');
 return await response.json();
}

export const deleteMountService = async (id: number, token: string) => {
 const response = await fetch(`http://localhost:3000/api/admin/mounts/${id}`, {
  method: 'DELETE',
  credentials: 'include',
  headers: {
   'Content-Type': 'application/json',
   'Authorization': `Bearer ${token}`
  }
 });

 if (!response.ok) throw new Error('Failed to delete mount');
 return id;
}