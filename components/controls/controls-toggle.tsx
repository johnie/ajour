"use client";

import type { ToggleProps } from "@radix-ui/react-toggle";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

export function ControlsToggle({ children, className, ...props }: ToggleProps) {
  return (
    <Toggle
      {...props}
      className={cn(
        "relative size-6 shrink-0 p-0",
        "data-[state=on]:after:absolute data-[state=on]:after:-bottom-0.75 data-[state=on]:after:left-1/2 data-[state=on]:after:size-1 data-[state=on]:after:-translate-x-1/2 data-[state=on]:after:rounded-full data-[state=on]:after:bg-primary/20 data-[state=on]:after:content-['']",
        className
      )}
    >
      {children}
    </Toggle>
  );
}
