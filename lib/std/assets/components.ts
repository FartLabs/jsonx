import { $reduce } from "jsonx/std/runtime/mod.ts";
import type { AssetData, AssetsData } from "./assets.ts";
import { AssetKind, EncodingType } from "./assets.ts";

export interface AssetsProps {
  data?: AssetsData;
}

// deno-lint-ignore no-explicit-any
export function Assets(props: AssetsProps): any {
  return { assets: props.data ?? {} };
}

export type AssetProps =
  & { path: string }
  & (
    | AssetData
    // UTF-8 text file asset by default.
    | { content: string }
  );

export function makeAssetData(props: AssetProps): AssetData {
  // UTF-8 text file asset by default.
  if (!("kind" in props)) {
    return {
      kind: AssetKind.FILE,
      encoding: EncodingType.UTF8,
      content: props.content,
    };
  }

  switch (props.kind) {
    case AssetKind.FILE: {
      if (!("gitSha1" in props)) {
        return {
          kind: AssetKind.FILE,
          encoding: props.encoding,
          content: props.content,
        };
      }

      return {
        kind: AssetKind.FILE,
        gitSha1: props.gitSha1,
        size: props.size,
      };
    }

    case AssetKind.SYMLINK:
      return {
        kind: AssetKind.SYMLINK,
        target: props.target,
      };
  }
}

// deno-lint-ignore no-explicit-any
export function Asset(props: AssetProps): any {
  return $reduce((data: ReturnType<typeof Assets>) => {
    data.assets ??= {};
    data.assets[props.path] = makeAssetData(props);
    return data;
  });
}
