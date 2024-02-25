// deno-lint-ignore-file no-explicit-any

import { deepMerge } from "std/collections/deep_merge.ts";
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

function appendChildren<T extends object>(
  element: T,
  children: T[],
) {
  // If the child is an element, append it to the parent element.
  if (!Array.isArray(children)) {
    appendChildren(element, [children]);
    return;
  }

  // Loose object type to array type conversion.
  if (typeof children === "object") {
    children = Array.prototype.slice.call(children);
  }

  // If the element is a reduction directive, apply it to itself.
  const { [REDUCE as keyof T]: reduce, ...restElement } = element;
  if (typeof reduce === "function") {
    element = reduce(restElement);
  }

  // Iterate through each child.
  children.forEach((child) => {
    if (!child) {
      return;
    }

    // If child is an array of children, append them instead.
    if (Array.isArray(child)) {
      appendChildren(element, child);
      return;
    }

    // Apply the child to the parent element.
    element = deepMerge(element, child) as T;
  });

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

export function Fragment(props: any): any {
  return createObject({}, props);
}
