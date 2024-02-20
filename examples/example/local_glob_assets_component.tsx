import { normalize } from "std/path/normalize.ts";
import { type ExpandGlobOptions, expandGlobSync } from "std/fs/expand_glob.ts";
import { LocalAsset } from "./local_asset_component.tsx";

export interface LocalGlobAssetsProps extends ExpandGlobOptions {
  path?: string;
  glob: string | URL;
}

function getLocalGlobAssets(props: LocalGlobAssetsProps) {
  const it = expandGlobSync(
    props.glob,
    { ...props, includeDirs: false },
  );
  return [...it];
}

export function LocalGlobAssets(props: LocalGlobAssetsProps) {
  const assets = getLocalGlobAssets(props);
  const root = props.root ? normalize(props.root) : "";
  return assets.map((entry) => {
    const entryURL = `file:\\${entry.path}`;
    const path = (props.path ?? "") +
      (root && entryURL.startsWith(root)
        ? entryURL.slice(root.length)
        : entryURL);
    return (
      <LocalAsset
        path={path}
        src={entry.path}
      />
    );
  });
}
