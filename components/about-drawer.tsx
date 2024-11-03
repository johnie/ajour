'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import About from '@/content/about.mdx';

export function AboutDrawer() {
  const t = useTranslations('about');
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
          size="icon"
        >
          <InfoCircledIcon className="w-6 h-6" />
          <span className="sr-only">{t('button')}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-full h-full bg-zinc-100 dark:bg-zinc-900 p-8 rounded-lg">
          <DrawerClose asChild>
            <Button
              variant="outline"
              size="icon"
              className="top-4 right-4 rounded-full absolute p-1"
            >
              <XCircle className="w-6 h-6" />
            </Button>
          </DrawerClose>
          <DrawerHeader>
            <DrawerTitle>{t('title')}</DrawerTitle>
          </DrawerHeader>
          <div className="prose prose-zinc dark:prose-invert max-w-lg">
            <About />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
