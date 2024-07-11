
## Input

```javascript
function Component(props) {
  // a does not need to be memoized ever, even though it's a
  // dependency of c, which exists in a scope that has a memoized
  // output. it doesn't need to be memoized bc the value is a primitive type.
  const a = props.a + props.b;

  // b and c are interleaved and grouped into a single scope,
  // but they are independent values. c does not escape, but
  // we need to ensure that a is memoized or else b will invalidate
  // on every render since a is a dependency.
  const b = [];
  const c = {};
  c.a = a;
  b.push(props.c);

  return b;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: ["TodoAdd"],
  isComponent: "TodoAdd",
};

```

## Code

```javascript
import { c as _c } from "react/compiler-runtime";
function Component(props) {
  const $ = _c(3);

  const a = props.a + props.b;
  let b;
  if ($[0] !== a || $[1] !== props.c) {
    b = [];
    const c = {};
    c.a = a;
    b.push(props.c);
    $[0] = a;
    $[1] = props.c;
    $[2] = b;
  } else {
    b = $[2];
  }
  return b;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: ["TodoAdd"],
  isComponent: "TodoAdd",
};

```
      