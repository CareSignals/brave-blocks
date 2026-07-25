import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { reviewOnlyNarrationLines } from "./edition-policy.mjs";

const root = process.cwd();
const sourcePath = join(root, "app", "narration-index.json");
const appOutputPath = join(root, "app", "narration-index.child.json");
const publicOutputPath = join(root, "public", "audio", "narration", "child-index.json");
const source = JSON.parse(await readFile(sourcePath, "utf8"));
const childIndex = Object.fromEntries(
  Object.entries(source).filter(([line]) => !reviewOnlyNarrationLines.has(line)),
);
const output = `${JSON.stringify(childIndex, null, 2)}\n`;

await writeFile(appOutputPath, output);
await writeFile(publicOutputPath, output);

console.log(`Child narration index: ${Object.keys(childIndex).length} safe lines`);
console.log(`Removed ${Object.keys(source).length - Object.keys(childIndex).length} review-only lines`);
