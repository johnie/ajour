'use client';

import { Link } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { useTranslations } from 'next-intl';

import { useZodParams } from '@/lib/use-zod-params';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';

const paramsSchema = z.object({ slugs: z.array(z.string()) });

export function ControlsUrl() {
  const t = useTranslations('controls');
  const params = useZodParams(paramsSchema.shape);

  function copyRedirectUrl() {
    const url = `${window.location.origin}/${params.slugs.join(
      '/'
    )}?redirect=true`;
    navigator.clipboard.writeText(url);
    toast.success(t('urlCopied'));
  }

  return (
    <Tooltip content={t('copyUrl')}>
      <Button
        size="icon"
        variant="ghost"
        className="size-6 shrink-0"
        onClick={copyRedirectUrl}
      >
        <Link size={15} />
      </Button>
    </Tooltip>
  );
}
