import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Controls } from "@/components/controls/controls";
import { Loader } from "@/components/loader";
import { getArticle } from "@/lib/get-article";
import { CONTROLS_SEARCH_PARAMS } from "@/lib/params/controls";
import { NotificationPreview } from "./_components/notification-preview";

type Params = Promise<{ slugs: string[] }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slugs } = await params;
  const slug = slugs.join("/");
  const { theme, darkMode } = await searchParams;
  const selectedTheme = CONTROLS_SEARCH_PARAMS.theme.parseServerSide(theme);
  const { data } = await getArticle(slug);

  const selectedDarkMode =
    CONTROLS_SEARCH_PARAMS.darkMode.parseServerSide(darkMode);

  return {
    title: data ? `${data.title} | ajour` : "ajour",
    ...(data && { description: data.description }),
    openGraph: {
      title: `ajour - ${slug}`,
      images: [
        `/api/og?article=${slug}&theme=${selectedTheme}&darkMode=${selectedDarkMode}`,
      ],
    },
  } satisfies Metadata;
}

export default async function Page({ params }: { params: Params }) {
  const { slugs } = await params;
  const slug = slugs.join("/");
  const { data } = await getArticle(slug);

  if (!data) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Controls />
      <Suspense fallback={<Loader />}>
        <NotificationPreview article={data} />
      </Suspense>
    </div>
  );
}
