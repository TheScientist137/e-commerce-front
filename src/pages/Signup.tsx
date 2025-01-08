import { z } from "zod"

const user = z.object({
 username: z.string(),
 email: z.string(),
 password: z.string()
})
const partialUser = user.partial({ username: true })

export default function Signup() {
 const formAction = (formData: FormData) => {
  const formValues = Object.fromEntries(formData)
  const results = partialUser.safeParse(formValues)

  if (results.success) {
   console.log(results.data)
  } else {
   console.log('error')
  }

 }

 return (
  <form action={formAction}>
   <label htmlFor="name">Name</label>
   <input type="text" name="username" />

   <label htmlFor="email">Email</label>
   <input type="text" name="email" />

   <label htmlFor="password">Password</label>
   <input type="text" name="password" />

   <button>Signup</button>
  </form>
 )
}