import React from "react";

const Input = ({ label, id, className = "", ...props }) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={`w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
