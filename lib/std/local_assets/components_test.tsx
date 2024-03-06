import { assertEquals } from "../../../developer_deps.ts";
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
          "PHNjcmlwdCBsYW5nPSJ0cyI+DQogIGV4cG9ydCBsZXQgbmFtZSA9ICd3b3JsZCc7DQo8L3NjcmlwdD4NCg0KPGgxPkhlbGxvIHtuYW1lfSE8L2gxPg0K",
      },
    },
  };
  assertEquals(actual, expected);
});
