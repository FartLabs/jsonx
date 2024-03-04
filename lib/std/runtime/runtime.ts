// deno-lint-ignore-file no-explicit-any

import { deepMerge } from "../../../deps.ts";
import { REDUCE } from "./$reduce.ts";
import { reduceNode } from "./node.ts";

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
  return reduceNode(
    initial,
    children,
    reduceChild,
  );
}

function reduceChild<T extends object>(result: T, value: T): T {
  if (!value) {
    return result;
  }

  const { [REDUCE as keyof T]: reduce, ...restValue } = value;
  if (reduce !== undefined) {
    if (typeof reduce !== "function") {
      throw new Error("Invalid reduce directive");
    }

    return reduce(
      deepMerge(
        result as Record<PropertyKey, unknown>,
        restValue as Record<PropertyKey, unknown>,
      ),
    );
  }

  return deepMerge(
    result as Record<PropertyKey, unknown>,
    value as Record<PropertyKey, unknown>,
  ) as T;
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

  // Render component if tagNameOrComponent is a function.
  const element = typeof tagNameOrComponent === "function"
    ? tagNameOrComponent(props)
    : {};
  return appendChildren(element, children);
}
