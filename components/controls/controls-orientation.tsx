'use client';

import { RectangleHorizontal, RectangleVertical } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useControls } from '@/lib/params/controls';
import { Tooltip } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { ORIENTATION_OPTIONS } from '@/constants/orientation';
import { cn } from '@/lib/utils';

export function ControlsOrientation() {
  const t = useTranslations('controls');
  const [{ orientation }, setControls] = useControls();

  return (
    <>
      {ORIENTATION_OPTIONS.map((orientationItem) => (
        <Tooltip key={orientationItem} content={t(orientationItem)}>
          <Button
            size="icon"
            variant="ghost"
            className={cn('size-6 shrink-0', {
              'bg-accent text-accent-foreground':
                orientationItem === orientation,
            })}
            onClick={() => setControls({ orientation: orientationItem })}
          >
            {orientationItem === 'portrait' ? (
              <RectangleVertical className="w-4 h-4" />
            ) : (
              <RectangleHorizontal className="w-4 h-4" />
            )}
          </Button>
        </Tooltip>
      ))}
    </>
  );
}
