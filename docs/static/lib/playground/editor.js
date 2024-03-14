import {
  EditorView,
  keymap,
  lineNumbers,
} from "https://cdn.skypack.dev/@codemirror/view";
import {
  defaultKeymap,
  history,
} from "https://cdn.skypack.dev/@codemirror/commands";
import { syntaxHighlighting } from "https://cdn.skypack.dev/@codemirror/language";

let EDITOR;

export function createEditor(options) {
  EDITOR = new EditorView({
    doc: options.code,
    parent: document.querySelector("#editor"),
    extensions: [
      keymap.of(defaultKeymap),
      lineNumbers(),
      // history(),
      // syntaxHighlighting(),
    ],
  });
  console.log({ EDITOR });
}
