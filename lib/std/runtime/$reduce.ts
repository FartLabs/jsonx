export const REDUCE = "$reduce";

// deno-lint-ignore no-explicit-any
export function $reduce<T>(fn: (acc: T) => T): any {
  return { [REDUCE]: fn };
}
