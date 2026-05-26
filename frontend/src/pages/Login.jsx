import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Login = () => {
  const handleGoogleLogin = () => {
    alert("Google login will be connected later.");
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
      <section className="w-full max-w-md rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/50">
        <h1 className="text-2xl font-bold text-white">Welcome back!</h1>
        <p className="mt-2 text-sm text-slate-400">
          Login to continue your fitness journey.
        </p>

        <form className="mt-6 space-y-4">
            <Input
              id="login-email"
              label="Email"
              type="email"
              placeholder="you@example.com"
            />

            <Input
              id="login-password"
              label="Password"
              type="password"
              placeholder="Enter your password"
            />

          <Button type="submit" fullWidth>
            Login
          </Button>
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
