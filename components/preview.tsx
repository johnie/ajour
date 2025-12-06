"use client";

import type { PropsWithChildren } from "react";

import { useControls } from "@/lib/params/use-controls";
import { useIsSafari } from "@/lib/use-is-safari";
import { cn, themeBackground } from "@/lib/utils";

export function Preview({ children }: PropsWithChildren) {
  const [{ theme, padding, darkMode, background }] = useControls();

  const isSafari = useIsSafari();

  return (
    <div className="max-sm:scale-[.6]">
      <div
        className="relative min-w-[600px] max-w-[900px] text-foreground transition-[padding] duration-200"
        data-theme={darkMode ? "dark" : "light"}
        id="preview"
        style={{ padding, ...(background ? themeBackground(theme) : {}) }}
      >
        {!background && (
          <div className="transparent-pattern" data-ignore-in-export />
        )}

        <div
          className={cn(
            "relative min-w-[500px] rounded-[30px] border border-primary/10 bg-background/60 p-6 backdrop-blur-lg transition-all duration-300",
            !isSafari && background && "shadow-2xl"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
