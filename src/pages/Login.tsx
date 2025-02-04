import { useState } from "react";
import { useNavigate } from "react-router";
import { useGlobalContext } from "../hooks/useGlobalContext";

export default function Login() {
 const [formData, setFormData] = useState({ email: '', password: '' });
 const navigate = useNavigate();
 const { setUser } = useGlobalContext();

 const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  setFormData(prevData => ({ ...prevData, [event.target.name]: event.target.value }));

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  try {
   const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    credentials: 'include', // Permite enviar cookies
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
   });

   if (!response.ok) throw new Error('Failed on login');

   const result = await response.json();
   
   console.log(result);
   setUser(result.user);
   navigate('/telescopes');

  } catch (error) {
   console.error(error)
  }
 }

 return (
  <form onSubmit={handleSubmit}>
   <label htmlFor="email">Email</label>
   <input type="email" name="email" value={formData.email} onChange={handleChange} />

   <label htmlFor="password">Password</label>
   <input type="password" name="password" value={formData.password} onChange={handleChange} />

   <button>Login</button>
  </form>
 )
}