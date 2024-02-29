// deno-lint-ignore-file no-explicit-any

import { deepMerge } from "../../../deps.ts";
import { REDUCE } from "./$reduce.ts";
import { reduceNode } from "./node.ts";

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
  const $ = appendChildren(element, children);
  // TODO: Figure out which $reduce is here and why.
  // console.log({
  //   $,
  //   element,
  //   children,
  //   fn: $?.[REDUCE as keyof any]?.toString(),
  // });
  return $;
}

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

  // Resolve children and use them to reduce the parent element.
  return reduceChildren(element, children);
}

export function reduceChildren<T extends object>(
  initial: T,
  children: T[],
): T {
  // Resolve children and use them to reduce the parent element.
  let result = reduceNode(
    initial,
    children.map(({ children, ...child }: any) => ({
      value: child,
      children,
    })),
    childrenReducer,
  );

  console.log({ result0: result });

  // First, reduce the running result.
  let reduce = result[REDUCE as keyof T];
  if (typeof reduce === "function") {
    result = reduce(result);
  }

  console.log({ result1: result });

  // Then, reduce the parent element.
  reduce = initial[REDUCE as keyof T];
  if (typeof reduce === "function") {
    result = reduce(result);
  }

  console.log({ result2: result });

  // Reduce $reduce directive.
  // const { [REDUCE as keyof T]: reduce } = result;
  // if (typeof reduce === "function") {
  //   result = reduce(result);
  // }

  // Apply deep merge on the existing value.
  result = deepMerge(initial, result) as T;

  // Delete the $reduce directive.
  delete result[REDUCE as keyof T];
  console.log({ result3: result });
  return result;
}

function childrenReducer<T>(result: T, value: T): T {
  if (!value) {
    return result;
  }

  if (!(value[REDUCE as keyof T])) {
    return value;
  }

  const { [REDUCE as keyof T]: reduce } = value;
  if (typeof reduce !== "function") {
    throw new Error("Invalid reduce directive");
  }

  const reduceResult = reduce(result);
  const mergeResult = deepMerge(
    result as Record<PropertyKey, unknown>,
    reduceResult,
  );
  return mergeResult as T;
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
