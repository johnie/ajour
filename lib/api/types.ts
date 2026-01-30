import { z } from "zod";

// Text resource schema for extracting description
const TextParagraphSchema = z.object({
  text: z.object({
    value: z.string(),
  }),
});

const TextResourceSchema = z.object({
  type: z.literal("Text"),
  paragraphs: z.array(TextParagraphSchema),
});

const ResourceSchema = z
  .object({
    type: z.string(),
  })
  .loose();

const OmniArticleSchema = z.object({
  article_id: z.string(),
  title: z.object({
    value: z.string(),
  }),
  authors: z.array(
    z.object({
      title: z.string(),
    })
  ),
  meta: z.object({
    changes: z.object({
      published: z.string(),
      updated: z.string(),
    }),
    promotion_content: z
      .object({
        slug: z.string(),
      })
      .optional(),
  }),
  resources: z.array(ResourceSchema).optional(),
});

export const OmniArticleResponseSchema = z.object({
  article: OmniArticleSchema,
});

export const OmniArticlesResponseSchema = z.object({
  articles: z.array(
    z.object({
      article: OmniArticleSchema,
    })
  ),
});

export type TextResource = z.infer<typeof TextResourceSchema>;
export type OmniArticle = z.infer<typeof OmniArticleSchema>;
export type OmniArticleResponse = z.infer<typeof OmniArticleResponseSchema>;
export type OmniArticlesResponse = z.infer<typeof OmniArticlesResponseSchema>;

export function isTextResource(resource: unknown): resource is TextResource {
  return TextResourceSchema.safeParse(resource).success;
}
