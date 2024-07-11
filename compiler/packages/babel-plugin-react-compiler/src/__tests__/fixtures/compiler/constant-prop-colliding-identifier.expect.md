
## Input

```javascript
import { invoke } from "shared-runtime";

function Component() {
  let x = 2;
  const fn = () => {
    return { x: "value" };
  };
  invoke(fn);
  x = 3;
  return x;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};

```

## Code

```javascript
import { invoke } from "shared-runtime";

function Component() {
  const fn = () => ({ x: "value" });

  invoke(fn);
  return 3;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{}],
};

```
      
### Eval output
(kind: ok) 3