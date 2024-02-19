// deno run -A ./example.tsx

function Example() {
  return (
    <div hello="world">
      <h1>
        Hello, <>world!</>
      </h1>
    </div>
  );
}

function j<T>(props: T) {
  //   // deno-lint-ignore no-explicit-any
  //   const children = (props as { children: any }).children;
  //   if (children) {
  //     return { ...props, children: children.map(j) };
  //   }

  return <>{props}</>;
}

interface SvelteKitAppProps {
  hello: "world";
}

function SvelteKitApp(props: SvelteKitAppProps) {
  return j(props);
}

function Example2() {
  return <SvelteKitApp hello="world" />;
}

console.log(<Example />);
console.log("---");
console.log(<Example2 />);
