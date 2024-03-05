// deno-lint-ignore-file no-explicit-any

import { deepMerge } from "../../../deps.ts";
import { reduceNode } from "./node.ts";

function resolveChildren<TResult, TValue>(
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
  return reduceNode(initial, root as any, reduceChild);
}

function reduceChild<TResult, TValue>(result: TResult, value: TValue): TResult {
  return deepMerge(
    result as Record<PropertyKey, unknown>,
    value as Record<PropertyKey, unknown>,
  ) as TResult;
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
  return resolveChildren<any, any>(
    {},
    { ...value, children },
  );
}
