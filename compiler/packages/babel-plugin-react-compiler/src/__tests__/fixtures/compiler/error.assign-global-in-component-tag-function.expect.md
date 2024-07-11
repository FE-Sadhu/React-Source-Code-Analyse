
## Input

```javascript
function Component() {
  const Foo = () => {
    someGlobal = true;
  };
  return <Foo />;
}

```


## Error

```
  1 | function Component() {
  2 |   const Foo = () => {
> 3 |     someGlobal = true;
    |     ^^^^^^^^^^ InvalidReact: Unexpected reassignment of a variable which was defined outside of the component. Components and hooks should be pure and side-effect free, but variable reassignment is a form of side-effect. If this variable is used in rendering, use useState instead. (https://react.dev/reference/rules/components-and-hooks-must-be-pure#side-effects-must-run-outside-of-render) (3:3)
  4 |   };
  5 |   return <Foo />;
  6 | }
```
          
      