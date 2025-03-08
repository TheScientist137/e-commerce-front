import { Telescope } from "../context/GlobalContext";

// Fetch telescopes
export const fetchTelescopes = async (): Promise<Telescope[]> => {
 const response = await fetch('http://localhost:3000/api/shop/telescopes', {
  credentials: 'include',
 });

 if (!response.ok) throw new Error('Failed to fetch telescopes');
 const data = await response.json();
 return data.telescopes;
};