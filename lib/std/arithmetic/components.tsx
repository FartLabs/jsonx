import * as arithmetic from "./arithmetic.ts";

/**
 * ArithmeticProps are the properties of the arithmetic components.
 */
export interface ArithmeticProps {
  /**
   * children are the values to perform arithmetic on.
   */
  children?: number | number[];

  /**
   * from is the initial value to perform arithmetic on.
   */
  from?: number;
}

/**
 * Add is a component that adds together its children.
 */
export function Add(props: ArithmeticProps): number {
  return arithmetic.add(props.from, ...([props.children ?? []].flat()));
}

/**
 * Subtract is a component that subtracts its children from each other.
 */
export function Subtract(props: ArithmeticProps): number {
  return arithmetic.subtract(props.from, ...([props.children ?? []].flat()));
}

/**
 * Multiply is a component that multiplies its children together.
 */
export function Multiply(props: ArithmeticProps): number {
  return arithmetic.multiply(props.from, ...([props.children ?? []].flat()));
}

/**
 * Divide is a component that divides its children from each other.
 */
export function Divide(props: ArithmeticProps): number {
  return arithmetic.divide(props.from, ...([props.children ?? []].flat()));
}

/**
 * Modulo is a component that calculates the remainder of its children.
 */
export function Modulo(props: ArithmeticProps): number {
  return arithmetic.modulo(props.from, ...([props.children ?? []].flat()));
}

/**
 * Max is a component that returns the maximum of its children.
 */
export function Max(props: Omit<ArithmeticProps, "from">): number {
  return arithmetic.max(...([props.children ?? []].flat()));
}

/**
 * Min is a component that returns the minimum of its children.
 */
export function Min(props: Omit<ArithmeticProps, "from">): number {
  return arithmetic.min(...([props.children ?? []].flat()));
}
