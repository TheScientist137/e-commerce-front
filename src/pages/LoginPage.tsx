import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../hooks/useContext";
import { loginService } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    })); // cambiar
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { email, password } = formData;
      const result = await loginService(email, password);
      login(result.token, result.user);
      navigate("/"); // Navigate to main page after succesfull login
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <h2>TelescopEcommerce Login</h2>
      <h3>You need to login to proceed</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button>Login</button>
      </form>
      <h3>Not yet registered?</h3>
      <button onClick={() => navigate("/signup")}>
        Create a new account now
      </button>
    </section>
  );
}
