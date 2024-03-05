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

function Plus(props: { value?: number; label?: string }) {
  return $reduce((data: { value?: number }) => {
    // console.log(`${props.label}: ${data?.value ?? 0} + ${props.value}`);
    if (props?.value === undefined) {
      return <Plus value={data?.value ?? 0} />;
    }

    return {
      value: (data?.value ?? 0) + props.value,
    };
  });
  // return $reduce((data: { value: number }) => ({
  //   value: (data?.value ?? 0) + props.value,
  // }));
}

function Times(props: { value?: number; label?: string }) {
  return $reduce((data: { value?: number }) => {
    // console.log(`${props.label}: ${data?.value ?? 1} * ${props.value}`);
    if (props?.value === undefined) {
      return <Times value={data?.value ?? 1} />;
    }

    return {
      value: (data?.value ?? 1) * props.value,
    };
  });
  // return $reduce((data: { value: number }) => ({
  //   value: (data?.value ?? 1) * props.value,
  // }));
}

Deno.test("Composes JSON data by nested $reduce directive (depth 1)", () => {
  const actual = (
    <Times value={5} label="5*x">
      <Plus value={5} label="+5" />
    </Times>
  );
  const expected = { value: 30 };
  assertEquals(actual, expected);
});

/*
Deno.test("Composition respects commutative property", () => {
  const v1 = (
    <Times value={5} label="5*x">
      <Plus value={5} label="+5" />
    </Times>
  );
  console.log("---");
  const v2 = (
    <Times value={5} label="5*x">
      <Times value={5} label="5*5" />
    </Times>
  );
  console.log("---");
  const v3 = (
    <>
      <Plus value={5} label="+5" />
      <Times value={5} label="5*x" />
    </>
  );
  console.log("---");
  const v4 = (
    <>
      <Plus value={5} label="+5 outer" />
      <Times label="x*y">
        <Plus value={5} label="+5 inner" />
      </Times>
    </>
  );

  function assertEveryEquals<T>(expected: T, actuals: T[]) {
    for (const actual of actuals) {
      assertEquals(actual, expected);
    }
  }

  assertEveryEquals(25, [v1.value, v2.value, v3.value, v4.value]);
});
*/

/*
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
  console.log("reduce: ", actual["$reduce"]?.());
  assertEquals(actual, expected);
});
*/

function minimumLength(s: string): number {
  while (s.length > 1) {
    const prefix = findPrefix(s);
    const suffix = findSuffix(s);
    if (prefix[0] !== suffix[0] || prefix.length === s.length) {
      break;
    }

    s = s.slice(prefix.length, s.length - suffix.length);
  }

  return s.length;
}

function findPrefix(s: string): string {
  let prefix = "";
  for (let i = 0; i < s.length; i++) {
    if (prefix.length !== 0 && prefix[0] !== s[i]) {
      break;
    }

    prefix += s[i];
  }

  return prefix;
}

function findSuffix(s: string): string {
  let suffix = "";
  for (let i = s.length - 1; i >= 0; i--) {
    if (suffix.length !== 0 && suffix[0] !== s[i]) {
      break;
    }

    suffix = s[i] + suffix;
  }

  return suffix;
}
