
## Input

```javascript
// @skip
// Unsupported input

// Valid because hooks can call hooks.
function useHook() {
  useState();
}
const whatever = function useHook() {
  useState();
};
const useHook1 = () => {
  useState();
};
let useHook2 = () => useState();
useHook2 = () => {
  useState();
};
({
  useHook: () => {
    useState();
  },
});
({
  useHook() {
    useState();
  },
});
const {
  useHook3 = () => {
    useState();
  },
} = {};
({
  useHook = () => {
    useState();
  },
} = {});
Namespace.useHook = () => {
  useState();
};

```

## Code

```javascript
// @skip
// Unsupported input

// Valid because hooks can call hooks.
function useHook() {
  useState();
}

const whatever = function useHook() {
  useState();
};

const useHook1 = () => {
  useState();
};

let useHook2 = () => {
  return useState();
};
useHook2 = () => {
  useState();
};

({
  useHook: () => {
    useState();
  },
});
({
  useHook() {
    useState();
  },
});
const {
  useHook3 = () => {
    useState();
  },
} = {};
({
  useHook = () => {
    useState();
  },
} = {});
Namespace.useHook = () => {
  useState();
};

```
      