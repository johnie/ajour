"use client";

import type { PropsWithChildren } from "react";

import { useControls } from "@/lib/params/use-controls";
import { useIsSafari } from "@/lib/use-is-safari";
import { cn, themeBackground } from "@/lib/utils";

export function Preview({ children }: PropsWithChildren) {
  const [{ theme, padding, darkMode, background, orientation }] = useControls();

  const isSafari = useIsSafari();

  return (
    <div className="">
      <div
        className={cn(
          "relative flex items-center justify-center transition-all duration-200",
          { "text-white": darkMode, "text-zinc-900": !darkMode },
          {
            "min-w-[600px] max-w-[900px]": orientation === "landscape",
            "aspect-[9/16] min-h-[920px] min-w-[600px]":
              orientation === "portrait",
          }
        )}
        id="preview"
        style={{ padding, ...(background ? themeBackground(theme) : {}) }}
      >
        {!background && (
          <div className="transparent-pattern" data-ignore-in-export />
        )}

        <div
          className={cn(
            "relative min-w-[500px] rounded-[30px] border p-6 backdrop-blur-lg transition-all duration-300",
            {
              "border-white/10 bg-zinc-900/60": darkMode,
              "border-zinc-900/10 bg-white/60": !darkMode,
            },
            { "shadow-2xl": !isSafari && background }
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
