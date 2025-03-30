import { NewTelescope } from "../types/types"

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