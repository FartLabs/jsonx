import type { AssetData, AssetsData } from "./assets.ts";
import { AssetKind, EncodingType } from "./assets.ts";

/**
 * AssetsProps represents the properties of the Assets component.
 */
export interface AssetsProps {
  data?: AssetsData;
  children?: unknown[];
}

/**
 * Assets is a component that represents a collection of assets.
 */
export function Assets(props: AssetsProps): { assets: AssetsData } {
  return (
    <>
      {{ assets: props.data ?? {} }}
      {...(props?.children ?? [])}
    </>
  );
}

/**
 * AssetProps represents the properties of the Asset component.
 */
export type AssetProps =
  & { path: string }
  & (
    | AssetData
    // UTF-8 text file asset by default.
    | { content: string }
  );

/**
 * makeAssetData creates an asset data from the given asset component
 * properties.
 */
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

/**
 * Asset is a component that represents an asset.
 */
export function Asset(props: AssetProps): { assets: AssetsData } {
  return {
    assets: {
      [props.path]: makeAssetData(props),
    },
  };
}
