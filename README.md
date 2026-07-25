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
```

See [Prompt 7 — REVIEW and CHILD editions](docs/edition-builds-prompt-7.md) for the safety boundary, automated audits, and complete review-only string inventory.
