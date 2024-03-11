import type { ExpandGlobOptions } from "@std/fs";
import { expandGlobSync } from "@std/fs";
import { encodeBase64 } from "@std/encoding/base64";
import { normalize } from "@std/path";
import type { AssetsData } from "jsonx/std/assets/mod.ts";
import { Asset, AssetKind, EncodingType } from "jsonx/std/assets/mod.ts";

/**
 * LocalAssetProps represents the properties of the LocalAsset component.
 */
export interface LocalAssetProps {
  path: string;
  src: string | URL;
}

function getLocalAssetContentBase64(src: string | URL) {
  const bytes = Deno.readFileSync(src);
  return encodeBase64(bytes);
}

/**
 * LocalAsset is a component that represents a local asset.
 */
export function LocalAsset(props: LocalAssetProps): { assets: AssetsData } {
  const content = getLocalAssetContentBase64(props.src);
  return (
    <Asset
      path={props.path}
      kind={AssetKind.FILE}
      encoding={EncodingType.BASE64}
      content={content}
    />
  );
}

/**
 * LocalGlobProps represents the properties of the LocalGlob component.
 */
export interface LocalGlobProps extends ExpandGlobOptions {
  path?: string;
  glob: string | URL;
}

function getLocalGlob(props: LocalGlobProps) {
  const it = expandGlobSync(
    props.glob,
    { ...props, includeDirs: false },
  );
  return [...it];
}

/**
 * LocalGlob is a component that represents a local glob of assets.
 */
export function LocalGlob(props: LocalGlobProps): { assets: AssetsData }[] {
  const assets = getLocalGlob(props);
  const root = props.root ? normalize(props.root) : "";
  return assets.map((entry) => {
    const entryURL = `file:\\${entry.path}`;
    const path = (props.path ?? "") +
      (root && entryURL.startsWith(root)
        ? entryURL.slice(root.length)
        : entryURL);
    return <LocalAsset path={path} src={entry.path} />;
  });
}
