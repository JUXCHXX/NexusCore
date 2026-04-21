import { cn } from "@/lib/utils";
import { gradientFromName, initials } from "@/lib/format";

const sizes = {
  xs: "w-5 h-5 text-[9px]",
  sm: "w-6 h-6 text-[10px]",
  md: "w-8 h-8 text-xs",
  lg: "w-10 h-10 text-sm",
  xl: "w-12 h-12 text-base",
};

export function Avatar({
  name,
  online,
  size = "md",
  className,
}: {
  name: string;
  online?: boolean;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const grad = gradientFromName(name);
  return (
    <span className={cn("relative inline-flex items-center justify-center rounded-full font-semibold text-white shrink-0 bg-gradient-to-br", grad, sizes[size], className)}>
      {initials(name)}
      {online !== undefined && (
        <span
          className={cn(
            "absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-bg-base",
            size === "xs" || size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5",
            online ? "bg-jade-500" : "bg-neutral2-600"
          )}
        />
      )}
    </span>
  );
}

export function AvatarStack({ names, max = 4, size = "sm" }: { names: string[]; max?: number; size?: keyof typeof sizes }) {
  const visible = names.slice(0, max);
  const extra = names.length - visible.length;
  return (
    <div className="flex -space-x-2">
      {visible.map((n) => (
        <Avatar key={n} name={n} size={size} className="ring-2 ring-bg-surface" />
      ))}
      {extra > 0 && (
        <span className={cn("inline-flex items-center justify-center rounded-full bg-bg-elevated text-neutral2-400 ring-2 ring-bg-surface font-medium", sizes[size])}>
          +{extra}
        </span>
      )}
    </div>
  );
}
