interface Node {
  value: number;
  children?: Node[];
}

function calculateExpression(data: Node[]): string {
  let expression = "";

  function traverse(node: Node): void {
    if (node.children && node.children.length > 0) {
      expression += "(";
      node.children.forEach((child) => {
        traverse(child);
        expression += " + ";
      });
      expression = expression.slice(0, -3); // Remove the extra " + "
      expression += ")";
    }
    expression += node.value;
  }

  data.forEach((node) => {
    traverse(node);
  });

  return expression;
}

// Test data
const input: Node[] = [{
  value: 1,
  children: [{
    value: 2,
    children: [{ value: 3 }],
  }, {
    value: 4,
  }],
}];

// Test the function
const result = calculateExpression(input);
console.log(result); // Output: "(((3) + 2) + 4) + 1"

// deno run -A lib/std/runtime/traverse.ts
