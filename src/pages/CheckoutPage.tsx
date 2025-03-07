import { useNavigate } from "react-router";

export default function CheckoutPage() {
 const navigate = useNavigate();

 return (
  <section>
   <div>
    <h2>Your data</h2>

    <div>
     <h3>Are you already a customer with us?</h3>
     <p>Please log in using your email address and your personal password.</p>
     <form>
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Log in</button>
     </form>
     {/* Forgot your password? functionality */}
    </div>

    <div>
     <h3>Are you new in our shop?</h3>
     <p>Create a new account now and enjoy the functionality of our member area.</p>
     <ul>
      <li>Composing of product reviews</li>
      <li>Listing of processed orders</li>
      <li>Saving products to watchlists</li>
     </ul>
     <p>Please note: You need a valid email address to create an account!</p>
     <button onClick={() => navigate('/login')}>Create Account</button>
    </div>

    <div>
     <h3>Go on without registration ...</h3>
     <p>
      You can also order in our shop without creating a user account. Without a user account you miss out on some
      of the features in our customer area, such as a list of your recent orders, making product reviews, etc.
     </p>
     <button>Continue as Guest</button>
    </div>
   </div>
  </section>
 )
}