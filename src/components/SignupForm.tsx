import { useState } from "react";
import { useUiStore } from "../stores/uiStore";
import { signupService } from "../services/authService";

export default function SignupForm() {
  const { setIsLoginModalOpen, setIsSignupModalOpen } = useUiStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await signupService(
        formData.email,
        formData.email,
        formData.password,
      );
      console.log(result);
      setIsSignupModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="email">Name</label>
          <input
            type="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="rounded-xl border px-3 py-1 focus:ring-2 focus:ring-purple-600 focus:outline-none"
          />
        </div>
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
        <button className="rounded-xl border-1">Sign up</button>
      </form>
      <div className="mt-4 flex justify-center">
        <p>Already a member?</p>
        <span
          className="ml-2 text-purple-600 underline"
          onClick={() => {
            setIsSignupModalOpen(false);
            setIsLoginModalOpen(true);
          }}
        >
          Sign in
        </span>
      </div>
    </div>
  );
}
