import { Asset, Assets } from "./assets_component.ts";
import { LocalGlobAssets } from "./local_glob_assets_component.tsx";

interface SvelteKitAppProps {
  // deno-lint-ignore no-explicit-any
  children?: any;
}

function SvelteKitApp(props: SvelteKitAppProps) {
  return (
    <Assets>
      {/* SvelteKitApp default files */}
      <LocalGlobAssets
        path="src/routes/"
        glob={new URL(import.meta.resolve("./**/*.svelte"))}
        root={import.meta.resolve("./")}
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
  //     "src/routes/hello.svelte": {
  //       kind: "file",
  //       encoding: "base64",
  //       content: "PHNjcmlwdCBsYW5nPSJ0cyI+DQogIGV4cG9ydCBsZXQgbmFtZSA9ICd3b3JsZCc7DQo8L3NjcmlwdD4NCg0KPGgxPkhlbGxvIHtu"... 16 more characters
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
