import { assertEquals } from "../../../developer_deps.ts";

Deno.test("Composes JSON by keys", () => {
  function Cat() {
    return (
      <>
        {{ animals: { cat: "🐈" } }}
      </>
    );
  }

  function Dog() {
    return (
      <>
        {{ animals: { dog: "🐕" } }}
      </>
    );
  }

  const actual = (
    <>
      <Cat />
      <Dog />
    </>
  );
  const expected = {
    animals: { cat: "🐈", dog: "🐕" },
  };
  assertEquals(actual, expected);
});

Deno.test("Composes JSON by indices", () => {
  function Cat() {
    return (
      <>
        {{ animals: ["🐈"] }}
      </>
    );
  }

  function Dog() {
    return (
      <>
        {{ animals: ["🐕"] }}
      </>
    );
  }

  const actual = (
    <>
      <Cat />
      <Dog />
    </>
  );
  const expected = { animals: ["🐈", "🐕"] };
  assertEquals(actual, expected);
});
