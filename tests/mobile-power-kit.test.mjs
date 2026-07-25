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
