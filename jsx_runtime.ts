// deno-lint-ignore-file no-explicit-any
import "./intrinsic_elements.ts";

// TODO: Figure out how to correctly store JSON data in memory.
// https://github.com/nanojsx/nano/blob/master/src/jsx-runtime/index.ts
// https://github.com/nanojsx/nano/blob/2590dd9477970b2dc2a1d1ae5fb03b7c87a84174/src/core.ts#L196
//

export function jsx(
  tagNameOrComponent: any,
  props: any = {},
  ...children: any[]
) {
  if (typeof tagNameOrComponent === "function") {
    const component = tagNameOrComponent;
    return component({ ...props, children });
  }

  return { tagNameOrComponent, props, children };
}

export function jsxs(
  tagNameOrComponent: any,
  props: any = {},
  ...children: any[]
) {
  return jsx(tagNameOrComponent, props, ...children);
}

export function jsxTemplate(
  strings: string[],
  ...dynamic: any[]
) {
  return { strings, dynamic };
}

export function jsxAttr(name: string, value: string) {
  return { name, value };
}

export function jsxEscape(value: string) {
  return value;
}

export function Fragment(props: any) {
  return props.children;
}
