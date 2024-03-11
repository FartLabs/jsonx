import { compare, greaterThan, parse } from "@std/semver";
import { serveDir } from "@std/http";

/**
 * Playground is a jsonx playground.
 */
export interface Playground {
  id: string;
  version: string;
  code: string;
}

/**
 * Meta is the module metadata.
 */
export interface Meta {
  latest: string;
  versions: string[];
}

/**
 * Docs is a class for serving the documentation site including
 * jsonx playgrounds.
 */
export class Docs {
  public constructor(private fsRoot: string, private kv: Deno.Kv) {}

  /**
   * fetch handles incoming requests.
   */
  public async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/meta") {
      return Response.json(await this.meta);
    }

    if (request.method === "GET" && url.pathname.startsWith("/playgrounds/")) {
      const id = url.pathname.split("/")[2];
      const playground = await this.getPlayground(id);
      if (playground === null) {
        return new Response(null, { status: 404 });
      }

      return Response.json(playground);
    }

    if (request.method === "POST" && url.pathname === "/playgrounds") {
      const playground = await request.json();
      await this.setPlayground(playground);
      return Response.json(playground);
    }

    return await serveDir(request, { fsRoot: this.fsRoot });
  }

  /**
   * getPlayground gets a playground by ID.
   */
  private async getPlayground(id: string): Promise<Playground | null> {
    const result = await this.kv.get<Playground>(playgroundKey(id));
    return result.value;
  }

  /**
   * setPlayground sets a playground by ID.
   */
  private async setPlayground(playground: Playground): Promise<void> {
    const result = await this.kv.set(playgroundKey(playground.id), playground);
    if (!result) {
      throw new Error("Failed to set playground!");
    }
  }

  /**
   * meta gets the latest module metadata.
   */
  private get meta(): Promise<Meta> {
    return fetch("https://jsr.io/@fartlabs/jsonx/meta.json")
      .then((response) => response.json())
      .then((meta) => playgroundMeta(meta));
  }
}

/**
 * createDocs creates a new Docs instance.
 */
export function createDocs({ fsRoot, kv }: {
  fsRoot: string;
  kv: Deno.Kv;
}): Docs {
  return new Docs(fsRoot, kv);
}

function playgroundMeta({ latest, versions }: {
  latest: string;
  versions: Record<string, unknown>;
}): Meta {
  // https://github.com/FartLabs/jsonx/issues/13
  const minCompatible = parse("0.0.8");
  return {
    latest: latest,
    versions: Object.keys(versions)
      .filter((versionTag) => greaterThan(parse(versionTag), minCompatible))
      .sort((a, b) => compare(parse(b), parse(a))),
  };
}

function playgroundKey(id: string): Deno.KvKey {
  return ["playgrounds", id];
}
