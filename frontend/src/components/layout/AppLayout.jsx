import {
  Activity,
  Bot,
  BrainCircuit,
  LayoutDashboard,
  Salad,
  LogOut,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Workout",
    path: "/workout",
    icon: Activity,
  },
  {
    label: "Diet",
    path: "/diet",
    icon: Salad,
  },
  {
    label: "AI Trainer",
    path: "/ai-trainer",
    icon: Bot,
  },
  {
    label: "AI Diet",
    path: "/ai-diet",
    icon: BrainCircuit,
  },
];

const AppLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-slate-800 bg-slate-950 px-5 py-6 lg:flex">
        <div>
          <p className="text-sm font-semibold tracking-wide text-cyan-300">
            AI Fitness
          </p>

          <h1 className="mt-1 text-3xl font-bold leading-tight text-white">
            Trainer Panel
          </h1>
        </div>

        <nav className="mt-10 flex flex-col gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/10"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {user?.name}
              </p>

              <p className="truncate text-xs text-slate-400">{user?.email}</p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>

      <section className="min-h-screen bg-slate-950 p-8 lg:ml-64">
        <Outlet />
      </section>
    </main>
  );
};

export default AppLayout;
