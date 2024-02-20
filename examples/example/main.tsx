import { Asset, Assets } from "./assets_component.ts";
import { LocalAsset } from "./local_asset_component.tsx";

interface SvelteKitAppProps {
  // deno-lint-ignore no-explicit-any
  children?: any;
}

function SvelteKitApp(props: SvelteKitAppProps) {
  return (
    <Assets>
      {/* SvelteKitApp default files */}
      <LocalAsset
        path="src/routes/+page.svelte"
        src={new URL(import.meta.resolve("./hello.svelte"))}
      />
      {...props.children}
    </Assets>
  );
}

function Example1() {
  return (
    <SvelteKitApp>
      <Asset
        path="example.ts"
        content="console.log('Hello, world!');"
      />
    </SvelteKitApp>
  );
}

// deno task example
//
if (import.meta.main) {
  // {
  //   assets: {
  //     "main.ts": {
  //       kind: "file",
  //       encoding: "utf-8",
  //       content: "console.log('Hello, world!');"
  //     },
  //     "example.ts": {
  //       kind: "file",
  //       encoding: "utf-8",
  //       content: "console.log('Hello, world!');"
  //     }
  //   }
  // }
  //
  console.log(<Example1 />);
}
