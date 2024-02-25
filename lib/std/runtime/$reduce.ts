export const REDUCE = "$reduce";

// deno-lint-ignore no-explicit-any
export function $reduce<T>(fn: (value: T) => T): any {
  return { [REDUCE]: fn };
}
