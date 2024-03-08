import { stringify } from "../../developer_deps.ts";
import { CheckoutStep, SetupDenoStep } from "./shared.tsx";

/**
 * CheckWorkflow is a GitHub workflow for the jsonx project.
 */
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

/**
 * DenoFormatStep is a step that formats the code.
 */
export function DenoFormatStep() {
  return {
    name: "Format",
    run: "deno fmt && git diff-index --quiet HEAD",
  };
}

/**
 * DenoLintStep is a step that lints the code.
 */
export function DenoLintStep() {
  return {
    name: "Lint",
    run: "deno lint && git diff-index --quiet HEAD",
  };
}

if (import.meta.main) {
  Deno.writeTextFileSync(
    Deno.args[0],
    stringify(<CheckWorkflow />, { lineWidth: 80 }),
  );
}
