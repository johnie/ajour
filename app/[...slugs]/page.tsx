import React from 'react';
import type { Metadata } from 'next';
import { Controls } from '@/components/controls/controls';
import { NotificationPreview } from './_components/notification-preview';
import { CONTROLS_SEARCH_PARAMS } from '@/lib/params/controls';

type Params = { slugs: string[] };

type SearchParams = Record<string, string | string[] | undefined>;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slugs } = params;
  const slug = slugs.join('/');
  const theme = CONTROLS_SEARCH_PARAMS.theme.parseServerSide(
    searchParams.theme
  );

  const darkMode = CONTROLS_SEARCH_PARAMS.darkMode.parseServerSide(
    searchParams.darkMode
  );

  return {
    title: `${slug} | ajour`,
    openGraph: {
      title: `ajour - ${slug}`,
      images: [`/api/og?article=${slug}&theme=${theme}&darkMode=${darkMode}`],
    },
  } satisfies Metadata;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}) {
  const { slugs } = await params;
  const slug = slugs.join('/');

  return (
    <div className="flex flex-col justify-center items-center">
      <Controls />
      <NotificationPreview slug={slug} />
    </div>
  );
}
