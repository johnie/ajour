import {
  parseAsBoolean,
  parseAsNumberLiteral,
  parseAsStringLiteral,
} from "nuqs/server";

import { EXPORT_SIZES } from "@/constants/export-size";
import { ORIENTATIONS } from "@/constants/orientation";
import { PADDING_OPTIONS } from "@/constants/padding";
import { THEME_KEYS } from "@/constants/theme";

export const CONTROLS_SEARCH_PARAMS = {
  theme: parseAsStringLiteral(THEME_KEYS).withDefault("graphite"),
  background: parseAsBoolean.withDefault(true),
  darkMode: parseAsBoolean.withDefault(true),
  padding: parseAsNumberLiteral(PADDING_OPTIONS).withDefault(128),
  size: parseAsNumberLiteral(EXPORT_SIZES).withDefault(4),
  orientation: parseAsStringLiteral(ORIENTATIONS).withDefault("landscape"),
};
