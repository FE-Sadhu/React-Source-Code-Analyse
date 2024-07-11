
## Input

```javascript
import { identity } from "shared-runtime";

function Component(props) {
  const key = 42;
  const context = {
    [key]: identity([props.value]),
  };
  return context;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{ value: "hello!" }],
};

```

## Code

```javascript
import { c as _c } from "react/compiler-runtime";
import { identity } from "shared-runtime";

function Component(props) {
  const $ = _c(4);
  let t0;
  if ($[0] !== props.value) {
    t0 = identity([props.value]);
    $[0] = props.value;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  let t1;
  if ($[2] !== t0) {
    t1 = { [42]: t0 };
    $[2] = t0;
    $[3] = t1;
  } else {
    t1 = $[3];
  }
  const context = t1;
  return context;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{ value: "hello!" }],
};

```
      
### Eval output
(kind: ok) {"42":["hello!"]}