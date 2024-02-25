import { assertEquals } from "../../../developer_deps.ts";
import { Asset, Assets } from "./components.ts";
import { AssetKind, EncodingType } from "./assets.ts";

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

interface Example4Props {
  // deno-lint-ignore no-explicit-any
  children?: any;
}

function Example4(props: Example4Props) {
  return (
    <>
      <Asset
        path="example4.ts"
        content={'console.log("Example4");\n'}
      />
      {...props.children}
    </>
  );
}

Deno.test("Compose one asset", () => {
  const actual = <Example1 />;
  const expected = {
    assets: {
      "example1.ts": {
        kind: AssetKind.FILE,
        encoding: EncodingType.UTF8,
        content: 'console.log("Example1");\n',
      },
    },
  };
  assertEquals(actual, expected);
});

Deno.test("Compose asset in a fragment", () => {
  const actual = <Example4 />;
  const expected = {
    assets: {
      "example4.ts": {
        kind: AssetKind.FILE,
        encoding: EncodingType.UTF8,
        content: 'console.log("Example4");\n',
      },
    },
  };
  assertEquals(actual, expected);
});

Deno.test("Assets compose children successfully", () => {
  const actual = (
    <>
      <Example3 />
      <Example4>
        <Example1 />
      </Example4>
    </>
  );
  const expected = {
    assets: {
      "example1.ts": {
        kind: AssetKind.FILE,
        encoding: EncodingType.UTF8,
        content: 'console.log("Example1");\n',
      },
      "example2.ts": {
        kind: AssetKind.FILE,
        encoding: EncodingType.UTF8,
        content: 'console.log("Example2");\n',
      },
      "example3.ts": {
        kind: AssetKind.FILE,
        encoding: EncodingType.UTF8,
        content: 'console.log("Example3");\n',
      },
      "example4.ts": {
        kind: AssetKind.FILE,
        encoding: EncodingType.UTF8,
        content: 'console.log("Example4");\n',
      },
    },
  };
  assertEquals(actual, expected);
});
