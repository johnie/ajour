export const ORIENTATIONS = ["landscape", "portrait"] as const;

export type Orientation = (typeof ORIENTATIONS)[number];

export const ORIENTATION_DIMENSIONS = {
  landscape: { width: 900, minWidth: 600 },
  portrait: { width: 450, height: 800 },
} as const;
