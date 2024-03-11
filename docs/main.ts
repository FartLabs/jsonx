import { parseArgs } from "../deno_deps.ts";
import { createDocs } from "./docs.ts";

if (import.meta.main) {
  const flags = parseArgs(Deno.args, {
    string: ["port", "root"],
    default: {
      port: "8000",
      root: "./docs/static",
    },
  });
  const docs = createDocs({
    fsRoot: flags.root,
    kv: await Deno.openKv(),
  });
  Deno.serve(
    { port: parseInt(flags.port) },
    docs.fetch.bind(docs),
  );
}
