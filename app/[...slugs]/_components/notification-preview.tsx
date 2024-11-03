import { notFound } from 'next/navigation';
import { Preview } from '@/components/preview';
import { NotficationPreviewDate } from './notification-preview-date';
import { createMetaScraper } from '@/lib/meta';
import { AppIcon } from '@/components/app-icon';

const BASE_URL = 'https://omni.se';

export async function NotificationPreview({ slug }: { slug: string }) {
  const res = await fetch(`${BASE_URL}/${slug}`, {
    next: { revalidate: 600 },
  });
  const html = await res.text();
  const meta = createMetaScraper(html);

  if (!meta) return notFound();

  return (
    <Preview>
      <div className="flex gap-6 select-none text-lg">
        <div className="flex flex-row items-center">
          <AppIcon size="small" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-sf-ui-text-semibold)]">
              Omni
            </span>
            <NotficationPreviewDate date={meta.publishedAt} />
          </div>

          <p className="leading-tight">{meta.description}</p>
        </div>
      </div>
    </Preview>
  );
}
