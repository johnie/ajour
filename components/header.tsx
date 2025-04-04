import Link from 'next/link';
import { Link as TransitionLink } from 'next-view-transitions';
import { ThemeSwitcher } from './theme-switcher';
import { Icons } from './icons';
import { siteConfig } from '@/constants/site';
import { AboutDrawer } from './about-drawer';

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 max-w-(--breakpoint-xl) mx-auto w-full">
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
          className="size-9 flex items-center justify-center border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground rounded-full"
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
