import React from 'react';
import { SearchForm } from '@/components/search-form';
import { siteConfig } from '@/constants/site';
import { ExampleArticles } from '@/components/example-articles';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-semibold sm:text-4xl font-[family-name:var(--font-cal-sans)]">{siteConfig.name}</h1>
      <p className="mb-8 mt-3.5 text-sm text-muted-foreground">{siteConfig.description}</p>
      <SearchForm />
      <ExampleArticles />
    </main>
  );
}
