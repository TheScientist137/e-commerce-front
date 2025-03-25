import { Telescope, Mount } from "../types/types";

// Fetch telescopes
export const fetchTelescopes = async (): Promise<Telescope[]> => {
 const response = await fetch('http://localhost:3000/api/shop/telescopes', {
  credentials: 'include'
 });

 if (!response.ok) throw new Error('Failed to fetch telescopes');
 const data = await response.json();
 console.log(data);
 return data.telescopes;
};

// Fetch mounts
export const fetchMounts = async (): Promise<Mount[]> => {
 const response = await fetch('http://localhost:3000/api/shop/mounts', {
  credentials: 'include'
 });

 if (!response.ok) throw new Error('Failed to fetch mounts');
 const data = await response.json();
 console.log(data);
 return data.mounts;
}