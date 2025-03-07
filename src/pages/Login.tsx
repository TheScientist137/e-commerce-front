import { useState } from "react";
import { useNavigate } from "react-router";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { setItem } from "../utils/localStorage";

export default function Login() {
 const navigate = useNavigate();
 const { setUser } = useGlobalContext();
 const [formData, setFormData] = useState({ email: '', password: '' });
 
 const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  setFormData(prevData => ({ ...prevData, [event.target.name]: event.target.value }));

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  try {
   const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
   });

   if (!response.ok) throw new Error('Failed on login');

   const result = await response.json();
   console.log(result.message);
   //Set token on localStorage after succesfull login
   setItem('token', result.token);

   // Set user name (comprobar si hace falta)
   setUser(result.user);
   navigate('/telescopes');
  } catch (error) {
   console.error(error)
  }
 }

 return (
  <section>
   <h2>TelescopEcommerce Login</h2>
   <h3>You need to login to proceed</h3>
   <form onSubmit={handleSubmit}>
    <label htmlFor="email">Email</label>
    <input type="email" name="email" value={formData.email} onChange={handleChange} />

    <label htmlFor="password">Password</label>
    <input type="password" name="password" value={formData.password} onChange={handleChange} />

    <button>Login</button>
   </form>
   <h3>Not yet registered?</h3>
   <button onClick={() => navigate('/signup')}>Create a new account now</button>
  </section>
 )
}