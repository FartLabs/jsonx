// deno-lint-ignore-file no-explicit-any

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
) {
  // If children is passed as props, merge with ...children.
  if (props?.children) {
    const propsChildren = Array.isArray(props.children)
      ? props.children
      : [props.children];
    children = [...children, ...propsChildren];

    // Reflect the change in props.
    if (Array.isArray(props.children)) {
      props.children = children;
    }
  }

  // If no children are passed, set to an empty array.
  if (!props.children) {
    props.children = [];
  }

  // Render component if tagNameOrComponent is a function.
  if (typeof tagNameOrComponent === "function") {
    const component = tagNameOrComponent;
    const result = component(props);
    appendChildren(result, children);
    return result;
  }

  const element = {};
  appendChildren(element, children);
  return element;
}

function appendChildren<T extends object>(
  element: T,
  children: T[],
  escape = true,
) {
  // if the child is an html element
  if (!Array.isArray(children)) {
    appendChildren(element, [children], escape);
    return;
  }

  // htmlCollection to array
  if (typeof children === "object") {
    children = Array.prototype.slice.call(children);
  }

  children.forEach((child) => {
    if (!child) {
      return;
    }

    // If child is an array of children, append them instead.
    if (Array.isArray(child)) {
      appendChildren(element, child, escape);
      return;
    }

    // Apply the child to the parent element.
    for (const key in child) {
      const value = child[key] as any;
      // If the child is a reduction directive, overwrite the parent element.
      if (typeof value[REDUCE] === "function") {
        const reduce = value[REDUCE] as (element: any) => any;
        element[key] = reduce(element[key]);
        continue;
      }

      // If the child is a JavaScript object, overwrite the parent element.
      element[key] = child[key];
    }
  });
}

function createNode(
  type: any,
  props: any,
  _key: string,
  _source?: string,
  _self?: string,
) {
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

export function Fragment(props: any) {
  return props.children;
}