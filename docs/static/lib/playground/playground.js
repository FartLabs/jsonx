import { transform } from "./build.js";
import { createEditor, cmEditor } from "./editor.js";
import { appendBuildOutput, appendConsoleOutput } from "./output.js";

/**
 * createPlayground create a playground.
 */
export async function createPlayground(options) {
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

  // Set up default values.
  if (options.version) {
    version.value = options.version;
  }

  await createEditor({
    target: editor,
    code: options.code,
    version: version.value,
  });

  // Set up event listeners.
  play.addEventListener("click", () => handlePlay());
  clearBuildOutput.addEventListener(
    "click",
    () => (buildOutput.innerHTML = "")
  );
  clearConsoleOutput.addEventListener(
    "click",
    () => (consoleOutput.innerHTML = "")
  );
  window.addEventListener("message", (event) => {
    if (event.data.type === "console") {
      appendConsoleOutput(
        event.data.method,
        event.data.arguments
          .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
          .join(" ")
      );
    }
  });

  // Enable button interactions.
  play.disabled = false;
  share.disabled = false;
  version.disabled = false;

  // Play the code if autoplay is enabled.
  if (options.autoplay) {
    handlePlay();
  }
}

async function handlePlay() {
  try {
    const code = cmEditor?.state?.doc?.toString();
    if (!code) {
      appendBuildOutput("error", "No code to build.");
      return;
    }

    const transformation = await transform({
      code: cmEditor.state.doc.toString(),
      version: version.value,
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
}
window.onerror = function (message, source, lineno, colno, error) {
  parent.postMessage({ type: "console", method: "error", arguments: [error ? error.stack : message] });
}`;
