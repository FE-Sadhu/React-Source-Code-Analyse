function foo(a, b, c) {
  const [
    d,
    [
      {
        e: { f },
        ...g
      },
    ],
    ...h
  ] = a;
  const {
    l: {
      m: [[n], ...o],
    },
    p,
  } = b;
  return [d, f, g, h, n, o, p];
}
