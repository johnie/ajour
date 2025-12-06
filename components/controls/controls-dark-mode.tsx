"use client";

import { Moon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Tooltip } from "@/components/ui/tooltip";
import { useControls } from "@/lib/params/use-controls";
import { ControlsToggle } from "./controls-toggle";

export function ControlsDarkMode() {
  const t = useTranslations("controls");
  const [{ darkMode }, setControls] = useControls();

  return (
    <Tooltip content={t("toggleDarkMode")}>
      <div className="size-6">
        <ControlsToggle
          onPressedChange={(checked) => setControls({ darkMode: checked })}
          pressed={darkMode}
        >
          <Moon className="size-4" />
        </ControlsToggle>
      </div>
    </Tooltip>
  );
}
