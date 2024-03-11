import type { ExpandGlobOptions } from "../../../deno_deps.ts";
import { encodeBase64, expandGlobSync, normalize } from "../../../deno_deps.ts";
import type { AssetsData } from "../assets/mod.ts";
import { Asset, AssetKind, EncodingType } from "../assets/mod.ts";

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
