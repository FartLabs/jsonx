import * as esbuild from "https://esm.sh/esbuild-wasm@0.20.1";

main();

async function main() {
  // Parse the URL.
  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  // Set up the code editor.
  await esbuild.initialize({
    wasmURL: "https://esm.sh/esbuild-wasm@0.20.1/esbuild.wasm",
  });

  // Set up default code editor content.
  const example = await fetch("./examples/animals.tsx").then((response) =>
    response.text()
  );
  editor.value = example;

  // Fetch the module meta.
  await fetch("./meta")
    .then((response) => response.json())
    .then((json) => {
      // Set up version input element.
      version.value = json.latest;
      json.versions.forEach((versionTag) => {
        const option = document.createElement("option");
        option.value = versionTag;
        option.textContent = `Version: ${versionTag}`;
        version.append(option);
      });
    });

  play.disabled = false;
  share.disabled = false;
  version.disabled = false;

  // Fetch the playground.
  if (id) {
    const playground = await fetch(`./playgrounds/${id}`).then((response) =>
      response.json()
    );
    editor.value = playground.code;
    version.value = playground.version;
  }

  // Set up event listeners.
  play.addEventListener("click", handlePlay);
  clearBuildOutput.addEventListener(
    "click",
    () => (buildOutput.innerHTML = "")
  );
  clearConsoleOutput.addEventListener(
    "click",
    () => (consoleOutput.innerHTML = "")
  );
  addEventListener("message", (event) => {
    if (event.data.type === "console") {
      appendConsoleOutput(
        event.data.method,
        event.data.arguments
          .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
          .join(" ")
      );
    }
  });
}

async function handlePlay() {
  try {
    const transformation = await esbuild.transform(editor.value, {
      loader: "tsx",
      tsconfigRaw: {
        compilerOptions: {
          jsx: "react-jsx",
          jsxFactory: "h",
          jsxFragmentFactory: "Fragment",
          jsxImportSource: `https://esm.sh/jsr/@fartlabs/jsonx@${version.value}`,
        },
      },
    });

    transformation.warnings.forEach((warning) => {
      appendBuildOutput("warning", warning.text);
    });

    const html = `<script type="module">${CONSOLE_INTERCEPT}\n${transformation.code}</script>`;
    result.srcdoc = html;
  } catch (error) {
    appendBuildOutput("error", error.message);
  }
}

const CONSOLE_INTERCEPT = `const _console = { ...console };
for (const key in _console) {
  if (typeof _console[key] === "function") {
    console[key] = function () {
      _console[key](...arguments);
      parent.postMessage({ type: "console", method: key, arguments: [...arguments] });
    };
  }
}`;

const COLOR = {
  log: "dodgerblue",
  warn: "yellow",
  error: "red",
  info: "lime",
  table: "lavender",
};

function renderPrefix(type) {
  const timestamp = new Date().toISOString();
  return `${timestamp} <strong style="color: ${
    COLOR[type.toLowerCase()]
  }">[${type.toUpperCase()}]</strong> `;
}

function appendBuildOutput(type, message) {
  const li = document.createElement("li");
  li.innerHTML = `${renderPrefix(type)}${message}`;
  buildOutput.append(li);
}

function appendConsoleOutput(type, message) {
  const li = document.createElement("li");
  li.innerHTML = `${renderPrefix(type)}${message}`;
  consoleOutput.append(li);
}
