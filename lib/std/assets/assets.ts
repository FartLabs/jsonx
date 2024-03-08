/**
 * AssetKind represents the kind of asset.
 */
export enum AssetKind {
  FILE = "file",
  SYMLINK = "symlink",
}

/**
 * EncodingType represents the encoding type of the file.
 */
export enum EncodingType {
  UTF8 = "utf-8",
  BASE64 = "base64",
}

/**
 * TextFileAssetData represents the data of a text file asset.
 */
export interface TextFileAssetData {
  kind: AssetKind.FILE;
  content: string;
  encoding: EncodingType;
}

/**
 * GitSha1FileAssetData represents the data of a file asset with a Git SHA1.
 */
export interface GitSha1FileAssetData {
  kind: AssetKind.FILE;
  gitSha1: string;
  size: number;
}

/**
 * FileAssetData represents the data of a file asset.
 */
export type FileAssetData = TextFileAssetData | GitSha1FileAssetData;

/**
 * SymlinkAssetData represents the data of a symlink asset.
 */
export interface SymlinkAssetData {
  kind: AssetKind.SYMLINK;
  target: string;
}

/**
 * AssetData represents the data of an asset.
 */
export type AssetData = FileAssetData | SymlinkAssetData;

/**
 * AssetsData is a map whose key represents a file path, and the value is an
 * asset that composes the data.
 */
export type AssetsData = Record<string, AssetData>;

/**
 * calculateGitSha1 calculates the SHA of the given bytes.
 *
 * @see
 * https://github.com/denoland/deployctl/blob/3d0ba0f19e530bbfe94b241df1467dec3a8c6b4f/action/deps.js#L3998
 */
export async function calculateGitSha1(bytes: Uint8Array): Promise<string> {
  const prefix = `blob ${bytes.byteLength}\0`;
  const prefixBytes = new TextEncoder().encode(prefix);
  const fullBytes = new Uint8Array(prefixBytes.byteLength + bytes.byteLength);
  fullBytes.set(prefixBytes);
  fullBytes.set(bytes, prefixBytes.byteLength);
  const hashBytes = await crypto.subtle.digest("SHA-1", fullBytes);
  const hashHex = Array
    .from(new Uint8Array(hashBytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}
