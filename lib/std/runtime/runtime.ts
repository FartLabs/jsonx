// deno-lint-ignore-file no-explicit-any

import { deepMerge } from "../../../deps.ts";
import { REDUCE } from "./$reduce.ts";
import { reduceNode } from "./node.ts";

function appendChildren<TResult, TValue>(
  initial: TResult,
  root: TValue,
) {
  // I don't get it...
  // console.log({ result, children });

  // If the child is an element, append it to the parent element.
  if (!Array.isArray((root as any)?.children)) {
    (root as any).children = [(root as any).children];
  }

  // Loose object type to array type conversion.
  if (typeof (root as any).children === "object") {
    (root as any).children = Array.prototype.slice.call((root as any).children);
  }

  // Resolve children and use them to reduce the parent element.
  return reduceChildren(initial, root);
}

export function reduceChildren<TResult, TValue>(
  initial: TResult,
  root: TValue,
): TResult {
  // Resolve children and use them to reduce the parent element.
  return reduceNode(initial, root as any, reduceChild);
}

function reduceChild<TResult, TValue>(result: TResult, value: TValue): TResult {
  // console.log({ shit: { result, value } });
  // If the current value contains a REDUCE directive, reduce the result with it and deep merge the rest of the value.
  const { [REDUCE as keyof TValue]: reduce, ...restValue } = value;
  // const { [REDUCE as keyof TResult]: reduceResult, ...restResult } = result;
  if (typeof reduce === "function") {
    result = reduce(result);
  }

  return deepMerge(
    result as Record<PropertyKey, unknown>,
    restValue as Record<PropertyKey, unknown>,
  ) as TResult;

  // const { [REDUCE as keyof TResult]: reduceResult, ...restResult } = result;
  // if (typeof reduceResult === "function") {
  //   result = reduceResult(restResult);
  // }
}

// const { [REDUCE as keyof T]: reduceResult, ...restResult } = result;
// if (value !== undefined) {
//   const { [REDUCE as keyof T]: reduceValue, ...restValue } = value;
//   if (typeof reduceValue === "function") {
//     return reduceValue(
//       deepMerge(
//         result as Record<PropertyKey, unknown>,
//         restValue as Record<PropertyKey, unknown>,
//       ),
//     );
//   }
// }

// if (typeof reduceResult === "function") {
//   result = reduceResult(restResult);
// }

// return result as T;

// return deepMerge(
//   result as Record<PropertyKey, unknown>,
//   value as Record<PropertyKey, unknown>,
// ) as T;

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

  const value = typeof tagNameOrComponent === "function"
    ? tagNameOrComponent(props)
    : {};

  // console.log("appending children: ", { value, children });

  // Render component node if tagNameOrComponent is a function.
  return appendChildren<any, any>(
    {},
    { ...value, children },
  );
}
