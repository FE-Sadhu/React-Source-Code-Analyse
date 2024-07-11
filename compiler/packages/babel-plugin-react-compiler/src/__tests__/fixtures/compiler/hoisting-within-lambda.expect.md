
## Input

```javascript
function Component({}) {
  const outer = () => {
    const inner = () => {
      return x;
    };
    const x = 3;
    return inner();
  };
  return <div>{outer()}</div>;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};

```

## Code

```javascript
import { c as _c } from "react/compiler-runtime";
function Component(t0) {
  const $ = _c(1);
  let t1;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    const outer = () => {
      const inner = () => x;

      const x = 3;
      return inner();
    };

    t1 = <div>{outer()}</div>;
    $[0] = t1;
  } else {
    t1 = $[0];
  }
  return t1;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};

```
      
### Eval output
(kind: ok) <div>3</div>