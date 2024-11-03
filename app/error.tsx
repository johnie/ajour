'use client';

import { Link } from 'next-view-transitions';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

export default function Error({ reset }: { reset: () => void }) {
  const t = useTranslations('error');
  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <h2 className="font-medium">{t('title')}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{t('description')}</p>
      <div className="mt-6 flex gap-2">
        <Link href="/">
          <Button variant="outline">{t('back')}</Button>
        </Link>
        <Button onClick={reset}>{t('retry')}</Button>
      </div>
    </div>
  );
}
