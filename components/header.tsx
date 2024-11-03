import Link from 'next/link';
import { Link as TransitionLink } from 'next-view-transitions';
import { ThemeSwitcher } from './theme-switcher';
import { Icons } from './icons';
import { siteConfig } from '@/constants/site';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useTranslations } from 'next-intl';
import { AboutDrawer } from './about-drawer';

export const Header = () => {
  const t = useTranslations('navigation');
  return (
    <header className="flex items-center justify-between p-4 max-w-screen-xl mx-auto w-full">
      <TransitionLink href="/">
        <h1>
          <Icons.ajour className="w-14 h-auto" />
          <span className="sr-only">{siteConfig.name}</span>
        </h1>
      </TransitionLink>

      <div className="flex items-center gap-2">
        <AboutDrawer />
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className="size-9 flex items-center justify-center rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
        >
          <div>
            <Icons.gitHub className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </div>
        </Link>
        <ThemeSwitcher />
      </div>
    </header>
  );
};
