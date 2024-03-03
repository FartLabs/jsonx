import { assertEquals } from "../../../developer_deps.ts";
import { $reduce } from "./$reduce.ts";

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

Deno.test("Composes JSON array data by $reduce directive", () => {
  function Cat() {
    return $reduce((data: { animals: string[] }) => ({
      animals: (data?.animals ?? []).concat("🐈"),
    }));
  }

  function Dog() {
    return $reduce((data: { animals: string[] }) => ({
      animals: (data?.animals ?? []).concat("🐕"),
    }));
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

function Plus(props: { value?: number }) {
  return $reduce((data: { value: number }) => {
    console.log(`${data?.value ?? 0} + ${props.value}`);
    return {
      value: (data?.value ?? 0) + (props.value ?? 0),
    };
  });
  // return $reduce((data: { value: number }) => ({
  //   value: (data?.value ?? 0) + props.value,
  // }));
}

function Times(props: { value?: number }) {
  return $reduce((data: { value: number }) => {
    console.log(`${data?.value ?? 1} * ${props.value}`);
    return {
      value: (data?.value ?? 1) * (props.value ?? 1),
    };
  });
  // return $reduce((data: { value: number }) => ({
  //   value: (data?.value ?? 1) * props.value,
  // }));
}

Deno.test("Composition respects commutative property", () => {
  const v1 = (
    <Times value={5}>
      <Plus value={5} />
    </Times>
  );
  const v2 = (
    <Times value={5}>
      <Times value={5} />
    </Times>
  );
  const v3 = (
    <>
      <Plus value={5} />
      <Times value={5} />
    </>
  );
  const v4 = (
    <>
      <Plus value={5} />
      <Times>
        <Plus value={5} />
      </Times>
    </>
  );

  function assertAllEqual(...values: unknown[]) {
    const [first, ...restValues] = values;
    for (const value of restValues) {
      assertEquals(first, value);
    }
  }

  assertAllEqual(25, v1.value, v2.value, v3.value, v4.value);
});

Deno.test("Composes JSON by nested $reduce directive", () => {
  const actual = (
    <Plus value={6}>
      <Plus value={1} />
      <Plus value={2} />
      <Times value={3} />
      <Plus>
        <Times value={4}>
          <Plus value={5} />
        </Times>
      </Plus>
    </Plus>
  );
  const expected = { value: (((1 + 2) * 3) + (4 * 5) + 6) };
  assertEquals(actual, expected);
});
