"use client";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import { XCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import About from "@/content/about.mdx";

export function AboutDrawer() {
  const t = useTranslations("about");
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button
          className="rounded-full border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground"
          size="icon"
          variant="ghost"
        >
          <InfoCircledIcon className="h-6 w-6" />
          <span className="sr-only">{t("button")}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="h-full w-full overflow-y-auto rounded-lg bg-zinc-100 p-8 dark:bg-zinc-900">
          <DrawerClose asChild>
            <Button
              className="absolute top-4 right-4 rounded-full p-1"
              size="icon"
              variant="outline"
            >
              <XCircle className="h-6 w-6" />
            </Button>
          </DrawerClose>
          <DrawerHeader>
            <DrawerTitle>{t("title")}</DrawerTitle>
          </DrawerHeader>
          <div className="prose prose-zinc dark:prose-invert max-w-lg">
            <About />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
