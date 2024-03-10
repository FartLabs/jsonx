import { deepMerge } from "../../../deps.ts";

/**
 * Element is a plain old JavaScript object.
 */
export type Element = Record<PropertyKey, unknown>;

/**
 * FC is a functional component.
 */
export interface FC<TProps, TResult> {
  (props: TProps): TResult;
}

export { createObject as h };
export { createNode as jsx };
export { createNode as jsxs };
export { createNode as jsxDev };

/**
 * Fragment is represents a JSX fragment.
 */
export function Fragment<TResult>(props: Element): TResult {
  if (!Array.isArray(props.children)) {
    throw new Error("JSX children must be an array.");
  }

  return reduceMerge(props.children) as TResult;
}

/**
 * createNode is a function that represents the JSX runtime.
 */
function createNode<TProps, TResult>(
  tagNameOrComponent: FC<TProps, TResult> | string,
  props: TProps & { children: Element[] },
  _key: never,
  _source?: never,
  _self?: never,
): TResult {
  if (typeof tagNameOrComponent === "string") {
    throw new Error("JSX tag names are not supported in jsonx.");
  }

  if (!Array.isArray(props.children)) {
    props.children = [props.children];
  }

  return createObject(tagNameOrComponent, props);
}

/**
 * createObject is a function that renders a jsonx component.
 */
export function createObject<TProps, TResult>(
  tagNameOrComponent: FC<TProps, TResult>,
  props: TProps & { children: Element[] },
): TResult {
  // Render the component.
  if (typeof tagNameOrComponent === "function") {
    return tagNameOrComponent(props);
  }

  // Resolve children and use them to reduce the parent element.
  if (!Array.isArray(props.children)) {
    throw new Error("JSX children must be an array.");
  }

  return reduceMerge(props.children) as TResult;
}

function reduceMerge(
  children: Element[],
  initial: Element = {},
): Element {
  return children.reduce(
    (result, child) => deepMerge(result, child),
    initial,
  );
}
