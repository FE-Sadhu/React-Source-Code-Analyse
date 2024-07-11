function useFoo({ input, cond }) {
  const x = [];
  label: {
    if (cond) {
      break label;
    }
  }
  x.push(input.a.b); // unconditional
  return x;
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [{ input: { a: { b: 2 } }, cond: false }],
  sequentialRenders: [
    { input: { a: { b: 2 } }, cond: false },
    // preserve nullthrows
    { input: null, cond: false },
    { input: null, cond: true },
    { input: {}, cond: false },
    { input: { a: { b: null } }, cond: false },
    { input: { a: null }, cond: false },
    { input: { a: { b: 3 } }, cond: false },
  ],
};
