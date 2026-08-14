import fs from "node:fs";

const file = new URL("../src/legacy-chat/chat-app.css", import.meta.url);
const css = fs.readFileSync(file, "utf8");
const bareColor = /#[0-9a-fA-F]{3,8}\b|rgba?\(/;
const violations = [];
let privateDeclaration = false;

css.split(/\r?\n/).forEach((line, index) => {
  const declaration = line.match(/^\s*(--[\w-]+)\s*:/);
  if (declaration) privateDeclaration = declaration[1].startsWith("--_") || declaration[1].startsWith("--st-");
  if (bareColor.test(line) && !privateDeclaration) violations.push(index + 1);
  if (line.includes(";")) privateDeclaration = false;
});

if (violations.length) {
  console.error(`Bare CSS colors are only allowed in private or status token declarations: ${violations.join(", ")}`);
  process.exit(1);
}
