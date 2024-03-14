import {
  EditorView,
  keymap,
  lineNumbers,
} from "https://esm.sh/@codemirror/view@6.0.1";
import { defaultKeymap } from "https://esm.sh/@codemirror/commands@6.0.1";

export let cmEditor;

export function createEditor(options) {
  cmEditor = new EditorView({
    doc: options.code,
    parent: options.target,
    extensions: [keymap.of(defaultKeymap), lineNumbers()],
  });
}
