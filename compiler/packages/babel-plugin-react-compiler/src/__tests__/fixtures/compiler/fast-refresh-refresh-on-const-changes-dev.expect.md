
## Input

```javascript
// @compilationMode(infer) @enableResetCacheOnSourceFileChanges
import { useEffect, useMemo, useState } from "react";
import { ValidateMemoization } from "shared-runtime";

let pretendConst = 0;

function unsafeResetConst() {
  pretendConst = 0;
}

function unsafeUpdateConst() {
  pretendConst += 1;
}

function Component() {
  useState(() => {
    // unsafe: reset the constant when first rendering the instance
    unsafeResetConst();
  });
  // UNSAFE! changing a module variable that is read by a component is normally
  // unsafe, but in this case we're simulating a fast refresh between each render
  unsafeUpdateConst();

  // TODO: In fast refresh mode (@enableResetCacheOnSourceFileChanges) Forget should
  // reset on changes to globals that impact the component/hook, effectively memoizing
  // as if value was reactive. However, we don't want to actually treat globals as
  // reactive (though that would be trivial) since it could change compilation too much
  // btw dev and prod. Instead, we should reset the cache via a secondary mechanism.
  const value = useMemo(() => [{ pretendConst }], [pretendConst]);

  return <ValidateMemoization inputs={[pretendConst]} output={value} />;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
  sequentialRenders: [{}, {}],
};

```

## Code

```javascript
import { c as _c } from "react/compiler-runtime"; // @compilationMode(infer) @enableResetCacheOnSourceFileChanges
import { useEffect, useMemo, useState } from "react";
import { ValidateMemoization } from "shared-runtime";

let pretendConst = 0;

function unsafeResetConst() {
  pretendConst = 0;
}

function unsafeUpdateConst() {
  pretendConst += 1;
}

function Component() {
  const $ = _c(4);
  if (
    $[0] !== "4bf230b116dd95f382060ad17350e116395e41ed757e51fd074ea0b4ed281272"
  ) {
    for (let $i = 0; $i < 4; $i += 1) {
      $[$i] = Symbol.for("react.memo_cache_sentinel");
    }
    $[0] = "4bf230b116dd95f382060ad17350e116395e41ed757e51fd074ea0b4ed281272";
  }
  let t0;
  if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = () => {
      unsafeResetConst();
    };
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  useState(t0);

  unsafeUpdateConst();
  let t1;
  let t2;
  if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
    t2 = [{ pretendConst }];
    $[2] = t2;
  } else {
    t2 = $[2];
  }
  t1 = t2;
  const value = t1;
  let t3;
  if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
    t3 = <ValidateMemoization inputs={[pretendConst]} output={value} />;
    $[3] = t3;
  } else {
    t3 = $[3];
  }
  return t3;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
  sequentialRenders: [{}, {}],
};

```
      