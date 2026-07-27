# Brave Blocks

A de-identified professional preview of an interactive emotional-learning game for an early reader.

The default REVIEW edition uses the generic profile and does not contain a child's name or case-specific facts. It includes a care-team review checklist and does not save or send gameplay choices. A player name can be entered for the open session, but it is never stored or sent. A separate CHILD build removes all professional-review, clinical, and legal wording from child-visible and child-audible files.

## Public site

https://caresignals.github.io/brave-blocks/

## Local development

```bash
pnpm install
pnpm dev
```

## Deployment

Pushing to `main` runs the GitHub Pages deployment workflow. The current public link deploys REVIEW mode with the de-identified `GENERIC` profile.

## Edition builds

```bash
pnpm pages:build:review
pnpm pages:build:child
pnpm pages:build:generic
```

See [Prompt 7 — REVIEW and CHILD editions](docs/edition-builds-prompt-7.md) for the safety boundary, automated audits, and complete review-only string inventory.

## Feeling Machine and adult companion

Quest 11 is **Feeling Machine**: a five-stage, child-facing DBT-informed emotion
cycle using fictional Chaos Crew stories. A child can choose “My Own Vibe,” but
personal details are always optional and all selections remain session-only.

The gated grown-up guide links to
[Power-Up Pals](https://caresignals.github.io/power-up-pals-dbt/) as the adult
companion for caregiver pathways, skill context, and co-regulation support.

## Player profiles and Praise Power-Up

The public REVIEW build uses the `GENERIC` profile. Personalized CHILD builds can
use the `MOSES` profile locally or in a private deployment. Both profiles are
audited during deployment so the public review cannot accidentally ship the
child's name or personal comfort details.

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
