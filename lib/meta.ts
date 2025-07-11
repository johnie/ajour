import { defineScraper } from 'xscrape';
import { omniUrlRegex } from '@/lib/utils';
import { z } from 'zod';

const extractOmniSlug = (url: string) => {
  if (!omniUrlRegex.test(url)) return '';
  return url.split('https://omni.se/').pop() || '';
};

export const createMetaScraper = defineScraper({
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    url: z.string(),
    publishedAt: z.string(),
    updatedAt: z.string(),
    author: z.string(),
  }),
  extract: {
    slug: {
      selector: 'meta[property="og:url"]',
      value: 'content',
    },
    title: { selector: 'title' },
    description: {
      selector: 'meta[name="description"], meta[property="og:description"]',
      value: 'content',
    },
    url: { selector: 'meta[property="og:url"]', value: 'content' },
    publishedAt: {
      selector: 'meta[property="article:published_time"]',
      value: 'content',
    },
    updatedAt: {
      selector: 'meta[property="article:modified_time"]',
      value: 'content',
    },
    author: { selector: 'meta[name="author"]', value: 'content' },
  },
  transform: async (data) => {
    const slug = extractOmniSlug(data.url);
    return {
      ...data,
      slug,
    };
  },
});

export const createLatestScraper = defineScraper({
  schema: z.object({
    news: z.array(
      z.object({
        title: z.string(),
        slug: z.string(),
      })
    ),
  }),
  extract: {
    news: [
      {
        selector: '.Teaser_teaser__Lkcni',
        value: {
          title: {
            selector: 'a[rel="canonical"]',
            value: 'aria-label',
          },
          slug: {
            selector: 'a[rel="canonical"]',
            value: 'href',
          },
        },
      },
    ],
  },
  transform(data) {
    const slugPattern = /^\/[a-z0-9\-]+\/a\/[A-Za-z0-9]{6}$/;
    return {
      news: data.news.filter((item) => slugPattern.test(item.slug)),
    };
  },
});
