import { cp, readFile, readdir, unlink } from "node:fs/promises";
import { join } from "node:path";
import { currentEdition } from "./edition-policy.mjs";

const root = process.cwd();
const outputNarrationDirectory = join(root, "out", "audio", "narration");
const fullIndexPath = join(root, "app", "narration-index.json");
const childIndexPath = join(root, "app", "narration-index.child.json");
const outputIndexPath = join(outputNarrationDirectory, "index.json");
const outputChildIndexPath = join(outputNarrationDirectory, "child-index.json");
const edition = currentEdition();

const fullIndex = JSON.parse(await readFile(fullIndexPath, "utf8"));
const childIndex = JSON.parse(await readFile(childIndexPath, "utf8"));
const childFiles = new Set(Object.values(childIndex));
const reviewOnlyFiles = [...new Set(Object.values(fullIndex))]
  .filter((filename) => !childFiles.has(filename));

if (edition === "CHILD") {
  await cp(childIndexPath, outputIndexPath);
  const builtFiles = new Set(await readdir(outputNarrationDirectory));
  await Promise.all(
    reviewOnlyFiles
      .filter((filename) => builtFiles.has(filename))
      .map((filename) => unlink(join(outputNarrationDirectory, filename))),
  );
}

await unlink(outputChildIndexPath).catch((error) => {
  if (error.code !== "ENOENT") throw error;
});

console.log(`${edition} edition finalized.`);
console.log(
  edition === "CHILD"
    ? `Removed ${reviewOnlyFiles.length} review-only narration files from the child export.`
    : "Kept the complete review narration pack.",
);
