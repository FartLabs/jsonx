import { EditorView, basicSetup } from "https://esm.sh/codemirror";
import { javascript } from "https://esm.sh/@codemirror/lang-javascript";
import { autocompletion } from "https://esm.sh/@codemirror/autocomplete";
import {
  createDefaultMapFromCDN,
  createSystem,
  createVirtualTypeScriptEnvironment,
} from "https://esm.sh/@typescript/vfs";
import ts from "https://esm.sh/typescript";
import {
  tsLinter,
  tsHover,
  tsAutocomplete,
  tsSync,
} from "https://esm.sh/@valtown/codemirror-ts";
import { makeCompilerOptions } from "./build.js";

let EDITOR;

export async function createEditor(options) {
  const fsMap = await createDefaultMapFromCDN(
    { target: ts.ScriptTarget.ES2022 },
    "3.7.3",
    true,
    ts
  );
  const system = createSystem(fsMap);
  const env = createVirtualTypeScriptEnvironment(
    system,
    [],
    ts,
    options.version ? makeCompilerOptions(options.version) : {}
  );

  const path = "index.tsx";

  EDITOR = new EditorView({
    doc: options.code,
    extensions: [
      basicSetup,
      javascript({
        typescript: true,
        jsx: true,
      }),
      tsSync({ env, path }),
      tsLinter({ env, path }),
      autocompletion({
        override: [tsAutocomplete({ env, path })],
      }),
      tsHover({
        env,
        path,
      }),
    ],
    parent: document.querySelector("#editor"),
  });
  console.log({ EDITOR });
}
