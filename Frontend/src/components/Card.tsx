import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-[28px] border border-[#e6eee3] bg-white/80 p-6 shadow-[0_25px_70px_-35px_rgba(17,32,24,0.4)] backdrop-blur ${className}`}>
      {children}
    </div>
  );
}

export default Card;
