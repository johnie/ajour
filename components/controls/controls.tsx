'use client';

import { Separator } from '@/components/ui/separator';
import { ControlsBackground } from './controls-background';
import { ControlsDarkMode } from './controls-dark-mode';
import { ControlsDownload } from './controls-download';
import { ControlsPadding } from './controls-padding';
import { ControlsTheme } from './controls-theme';
import { ControlsOrientation } from './controls-orientation';

export function Controls() {
  return (
    <div className="flex h-10 items-center rounded-full border border-primary/15 bg-background px-2 shadow-lg">
      <div className="flex items-center gap-2">
        <ControlsTheme />
        <ControlsBackground />
        <ControlsDarkMode />
      </div>
      <Separator orientation="vertical" className="mx-2 h-5" />
      <ControlsPadding />
      <Separator orientation="vertical" className="mx-2 h-4" />
      <ControlsOrientation />
      <Separator orientation="vertical" className="mx-2 h-5" />
      <ControlsDownload />
    </div>
  );
}
