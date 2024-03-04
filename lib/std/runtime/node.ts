export type Node<T extends object> =
  & T
  & { children?: Node<T>[] };

export function reduceNode<TResult, TValue extends object>(
  initial: TResult,
  children: Node<TValue>[],
  fn: (result: TResult, value: TValue) => TResult,
): TResult {
  let result = { ...initial };
  function traverse({ children, ...node }: Node<TValue>): void {
    if (Array.isArray(children)) {
      children.forEach((child) => traverse(child));
    }

    result = fn(result, node as TValue);
  }

  children?.forEach((child) => traverse(child));
  return result;
}

if (import.meta.main) {
  // Test data
  const input: Node<{ value: number }>[] = [{
    value: 1,
    children: [
      {
        value: 2,
        children: [{ value: 3 }],
      },
      {
        value: 4,
      },
    ],
  }];

  // Test the function
  const result = reduceNode(
    { value: "" },
    input,
    (result: { value: string }, value: { value: number }) => ({
      value: result.value + value.value.toString(),
    }),
  );

  console.log(result); // Output: "(((3) + 2) + 4) + 1"
}

// deno run -A lib/std/runtime/node.ts
