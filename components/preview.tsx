'use client';

import { PropsWithChildren } from 'react';

import { useControls } from '@/lib/params/controls';
import { useIsSafari } from '@/lib/use-is-safari';
import { cn, themeBackground } from '@/lib/utils';

export function Preview({ children }: PropsWithChildren) {
  const [{ theme, padding, darkMode, background, orientation }] = useControls();

  const isSafari = useIsSafari();

  return (
    <div className="max-sm:scale-[.6]">
      <div
        id="preview"
        data-theme={cn({
          dark: darkMode,
          light: !darkMode,
        })}
        className={cn(
          'relative text-foreground transition-[padding] duration-200 flex justify-center items-center',
          {
            'min-w-[600px] max-w-[900px]': orientation === 'landscape',
            'min-h-[920px] min-w-[600px] aspect-h-16 aspect-w-9':
              orientation === 'portrait',
          }
        )}
        style={{ padding, ...(background ? themeBackground(theme) : {}) }}
      >
        {!background && (
          <div data-ignore-in-export className="transparent-pattern" />
        )}

        <div
          className={cn(
            'relative min-w-[500px] rounded-[30px] border border-primary/10 bg-background/60 p-6 transition-all duration-300 backdrop-blur-lg',
            !isSafari && background && 'shadow-2xl'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
