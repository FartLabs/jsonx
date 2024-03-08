/**
 * Node is a generic tree node type.
 */
export type Node<T> =
  & T
  & { children?: Node<T>[] };

/**
 * reduceNode walks a tree and reduces it to a single value.
 */
export function reduceNode<TResult, TValue>(
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

  const { children: rootChildren, ...rootNode } = root;
  rootChildren?.forEach((child) => traverse(child));
  result = fn(result, rootNode as TValue);
  return result;
}
