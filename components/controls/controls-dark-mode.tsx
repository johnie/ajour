'use client';

import { Moon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useControls } from '@/lib/params/use-controls';
import { Tooltip } from '@/components/ui/tooltip';
import { ControlsToggle } from './controls-toggle';

export function ControlsDarkMode() {
  const t = useTranslations('controls');
  const [{ darkMode }, setControls] = useControls();

  return (
    <Tooltip content={t('toggleDarkMode')}>
      <div className="size-6">
        <ControlsToggle
          pressed={darkMode}
          onPressedChange={(checked) => setControls({ darkMode: checked })}
        >
          <Moon className="size-4" />
        </ControlsToggle>
      </div>
    </Tooltip>
  );
}
