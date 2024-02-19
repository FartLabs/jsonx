import type { Asset, Assets } from "./assets.ts";
import { AssetKind, EncodingType } from "./assets.ts";

export interface AssetsProps {
  assets?: Assets;
}

export function Assets(props: AssetsProps) {
  return { assets: props.assets ?? {} };
}

export interface AssetProps {
  path: string;
  asset:
    | Asset
    // UTF-8 text file asset by default.
    | { content: string };
}

export function makeAsset(props: AssetProps): Asset {
  // UTF-8 text file asset by default.
  if (!("kind" in props.asset)) {
    return {
      kind: AssetKind.FILE,
      encoding: EncodingType.UTF8,
      content: props.asset.content,
    };
  }

  return props.asset;
}

export function Asset(props: AssetProps) {
  return {
    assets(assets: Assets) {
      assets[props.path] = makeAsset(props);
      return assets;
    },
  };
}
