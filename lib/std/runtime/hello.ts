interface Node<T> {
  value: T;
  children?: Node<T>[];
}

function reduceChildren<TValue, TResult>(
  data: Node<TValue>[],
  fn: (result: TResult, value: TValue) => TResult,
  initial: TResult,
): TResult {
  let result = initial;
  function traverse(node: Node<TValue>): void {
    if (Array.isArray(node.children)) {
      node.children.forEach((child) => traverse(child));
    }

    result = fn(result, node.value);
  }

  data.forEach((node) => traverse(node));
  return result;
}

// Test data
const input: Node<number>[] = [{
  value: 1,
  children: [{
    value: 2,
    children: [{ value: 3 }],
  }, {
    value: 4,
  }],
}];

// Test the function
const result = reduceChildren(input, (result, value) => result + value, "");
console.log(result); // Output: "(((3) + 2) + 4) + 1"

// deno run -A lib/std/runtime/hello.ts
