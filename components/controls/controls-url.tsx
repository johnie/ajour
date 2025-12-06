"use client";

import { Link } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { useZodParams } from "@/lib/use-zod-params";

const paramsSchema = z.object({ slugs: z.array(z.string()) });

export function ControlsUrl() {
  const t = useTranslations("controls");
  const params = useZodParams(paramsSchema.shape);

  function copyRedirectUrl() {
    const url = `${window.location.origin}/${params.slugs.join(
      "/"
    )}?redirect=true`;
    navigator.clipboard.writeText(url);
    toast.success(t("urlCopied"));
  }

  return (
    <Tooltip content={t("copyUrl")}>
      <Button
        className="size-6 shrink-0"
        onClick={copyRedirectUrl}
        size="icon"
        variant="ghost"
      >
        <Link size={15} />
      </Button>
    </Tooltip>
  );
}
