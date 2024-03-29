import { assertEquals } from "@std/assert";

async function AsyncCat() {
  return await Promise.resolve({ animals: ["🐈"] });
}

async function AsyncDog() {
  return await Promise.resolve({ animals: ["🐕"] });
}

Deno.test("Asynchronously composes JSON array data by createObject in a fragment", async () => {
  const actual = await (
    <>
      <AsyncCat />
      <AsyncDog />
    </>
  );
  const expected = { animals: ["🐈", "🐕"] };
  assertEquals(actual, expected);
});
