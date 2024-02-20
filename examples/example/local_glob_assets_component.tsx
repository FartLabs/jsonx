import { type ExpandGlobOptions, expandGlobSync } from "std/fs/expand_glob.ts";
import { LocalAsset } from "./local_asset_component.tsx";

export interface LocalGlobAssetsProps extends ExpandGlobOptions {
  glob: string | URL;
}

function getLocalGlobAssets(props: LocalGlobAssetsProps) {
  return [...expandGlobSync(props.glob, props)];
}

export function LocalGlobAssets(props: LocalGlobAssetsProps) {
  const assets = getLocalGlobAssets(props);
  return assets.map((entry) => (
    <LocalAsset
      path={entry.path}
      src={entry.path}
    />
  ));
}
