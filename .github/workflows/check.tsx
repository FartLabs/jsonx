import { stringify } from "../../developer_deps.ts";
import {
  CheckoutStep,
  DenoFormatStep,
  DenoLintStep,
  SetupDenoStep,
} from "./shared.tsx";

export function CheckWorkflow() {
  return {
    name: "Check",
    on: {
      push: {
        branches: ["main"],
      },
      pull_request: {
        branches: ["main"],
      },
    },
    jobs: {
      check: {
        "runs-on": "ubuntu-latest",
        steps: [
          <CheckoutStep />,
          <SetupDenoStep />,
          <DenoFormatStep />,
          <DenoLintStep />,
          {
            name: "Test",
            run: "deno task test",
          },
        ],
      },
    },
  };
}

if (import.meta.main) {
  Deno.writeTextFileSync(
    Deno.args[0],
    stringify(<CheckWorkflow />, { lineWidth: 80 }),
  );
}
