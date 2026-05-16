import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { THEMES, type Theme } from "@/constants/theme";

const BASE_URL = "https://omni.se";
const DEFAULT_THEME: Theme = "graphite";

const COLORS = {
  light: {
    background: "#ffffffbf",
    foreground: "#0a0a0a",
    "muted-foreground": "#737373",
    "img-border": "#e5e5e580",
    "icon-foreground": "#737373a6",
    "separator-foreground": "#73737340",
    "card-border": "#17171740",
  },
  dark: {
    background: "#0a0a0abf",
    foreground: "#fafafa",
    "muted-foreground": "#a3a3a3",
    "card-border": "#fafafa40",
    "img-border": "#26262680",
    "icon-foreground": "#a3a3a3a6",
    "separator-foreground": "#a3a3a34d",
  },
};

const META_TAG_RE = /<meta\s+[^>]*>/gi;
const DESCRIPTION_ATTR_RE =
  /(?:property|name)\s*=\s*["'](?:og:description|description)["']/i;
const CONTENT_ATTR_RE = /content\s*=\s*["']([^"']*)["']/i;

export const runtime = "edge";

function extractDescription(html: string): string {
  for (const match of html.matchAll(META_TAG_RE)) {
    const tag = match[0];
    if (DESCRIPTION_ATTR_RE.test(tag)) {
      const content = tag.match(CONTENT_ATTR_RE);
      if (content?.[1]) {
        return content[1];
      }
    }
  }
  return "";
}

function parseTheme(value: string | null): Theme {
  return value && value in THEMES ? (value as Theme) : DEFAULT_THEME;
}

function parseScale(value: string | null): number {
  const n = Number(value);
  if (Number.isFinite(n) && n >= 0.5 && n <= 1) {
    return n;
  }
  return 0.75;
}

function themeStyle(theme: Theme) {
  const { background } = THEMES[theme];
  return {
    backgroundImage: `linear-gradient(140deg, ${background.from}, ${background.to})`,
  };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const slug = searchParams.get("slug");

    if (!slug) {
      return new Response("Missing slug", { status: 400 });
    }

    const theme = parseTheme(searchParams.get("theme"));
    const darkMode = searchParams.get("darkMode") !== "false";
    const scale = parseScale(searchParams.get("scale"));

    const html = await fetch(`${BASE_URL}/${slug}`, {
      next: { revalidate: 600 },
    }).then((res) => res.text());

    const description = extractDescription(html);
    const colors = darkMode ? COLORS.dark : COLORS.light;

    const [interMedium, interSemiBold] = await Promise.all([
      fetch(
        "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf"
      ).then((res) => res.arrayBuffer()),
      fetch(
        "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf"
      ).then((res) => res.arrayBuffer()),
    ]);

    return new ImageResponse(
      <div
        style={{ padding: 64, ...themeStyle(theme) }}
        tw="w-full h-full flex items-center justify-center"
      >
        <div
          style={{
            transform: `scale(${scale})`,
            background: colors.background,
            color: colors.foreground,
            borderColor: colors["card-border"],
          }}
          tw="relative min-w-[500px] rounded-[30px] border border-primary/10 bg-background/60 px-6 py-4 backdrop-blur-lg text-[28px]"
        >
          {description}
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: interMedium,
            weight: 500,
          },
          {
            name: "Inter",
            data: interSemiBold,
            weight: 600,
          },
        ],
      }
    );
  } catch {
    return new Response("Failed to generate the image", { status: 500 });
  }
}
