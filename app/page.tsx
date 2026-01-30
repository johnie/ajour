import { useTranslations } from "next-intl";
import { ExampleArticles } from "@/components/example-articles";
import { Icons } from "@/components/icons";
import { SearchForm } from "@/components/search-form";

export default function Home() {
  const t = useTranslations("home");
  return (
    <main className="font-(family-name:--font-geist-sans) flex flex-col items-center justify-center">
      <Icons.ajour className="h-auto w-24" />
      <p className="mt-3.5 mb-8 text-muted-foreground text-sm">{t("slogan")}</p>
      <SearchForm />
      <ExampleArticles />
    </main>
  );
}
