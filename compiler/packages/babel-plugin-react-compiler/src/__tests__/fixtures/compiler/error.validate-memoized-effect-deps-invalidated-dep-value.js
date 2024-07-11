// @validateMemoizedEffectDependencies
import { useHook } from "shared-runtime";

function Component(props) {
  const x = [];
  useHook(); // intersperse a hook call to prevent memoization of x
  x.push(props.value);

  const y = [x];

  useEffect(() => {
    console.log(y);
  }, [y]);
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{ value: "sathya" }],
};
