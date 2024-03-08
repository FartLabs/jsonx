# jsonx

<a href="https://jsr.io/@fartlabs/jsonx"><img src="https://jsr.io/logo.svg" alt="jsr.io logo" width="32"></a>

JSX runtime and compiler for composing JSON data.

## Usage

### Deno

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
    "jsxFactory": "@fartlabs/jsonx"
  }
}
```

5\. Add a file ending in `.[j|t]sx` to your project. For example, `example.tsx`.

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

6\. Compile your jsonx by running the `.[j|t]sx` file.

```sh
deno run --allow-write example.tsx
```

Resulting `data.json`:

```json
{
  "animals": [
    "🐈",
    "🐕"
  ]
}
```

## Motivation

Optimize developer ergonomics with improved modularity and maintainability by
enabling developers to compose JSON data like React, using JSX.

Developers often are required to write code that follows a specific schema or
format. For example, a configuration file, a data file, or a response payload.
This is often done using JSON, YAML, or TOML. However, these formats are not
composable out of the box, and are often verbose and difficult to maintain.

### Similar projects

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

## Contribute

### Style

Run `deno fmt` to format the code.

Run `deno lint` to lint the code.

### Testing

Run `deno test` to run the unit tests.

---

Developed with ❤️ [**@FartLabs**](https://github.com/FartLabs)
