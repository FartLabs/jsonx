import { assertEquals } from "std/assert/mod.ts";
import { Asset, Assets } from "./components.ts";

Deno.test("Assets compose children successfully", () => {
  interface Example1Props {
    // deno-lint-ignore no-explicit-any
    children?: any;
  }

  function Example1(props: Example1Props) {
    return (
      <Assets>
        <Asset
          path="example1.ts"
          content={'console.log("Example1");\n'}
        />
        {...props.children}
      </Assets>
    );
  }

  function Example2() {
    return (
      <Example1>
        <Asset
          path="example2.ts"
          content={'console.log("Example2");\n'}
        />
      </Example1>
    );
  }

  const actual = <Example2 />;
  const expected = {
    assets: {
      "example1.ts": {
        kind: "file",
        encoding: "utf-8",
        content: 'console.log("Example1");\n',
      },
      "example2.ts": {
        kind: "file",
        encoding: "utf-8",
        content: 'console.log("Example2");\n',
      },
    },
  };
  assertEquals(actual, expected);
});
