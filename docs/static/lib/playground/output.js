export const COLOR = {
  log: "dodgerblue",
  warn: "yellow",
  error: "red",
  info: "lime",
  table: "lavender",
};

export function renderPrefix(type) {
  const timestamp = new Date().toISOString();
  return `${timestamp} <strong style="color: ${
    COLOR[type.toLowerCase()]
  }">[${type.toUpperCase()}]</strong> `;
}

export function appendBuildOutput(type, message) {
  const li = document.createElement("li");
  li.innerHTML = `${renderPrefix(type)}${message}`;
  buildOutput.append(li);
}

export function appendConsoleOutput(type, message) {
  const li = document.createElement("li");
  li.innerHTML = `${renderPrefix(type)}${message}`;
  consoleOutput.append(li);
}
