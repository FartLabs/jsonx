import { $reduce } from "jsonx/std/runtime/mod.ts";
import type { AssetData, AssetsData } from "./assets.ts";
import { AssetKind, EncodingType } from "./assets.ts";

export interface AssetsProps {
  data?: AssetsData;
}

export function Assets(props: AssetsProps) {
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

  return props;
}

export function Asset(props: AssetProps) {
  return {
    assets: $reduce((assets: AssetsData) => {
      assets[props.path] = makeAssetData(props);
      return assets;
    }),
  };
}
