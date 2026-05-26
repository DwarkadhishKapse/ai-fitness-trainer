import { Activity, Dumbbell, LineChart, ScanLine } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "AI Posture Detection",
    description:
      "Use your webcam to analyze exercise form with MediaPipe Pose.",
    icon: ScanLine,
  },
  {
    title: "Rep Counter",
    description: "Automatically count workout reps while you train.",
    icon: Activity,
  },
  {
    title: "Workout Tracking",
    description: "Log exercises, sets, reps, calories, and training history.",
    icon: Dumbbell,
  },
  {
    title: "Progress Charts",
    description: "Visualize your weight, calories, workouts, and consistency.",
    icon: LineChart,
  },
];

const Home = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200">
            MERN + MediaPipe Pose
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Your personal AI fitness trainer for smarter home workouts.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Track workouts, manage diet, view progress, and use AI posture
            detection to improve exercise form with real-time feedback.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/register"
              className="rounded-lg bg-cyan-400 px-6 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="rounded-lg border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-200"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-lg border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/40"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                  <Icon size={22} />
                </div>
                <h2 className="text-lg font-semibold text-white">
                  {feature.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Home;
