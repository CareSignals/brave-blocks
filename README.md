# Brave Blocks

A de-identified professional preview of an interactive emotional-learning game for an early reader.

The default REVIEW edition does not contain the child's name or case-specific facts. It includes a care-team review checklist and does not save or send gameplay choices. A separate CHILD build removes all professional-review, clinical, and legal wording from child-visible and child-audible files.

## Public site

https://caresignals.github.io/brave-blocks/

## Local development

```bash
pnpm install
pnpm dev
```

## Deployment

Pushing to `main` runs the GitHub Pages deployment workflow. The current public link deploys REVIEW mode.

## Edition builds

```bash
pnpm pages:build:review
pnpm pages:build:child
pnpm pages:build:generic
```

See [Prompt 7 — REVIEW and CHILD editions](docs/edition-builds-prompt-7.md) for the safety boundary, automated audits, and complete review-only string inventory.

## Player profiles and Praise Power-Up

The deployed REVIEW and personalized CHILD builds use the `MOSES` profile. A
compile-time `GENERIC` profile is also audited so a future core edition cannot
accidentally ship the child's name or personal comfort details.

```bash
NEXT_PUBLIC_BRAVE_BLOCKS_EDITION=CHILD \
NEXT_PUBLIC_BRAVE_BLOCKS_PROFILE=GENERIC \
pnpm pages:build:generic
```

- Edit personal labels, comfort tools, colors, power phrases, and Easter eggs in
  [`app/profile.moses.ts`](app/profile.moses.ts).
- Edit Moses's family-approved song links in
  [`app/song-library.moses.ts`](app/song-library.moses.ts).
- Edit reusable defaults in [`app/profile.generic.ts`](app/profile.generic.ts)
  and [`app/song-library.generic.ts`](app/song-library.generic.ts).
- Keep each song in one of the five power lanes: `calm`, `brave`, `comfort`,
  `joy`, or `sleep`. Song links must use HTTPS and cannot carry child-response
  query parameters.

Run `pnpm praise:test` after changing a profile or song library. See
[`docs/praise-power-up-and-player-profiles.md`](docs/praise-power-up-and-player-profiles.md)
for the flow, privacy/storage model, configuration guide, tradeoffs, and test
record.
