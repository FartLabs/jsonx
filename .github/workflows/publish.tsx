import { stringify } from "../../developer_deps.ts";
import { CheckoutStep, SetupDenoStep } from "./shared.tsx";

export function PublishWorkflow() {
  return {
    name: "Publish",
    on: {
      push: {
        branches: ["main"],
      },
      workflow_dispatch: {},
    },
    jobs: {
      publish: {
        "runs-on": "ubuntu-latest",
        permissions: {
          contents: "read",
          "id-token": "write",
        },
        steps: [
          <CheckoutStep />,
          <SetupDenoStep />,
          <DenoPublishStep />,
        ],
      },
    },
  };
}

export function DenoPublishStep() {
  return {
    name: "Publish package",
    run: "deno publish",
  };
}

if (import.meta.main) {
  Deno.writeTextFileSync(
    Deno.args[0],
    stringify(<PublishWorkflow />, { lineWidth: 80 }),
  );
}
