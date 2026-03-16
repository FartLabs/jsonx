import { assertEquals } from "@std/assert";

async function AsyncCat() {
  return await Promise.resolve({ animals: ["🐈"] });
}

async function AsyncDog() {
  return await Promise.resolve({ animals: ["🐕"] });
}

async function AsyncFarm(props: { children?: unknown[] }) {
  return (
    <>
      {...(await Promise.all(props?.children ?? []))}
    </>
  );
}

Deno.test("Asynchronously composes JSON array data by createObject", async () => {
  const actual = await <AsyncCat />;
  const expected = { animals: ["🐈"] };
  assertEquals(actual, expected);
});

Deno.test("Asynchronously composes JSON array data by createObject in a fragment", async () => {
  const actual = await (
    <AsyncFarm>
      <AsyncCat />
      <AsyncDog />
    </AsyncFarm>
  );
  const expected = { animals: ["🐈", "🐕"] };
  assertEquals(actual, expected);
});
