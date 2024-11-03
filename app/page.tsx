import React from 'react';
import { useTranslations } from 'next-intl';
import { SearchForm } from '@/components/search-form';
import { siteConfig } from '@/constants/site';
import { ExampleArticles } from '@/components/example-articles';
import { Icons } from '@/components/icons';

export default function Home() {
  const t = useTranslations('home');
  return (
    <main className="flex flex-col justify-center items-center font-[family-name:var(--font-geist-sans)]">
      <Icons.ajour className="w-24 h-auto" />
      <p className="mb-8 mt-3.5 text-sm text-muted-foreground">{t('slogan')}</p>
      <SearchForm />
      <ExampleArticles />
    </main>
  );
}
