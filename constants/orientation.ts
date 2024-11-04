export const ORIENTATION_OPTIONS = ['landscape', 'portrait'] as const;

export type Orientation = (typeof ORIENTATION_OPTIONS)[];
