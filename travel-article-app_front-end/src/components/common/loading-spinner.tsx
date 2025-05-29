import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import type { ComponentProps } from "react";

export type LoadingVariant = "success" | "error" | "default" | "warning";
interface LoadingSpinnerProps extends ComponentProps<"div"> {
  label?: string;
  loadingIconSize?: number;
  textSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  variant?: LoadingVariant;
}

const textSizeBase = {
  1: "text-xs",
  2: "text-sm",
  3: "text-base",
  4: "text-lg",
  5: "text-xl",
  6: "text-2xl",
  7: "text-3xl",
  8: "text-4xl",
  9: "text-5xl",
};

const loadingVariant: Record<LoadingVariant, string> = {
  default: "",
  error: "stroke-system-red",
  warning: "stroke-system-yellow",
  success: "stroke-system-green",
};

export default function LoadingSpinner({
  label = "Loading data...",
  className,
  loadingIconSize = 42,
  textSize = 3,
  variant = "default",
  ...props
}: LoadingSpinnerProps) {
  const fontSize = textSizeBase[textSize];
  const loadingColor = loadingVariant[variant];

  return (
    <div
      className={cn(
        "w-full space-y-2 rounded-lg fill-system-green p-6",
        className
      )}
      {...props}
    >
      <Loader2
        className={cn("mx-auto animate-spin", loadingColor)}
        size={loadingIconSize}
      />
      <p className={cn("text-center", fontSize)}>{label}</p>
    </div>
  );
}
