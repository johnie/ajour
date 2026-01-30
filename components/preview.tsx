"use client";

import type { PropsWithChildren } from "react";

import { useControls } from "@/lib/params/use-controls";
import { useIsSafari } from "@/lib/use-is-safari";
import { cn, themeBackground } from "@/lib/utils";

export function Preview({ children }: PropsWithChildren) {
  const [{ theme, padding, darkMode, background, orientation }] = useControls();

  const isSafari = useIsSafari();
  const isPortrait = orientation === "portrait";

  return (
    <div className="max-sm:scale-[.6]">
      <div
        className={cn(
          "relative transition-all duration-200",
          { "text-white": darkMode, "text-zinc-900": !darkMode },
          { "flex h-112.5 w-200 items-center justify-center": !isPortrait },
          { "min-h-150 min-w-112.5": isPortrait }
        )}
        id="preview"
        style={{ padding, ...(background ? themeBackground(theme) : {}) }}
      >
        {!background && (
          <div className="transparent-pattern" data-ignore-in-export />
        )}

        <div
          className={cn(
            "relative rounded-[30px] border p-6 backdrop-blur-lg transition-all duration-300",
            {
              "border-white/10 bg-zinc-900/60": darkMode,
              "border-zinc-900/10 bg-white/60": !darkMode,
            },
            { "shadow-2xl": !isSafari && background },
            { "w-full": isPortrait, "min-w-125": !isPortrait }
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
