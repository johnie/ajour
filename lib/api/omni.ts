import { OMNI_URL } from "@/constants/common";
import {
  isTextResource,
  type OmniArticle,
  OmniArticleResponseSchema,
  OmniArticlesResponseSchema,
} from "./types";

const API_BASE = "https://content.omni.se/v2";
const REVALIDATE_SECONDS = 3600; // 1 hour

export interface Article {
  slug: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
}

export interface ArticleListItem {
  title: string;
  slug: string;
}

function extractDescription(article: OmniArticle): string {
  const textResource = article.resources?.find(isTextResource);
  if (textResource) {
    const firstParagraph = textResource.paragraphs[0];
    if (firstParagraph) {
      return firstParagraph.text.value;
    }
  }
  return "";
}

function buildSlug(article: OmniArticle): string {
  const promotionSlug = article.meta.promotion_content?.slug ?? "nyheter";
  return `/${promotionSlug}/a/${article.article_id}`;
}

function transformToArticle(article: OmniArticle): Article {
  const slug = buildSlug(article);
  return {
    slug,
    title: article.title.value,
    description: extractDescription(article),
    url: `${OMNI_URL}${slug}`,
    publishedAt: article.meta.changes.published,
    updatedAt: article.meta.changes.updated,
    author: article.authors[0]?.title ?? "",
  };
}

export async function getArticleById(id: string): Promise<Article> {
  const res = await fetch(`${API_BASE}/articles/${id}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch article: ${res.statusText}`);
  }

  const json = await res.json();
  const parsed = OmniArticleResponseSchema.parse(json);

  return transformToArticle(parsed.article);
}

export async function getArticles(): Promise<ArticleListItem[]> {
  const res = await fetch(`${API_BASE}/articles`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch articles: ${res.statusText}`);
  }

  const json = await res.json();
  const parsed = OmniArticlesResponseSchema.parse(json);

  return parsed.articles.map(({ article }) => ({
    title: article.title.value,
    slug: buildSlug(article),
  }));
}
