import { assertEquals } from "std/assert/mod.ts";
import { Assets } from "jsonx/std/assets/mod.ts";
import { LocalAsset } from "./components.tsx";

Deno.test("Local assets read from file system successfully", () => {
  const actual = (
    <Assets>
      <LocalAsset
        path="src/lib/components/hello.svelte"
        src={new URL(import.meta.resolve("./testdata/hello.svelte"))}
      />
    </Assets>
  );

  const expected = {
    assets: {
      "src/lib/components/hello.svelte": {
        kind: "file",
        encoding: "base64",
        content:
          "PHNjcmlwdCBsYW5nPSJ0cyI+DQogIGV4cG9ydCBsZXQgbmFtZSA9ICd3b3JsZCc7DQo8L3NjcmlwdD4NCg0KPGgxPkhlbGxvIHtuYW1lfSE8L2gxPg0K",
      },
    },
  };
  assertEquals(actual, expected);
});
