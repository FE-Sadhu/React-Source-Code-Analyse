function Component(props) {
  if (props.cond) {
    return undefined;
  }
  return props.value;
}
