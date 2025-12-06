import { useTranslations } from "next-intl";
import { ExampleArticles } from "@/components/example-articles";
import { Icons } from "@/components/icons";
import { SearchForm } from "@/components/search-form";

export default function Home() {
  const t = useTranslations("home");
  return (
    <main className="flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <Icons.ajour className="h-auto w-24" />
      <p className="mt-3.5 mb-8 text-muted-foreground text-sm">{t("slogan")}</p>
      <SearchForm />
      <ExampleArticles />
    </main>
  );
}
