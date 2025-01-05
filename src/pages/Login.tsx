import { useState } from "react"

const Login = () => {
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')

 const handleChange = (e) => {

 }

 const handleSubmit = (e) => {
  e.preventDefault()
 }

 return (
  <form onSubmit={handleSubmit}>
   <input type="email" value={email} onChange={handleChange} />
   <input type="password" value={password} onChange={handleChange} />
   <button type="submit">Login</button>n
  </form>
 )
}

export default Login