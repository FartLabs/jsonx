# jsonx

[![JSR score](https://jsr.io/badges/@fartlabs/jsonx/score)](https://jsr.io/@fartlabs/jsonx)
[![GitHub Actions](https://github.com/FartLabs/jsonx/actions/workflows/check.yaml/badge.svg)](https://github.com/FartLabs/jsonx/actions/workflows/check.yaml)

JSX runtime and compiler for composing JavaScript data.

## Getting started

1\. [Install Deno](https://docs.deno.com/runtime/manual).

2\. Start a new Deno project.

```sh
deno init
```

3\. Add jsonx as a project dependency.

```sh
deno add @fartlabs/jsonx
```

4\. Add the following values to your `deno.json(c)` file.

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@fartlabs/jsonx"
  }
}
```

## Use cases

`jsonx` is versatile. Here are a few examples of what you can build with it.

### Static data generation

You can compose standard JSON-serializable data and serialize it.

```tsx
function Cat() {
  return { animals: ["🐈"] };
}

function Dog() {
  return { animals: ["🐕"] };
}

const data = (
  <>
    <Cat />
    <Dog />
  </>
);

Deno.writeTextFileSync(
  "data.json",
  JSON.stringify(data, null, 2),
);
```

### Runtime object composition

You can compose objects containing complex JavaScript types like `Map`s, `Set`s,
`Date`s, or `RegExp`s.

```tsx
function Matchers() {
  return {
    isEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    createdAt: new Date(),
  };
}

const config = (
  <config>
    <Matchers />
  </config>
);

console.log(config.isEmail.test("hello@example.com")); // true
```

### Function composition

Because `jsonx` can return any JavaScript value, you can even compose functions
or closures.

```tsx
function Logger({ prefix }: { prefix: string }) {
  return (message: string) => console.log(`[${prefix}] ${message}`);
}

const log = <Logger prefix="jsonx" />;

log("Hello, world!"); // [jsonx] Hello, world!
```

6\. Compile your jsonx by running the `.[j|t]sx` file.

```sh
deno run --allow-write example.tsx
```

Output (`data.json`):

```json
{
  "animals": [
    "🐈",
    "🐕"
  ]
}
```

## Motivation

<img width="1154" height="535" alt="Image" src="https://github.com/user-attachments/assets/35da78fa-d564-4efb-a813-6815c8259c86" />

Optimize developer ergonomics with improved modularity and maintainability by
enabling developers to compose JavaScript values like React, using JSX.

Developers often are required to write code that follows a specific schema or
format. For example, a configuration file, a data file, or a response payload.
This is often done using JSON, YAML, or TOML. However, these formats are not
composable out of the box, and are often verbose and difficult to maintain.

## Capabilities

`jsonx` isn't limited to JSON-serializable data. Functions can return _any_
JavaScript value — strings, numbers, arrays, nested objects, class instances,
functions, `RegExp`s, `Date`s, `Set`s, `Map`s, and more. JSON is just one
possible output format; you can also serialize to YAML, TOML, or use values
directly in your runtime code.

It's a general-purpose JSX runtime for composition — similar to how React
components compose UI elements using JSX, jsonx lets you compose any JavaScript
values using JSX.

## Similar projects

Projects like [jsonnet](https://jsonnet.org/) address the challenge of writing
complex JSON by providing a way to modularize and compose data in a dedicated
language, improving overall ergonomics. While libraries exist that embed the
jsonnet system within other languages, jsonnet itself is a separate tool. jsonx,
on the other hand, focuses on leveraging familiar languages and tools like
JavaScript and TypeScript to achieve similar modularity and composition, with
the benefit of being naturally embeddable within those environments.

There's already a project, [json-jsx](https://github.com/alexstroukov/json-jsx),
that offers similar functionality to jsonx. However, json-jsx is designed
specifically for Babel projects, whereas jsonx targets JavaScript runtimes
capable of JSX transpilation, such as Deno.

## Built with jsonx

- [`rt/rtx`](https://github.com/EthanThatOneKid/rt) uses `jsonx` to compose HTTP
  REST API routers.
- [`htx`](https://github.com/FartLabs/htx) is an HTML rendering library in JSX.
- [`agx`](https://github.com/FartLabs/agx) is a JSX agent development system.

## Shoulders of giants

This project leverages Deno's built-in JSX support and robust module system.
These features streamline development by enabling:

- Modular code: Deno's compliance with JS/TS's native module system encourages
  well-organized code through reusable modules.
- JSX support: Out-of-the-box JSX support facilitates scalable data composition
  and modularity, similar to how React components are composed.

Consequently, Deno provides a solid toolchain and developer ecosystem that
enables developers to focus on what makes their projects unique, rather than
reinventing the wheel.

## Contribute

We appreciate your help!

### Style

Run `deno fmt` to format the code.

Run `deno lint` to lint the code.

Run `deno task generate` to generate code.

### Testing

Run `deno task test` to run the unit tests.

### Documentation

The official jsonx documentation site <https://jsonx.fart.tools/> is maintained
in a separate GitHub repository,
[FartLabs/jsonx_docs](https://github.com/FartLabs/jsonx_docs). Feel free to
contribute to the documentation.

---

Developed with ❤️ [**@FartLabs**](https://github.com/FartLabs)
