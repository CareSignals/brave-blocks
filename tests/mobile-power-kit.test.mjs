import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("Power Kit icon styles cannot collapse the summary copy on mobile", () => {
  assert.match(page, /className="power-kit-icon"/);
  assert.match(page, /className="power-kit-summary-copy"/);
  assert.match(css, /\.power-kit summary>\.power-kit-icon\s*\{/);
  assert.match(
    css,
    /@media\(max-width:620px\)[\s\S]*?\.power-kit summary>\.power-kit-icon\s*\{/,
  );
  assert.doesNotMatch(css, /\.power-kit summary>span\s*\{/);
});

test("all Power Kit cards are selectable session-only choices", () => {
  assert.match(page, /const \[powerKitPicks, setPowerKitPicks\] = useState<string\[\]>\(\[\]\)/);
  assert.match(page, /className="power-kit-choice"/);
  assert.match(page, /aria-pressed=\{picked\}/);
  assert.match(page, /onClick=\{\(\) => togglePowerKitChoice\(tool\.id, tool\.label\)\}/);
  assert.match(page, /setPowerKitPicks\(\[\]\)/);
  assert.match(page, /setAnnouncement\(`\$\{label\} \$\{wasPicked \? "removed from" : "added to"\} your Power Kit\./);
  assert.match(css, /\.power-kit-choice\[aria-pressed="true"\]\s*\{/);
  assert.match(css, /@media\(max-width:620px\)[\s\S]*?\.power-kit-choice>b\{grid-column:2/);
});
