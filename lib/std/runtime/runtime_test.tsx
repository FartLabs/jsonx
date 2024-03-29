import { assertEquals } from "@std/assert";

Deno.test("Composes JSON data by deep merge", () => {
  const actual = (
    <>
      {{ animals: { cat: "🐈" } }}
      {{ animals: { dog: "🐕" } }}
    </>
  );
  const expected = {
    animals: { cat: "🐈", dog: "🐕" },
  };
  assertEquals(actual, expected);
});

Deno.test("Composes JSON array data by deep merge", () => {
  const actual = (
    <>
      {{ animals: ["🐈"] }}
      {{ animals: ["🐕"] }}
    </>
  );
  const expected = { animals: ["🐈", "🐕"] };
  assertEquals(actual, expected);
});

function Cat() {
  return { animals: ["🐈"] };
}

function Dog() {
  return { animals: ["🐕"] };
}

Deno.test("Composes JSON array data by createObject", () => {
  const actual = <Cat />;
  const expected = { animals: ["🐈"] };
  assertEquals(actual, expected);
});

Deno.test("Composes JSON array data by createObject in a fragment", () => {
  const actual = (
    <>
      <Cat />
      <Dog />
    </>
  );
  const expected = { animals: ["🐈", "🐕"] };
  assertEquals(actual, expected);
});

Deno.test("Composes children predictably", () => {
  function Farm(props: { children?: unknown[] }) {
    return (
      <>
        {...(props?.children ?? [])}
      </>
    );
  }

  const actual = (
    <Farm>
      <Cat />
      <Dog />
    </Farm>
  );
  const expected = { animals: ["🐈", "🐕"] };
  assertEquals(actual, expected);
});
