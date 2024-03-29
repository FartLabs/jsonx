import { assertEquals } from "@std/assert";
import { AssetKind, EncodingType } from "jsonx/std/assets/mod.ts";
import { LocalAsset } from "./components.tsx";

Deno.test("LocalAsset reads from file system", () => {
  const path = "src/lib/components/hello.svelte";
  const src = new URL(import.meta.resolve("./testdata/hello.svelte"));
  const actual = <LocalAsset path={path} src={src} />;
  assertEquals(actual.assets[path].kind, AssetKind.FILE);
});
