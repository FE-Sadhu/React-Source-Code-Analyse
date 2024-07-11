
## Input

```javascript
// @enableTransitivelyFreezeFunctionExpressions
function Component(props) {
  const { data, loadNext, isLoadingNext } =
    usePaginationFragment(props.key).items ?? [];

  const loadMoreWithTiming = () => {
    if (data.length === 0) {
      return;
    }
    loadNext();
  };

  useEffect(() => {
    if (isLoadingNext) {
      return;
    }
    loadMoreWithTiming();
  }, [isLoadingNext, loadMoreWithTiming]);

  const items = data.map((x) => x);

  return items;
}

```

## Code

```javascript
import { c as _c } from "react/compiler-runtime"; // @enableTransitivelyFreezeFunctionExpressions
function Component(props) {
  const $ = _c(10);
  const { data, loadNext, isLoadingNext } =
    usePaginationFragment(props.key).items ?? [];
  let t0;
  if ($[0] !== data.length || $[1] !== loadNext) {
    t0 = () => {
      if (data.length === 0) {
        return;
      }

      loadNext();
    };
    $[0] = data.length;
    $[1] = loadNext;
    $[2] = t0;
  } else {
    t0 = $[2];
  }
  const loadMoreWithTiming = t0;
  let t1;
  let t2;
  if ($[3] !== isLoadingNext || $[4] !== loadMoreWithTiming) {
    t1 = () => {
      if (isLoadingNext) {
        return;
      }

      loadMoreWithTiming();
    };
    t2 = [isLoadingNext, loadMoreWithTiming];
    $[3] = isLoadingNext;
    $[4] = loadMoreWithTiming;
    $[5] = t1;
    $[6] = t2;
  } else {
    t1 = $[5];
    t2 = $[6];
  }
  useEffect(t1, t2);
  let t3;
  if ($[7] !== data) {
    let t4;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
      t4 = (x) => x;
      $[9] = t4;
    } else {
      t4 = $[9];
    }
    t3 = data.map(t4);
    $[7] = data;
    $[8] = t3;
  } else {
    t3 = $[8];
  }
  const items = t3;
  return items;
}

```
      