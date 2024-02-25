import { encodeBase64 } from "std/encoding/base64.ts";
import { normalize } from "std/path/normalize.ts";
import { type ExpandGlobOptions, expandGlobSync } from "std/fs/expand_glob.ts";
import { Asset, AssetKind, EncodingType } from "jsonx/std/assets/mod.ts";

export interface LocalAssetProps {
  path: string;
  src: string | URL;
}

function getLocalAssetContentBase64(src: string | URL) {
  const bytes = Deno.readFileSync(src);
  return encodeBase64(bytes);
}

export function LocalAsset(props: LocalAssetProps) {
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

export function LocalGlob(props: LocalGlobProps) {
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
