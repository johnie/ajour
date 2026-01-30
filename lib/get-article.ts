import { getArticleById } from "@/lib/api/omni";

const ARTICLE_ID_PATTERN = /\/a\/([A-Za-z0-9]{6})$/;

function extractArticleId(slug: string): string | null {
  const match = slug.match(ARTICLE_ID_PATTERN);
  return match?.[1] ?? null;
}

export async function getArticle(slug: string) {
  const articleId = extractArticleId(slug);

  if (!articleId) {
    return { data: null, error: null, slug };
  }

  try {
    const data = await getArticleById(articleId);
    return { data, error: null, slug };
  } catch (error) {
    return { data: null, error, slug };
  }
}
