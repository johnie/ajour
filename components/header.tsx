import Link from "next/link";
import { Link as TransitionLink } from "next-view-transitions";
import { siteConfig } from "@/constants/site";
import { AboutDrawer } from "./about-drawer";
import { Icons } from "./icons";
import { ThemeSwitcher } from "./theme-switcher";

export const Header = () => (
  <header className="mx-auto flex w-full max-w-(--breakpoint-xl) items-center justify-between p-4">
    <TransitionLink href="/">
      <h1>
        <Icons.ajour className="h-auto w-14" />
        <span className="sr-only">{siteConfig.name}</span>
      </h1>
    </TransitionLink>

    <div className="flex items-center gap-2">
      <AboutDrawer />
      <Link
        className="flex size-9 items-center justify-center rounded-full border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground"
        href={siteConfig.links.github}
        rel="noreferrer"
        target="_blank"
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
