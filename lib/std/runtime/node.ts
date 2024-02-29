export interface Node<T> {
  value: T;
  children?: Node<T>[];
}

export function reduceNode<TValue, TResult>(
  initial: TResult,
  children: Node<TValue>[],
  fn: (result: TResult, value: TValue) => TResult,
): TResult {
  // console.log({ initial, children });
  let result = initial;
  function traverse(node: Node<TValue>): void {
    if (Array.isArray(node.children)) {
      node.children.forEach((child) => traverse(child));
    }

    // console.log({ 0: { result, value: node.value } });
    result = fn(result, node.value);
  }

  children.forEach((node) => traverse(node));
  return result;
}

if (import.meta.main) {
  // Test data
  const input: Node<number>[] = [{
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
    "",
    input,
    (result: string, value: number) => result + value,
  );
  console.log(result); // Output: "(((3) + 2) + 4) + 1"
}

// deno run -A lib/std/runtime/node.ts
