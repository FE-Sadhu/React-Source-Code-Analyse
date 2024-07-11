
## Input

```javascript
import { invoke } from "shared-runtime";

function useFoo() {
  const x = {};
  const result = invoke(() => x);
  console.log(result);
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [],
  isComponent: false,
};

```

## Code

```javascript
import { invoke } from "shared-runtime";

function useFoo() {
  const x = {};
  const result = invoke(() => x);
  console.log(result);
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [],
  isComponent: false,
};

```
      
### Eval output
(kind: ok) 
logs: [{}]