function Component(props) {
  const a = [props.a];
  let x = props.b;
  switch (props.c) {
    case a: {
      x = props.d;
    }
  }
  return x;
}
