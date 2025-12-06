"use client";

import { useTranslations } from "next-intl";
import { Tooltip } from "@/components/ui/tooltip";
import { useControls } from "@/lib/params/use-controls";
import { ControlsToggle } from "./controls-toggle";

export function ControlsBackground() {
  const t = useTranslations("controls");
  const [{ background }, setControls] = useControls();

  return (
    <Tooltip content={t("toggleBackground")}>
      <div className="size-6">
        <ControlsToggle
          onPressedChange={(checked) => setControls({ background: !checked })}
          pressed={!background}
        >
          <svg
            aria-label="Toggle background"
            fill="none"
            height="15"
            role="img"
            viewBox="0 0 15 15"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M0 0H3V3H0V0ZM6 3H3V6H0V9H3V12H0V15H3V12H6V15H9V12H12V15H15V12H12V9H15V6H12V3H15V0H12V3H9V0H6V3ZM6 6V3H9V6H6ZM6 9H3V6H6V9ZM9 9V6H12V9H9ZM9 9H6V12H9V9Z"
              fill="currentColor"
              fillRule="evenodd"
              opacity="0.85"
            />
          </svg>
        </ControlsToggle>
      </div>
    </Tooltip>
  );
}
