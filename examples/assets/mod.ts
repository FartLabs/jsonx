/**
 * @module
 *
 * This module contains jsonx components for virtual assets.
 *
 * `AssetData` is inspired by the assets object in a Deno Deploy
 * deployment
 * ([API docs](https://apidocs.deno.com/#post-/projects/-projectId-/deployments)).
 *
 * ```tsx
 * const data = (
 *   <Asset
 *     path="example.ts"
 *     content={'console.log("Example");\n'}
 *   />
 * );
 * console.log(data);
 * ```
 */

export * from "./assets.ts";
export * from "./components.tsx";
