import * as monaco from "https://esm.sh/monaco-editor@0.47.0";
import editorWorker from "https://esm.sh/monaco-editor@0.47.0/esm/vs/editor/editor.worker?worker";
import jsonWorker from "https://esm.sh/monaco-editor@0.47.0/esm/vs/language/json/json.worker?worker";
import cssWorker from "https://esm.sh/monaco-editor@0.47.0/esm/vs/language/css/css.worker?worker";
import htmlWorker from "https://esm.sh/monaco-editor@0.47.0/esm/vs/language/html/html.worker?worker";
import tsWorker from "https://esm.sh/monaco-editor@0.47.0/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }

    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }

    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }

    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }

    return new editorWorker();
  },
};

let EDITOR;

export function createEditor(options) {
  EDITOR = monaco.editor.create(options.target, {
    value: options.code,
    language: "javascript", // "tsx"
  });
  console.log({ EDITOR });
}
