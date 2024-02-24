import { assertEquals } from "std/assert/mod.ts";
import { Asset, Assets } from "./components.ts";

function Example1() {
  return (
    <Asset
      path="example1.ts"
      content={'console.log("Example1");\n'}
    />
  );
}

interface Example2Props {
  // deno-lint-ignore no-explicit-any
  children?: any;
}

function Example2(props: Example2Props) {
  return (
    <Assets>
      <Asset
        path="example2.ts"
        content={'console.log("Example2");\n'}
      />
      {...props.children}
    </Assets>
  );
}

function Example3() {
  return (
    <Example2>
      <Asset
        path="example3.ts"
        content={'console.log("Example3");\n'}
      />
    </Example2>
  );
}

Deno.test("Compose one asset", () => {
  const actual = <Example1 />;
  const expected = {
    "example1.ts": {
      kind: "file",
      encoding: "utf-8",
      content: 'console.log("Example1");\n',
    },
  };
  assertEquals(actual, expected);
});

Deno.test("Assets compose children successfully", () => {
  const actual = (
    <>
      <Example1 />
      <Example3 />
    </>
  );
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
      "example3.ts": {
        kind: "file",
        encoding: "utf-8",
        content: 'console.log("Example2");\n',
      },
    },
  };
  assertEquals(actual, expected);
});
