// import type { Metadata } from 'next';
import { Controls } from '@/components/controls/controls';
import { NotificationPreview } from './_components/notification-preview';
// import { CONTROLS_SEARCH_PARAMS } from '@/lib/params/controls';

type Params = Promise<{ slugs: string[] }>;
// type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// TODO: Figure out why dynamic params breaks the build
// export async function generateMetadata({
//   params,
//   searchParams,
// }: {
//   params: Params;
//   searchParams: SearchParams;
// }) {
//   const { slugs } = await params;
//   const slug = slugs.join('/');
//   const { theme, darkMode } = await searchParams;
//   const selectedTheme = CONTROLS_SEARCH_PARAMS.theme.parseServerSide(theme);

//   const selectedDarkMode =
//     CONTROLS_SEARCH_PARAMS.darkMode.parseServerSide(darkMode);

//   return {
//     title: `${slug} | ajour`,
//     openGraph: {
//       title: `ajour - ${slug}`,
//       images: [
//         `/api/og?article=${slug}&theme=${selectedTheme}&darkMode=${selectedDarkMode}`,
//       ],
//     },
//   } satisfies Metadata;
// }

export default async function Page({ params }: { params: Params }) {
  const { slugs } = await params;
  const slug = slugs.join('/');

  return (
    <div className="flex flex-col justify-center items-center">
      <Controls />
      <NotificationPreview slug={slug} />
    </div>
  );
}
