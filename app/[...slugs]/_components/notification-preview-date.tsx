"use client";

import { format, formatDistanceToNow } from "date-fns";
import { sv } from "date-fns/locale";
import { useControls } from "@/lib/params/use-controls";
import { cn } from "@/lib/utils";

const formateDate = (date: string) => {
  const twoDays = 1000 * 60 * 60 * 24 * 2;
  const now = Date.now();

  const dateInMs = new Date(date).getTime();
  const diff = now - dateInMs;

  if (diff < twoDays) {
    return formatDistanceToNow(new Date(date), { locale: sv, addSuffix: true });
  }

  return format(new Date(date), "d MMMM yyyy", { locale: sv });
};

export function NotficationPreviewDate({ date }: { date: string }) {
  const [{ darkMode }] = useControls();

  if (!date) {
    return null;
  }

  return (
    <div
      className={cn("flex items-center gap-1.5", {
        "text-zinc-300": darkMode,
        "text-zinc-700": !darkMode,
      })}
    >
      {formateDate(date)}
    </div>
  );
}
