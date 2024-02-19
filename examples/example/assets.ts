export enum AssetKind {
  FILE = "file",
  SYMLINK = "symlink",
}

export enum EncodingType {
  UTF8 = "utf-8",
  BASE64 = "base64",
}

export interface TextFileAsset {
  kind: AssetKind.FILE;
  content: string;
  encoding: EncodingType;
}

export interface GitSha1FileAsset {
  kind: AssetKind.FILE;
  gitSha1: string;
  size: number;
}

export type FileAsset = TextFileAsset | GitSha1FileAsset;

export interface SymlinkAsset {
  kind: AssetKind.SYMLINK;
  target: string;
}

export type Asset = FileAsset | SymlinkAsset;

/**
 * Assets is a map whose key represents a file path, and the value is an asset
 * that composes the deployment.
 */
export type Assets = Record<string, Asset>;

// https://github.com/denoland/deployctl/blob/3d0ba0f19e530bbfe94b241df1467dec3a8c6b4f/action/deps.js#L3998
export async function calculateGitSha1(bytes: Uint8Array) {
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
