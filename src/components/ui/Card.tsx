import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white/90 dark:border-white/[0.07] dark:bg-[#111718] ${className}`}
    >
      {children}
    </div>
  );
}