import { Link } from 'next-view-transitions';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const t = useTranslations('not-found');
  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <span className="font-medium">{t('title')}</span>
      <p className="mt-2 text-sm text-muted-foreground">{t('description')}</p>
      <Link href="/" className="mt-6">
        <Button>{t('back')}</Button>
      </Link>
    </div>
  );
}
