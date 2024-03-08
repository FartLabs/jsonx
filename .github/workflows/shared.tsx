/**
 * CheckoutStep is a step that checks out the repository.
 */
export function CheckoutStep() {
  return {
    uses: "actions/checkout@v4",
  };
}

/**
 * SetupDenoStep is a step that sets up the Deno runtime.
 */
export function SetupDenoStep() {
  return {
    uses: "denoland/setup-deno@v1",
  };
}
