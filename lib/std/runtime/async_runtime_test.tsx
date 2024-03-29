import { assertEquals } from "@std/assert";

async function AsyncCat() {
  return await Promise.resolve({ animals: ["🐈"] });
}

async function AsyncDog() {
  return await Promise.resolve({ animals: ["🐕"] });
}

Deno.test("Asynchronously composes JSON array data by createObject in a fragment", async () => {
  async function Farm() {
    const cat = await <AsyncCat />;
    const dog = await <AsyncDog />;
    return (
      <>
        {cat}
        {dog}
      </>
    );
  }

  const actual = await <Farm />;
  const expected = { animals: ["🐈", "🐕"] };
  assertEquals(actual, expected);
});
