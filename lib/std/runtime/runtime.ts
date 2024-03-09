// deno-lint-ignore-file no-explicit-any

import { deepMerge } from "../../../deps.ts";

export { createObject as h };
export { createNode as jsx };
export { createNode as jsxs };
export { createNode as jsxDev };

export function Fragment({ children }: any): any {
  return reduceMerge(children);
}

/**
 * createNode is a function that represents the JSX runtime.
 */
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

/**
 * createObject is a function that renders a jsonx component.
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
  }

  // Loose object type to array type conversion.
  if (typeof children === "object") {
    children = Array.prototype.slice.call(children);
  }

  // Reflect the change in props.
  props.children = [...children];

  // Render the component.
  if (typeof tagNameOrComponent === "function") {
    return tagNameOrComponent(props);
  }

  // Resolve children and use them to reduce the parent element.
  return reduceMerge(props.children);
}

function reduceMerge(children: any, initial: any = {}) {
  return children?.reduce(
    (result: any, child: any) => deepMerge(result, child),
    initial,
  );
}
