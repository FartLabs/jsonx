import { encodeBase64 } from "std/encoding/base64.ts";
import { AssetKind, EncodingType } from "./assets.ts";
import { Asset } from "./assets_component.ts";

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
