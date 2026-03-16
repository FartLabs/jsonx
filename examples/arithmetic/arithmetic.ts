/**
 * arithmetic executes an operation on two numbers.
 */
function arithmetic(
  op: (a: number, b: number) => number,
  zeroValue: number,
  ...args: number[]
): number {
  return args.reduce((acc, value) => op(acc, value), zeroValue);
}

/**
 * add adds two numbers.
 */
export function add(from = 0, ...values: number[]): number {
  return arithmetic((a, b) => a + b, from, ...values);
}

/**
 * subtract subtracts two numbers.
 */
export function subtract(from = 0, ...values: number[]): number {
  return arithmetic((a, b) => a - b, from, ...values);
}

/**
 * multiply multiplies two numbers.
 */
export function multiply(from = 1, ...values: number[]): number {
  return arithmetic((a, b) => a * b, from, ...values);
}

/**
 * divide divides two numbers.
 */
export function divide(from = 1, ...values: number[]): number {
  return arithmetic((a, b) => a / b, from, ...values);
}

/**
 * modulo calculates the remainder of two numbers.
 */
export function modulo(from = 0, ...values: number[]): number {
  return arithmetic((a, b) => a % b, from, ...values);
}

/**
 * max returns the maximum of two numbers.
 */
export function max(...values: number[]): number {
  return arithmetic(
    (a, b) => Math.max(a, b),
    Number.MIN_SAFE_INTEGER,
    ...values,
  );
}

/**
 * min returns the minimum of two numbers.
 */
export function min(...values: number[]): number {
  return arithmetic(
    (a, b) => Math.min(a, b),
    Number.MAX_SAFE_INTEGER,
    ...values,
  );
}
