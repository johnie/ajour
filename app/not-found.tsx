import { useTranslations } from "next-intl";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("not-found");
  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <span className="font-medium">{t("title")}</span>
      <p className="mt-2 text-muted-foreground text-sm">{t("description")}</p>
      <Link className="mt-6" href="/">
        <Button>{t("back")}</Button>
      </Link>
    </div>
  );
}
