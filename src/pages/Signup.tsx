import { useState } from "react";

export default function Signup() {
 const [formData, setFormData] = useState({ name: '', email: '', password: '' });

 const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setFormData((prevData) => {
  return { ...prevData, [event.target.name]: event.target.value }
 });

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const response = await fetch('http://localhost:3000/api/auth/signup', {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify(formData)
  });

  const result = await response.json();
  console.log(result);
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
  </form>
 )
}
