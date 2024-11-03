import {
  createScraper,
  ZodValidator,
  type SchemaFieldDefinitions,
} from 'xscrape';
import { notificationsSchema, Notifications } from '@/lib/schema/notifications';
import { omniUrlRegex } from '@/lib/utils';

const extractOmniSlug = (url: string) => {
  if (!omniUrlRegex.test(url)) return '';
  return url.split('https://omni.se/').pop() || '';
};

const fields: SchemaFieldDefinitions<Notifications> = {
  slug: {
    selector: 'meta[property="og:url"]',
    attribute: 'content',
    transform: extractOmniSlug,
  },
  title: { selector: 'title' },
  description: {
    selector: 'meta[name="description"], meta[property="og:description"]',
    attribute: 'content',
  },
  url: { selector: 'meta[property="og:url"]', attribute: 'content' },
  publishedAt: {
    selector: 'meta[property="article:published_time"]',
    attribute: 'content',
  },
  updatedAt: {
    selector: 'meta[property="article:modified_time"]',
    attribute: 'content',
  },
  author: { selector: 'meta[name="author"]', attribute: 'content' },
};

const validator = new ZodValidator(notificationsSchema);

export const createMetaScraper = createScraper<Notifications>({
  fields,
  validator,
});
