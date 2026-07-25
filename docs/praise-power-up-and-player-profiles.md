# Praise Power-Up and player profiles

## What changed

The old Beat Lab has been replaced by **Praise Power-Up**. DJ Glorp now hosts a
short music-regulation quest:

1. Pick a body need: **Calm, Brave, Comfort, Joy, or Sleep**.
2. Choose an optional tiny mission or **Just Listen**.
3. Deliberately open the parent-curated playlist in a new tab.
4. On returning, check the signal: **A lot, A little, or Not yet**.
5. Every answer receives the same quest completion path and XP.

“Not yet” is explicitly non-failure language: “That’s okay. You still listened
to your signal.” The regulation pass remains available and still earns the W.
Faith Campfire remains a separate Bible-story activity; Praise Power-Up uses
music for regulation and does not duplicate the story quest.

## Why it is built this way

- The child chooses a desired kind of support instead of being asked to disclose
  why a feeling is present.
- A tiny mission is optional. Listening without performing is a complete choice.
- The post-song check notices body change without requiring the feeling to
  disappear.
- Reward logic is identical for all three check-in answers, so the game does not
  train a child to report improvement.
- Familiar music is represented as one adult-approved external playlist link.
  The game does not embed a player, autoplay media, search, recommend, call a
  music API, modify the playlist, or require a login.
- DJ Glorp, large pixel-art cards, low-reading-load labels, and concrete objects
  keep the flow playful instead of clinical.

This remains a play-and-practice tool. It is not therapy, a diagnostic tool, a
forensic interview, or legal advice.

## Moses Mode

`MOSES` is a compile-time player profile. It currently supplies:

- Moses Mode/player labels and Dragon Bro as the default avatar.
- “Jesus Song Station” naming.
- favorite colors;
- Jesus songs, soft blanket, pottery/clay, snack/water, rocking/swinging, and
  closeness to a grown-up in **My Power Kit**;
- the preferred phrase “I need a minute, bro.”;
- Capy Bappy as the companion; and
- rare corgi, lopsided courage cup, and dancing broccoli Easter eggs.

Personal details are intentionally warm and non-sensitive. The profile does not
contain court, case, placement, legal, professional, diagnosis, or trauma-history
facts.

## Generic core mode

`GENERIC` compiles from separate profile and song-library files. The export audit
fails if the generic build contains the child's name, Moses Mode label, Jesus
Song Station label, or Moses-only power phrase. Edition and profile are separate:

- `REVIEW` / `CHILD` controls professional-review material.
- `MOSES` / `GENERIC` controls player personalization.

The service-worker cache key and readiness response include both values. This
prevents a tablet from reusing an offline cache made for another edition or
profile.

Each GitHub Pages deployment also injects its commit revision into the service
worker and cache name. The browser bypasses its HTTP cache when checking the
worker. A new push therefore installs a new offline app shell and deletes older
Brave Blocks caches instead of continuing to serve a quest from a prior release.
An already-open page may need one reload after the new worker finishes installing.

## Updating profile details

Edit `app/profile.moses.ts`. All personal strings and choices live in that one
configuration object:

- labels and default avatar;
- station naming and introduction;
- two accent colors;
- comfort-tool cards;
- trusted-grown-up labels;
- preferred phrases;
- companion; and
- Easter eggs.

Keep icons in `public/pixel-icons/index.json`. `pnpm praise:test` fails when a
configured emoji has no matching pixel-art PNG.

For a reusable edition, edit `app/profile.generic.ts`. Do not import the Moses
profile into generic content.

## Updating song links

Edit `app/song-library.moses.ts` or `app/song-library.generic.ts`. Each record
contains:

```ts
{
  id: "unique-id",
  title: "Child-visible title",
  artist: "Artist or source",
  url: "https://family-approved.example/song",
  icon: "🎵",
  category: "calm",
  prompt: "One short optional mission."
}
```

Allowed categories are `calm`, `brave`, `comfort`, `joy`, and `sleep`. Every
category must have at least one track. URLs must use HTTPS and cannot include
query parameters named `name`, `child`, `profile`, `emotion`, `feeling`,
`signal`, `result`, or `answer`.

The Moses profile uses the caregiver-provided **Moses’ Jesus Songs** YouTube
Music playlist in every power lane, with a different optional mission for each
lane. Only one large **Play Moses’ Jesus Songs** button is shown at a time. The
share-only `si` parameter was removed; the playlist ID is sufficient to open the
curated list.

Brave Blocks remembers only that its external-link button was tapped, in memory,
so the returning child can see the signal check. It never receives the chosen
track, playback history, watch time, YouTube account data, or playlist changes.

External providers can apply their own cookies, recommendations, advertising,
and privacy rules after the grown-up or child deliberately opens a link. Brave
Blocks sends no child answer in the URL and uses `noopener`, `noreferrer`, an
external relationship marker, and a no-referrer policy. For the strongest
privacy and distraction control, replace YouTube links with ad-free,
family-controlled HTTPS audio pages.

## Storage and reset behavior

Gameplay state—XP, badges, loot, selected avatar, song lane, song, mission, and
signal check—exists only in React memory for the open page. The app does not use
local storage, session storage, IndexedDB, analytics, telemetry, beacons,
WebSockets, or response-transmission requests.

**Grown-up · Reset This Play** opens a focus-managed confirmation dialog and
clears the current in-memory session. Refreshing or closing the page also clears
it. The offline service worker stores only static app assets, pixel icons, and
prerecorded narration; it does not store gameplay choices.

## Accessibility and responsive decisions

- Native buttons, links, details/summary, headings, and grouped controls preserve
  keyboard and screen-reader semantics.
- Focus indicators are visible on buttons, the power-kit summary, and the song
  link.
- Interactive targets are at least 44 CSS pixels high, with larger signal cards
  on phones.
- Color is paired with an icon, name, and clue.
- Layouts collapse from five/three columns to two and then one column; cards use
  `minmax(0, 1fr)` and wrapping to prevent horizontal overflow.
- The smallest explicit breakpoint is 350px, covering a 320px viewport.
- Reduced-motion mode removes animation and transition movement.
- No new flashing animation was added.
- The reset dialog traps focus, supports Escape, and returns focus on close.

## Automated verification completed

`pnpm praise:test` covers:

- all five lanes and song availability;
- HTTPS and child-response-query rejection;
- all signal-check affirmations, including non-failure “Not yet”;
- separation of Moses and generic profiles;
- absence of sensitive case language in the Moses profile;
- pixel-art inventory coverage;
- a deliberate playlist link with no embed, autoplay, search, recommendation,
  API integration, or share-tracking token;
- optional mission, pass, single-award guard, and reset wiring;
- no child-state storage, transmission, or analytics; and
- 350/620px responsive rules, reduced motion, focus, target size, and ARIA
  invariants.

Production verification completed:

| Build | Quests | Pixel icons | Narration | Offline after first load |
|---|---:|---:|---:|---|
| CHILD / GENERIC | 10 | 112 | 179 | Zero network requests |
| CHILD / MOSES | 10 | 112 | 179 | Zero network requests |
| REVIEW / MOSES | 10 | 112 | 184 | Zero network requests |

The local sandbox does not permit listening on a web-server port, and the
browser security policy blocks local/data-page navigation. Therefore a true
rendered visual pass at 320px, common phone, tablet, and desktop sizes—and a
VoiceOver/TalkBack pass—must be completed on the deployed preview or a developer
machine. The automated layout invariants and production static builds pass, but
they are not represented as a substitute for that manual assistive-technology
check.

## Recommended manual review

1. At 320px, 390px, Fire-tablet portrait/landscape, and desktop widths, confirm
   there is no horizontal scrolling or clipped footer/portal control.
2. Complete each of the five song lanes and choose each signal answer once.
3. Confirm a second tap cannot award XP twice.
4. Use keyboard only: open My Power Kit, enter Praise Power-Up, open a song,
   complete the check, open reset, cancel, and confirm reset.
5. With VoiceOver or TalkBack, confirm headings, pressed states, the new-tab link,
   live quest completion, and reset dialog are announced clearly.
6. Enable reduced motion and confirm the experience remains understandable.
7. On a test tablet, install online, wait for offline-ready status, disable Wi-Fi,
   and replay every local step. The external song intentionally requires a
   connection unless that provider independently supports offline playback.
