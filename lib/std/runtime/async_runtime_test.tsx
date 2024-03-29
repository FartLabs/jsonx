import { assertEquals } from "@std/assert";

async function AsyncCat() {
  return await Promise.resolve({ animals: ["🐈"] });
}

async function AsyncDog() {
  return await Promise.resolve({ animals: ["🐕"] });
}

async function AsyncFarm() {
  return (
    <>
      {await <AsyncCat />}
      {await <AsyncDog />}
    </>
  );
}

Deno.test("Asynchronously composes JSON array data by createObject in a fragment", async () => {
  const actual = await <AsyncFarm />;
  const expected = { animals: ["🐈", "🐕"] };
  assertEquals(actual, expected);
});
