import { assertEquals } from "../../../developer_deps.ts";
import { AssetKind, EncodingType } from "../assets/mod.ts";
import { LocalAsset } from "./components.tsx";

Deno.test("Local assets read from file system successfully", () => {
  const actual = (
    <LocalAsset
      path="src/lib/components/hello.svelte"
      src={new URL(import.meta.resolve("./testdata/hello.svelte"))}
    />
  );
  const expected = {
    assets: {
      "src/lib/components/hello.svelte": {
        kind: AssetKind.FILE,
        encoding: EncodingType.BASE64,
        content:
          "PHNjcmlwdCBsYW5nPSJ0cyI+CiAgZXhwb3J0IGxldCBuYW1lID0gJ3dvcmxkJzsKPC9zY3JpcHQ+Cgo8aDE+SGVsbG8ge25hbWV9ITwvaDE+Cg==",
      },
    },
  };
  assertEquals(actual, expected);
});
