import { useState } from "react";
import { useAuthContext } from "../hooks/useContext";
import { useUiStore } from "../stores/uiStore";
import { loginService } from "../services/authService";

export default function LoginForm() {
  const { login } = useAuthContext();
  const { setIsLoginModalOpen, setIsSignupModalOpen } = useUiStore();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await loginService(formData.email, formData.password);
      login(result.token, result.user);
      setIsLoginModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <h2>Log in</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-xl border px-3 py-1 focus:ring-2 focus:ring-purple-600 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="rounded-xl border px-3 py-1 focus:ring-2 focus:ring-purple-600 focus:outline-none"
          />
        </div>
        <button className="rounded-xl border-1">Log in</button>
      </form>
      <div className="mt-4 flex justify-center">
        <p>Not a member yet?</p>
        <span
          className="ml-2 text-purple-600 underline"
          onClick={() => {
            setIsLoginModalOpen(false);
            setIsSignupModalOpen(true);
          }}
        >
          Join now
        </span>
      </div>
    </div>
  );
}
