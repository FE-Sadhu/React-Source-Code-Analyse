
## Input

```javascript
// @validatePreserveExistingMemoizationGuarantees

import { useMemo } from "react";
import { useHook } from "shared-runtime";

// useMemo values may not be memoized in Forget output if we
// infer that their deps always invalidate.
// This is still correct as the useMemo in source was effectively
// a no-op already.
function useFoo(props) {
  const x = [];
  useHook();
  x.push(props);

  return useMemo(() => [x], [x]);
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [{}],
};

```

## Code

```javascript
// @validatePreserveExistingMemoizationGuarantees

import { useMemo } from "react";
import { useHook } from "shared-runtime";

// useMemo values may not be memoized in Forget output if we
// infer that their deps always invalidate.
// This is still correct as the useMemo in source was effectively
// a no-op already.
function useFoo(props) {
  const x = [];
  useHook();
  x.push(props);
  let t0;
  t0 = [x];
  return t0;
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [{}],
};

```
      
### Eval output
(kind: ok) [[{}]]