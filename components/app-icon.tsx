import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

const appIconVariants = cva(
  "flex items-center justify-center rounded-3xl bg-black bg-linear-to-tl from-zinc-800 to-zinc-900 p-5 text-zinc-50 shadow-lg dark:bg-white dark:from-zinc-50 dark:to-zinc-100 dark:text-zinc-900",
  {
    variants: {
      size: {
        default: "size-48",
        small: "size-20 rounded-2xl p-3",
      },
      variant: {
        default:
          "bg-linear-to-tl bg-white from-zinc-800 to-zinc-900 text-zinc-50",
        dark: "bg-black from-zinc-50 to-zinc-100 text-zinc-900 dark:text-zinc-50",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

export interface AppIconProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof appIconVariants> {}

const AppIcon = forwardRef<HTMLDivElement, AppIconProps>(
  ({ className, size = "default", ...props }, ref) => (
    <div
      className={cn(appIconVariants({ size }), className)}
      ref={ref}
      {...props}
    >
      <Icons.omniO className="w-full" />
    </div>
  )
);

AppIcon.displayName = "AppIcon";

export { AppIcon, appIconVariants };
