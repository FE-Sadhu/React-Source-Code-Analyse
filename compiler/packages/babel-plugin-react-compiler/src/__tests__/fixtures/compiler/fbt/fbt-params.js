import fbt from "fbt";

function Component(props) {
  return (
    <fbt desc={"Dialog to show to user"}>
      Hello <fbt:param name="user name">{props.name}</fbt:param>
    </fbt>
  );
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: ["TodoAdd"],
  isComponent: "TodoAdd",
};
