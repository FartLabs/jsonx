/**
 * @module
 *
 * This module contains functions to implement a JSX runtime for jsonx.
 *
 * ```tsx
 * function Cat() {
 *   return { animals: ["🐈"] };
 * }
 *
 * function Dog() {
 *   return { animals: ["🐕"] };
 * }
 *
 * const data = (
 *   <>
 *     <Cat />
 *     <Dog />
 *   </>
 * );
 * Deno.writeTextFileSync(
 *   "data.json",
 *   JSON.stringify(data, null, 2),
 * );
 * ```
 */

export * from "./runtime.ts";
