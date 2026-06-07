import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/20 dark:border-white/10",
        "bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl",
        "shadow-[0_8px_32px_rgba(0,0,0,0.08)]",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)]",
        className
      )}
    >
      {children}
    </div>
  );
}
