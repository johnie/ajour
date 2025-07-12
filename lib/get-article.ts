import { z } from 'zod';
import type { ZodError } from 'zod';
import { OMNI_URL } from '@/constants/common';
import { createMetaScraper } from '@/lib/meta';

export async function getArticle(slug: string) {
  const res = await fetch(`${OMNI_URL}/${slug}`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch article: ${res.statusText}`);
  }

  const html = await res.text();
  const { data, error } = await createMetaScraper(html);

  if (error) {
    throw new Error(
      `Meta scraper error: ${z.prettifyError(error as ZodError)}`
    );
  }

  return { data, error, slug };
}
