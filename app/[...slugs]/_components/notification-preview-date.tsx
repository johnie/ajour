'use client';

import { useControls } from '@/lib/params/controls';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow } from 'date-fns';
import { sv } from 'date-fns/locale';

export function NotficationPreviewDate({ date }: { date: string }) {
  const [{ darkMode }] = useControls();
  return (
    <div
      className={cn('flex items-center gap-1.5', {
        'text-zinc-300': darkMode,
        'text-zinc-700': !darkMode,
      })}
    >
      {formatDistanceToNow(new Date(date), { locale: sv, addSuffix: true })}
    </div>
  );
}
