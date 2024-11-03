interface ThemeRecord {
  id: string;
  name: string;
  background: { from: string; via?: string; to: string };
}

export const THEMES = {
  graphite: {
    id: 'graphite',
    name: 'Graphite',
    background: {
      from: '#333333',
      to: '#181818',
    },
  },
  titanium: {
    id: 'titanium',
    name: 'Titanium',
    background: {
      from: '#f5f5f5',
      to: '#d1d1d1',
    },
  },
  aurora: {
    id: 'aurora',
    name: 'Aurora',
    background: {
      from: '#85FFBD',
      to: '#FFFB7D',
    },
  },
  twilight: {
    id: 'twilight',
    name: 'Twilight',
    background: {
      from: '#FC466B',
      to: '#3F5EFB',
    },
  },
  forest: {
    id: 'forest',
    name: 'Forest',
    background: {
      from: '#2AF598',
      to: '#009EFD',
    },
  },
  desert: {
    id: 'desert',
    name: 'Desert',
    background: {
      from: '#F4D03F',
      to: '#16A085',
    },
  },
  lavender: {
    id: 'lavender',
    name: 'Lavender',
    background: {
      from: '#E3E3E3',
      via: '#B721FF',
      to: '#21D4FD',
    },
  },
  cosmic: {
    id: 'cosmic',
    name: 'Cosmic',
    background: {
      from: '#8E2DE2',
      to: '#4A00E0',
    },
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset',
    background: {
      from: '#FF512F',
      to: '#DD2476',
    },
  },
} as const satisfies Record<string, ThemeRecord>;

export type Theme = keyof typeof THEMES;

export const THEME_OPTIONS = Object.values(THEMES);

export const THEME_KEYS = Object.keys(THEMES) as [Theme, ...Theme[]];
