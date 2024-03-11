import { assertEquals } from "../../../deno_deps.ts";
import { AssetKind, EncodingType } from "../assets/assets.ts";
import { LocalAsset } from "./components.tsx";

Deno.test("LocalAsset reads from file system", () => {
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
          "PHNjcmlwdCBsYW5nPSJ0cyI+CiAgZXhwb3J0IGxldCBuYW1lID0gIndvcmxkIjsKPC9zY3JpcHQ+Cgo8aDE+SGVsbG8ge25hbWV9ITwvaDE+Cg==",
      },
    },
  };
  assertEquals(actual, expected);
});
