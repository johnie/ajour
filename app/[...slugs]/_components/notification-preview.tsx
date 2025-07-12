import { Preview } from '@/components/preview';
import { NotficationPreviewDate } from './notification-preview-date';
import { AppIcon } from '@/components/app-icon';

export async function NotificationPreview({
  article,
}: {
  article: { description: string; publishedAt: string };
}) {
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
            <NotficationPreviewDate date={article.publishedAt} />
          </div>

          <p className="leading-tight">{article.description}</p>
        </div>
      </div>
    </Preview>
  );
}
