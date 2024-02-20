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

export function Asset(props: AssetProps) {
  return {
    assets: $reduce((assets: Assets) => {
      assets[props.path] = makeAsset(props);
      return assets;
    }),
  };
}
