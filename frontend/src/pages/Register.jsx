import api from "../services/api";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError("");

      const response = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        fitnessLevel: "beginner",
        goal: "general_fitness",
      });

      login({
        token: response.data.token,
        user: response.data.user,
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setError("");

      const response = await api.post("/auth/google", {
        credential: credentialResponse.credential,
      });

      login({
        token: response.data.token,
        user: response.data.user,
      });

      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Google authentication failed");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10 text-slate-100">
      <section className="w-full max-w-md rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/50">
        <h1 className="text-2xl font-bold text-white">Create account</h1>
        <p className="mt-2 text-sm text-slate-400">
          Start tracking workouts and training with AI feedback.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            id="register-name"
            label="Full Name"
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            id="register-email"
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            id="register-password"
            label="Password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? "Creating account..." : "Register"}
          </Button>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          )}
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-800" />
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
            or
          </span>
          <div className="h-px flex-1 bg-slate-800" />
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              setError("Google authentication failed");
            }}
          />
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-cyan-300">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Register;
