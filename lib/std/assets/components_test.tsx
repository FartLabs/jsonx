import { assertEquals } from "@std/assert";
import { AssetKind, EncodingType } from "./assets.ts";
import { Asset, Assets } from "./components.tsx";

Deno.test("Asset composes successfully", () => {
  const actual = (
    <Asset
      path="example.ts"
      content={'console.log("Example");\n'}
    />
  );
  const expected = {
    assets: {
      "example.ts": {
        kind: AssetKind.FILE,
        encoding: EncodingType.UTF8,
        content: 'console.log("Example");\n',
      },
    },
  };
  assertEquals(actual, expected);
});

Deno.test("Assets compose children successfully", () => {
  const actual = (
    <Assets>
      <Asset
        path="example1.ts"
        content={'console.log("Example1");\n'}
      />
      <Asset
        path="example2.ts"
        content={'console.log("Example2");\n'}
      />
      <Asset
        path="example3.ts"
        content={'console.log("Example3");\n'}
      />
      <Asset
        path="example4.ts"
        content={'console.log("Example4");\n'}
      />
    </Assets>
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
