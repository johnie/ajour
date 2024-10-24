import Link from 'next/link';
import { Link as TransitionLink } from 'next-view-transitions';
import { ThemeSwitcher } from './theme-switcher';
import { Icons } from './icons';
import { siteConfig } from '@/constants/site';

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 max-w-screen-xl mx-auto w-full">
      <TransitionLink href="/">
        <h1 className="text-2xl font-[family-name:var(--font-cal-sans)]">{siteConfig.name}</h1>
      </TransitionLink>

      <div className="flex items-center gap-2">
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
