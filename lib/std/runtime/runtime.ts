// deno-lint-ignore-file no-explicit-any

// import { deepMerge } from "../../../deps.ts";
import { REDUCE } from "./$reduce.ts";

/**
 * createObject is a function that represents the JSONX runtime.
 *
 * @see
 * https://github.com/nanojsx/nano/blob/2590dd9477970b2dc2a1d1ae5fb03b7c87a84174/src/core.ts#L196
 */
export function createObject(
  tagNameOrComponent: any,
  props: any = {},
  ...children: any[]
): any {
  // If children is passed as props, merge with ...children.
  if (props?.children) {
    const propsChildren = Array.isArray(props.children)
      ? props.children
      : [props.children];
    children = [...children, ...propsChildren];

    // Reflect the change in props.
    if (Array.isArray(props.children)) {
      props.children = [...children];
    }
  }

  if (!props.children) {
    props.children = children;
  }

  // Render component if tagNameOrComponent is a function.
  const element = typeof tagNameOrComponent === "function"
    ? tagNameOrComponent(props)
    : {};
  return appendChildren(element, children);
}

// function reduceElements<T>(...elements: T[]) {
//   return elements.reduce(
//     (reduced: T, element: T): T => {
//       const { [REDUCE as keyof T]: reduce } = element;
//       if (typeof reduce === "function") {
//         console.log({ reduced0: reduced });
//         reduced = reduce(reduced);
//         console.log({ reduced1: reduced });
//         return reduced as T;
//         // return reduce(reduced);

//         // return deepMerge(
//         //   reduced as Record<PropertyKey, unknown>,
//         //   restElement,
//         // ));
//       }

//       return deepMerge(
//         reduced as Record<PropertyKey, unknown>,
//         element as Record<PropertyKey, unknown>,
//       ) as T;
//     },
//     {} as T,
//   );
// }

// function traverseChildren<T>(node: Node, callback: (childrenResults: T[], accumulator?: T) => T, accumulator?: T): T {
//   if (!node.children) {
//     return accumulator ?? null; // Base case, return accumulator or null for leaf nodes
//   }

//   const results: T[] = [];
//   for (const child of node.children) {
//     const childResult = traverseChildren(child, callback, accumulator);
//     if (childResult !== undefined) {
//       results.push(childResult);
//     }
//   }

//   return callback(results, accumulator);
// }

interface Node {
  children?: Node[];
  data?: any; // Replace with your actual data type
}

// function reduceChildren<T extends object>(
//   children: T[],
//   fn: (childrenResults: T[], accumulator?: T) => T,
//   accumulator?: T,
// ): T {
//   if (!Array.isArray(children)) {
//     return reduceChildren([children], fn, accumulator);
//   }

//   const results: T[] = [];
//   for (const child of children) {
//     const childResult = reduceChildren(child, fn, accumulator);
//     if (childResult !== undefined) {
//       results.push(childResult);
//     }
//   }

//   return fn(results, accumulator);
// }

function appendChildren<T extends object>(
  element: T,
  children: T[],
) {
  // If the child is an element, append it to the parent element.
  if (!Array.isArray(children)) {
    return appendChildren(element, [children]);
  }

  // Loose object type to array type conversion.
  if (typeof children === "object") {
    children = Array.prototype.slice.call(children);
  }

  // TODO: Apply the $reduce directive to the parent element.
  // Resolve children and use them to reduce the parent element. (I thought it was already recursive though.)

  // If the element is a reduction directive, apply it to itself by walking the graph backwards.
  const stack: T[] = [...children];
  while (stack.length) {
    const nextElement = stack.pop() as T;
    if (Array.isArray(nextElement)) {
      stack.push(...nextElement);
      continue;
    }

    const { [REDUCE as keyof T]: reduce } = nextElement;
    if (typeof reduce === "function") {
      element = reduce(element);
    }
  }

  // // If child is an array of children, append them instead.
  // if (Array.isArray(child)) {
  //   const nextElement = appendChildren(element, child);
  //   element = deepMerge(element, nextElement) as T;
  //   continue;
  // }

  return element;
}

function createNode(
  type: any,
  props: any,
  _key: string,
  _source?: string,
  _self?: string,
): any {
  let { children = [], ...restProps } = props;
  if (!Array.isArray(children)) {
    children = [children];
  }

  return createObject(type, restProps, ...children);
}

export { createObject as h };
export { createNode as jsx };
export { createNode as jsxs };
export { createNode as jsxDev };

export function Fragment(_: any): any {
  return [];
}
