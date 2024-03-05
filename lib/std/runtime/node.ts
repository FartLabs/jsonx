export type Node<T extends object> =
  & T
  & { children?: Node<T>[] };

export function reduceNode<TResult, TValue extends object>(
  initial: TResult,
  root: Node<TValue>,
  fn: (result: TResult, value: TValue) => TResult,
): TResult {
  let result = { ...initial };
  function traverse({ children, ...node }: Node<TValue>): void {
    if (Array.isArray(children)) {
      children.forEach((child) => traverse(child));
    }

    result = fn(result, node as TValue);
  }

  root?.children?.forEach((child) => traverse(child));
  result = fn(result, root as TValue);
  return result;
}

if (import.meta.main) {
  // Test the function
  const result = reduceNode(
    { value: "" },
    {
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
    },
    (result: { value: string }, value: { value: number }) => ({
      value: result.value + value.value.toString(),
    }),
  );

  console.log(result); // Output: "(((3) + 2) + 4) + 1"
}

// deno run -A lib/std/runtime/node.ts
