import Link from "next/link";
import { siteConfig } from "@/constants/site";
import { Icons } from "./icons";

export const Footer = () => (
  <footer className="flex w-full items-center justify-center p-4 text-zinc-900 dark:text-zinc-50">
    <Link href={siteConfig.links.johnie} target="_blank">
      <Icons.jh className="w-8" />
    </Link>
  </footer>
);
