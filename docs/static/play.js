import * as esbuild from "https://esm.sh/esbuild-wasm@0.20.1";
import { createPlayground } from "./lib/playground/index.js";

main();

async function main() {
  // Create the playground.
  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  // Fetch the playground.
  let code;
  let version;
  try {
    if (id) {
      const playground = await fetch(`./playgrounds/${id}`).then((response) =>
        response.json()
      );
      code = playground.code;
      version = playground.version;
    }

    // Fetch default code if unset.
    if (!code) {
      code = await fetch("./examples/animals.tsx").then((response) =>
        response.text()
      );
    }
  } finally {
    await createPlayground({ code, version });
  }
}
