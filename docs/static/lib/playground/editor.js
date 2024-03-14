import ace from "https://esm.sh/ace-builds@1.32.7";

let EDITOR;

export function createEditor(options) {
  EDITOR = ace.edit(options.target);
  console.log({ EDITOR });
}
