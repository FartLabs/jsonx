declare global {
  namespace JSX {
    interface IntrinsicElements {
      // deno-lint-ignore no-explicit-any
      [key: string]: any;
    }
  }
}

// Reference:
// https://github.com/honojs/hono/blob/f2ec8d458ded93bded4c30f9c242eb82f02c7206/deno_dist/jsx/intrinsic-elements.ts#L484
//
