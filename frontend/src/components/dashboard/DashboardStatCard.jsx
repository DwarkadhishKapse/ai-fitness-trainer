const DashboardStatCard = ({ title, value, icon }) => {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border border-cyan-900/30
        bg-slate-900/70
        p-6
        backdrop-blur-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-cyan-500/40
        hover:shadow-lg
        hover:shadow-cyan-500/10
      "
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {title}
          </p>

          <h2
            className={`mt-4 break-words font-bold text-white ${
              title === "Favorite Exercise" ? "text-xl" : "text-4xl"
            }`}
          >
            {value}
          </h2>
        </div>

        <div className="rounded-xl bg-cyan-500/10 px-3 py-2 text-lg">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardStatCard;
