import api from "../services/api";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showSessionExpired, setShowSessionExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("sessionExpired")) {
      setShowSessionExpired(true);
      localStorage.removeItem("sessionExpired");
    }
  }, []);

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

      const response = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      login({
        token: response.data.token,
        user: response.data.user,
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoogleLogin = () => {
    alert("Google login will be connected later.");
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
      <section className="w-full max-w-md rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/50">
        {showSessionExpired && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-6 text-center shadow-xl">
              <h2 className="text-2xl font-bold text-white">Session Expired</h2>
              <p className="mt-3 text-slate-400">
                Your login session has expired. Please sign in again to
                continue.
              </p>

              <button
                onClick={() => setShowSessionExpired(false)}
                className="
          mt-6
          w-full
          rounded-xl
          bg-cyan-500
          px-5
          py-3
          font-semibold
          text-slate-950
          hover:bg-cyan-400
        "
              >
                Login Again
              </button>
            </div>
          </div>
        )}
        <h1 className="text-2xl font-bold text-white">Welcome back!</h1>
        <p className="mt-2 text-sm text-slate-400">
          Login to continue your fitness journey.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            id="login-email"
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            id="login-password"
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
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

        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3"
        >
          <FcGoogle size={22} />
          Login with Google
        </Button>

        <p className="mt-6 text-center text-sm text-slate-400">
          New here?{" "}
          <Link to="/register" className="font-medium text-cyan-300">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
