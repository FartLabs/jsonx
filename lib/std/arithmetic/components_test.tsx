import { assertEquals } from "@std/assert";
import {
  Add,
  Divide,
  Max,
  Min,
  Modulo,
  Multiply,
  Subtract,
} from "./components.tsx";

Deno.test("Add adds two numbers", () => {
  assertEquals(<Add>{1}{2}</Add>, 3);
});

Deno.test("Subtract subtracts two numbers", () => {
  assertEquals(<Subtract>{2}{1}</Subtract>, -3);
});

Deno.test("Multiply multiplies two numbers", () => {
  assertEquals(<Multiply>{2}{3}</Multiply>, 6);
});

Deno.test("Divide divides two numbers", () => {
  assertEquals(<Divide from={6}>{3}</Divide>, 2);
});

Deno.test("Modulo calculates the remainder of two numbers", () => {
  assertEquals(<Modulo from={7}>{3}</Modulo>, 1);
});

Deno.test("Max returns the maximum of two numbers", () => {
  assertEquals(<Max>{1}{2}</Max>, 2);
});

Deno.test("Min returns the minimum of two numbers", () => {
  assertEquals(<Min>{1}{2}</Min>, 1);
});

Deno.test("performs arithmetic on nested children", () => {
  assertEquals(
    <Add>
      <Subtract from={10}>{5}</Subtract>
      <Multiply>{2}{3}</Multiply>
      <Divide from={<Min>{10}{100}</Min>}>
        <Modulo from={15}>{10}</Modulo>
      </Divide>
      <Max>{1}{2}</Max>
    </Add>,
    15,
  );
});
