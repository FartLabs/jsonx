# jsonx

[![deno doc](https://doc.deno.land/badge.svg)](https://deno.land/x/jsonx)

JSX runtime for composing JSON.

## Usage

Run `deno task example` to see the example in action.

### `main.tsx`

```tsx
import { Asset, Assets } from "./assets_component.ts";

interface SvelteKitAppProps {
  // deno-lint-ignore no-explicit-any
  children?: any;
}

function SvelteKitApp(props: SvelteKitAppProps) {
  return (
    <Assets>
      {/* SvelteKitApp default files */}
      <Asset
        path="main.ts"
        content="console.log('Hello, world!');"
      />
      {...props.children}
    </Assets>
  );
}

function Example() {
  return (
    <SvelteKitApp>
      <Asset
        path="example.ts"
        content="console.log('Hello, world!');"
      />
    </SvelteKitApp>
  );
}

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
  console.log(<Example />);
}
```

### `assets_component.ts`

```ts
import { $reduce } from "jsonx/lib/jsonx/mod.ts";
import type { Asset, Assets } from "./assets.ts";
import { AssetKind, EncodingType } from "./assets.ts";

export interface AssetsProps {
  assets?: Assets;
}

export function Assets(props: AssetsProps) {
  return { assets: props.assets ?? {} };
}

export type AssetProps =
  & { path: string }
  & (
    | Asset
    // UTF-8 text file asset by default.
    | { content: string }
  );

export function makeAsset(props: AssetProps): Asset {
  // UTF-8 text file asset by default.
  if (!("kind" in props)) {
    return {
      kind: AssetKind.FILE,
      encoding: EncodingType.UTF8,
      content: props.content,
    };
  }

  return props;
}

export function Asset(props: AssetProps) {
  return {
    assets: $reduce((assets: Assets) => {
      assets[props.path] = makeAsset(props);
      return assets;
    }),
  };
}
```

---

Developed with ❤️ by [**@EthanThatOneKid**](https://etok.codes/)
