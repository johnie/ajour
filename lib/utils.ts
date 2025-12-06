import { type ClassValue, clsx } from "clsx";
import type { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

import { THEMES, type Theme } from "@/constants/theme";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function themeBackground(theme: Theme) {
  const { background } = THEMES[theme];

  return {
    backgroundImage: `linear-gradient(140deg, ${background.from}, ${background.to})`,
  } satisfies CSSProperties;
}

export const omniUrlRegex =
  /^https:\/\/omni\.se\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+/;
