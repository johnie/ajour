import { useQueryStates } from "nuqs";
import { CONTROLS_SEARCH_PARAMS } from "./controls";

export function useControls() {
  return useQueryStates(CONTROLS_SEARCH_PARAMS, { clearOnDefault: true });
}
