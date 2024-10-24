import * as cheerio from 'cheerio';
import { z } from 'zod';

type MetaMapping<T = string> = {
  selector: string;
  isMultiple?: boolean;
  transform?: (value: string) => T;
};

type MetaMappings = {
  slug: MetaMapping<string>;
  title: MetaMapping<string>;
  description: MetaMapping<string>;
  'image.url': MetaMapping<string>;
  'image.width': MetaMapping<number>;
  'image.height': MetaMapping<number>;
  url: MetaMapping<string>;
  publishedAt: MetaMapping<string>;
  updatedAt: MetaMapping<string>;
  author: MetaMapping<string>;
  section: MetaMapping<string>;
  tags: MetaMapping<string>;
};

type MetaConfig = {
  mappings: MetaMappings;
  defaults: Record<string, unknown>;
};

const metaSchema = z.object({
  slug: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  image: z
    .object({
      url: z.string().url(),
      width: z.number().optional(),
      height: z.number().optional(),
    })
    .optional(),
  url: z.string().url().optional(),
  publishedAt: z.string().optional(),
  updatedAt: z.string().optional(),
  author: z.string().optional(),
  section: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

type MetaData = z.infer<typeof metaSchema>;

type MetaValue = string | number | string[] | { [key: string]: string | number };

const DEFAULT_CONFIG: MetaConfig = {
  mappings: {
    slug: {
      selector: 'meta[property="og:url"]',
      transform: (value) => value.split('https://omni.se/').pop() || '',
    },
    title: { selector: 'title' },
    description: { selector: 'meta[name="description"], meta[property="og:description"]' },
    'image.url': { selector: 'meta[property="og:image"]' },
    'image.width': {
      selector: 'meta[property="og:image:width"]',
      transform: (value) => parseInt(value, 10),
    },
    'image.height': {
      selector: 'meta[property="og:image:height"]',
      transform: (value) => parseInt(value, 10),
    },
    url: { selector: 'meta[property="og:url"]' },
    publishedAt: { selector: 'meta[property="article:published_time"]' },
    updatedAt: { selector: 'meta[property="article:modified_time"]' },
    author: { selector: 'meta[name="author"]' },
    section: { selector: 'meta[property="article:section"]' },
    tags: {
      selector: 'meta[property="article:tag"]',
      isMultiple: true,
    },
  },
  defaults: {
    slug: '',
    title: 'Omni',
    description: 'Omni is a Swedish newspaper.',
    image: {
      url: 'https://omni.se/default-image.jpg',
      width: 1372,
      height: 708,
    },
    url: 'https://omni.se',
    publishedAt: '',
    updatedAt: '',
    author: '',
    section: '',
    tags: [],
  },
};

function extractSingleValue<T>($: cheerio.CheerioAPI, mapping: MetaMapping<T>): T | undefined {
  const element = $(mapping.selector).first();
  const value = mapping.selector === 'title' ? element.text() : element.attr('content');

  if (!value) return undefined;

  return mapping.transform ? mapping.transform(value) : (value as unknown as T);
}

function extractArrayValues<T>($: cheerio.CheerioAPI, mapping: MetaMapping<T>): T[] {
  const values: T[] = [];
  $(mapping.selector).each((_, element) => {
    const value = $(element).attr('content');
    if (value) {
      values.push(mapping.transform ? mapping.transform(value) : (value as unknown as T));
    }
  });
  return values;
}

function setNestedValue(obj: Record<string, MetaValue>, key: string, value: MetaValue): void {
  if (key.includes('.')) {
    const [parent, child] = key.split('.');
    if (!obj[parent] || typeof obj[parent] !== 'object') {
      obj[parent] = {};
    }
    (obj[parent] as Record<string, string | number>)[child] = value as string | number;
  } else {
    obj[key] = value;
  }
}

function extractMetaTags($: cheerio.CheerioAPI, config: MetaConfig): Partial<MetaData> {
  const meta: Record<string, MetaValue> = {};

  for (const [key, mapping] of Object.entries(config.mappings)) {
    if (mapping.isMultiple) {
      const values = extractArrayValues($ as cheerio.CheerioAPI, mapping as MetaMapping<string>);
      setNestedValue(meta, key, values);
    } else {
      const value = extractSingleValue($ as cheerio.CheerioAPI, mapping as MetaMapping<string | number>);
      if (value !== undefined) {
        setNestedValue(meta, key, value);
      }
    }
  }

  return meta as Partial<MetaData>;
}

export const createMetaScraper = (customConfig: Partial<MetaConfig> = {}) => {
  const config: MetaConfig = {
    mappings: { ...DEFAULT_CONFIG.mappings, ...customConfig.mappings },
    defaults: { ...DEFAULT_CONFIG.defaults, ...customConfig.defaults },
  };

  return async (html: string): Promise<MetaData> => {
    try {
      const $ = cheerio.load(html);
      const meta = extractMetaTags($, config);

      return metaSchema.parse({
        ...config.defaults,
        ...meta,
        url: meta.url || config.defaults.url,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Meta scraping failed: ${error.message}`);
      }
      throw new Error('Meta scraping failed: Unknown error');
    }
  };
};
