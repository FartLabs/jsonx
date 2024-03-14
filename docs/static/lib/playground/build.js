import * as esbuild from "https://esm.sh/esbuild-wasm@0.20.1";

export async function transform(options) {
  const transformation = await esbuild.transform(options.code, {
    loader: "tsx",
    tsconfigRaw: {
      compilerOptions: makeCompilerOptions(options.version),
    },
  });

  return transformation;
}

export function makeCompilerOptions(version) {
  return {
    jsx: "react-jsx",
    jsxFactory: "h",
    jsxFragmentFactory: "Fragment",
    jsxImportSource: `https://esm.sh/jsr/@fartlabs/jsonx@${version}`,
  };
}
