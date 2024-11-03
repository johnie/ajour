import { z } from 'zod';

export const notificationsSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string(),
  author: z.string(),
});

export type Notifications = z.infer<typeof notificationsSchema>;
