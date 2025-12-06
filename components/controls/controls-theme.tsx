"use client";

import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Tooltip } from "@/components/ui/tooltip";
import { THEME_OPTIONS, type Theme } from "@/constants/theme";
import { useControls } from "@/lib/params/use-controls";
import { themeBackground } from "@/lib/utils";

export function ControlsTheme() {
  const t = useTranslations("themes");
  const [{ theme }, setControls] = useControls();

  return (
    <Select
      onValueChange={(value) => setControls({ theme: value as Theme })}
      value={theme}
    >
      <Tooltip content="Theme">
        <SelectTrigger className="h-auto rounded-full border-0 p-0">
          <div className="size-6 rounded-full" style={themeBackground(theme)} />
        </SelectTrigger>
      </Tooltip>
      <SelectContent onCloseAutoFocus={(e) => e.preventDefault()}>
        {THEME_OPTIONS.map((themeOption) => (
          <SelectItem key={themeOption.id} value={themeOption.id}>
            <div className="flex items-center gap-2">
              <div
                className="size-4 rounded-full"
                style={themeBackground(themeOption.id)}
              />
              {t(themeOption.id)}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
