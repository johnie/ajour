"use client";

import { Button } from "@/components/ui/button";
import { PADDING_OPTIONS } from "@/constants/padding";
import { useControls } from "@/lib/params/use-controls";
import { cn } from "@/lib/utils";

export function ControlsPadding() {
  const [{ padding: controlsPadding }, setControls] = useControls();

  return (
    <div className="flex gap-2">
      {PADDING_OPTIONS.map((padding) => (
        <Button
          className={cn(
            "relative size-6 text-xs",
            padding === controlsPadding
              ? "after:-bottom-[3px] after:-translate-x-1/2 text-foreground after:absolute after:left-1/2 after:size-1 after:rounded-full after:bg-primary/20 after:content-['']"
              : null
          )}
          key={padding}
          onClick={() => setControls({ padding })}
          size="icon"
          variant="ghost"
        >
          {padding}
        </Button>
      ))}
    </div>
  );
}
