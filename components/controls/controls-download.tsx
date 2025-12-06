"use client";

import { ChevronDown, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { z } from "zod";
import { download } from "@/components/download";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip } from "@/components/ui/tooltip";
import { EXPORT_SIZES } from "@/constants/export-size";
import { toBlob, toPng, toSvg } from "@/lib/image";
import { useControls } from "@/lib/params/use-controls";
import { useZodParams } from "@/lib/use-zod-params";

const paramsSchema = z.object({ slugs: z.array(z.string()) });

export function ControlsDownload() {
  const params = useZodParams(paramsSchema.shape);
  const t = useTranslations("controls");
  const [{ size }, setControls] = useControls();

  function savePng() {
    const node = document.getElementById("preview");
    if (!node) {
      return;
    }

    toast.promise(
      toPng(node, { pixelRatio: size }).then((dataUrl) =>
        download(dataUrl, `${params.slugs[0]}.png`)
      ),
      {
        loading: t("toPng.loading"),
        success: t("toPng.success"),
        error: t("toPng.error"),
      }
    );
  }

  function copyPng() {
    const node = document.getElementById("preview");
    if (!node) {
      return;
    }

    navigator.clipboard.write([
      new ClipboardItem({
        "image/png": new Promise((resolve) => {
          toast.promise(
            toBlob(node, {
              pixelRatio: size,
            }).then((blob) => {
              if (!blob) {
                throw new Error("Missing blob");
              }
              resolve(blob);
            }),
            {
              loading: t("copyPng.loading"),
              success: t("copyPng.success"),
              error: t("copyPng.error"),
            }
          );
        }),
      }),
    ]);
  }

  function saveSvg() {
    const node = document.getElementById("preview");
    if (!node) {
      return;
    }

    toast.promise(
      toSvg(node).then((dataUrl) =>
        download(dataUrl, `${params.slugs[0]}.svg`)
      ),
      {
        loading: t("toSvg.loading"),
        success: t("toSvg.success"),
        error: t("toSvg.error"),
      }
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Tooltip content={t("exportImage")}>
        <Button
          className="size-6 shrink-0"
          onClick={savePng}
          size="icon"
          variant="ghost"
        >
          <Download size={16} />
        </Button>
      </Tooltip>

      <DropdownMenu>
        <Tooltip content={t("more")}>
          <div className="flex">
            <DropdownMenuTrigger asChild>
              <Button
                className="size-6 data-[state=open]:text-foreground"
                size="icon"
                variant="ghost"
              >
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
          </div>
        </Tooltip>
        <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
          <DropdownMenuItem onClick={savePng}>{t("savePng")}</DropdownMenuItem>
          <DropdownMenuItem onClick={saveSvg}>{t("saveSvg")}</DropdownMenuItem>
          <DropdownMenuItem onClick={copyPng}>
            {t("copyImage")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>{t("size")}</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={size.toString()}>
                {EXPORT_SIZES.map((exportSize) => (
                  <DropdownMenuRadioItem
                    key={exportSize}
                    onClick={() => setControls({ size: exportSize })}
                    value={exportSize.toString()}
                  >
                    {exportSize}x
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
