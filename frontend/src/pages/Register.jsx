import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Register = () => {
  const handleGoogleSignup = () => {
    alert("Google signup will be connected later.");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10 text-slate-100">
      <section className="w-full max-w-md rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/50">
        <h1 className="text-2xl font-bold text-white">Create account</h1>
        <p className="mt-2 text-sm text-slate-400">
          Start tracking workouts and training with AI feedback.
        </p>

        <form className="mt-6 space-y-4">
          <Input
            id="register-name"
            label="Full Name"
            type="text"
            placeholder="Your name"
          />

          <Input
            id="register-email"
            label="Email"
            type="email"
            placeholder="you@example.com"
          />

          <Input
            id="register-password"
            label="Password"
            type="password"
            placeholder="Create a password"
          />

          <Button type="submit" fullWidth>
            Register
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
          onClick={handleGoogleSignup}
          className="flex items-center justify-center gap-3"
        >
          <FcGoogle size={22} />
          Sign up with Google
        </Button>

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
