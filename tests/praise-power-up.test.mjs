import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  powerNeeds,
  safeExternalSongUrl,
  signalAffirmation,
  signalChanges,
  tracksForNeed,
  validateSongLibrary,
} from "../app/praise-power-up.ts";
import genericProfile from "../app/profile.generic.ts";
import mosesProfile from "../app/profile.moses.ts";
import genericSongs from "../app/song-library.generic.ts";
import mosesSongs from "../app/song-library.moses.ts";

const pageSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const serviceWorker = await readFile(new URL("../public/sw.js", import.meta.url), "utf8");
const pixelIconNames = new Set(JSON.parse(
  await readFile(new URL("../public/pixel-icons/index.json", import.meta.url), "utf8"),
));

function pixelIconName(icon) {
  return Array.from(icon)
    .map((character) => character.codePointAt(0)?.toString(16))
    .filter((codePoint) => codePoint && codePoint !== "fe0f")
    .join("-");
}

test("all five power needs have a selectable, approved song", () => {
  assert.deepEqual(
    powerNeeds.map(({ id }) => id),
    ["calm", "brave", "comfort", "joy", "sleep"],
  );
  for (const library of [mosesSongs, genericSongs]) {
    assert.deepEqual(validateSongLibrary(library), []);
    for (const need of powerNeeds) {
      const tracks = tracksForNeed(library, need.id);
      assert(tracks.length > 0, `${need.label} must have at least one song.`);
      for (const track of tracks) {
        assert.equal(track.category, need.id);
        assert(track.prompt?.trim(), `${track.id} needs an optional tiny mission.`);
        assert.equal(new URL(safeExternalSongUrl(track.url)).protocol, "https:");
      }
    }
  }
});

test("song-link guard rejects insecure and child-response query data", () => {
  assert.throws(
    () => safeExternalSongUrl("http://example.com/song"),
    /must use HTTPS/,
  );
  assert.throws(
    () => safeExternalSongUrl("https://example.com/song?emotion=sad"),
    /cannot include child-response/,
  );
  assert.doesNotThrow(
    () => safeExternalSongUrl("https://www.youtube.com/watch?v=ILEdpepg7D0"),
  );
});

test("every signal check is affirmed, including Not yet", () => {
  assert.deepEqual(
    signalChanges.map(({ label }) => label),
    ["A lot", "A little", "Not yet"],
  );
  for (const choice of signalChanges) {
    assert.equal(signalAffirmation(choice.id), choice.affirmation);
    assert(choice.affirmation.length > 10);
  }
  assert.match(signalAffirmation("not-yet"), /okay/i);
  assert.doesNotMatch(signalAffirmation("not-yet"), /fail|wrong|try harder/i);
});

test("profiles separate Moses-only comfort details from generic core mode", () => {
  assert.equal(mosesProfile.id, "moses");
  assert.equal(genericProfile.id, "generic");
  assert(mosesProfile.favoriteComfortTools.length >= 5);
  assert(genericProfile.favoriteComfortTools.length >= 5);
  assert(mosesProfile.easterEggs.length >= 2);
  assert(genericProfile.easterEggs.length >= 2);

  const genericText = JSON.stringify(genericProfile);
  assert.doesNotMatch(genericText, /\bMoses\b|MOSES MODE|I need a minute, bro/i);

  const mosesText = JSON.stringify(mosesProfile);
  assert.doesNotMatch(
    mosesText,
    /\bTPR\b|termination of parental rights|reunification services|\.26 trial|attorney|social worker/i,
  );
});

test("all configurable icons use the existing pixel-art inventory", () => {
  const icons = [
    ...powerNeeds.map(({ icon }) => icon),
    ...signalChanges.map(({ icon }) => icon),
    ...[genericProfile, mosesProfile].flatMap((profile) => [
      profile.avatarIcon,
      ...profile.favoriteComfortTools.map(({ icon }) => icon),
      ...profile.easterEggs.map(({ icon }) => icon),
      profile.animalCompanion?.icon,
    ]),
    ...[genericSongs, mosesSongs].flatMap((library) =>
      Object.values(library).flatMap((tracks) => tracks.map(({ icon }) => icon))),
  ].filter(Boolean);
  for (const icon of icons) {
    assert(pixelIconNames.has(pixelIconName(icon)), `${icon} is missing a pixel-art PNG.`);
  }
});

test("Praise Power-Up opens a deliberate external link without embeds or autoplay", () => {
  assert.match(pageSource, /target="_blank"/);
  assert.match(pageSource, /rel="noopener noreferrer external"/);
  assert.match(pageSource, /referrerPolicy="no-referrer"/);
  assert.match(pageSource, /OPEN SONG ↗/);
  assert.doesNotMatch(pageSource, /<iframe\b/i);
  assert.doesNotMatch(pageSource, /\bautoPlay\b|\bautoplay\b/i);
  assert.doesNotMatch(pageSource, /youtube\.com\/embed/i);
});

test("the flow supports pass, optional participation, single completion, and reset", () => {
  assert.match(pageSource, /OPTIONAL SIDE QUEST/);
  assert.match(pageSource, /I CAN TRY/);
  assert.match(pageSource, /JUST LISTEN/);
  assert.match(pageSource, /Every answer gets the W/);
  assert.match(pageSource, /RegulationSkip onSkip=\{skip\}/);
  assert.match(pageSource, /if \(completionLocked\.current\) return/);
  assert.match(pageSource, /completionLocked\.current = true/);
  assert.match(pageSource, /setBadges\(\[\]\)/);
  assert.match(pageSource, /setXp\(0\)/);
  assert.match(pageSource, /setCollection\(\[\]\)/);
  assert.match(pageSource, /Nothing is stored online/);
});

test("child choices stay in component memory and are not transmitted or analyzed", () => {
  assert.doesNotMatch(pageSource, /\blocalStorage\b|\bsessionStorage\b|\bindexedDB\b/);
  assert.doesNotMatch(pageSource, /\bsendBeacon\b|\bfetch\s*\(|XMLHttpRequest|WebSocket/);
  assert.doesNotMatch(pageSource, /googleAnalytics|gtag\s*\(|analytics\.|telemetry|mixpanel|amplitude/i);
  assert.match(serviceWorker, /profile: PROFILE/);
  assert.match(serviceWorker, /PROFILE\.toLowerCase\(\)/);
});

test("responsive and accessibility safeguards cover small screens and reduced motion", () => {
  assert.match(styles, /@media\(max-width:350px\)/);
  assert.match(styles, /@media\(max-width:620px\)/);
  assert.match(styles, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(styles, /\.power-kit summary:focus-visible/);
  assert.match(styles, /\.now-playing-card>a:focus-visible/);
  assert.match(styles, /min-height:52px/);
  assert.match(styles, /overflow-x:hidden/);
  assert.match(pageSource, /aria-labelledby="power-need-title"/);
  assert.match(pageSource, /role="group" aria-labelledby="signal-check-title"/);
});
