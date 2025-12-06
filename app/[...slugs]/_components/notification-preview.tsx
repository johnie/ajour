import { AppIcon } from "@/components/app-icon";
import { Preview } from "@/components/preview";
import { NotficationPreviewDate } from "./notification-preview-date";

export function NotificationPreview({
  article,
}: {
  article: { description: string; publishedAt: string };
}) {
  return (
    <Preview>
      <div className="flex select-none gap-6 text-lg">
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
