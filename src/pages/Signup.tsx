import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { signup } from "../services/authService";

export default function Signup() {
 const [formData, setFormData] = useState({ name: '', email: '', password: '' });
 const navigate = useNavigate();

 const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  setFormData(prevData => ({ ...prevData, [event.target.name]: event.target.value }));

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  try {
   const {name, email, password} = formData;
   const result = await signup(name, email, password);
   console.log(result);
   // Navigate to login after a succesfull signup ?? or just login automatically
   navigate('/login');
   
  } catch (error) {
   console.error(error);
  }
 }

 return (
  <form onSubmit={handleSubmit}>
   <label htmlFor="name">Name</label>
   <input type="text" name="name" value={formData.name} onChange={handleChange} />

   <label htmlFor="email">Email</label>
   <input type="email" name="email" value={formData.email} onChange={handleChange} />

   <label htmlFor="password">Password</label>
   <input type="password" name="password" value={formData.password} onChange={handleChange} />

   <button>Signup</button>

   <p>Already have an account?<NavLink to='/login'>Login</NavLink></p>
  </form>
 )
}

