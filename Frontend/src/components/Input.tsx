import { type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  error?: string;
  label?: string;
  containerClassName?: string;
}

function Input({
  icon,
  error,
  label,
  containerClassName = "",
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label ? (
        <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
      ) : null}

      <div
        className={`flex items-center gap-3 rounded-2xl border bg-[#f8faf7] px-4 py-3 transition focus-within:border-[#6E8B74] focus-within:ring-2 focus-within:ring-[#6E8B74]/20 ${
          error ? "border-red-300 bg-red-50" : "border-[#e2e8de]"
        } ${containerClassName}`}
      >
        {icon ? <span className="text-gray-400">{icon}</span> : null}
        <input
          className={`w-full bg-transparent py-1 text-sm outline-none ${className}`}
          {...props}
        />
      </div>

      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
    </div>
  );
}

export default Input;
