function g(props) {
  const a = { b: { c: props.c } };
  a.b.c = a.b.c + 1;
  a.b.c *= 2;
  return a;
}
