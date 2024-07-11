// @validatePreserveExistingMemoizationGuarantees

import { useCallback } from "react";
import { CONST_STRING0 } from "shared-runtime";

// It's correct to infer a useCallback block has no reactive dependencies
function useFoo() {
  return useCallback(() => [CONST_STRING0], [CONST_STRING0]);
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [],
};
