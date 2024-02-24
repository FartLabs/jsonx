export const REDUCE = "$reduce";

export function $reduce<T>(fn: (value: T) => T) {
  return { [REDUCE]: fn };
}
