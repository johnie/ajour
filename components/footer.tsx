import { siteConfig } from '@/constants/site';
import { Icons } from './icons';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center p-4 text-zinc-900 dark:text-zinc-50">
      <Link href={siteConfig.links.johnie} target="_blank">
        <Icons.jh className="w-8" />
      </Link>
    </footer>
  );
};
