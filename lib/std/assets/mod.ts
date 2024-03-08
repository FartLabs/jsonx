/**
 * @module
 *
 * This module contains jsonx components for virtual assets.
 *
 * `AssetData` was inspired by the assets object in a Deno Deploy
 * deployment
 * ([API docs](https://apidocs.deno.com/#post-/projects/-projectId-/deployments)).
 *
 * ```tsx
 * const data = (
 *   <LocalAsset
 *      path="src/lib/components/hello.svelte"
 *      src={new URL(import.meta.resolve("./testdata/hello.svelte"))}
 *   />
 * );
 * console.log(data);
 * ```
 */

export * from "./assets.ts";
export * from "./components.ts";
