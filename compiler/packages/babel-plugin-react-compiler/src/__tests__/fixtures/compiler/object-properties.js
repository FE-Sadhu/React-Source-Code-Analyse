function foo(a, b, c) {
  const x = a.x;
  const y = { ...b.c.d };
  y.z = c.d.e;
  foo(a.b.c);
  [a.b.c];
}
