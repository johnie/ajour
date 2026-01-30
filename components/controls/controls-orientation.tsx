"use client";

import { RectangleHorizontal, RectangleVertical } from "lucide-react";
import { useTranslations } from "next-intl";
import { Tooltip } from "@/components/ui/tooltip";
import { useControls } from "@/lib/params/use-controls";
import { ControlsToggle } from "./controls-toggle";

export function ControlsOrientation() {
  const t = useTranslations("controls");
  const [{ orientation }, setControls] = useControls();

  return (
    <div className="flex items-center gap-1">
      <Tooltip content={t("landscape")}>
        <div className="size-6">
          <ControlsToggle
            onPressedChange={() => setControls({ orientation: "landscape" })}
            pressed={orientation === "landscape"}
          >
            <RectangleHorizontal className="size-4" />
          </ControlsToggle>
        </div>
      </Tooltip>
      <Tooltip content={t("portrait")}>
        <div className="size-6">
          <ControlsToggle
            onPressedChange={() => setControls({ orientation: "portrait" })}
            pressed={orientation === "portrait"}
          >
            <RectangleVertical className="size-4" />
          </ControlsToggle>
        </div>
      </Tooltip>
    </div>
  );
}
