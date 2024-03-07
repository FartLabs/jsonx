export function CheckoutStep() {
  return {
    uses: "actions/checkout@v4",
  };
}

export function SetupDenoStep() {
  return {
    uses: "denoland/setup-deno@v1",
  };
}

export function DenoFormatStep() {
  return {
    name: "Format",
    run: "deno fmt && git diff-index --quiet HEAD",
  };
}

export function DenoLintStep() {
  return {
    name: "Lint",
    run: "deno lint && git diff-index --quiet HEAD",
  };
}
