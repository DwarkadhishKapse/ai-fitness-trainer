import { Activity, Bot, LayoutDashboard, Salad } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

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
];

const AppLayout = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-800 bg-slate-950 px-4 py-5 lg:block">
        <div className="mb-8">
          <p className="text-sm font-medium text-cyan-300">AI Fitness</p>
          <h1 className="mt-1 text-xl font-bold text-white">Trainer Panel</h1>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-cyan-400 text-slate-950"
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
      </aside>

      <section className="border-b border-slate-800 bg-slate-950 px-4 py-3 lg:hidden">
        <p className="text-sm font-medium text-cyan-300">AIFitness</p>

        <nav className="mt-3 grid grid-cols-4 gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-medium transition ${
                    isActive
                      ? "bg-cyan-400 text-slate-950"
                      : "bg-slate-900 text-slate-300"
                  }`
                }
              >
                <Icon size={17} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </section>

      <section className="min-h-screen p-6 lg:ml-64">
        <Outlet />
      </section>
    </main>
  );
};

export default AppLayout;
