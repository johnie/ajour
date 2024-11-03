import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { z } from 'zod';

import { THEME_KEYS } from '@/constants/theme';
import { cn, themeBackground } from '@/lib/utils';
import { createMetaScraper } from '@/lib/meta';

const BASE_URL = 'https://omni.se';

const searchParamsSchema = z.object({
  slug: z.string().min(1),
  theme: z.enum(THEME_KEYS).catch('graphite'),
  darkMode: z
    .enum(['true', 'false'])
    .transform((v) => v === 'true')
    .catch(true),
  scale: z.number({ coerce: true }).min(0.5).max(1).catch(0.75),
});

const COLORS = {
  light: {
    background: '#ffffffbf',
    foreground: '#0a0a0a',
    'muted-foreground': '#737373',
    'img-border': '#e5e5e580',
    'icon-foreground': '#737373a6',
    'separator-foreground': '#73737340',
    'card-border': '#17171740',
  },
  dark: {
    background: '#0a0a0abf',
    foreground: '#fafafa',
    'muted-foreground': '#a3a3a3',
    'card-border': '#fafafa40',
    'img-border': '#26262680',
    'icon-foreground': '#a3a3a3a6',
    'separator-foreground': '#a3a3a34d',
  },
};

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const data = searchParamsSchema.parse({
      slug: searchParams.get('slug'),
      theme: searchParams.get('theme'),
      darkMode: searchParams.get('darkMode'),
      scale: searchParams.get('scale'),
    });

    const { slug, theme, darkMode, scale } = data;

    const html = await fetch(`${BASE_URL}/${slug}`, {
      next: { revalidate: 600 },
    }).then((res) => res.text());

    const meta = createMetaScraper(html);

    const colors = darkMode ? COLORS.dark : COLORS.light;

    const [interMedium, interSemiBold] = await Promise.all([
      fetch(
        `https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf`
      ).then((res) => res.arrayBuffer()),
      fetch(
        `https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf`
      ).then((res) => res.arrayBuffer()),
    ]);

    return new ImageResponse(
      (
        <div
          tw="w-full h-full flex items-center justify-center"
          style={{ padding: 64, ...themeBackground(theme) }}
        >
          <div
            tw="relative min-w-[500px] rounded-[30px] border border-primary/10 bg-background/60 px-6 py-4 backdrop-blur-lg text-[28px]"
            style={{
              transform: `scale(${scale})`,
              background: colors.background,
              color: colors.foreground,
              borderColor: colors['card-border'],
            }}
          >
            {meta.description}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: interMedium,
            weight: 500,
          },
          {
            name: 'Inter',
            data: interSemiBold,
            weight: 600,
          },
        ],
      }
    );
  } catch (error) {
    return new Response('Failed to generate the image', { status: 500 });
  }
}
