/**
 * @module
 *
 * This module contains jsonx components for arithmetic operations.
 *
 * ```tsx
 * <Add>
 *   <Subtract from={10}>{5}</Subtract>
 *   <Multiply>{2}{3}</Multiply>
 *   <Divide from={<Min>{10}{100}</Min>}>
 *     <Modulo from={15}>{10}</Modulo>
 *   </Divide>
 *   <Max>{1}{2}</Max>
 * </Add>
 * ```
 */

export * from "./arithmetic.ts";
export * from "./components.tsx";
