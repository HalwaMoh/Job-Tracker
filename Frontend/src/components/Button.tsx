import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  className?: string;
}

function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-2xl font-semibold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6E8B74] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#6E8B74] to-[#4F6756] text-white shadow-[0_16px_34px_-20px_rgba(79,103,86,0.9)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-18px_rgba(79,103,86,0.95)]",
    secondary:
      "border border-[#dce7dd] bg-white text-[#4d6350] hover:border-[#6E8B74] hover:bg-[#f7fbf6]",
    ghost:
      "bg-transparent text-[#4d6350] hover:bg-[#f7fbf6]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-sm",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
