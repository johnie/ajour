"use client";

import { Separator } from "@/components/ui/separator";
import { ControlsBackground } from "./controls-background";
import { ControlsDarkMode } from "./controls-dark-mode";
import { ControlsDownload } from "./controls-download";
import { ControlsOrientation } from "./controls-orientation";
import { ControlsPadding } from "./controls-padding";
import { ControlsTheme } from "./controls-theme";

export function Controls() {
  return (
    <div className="absolute top-16 left-1/2 z-50 flex h-10 -translate-x-1/2 items-center rounded-full border border-primary/15 bg-background px-2 shadow-lg">
      <div className="flex items-center gap-2">
        <ControlsTheme />
        <ControlsBackground />
        <ControlsDarkMode />
        <ControlsOrientation />
      </div>
      <Separator className="mx-2 h-5" orientation="vertical" />
      <ControlsPadding />
      <Separator className="mx-2 h-5" orientation="vertical" />
      <ControlsDownload />
    </div>
  );
}
