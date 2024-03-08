export * from "./components.tsx";

/**
 * @module
 *
 * This module contains jsonx components for local assets.
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
