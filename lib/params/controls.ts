import {
  parseAsBoolean,
  parseAsNumberLiteral,
  parseAsStringLiteral,
  useQueryStates,
  UseQueryStatesKeysMap,
} from 'nuqs';

import { EXPORT_SIZES } from '@/constants/export-size';
import { PADDING_OPTIONS } from '@/constants/padding';
import { THEME_KEYS } from '@/constants/theme';
import { ORIENTATION_OPTIONS } from '@/constants/orientation';

export const CONTROLS_SEARCH_PARAMS = {
  theme: parseAsStringLiteral(THEME_KEYS).withDefault('graphite'),
  background: parseAsBoolean.withDefault(true),
  darkMode: parseAsBoolean.withDefault(true),
  padding: parseAsNumberLiteral(PADDING_OPTIONS).withDefault(128),
  size: parseAsNumberLiteral(EXPORT_SIZES).withDefault(4),
  orientation:
    parseAsStringLiteral(ORIENTATION_OPTIONS).withDefault('landscape'),
} satisfies UseQueryStatesKeysMap;

export function useControls() {
  return useQueryStates(CONTROLS_SEARCH_PARAMS, { clearOnDefault: true });
}
