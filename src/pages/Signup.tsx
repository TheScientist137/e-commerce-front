import { useState } from 'react'

const Signup = () => {
 const [name, setEmail] = useState('')
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')

 const handleChange = (e) => {

 }

 const handleSubmit = (e) => {
  e.preventDefault();
 }

 return (
  <form onSubmit={handleSubmit}>
   <input type="text" value={name} onChange={handleChange} />
   <input type="email" value={email} onChange={handleChange} />
   <input type="password" value={password} onChange={handleChange} />
   <button type="submit">Signup</button>
  </form>
 )
}

export default Signup