import React from "react";

const variants = {
  primary: "bg-cyan-400 text-slate-950 hover:bg-cyan-300",
  outline:
    "border border-slate-700 bg-slate-950 text-slate-200 hover:border-cyan-400 hover:text-white",
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`rounded-lg px-5 py-3 font-semibold transition ${
        variants[variant]
      } ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
