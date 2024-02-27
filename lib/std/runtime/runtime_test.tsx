import { assertEquals } from "../../../developer_deps.ts";
import { $reduce } from "./$reduce.ts";

Deno.test("Composes JSON by keys", () => {
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

Deno.test("Composes JSON by indices", () => {
  const actual = (
    <>
      {{ animals: ["🐈"] }}
      {{ animals: ["🐕"] }}
    </>
  );
  const expected = { animals: ["🐈", "🐕"] };
  assertEquals(actual, expected);
});

Deno.test("Composes JSON array by $reduce directive", () => {
  function Cat() {
    return $reduce((data: { animals: string[] }) => {
      data ??= { animals: [] };
      data.animals ??= [];
      data.animals.push("🐈");
      return data;
    });
  }

  function Dog() {
    return $reduce((data: { animals: string[] }) => {
      data ??= { animals: [] };
      data.animals ??= [];
      data.animals.push("🐕");
      return data;
    });
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

/*
Deno.test("Composes JSON by $reduce directive calculation", () => {
  function Plus(props: { value: number }) {
    return $reduce((data: { value: number }) => {
      console.log({ data, props });
      data ??= { value: 0 };
      data.value ??= 0;
      data.value += props.value;
      return data;
    });
  }

  function Times(props: { value: number }) {
    return $reduce((data: { value: number }) => {
      console.log({ data, props });
      data ??= { value: 1 };
      data.value ??= 1;
      data.value *= props.value;
      return data;
    });
  }

  assertEquals(
    (
      <>
        <Plus value={1} />
        <Plus value={2} />
        <Times value={3} />
      </>
    ),
    { value: 6 },
  );

  function One() {
    return <Plus value={1} />;
  }

  function Five() {
    return (
      <Times value={5}>
        <One />
      </Times>
    );
  }

  assertEquals(<Five />, { value: 5 });
});
*/
