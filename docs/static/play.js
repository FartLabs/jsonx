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
      appendConsoleOutput(event.data.method, event.data.arguments.join(" "));
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
          // TODO: Fix JSX import source.
          jsxImportSource: "https://jsr.io/@fartlabs/jsonx",
        },
      },
    });

    transformation.warnings.forEach((warning) => {
      appendBuildOutput("Warning", warning.text);
    });
  } catch (error) {
    appendBuildOutput("Error", error.message);
    return;
  }

  const html = `Hello world!\n<script type="module">${CONSOLE_INTERCEPT}\nconsole.log("Hello world!");</script>`;
  result.srcdoc = html;
}

/**
 * appendBuildOutput appends a message to the build output.
 * @param {string} type
 * @param {string} message
 * @returns {void}
 */
function appendBuildOutput(type, message) {
  const li = document.createElement("li");
  li.textContent = `${type}: ${message}`;
  buildOutput.append(li);
}

/**
 * appendConsoleOutput appends a message to the console output.
 * @param {string} type
 * @param {string} message
 * @returns {void}
 */
function appendConsoleOutput(type, message) {
  const li = document.createElement("li");
  li.textContent = `${type}: ${message}`;
  consoleOutput.append(li);
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
