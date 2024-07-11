
## Input

```javascript
import fbt from "fbt";

function Component(props) {
  return (
    <fbt desc={"Dialog to show to user"}>
      Hello <fbt:param name="user name">{props.name}</fbt:param>
    </fbt>
  );
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
import fbt from "fbt";

function Component(props) {
  const $ = _c(2);
  let t0;
  if ($[0] !== props.name) {
    t0 = fbt._("Hello {user name}", [fbt._param("user name", props.name)], {
      hk: "2zEDKF",
    });
    $[0] = props.name;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  return t0;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: ["TodoAdd"],
  isComponent: "TodoAdd",
};

```
      