import React from 'react';
import Image from 'next/image';
import { Icons } from '@/components/icons';
import { createMetaScraper } from '@/lib/meta';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

export default async function Page({ params }: { params: { slugs: string[] } }) {
  const { slugs } = await params;
  const res = await fetch(`https://omni.se/${slugs.join('/')}`);
  const html = await res.text();
  const scrapeMetaData = createMetaScraper({});

  const meta = await scrapeMetaData(html);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="p-10 bg-gradient-to-tl from-violet-500 to-fuchsia-500 text-white aspect-square">
        <div className="max-w-lg bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-50 p-4 rounded-lg shadow-xl font-[family-name:var(--font-benton-sans)] m-auto border-t-2 dark:border-zinc-800 border-white">
          <div className="relative">
            <Image
              src={meta.image.url}
              alt={meta.title}
              width={meta.image.width}
              height={meta.image.height}
              className="rounded"
            />
          </div>

          {/* Article Content */}
          <div className="mt-4">
            {/* Category */}
            <span className="text-omni-green text-sm uppercase tracking-wider font-bold">{meta.section}</span>

            {/* Title */}
            <h1 className="text-2xl font-bold mt-2 mb-4 leading-tight text-balance">{meta.title}</h1>

            {/* Author and Date */}
            <div className="dark:text-zinc-400 text-zinc-600 text-sm space-y-1">
              <p>Av {meta.author}</p>
              <p>Publicerad {format(new Date(meta.publishedAt), 'd MMMM, HH:mm', { locale: sv })}</p>
            </div>

            {/* Article Text */}
            <div className="mt-4 space-y-4 font-[family-name:var(--font-publico-text)]">
              <p>{meta.description}</p>
            </div>
            <div className="pt-4 dark:text-zinc-600 text-zinc-400">
              <Icons.omni className="w-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
