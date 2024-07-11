
## Input

```javascript
function Component(props) {
  const mutate = (object, key, value) => {
    object.updated = true;
    object[key] = value;
  };
  const x = makeObject(props);
  mutate(x);
  return x;
}

```

## Code

```javascript
import { c as _c } from "react/compiler-runtime";
function Component(props) {
  const $ = _c(3);
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = (object, key, value) => {
      object.updated = true;
      object[key] = value;
    };
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const mutate = t0;
  let x;
  if ($[1] !== props) {
    x = makeObject(props);
    mutate(x);
    $[1] = props;
    $[2] = x;
  } else {
    x = $[2];
  }
  return x;
}

```
      