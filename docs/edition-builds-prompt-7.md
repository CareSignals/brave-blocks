# Prompt 7 — REVIEW and CHILD editions

## Build flag

`NEXT_PUBLIC_BRAVE_BLOCKS_EDITION` accepts exactly two values:

- `REVIEW` keeps the professional banner, professional role introductions, WRAP checklist, and Grown-up Guide. It is the default so the existing GitHub Pages link does not change unexpectedly.
- `CHILD` removes review-team material, replaces professional role introductions with generic trusted-grown-up helpers, keeps the gated Fire Tablet setup, and exports only child-safe narration.

Build either static edition with:

```bash
pnpm pages:build:review
pnpm pages:build:child
```

The GitHub Pages workflow builds and audits CHILD first, then rebuilds and deploys REVIEW. To deploy CHILD later, change the final workflow build’s edition from `REVIEW` to `CHILD`.

## Safety boundary

The editions use separate compile-time content and narration inputs. CHILD does not merely hide review content with CSS: review-only text and its five narration MP3 files are absent from the exported files.

The CHILD audit fails if any exported text asset contains review-team language or these adult clinical/legal terms: WRAP, de-identified, professional preview, care team, forensic interview, therapy/therapist, legal advice/outcome, attorney, social worker, clinician, pediatrician, counselor, court, judge, TPR, reunification, parental rights, flooded, or activating.

## Complete review-only string inventory

The strings below are the complete unique inventory of text that can appear or be heard only in REVIEW mode.

### Page metadata and installed-app name

1. `Brave Blocks | WRAP Team Review`
2. `A de-identified professional preview of a playful emotional-learning game for an early reader.`
3. `De-identified professional preview: big feelings, brave words, and playful quests.`
4. `Brave Blocks WRAP Team Review`

### Review banner, grown-up gate, and installation

1. `WRAP TEAM REVIEW EDITION`
2. `De-identified professional preview · no responses are saved or sent`
3. `Grown-ups: open the Grown-Up Guide`
4. `Grown-ups: open the Grown-Up Guide. Press and hold for 3 seconds. Tap once for the keyboard or screen-reader check.`
5. `Grown-Up Guide`
6. `Unlock Grown-Up Guide`
7. `Grown-up guide.`
8. `Hear Grown-up Guide instructions`
9. `Open the public Brave Blocks review link.`
10. `This review edition does not save or send a child’s game choices.`

### Meeting Loadout and support blocks

1. `Counselor`
2. `MEET THE NPCs`
3. `Ask what their job means`
4. `ATTORNEY`
5. `My job is to listen and explain my role. Ask me what I keep private and what I may share.`
6. `ATTORNEY. My job is to listen and explain my role. Ask me what I keep private and what I may share.`
7. `SOCIAL WORKER`
8. `My job is to check how things are going. Ask me what I write down or share.`
9. `SOCIAL WORKER. My job is to check how things are going. Ask me what I write down or share.`
10. `HEAR INTRO`
11. `Grown-up note: these are placeholders. Each professional should approve their own role and privacy wording.`

### Grown-up Guide

1. `Grown-up Guide`
2. `Keep the fun child-led and the child’s answers their own.`
3. `Grown-up Guide. Keep the fun child-led and the child’s answers their own.`
4. `WRAP TEAM REVIEW`
5. `What should the care team notice?`
6. `Does the language feel neutral, concrete, and right for an early reader?`
7. `Could any activity feel leading, activating, or too close to a forensic interview?`
8. `Which coping choices match the child’s existing safety and regulation plans?`
9. `Should the Pause Portal or Meeting Loadout choices be renamed for this child?`
10. `Can each professional approve the wording that describes their role and privacy limits?`
11. `What should be added, simplified, or removed before the child uses it?`
12. `Please share observations with the caregiver outside this game. This preview does not collect responses.`
13. `Follow, don’t lead`
14. `Let the child choose. Reflect their exact words without suggesting feelings, facts, people, or outcomes.`
15. `Connection first`
16. `Play for 5–10 minutes. Stop if he becomes flooded, frozen, avoidant, or simply wants to stop.`
17. `Protect privacy`
18. `Do not ask the child to report what they told their attorney. Have each professional explain their role and privacy limits directly.`
19. `Welcome loyalty`
20. `He can love, miss, fear, or feel angry with anyone while also loving and attaching to you.`
21. `Helpful phrases`
22. `“All feelings are allowed.” “You don’t have to fix grown-up feelings.” “I’ll love you after any answer.”`
23. `Share the tool`
24. `Let the child’s clinician, attorney, and social worker adjust meeting language for the child’s developmental needs.`
25. `Faith without pressure`
26. `Use the Bible campfire only when the child wants it. Keep God’s love unconditional; never connect legal outcomes or difficult feelings to faithfulness.`
27. `Familiar music`
28. `The Beat Lab uses original sounds. You can play his favorite recordings separately from your own licensed music service during free play.`
29. `Safe, not suppressed`
30. `Validate the feeling first, then offer two safe choices. Practice the Safety Power-Ups when he is regulated—not as a demand during peak distress.`
31. `Safety plan`
32. `If anyone is in immediate danger, move people and unsafe objects apart, get help, and follow the safety plan made with his clinician or pediatrician.`
33. `Original voice only`
34. `The prerecorded narrator sounds consistent across devices and does not imitate a celebrity, artist, influencer, or copyrighted character.`
35. `Passing still counts`
36. `Reward practicing a choice—not disclosure, agreement, or a particular feeling. “Pass” should remain a complete and respected response.`
37. `Important:`
38. `Brave Blocks supports play and practice. It is not therapy, a forensic interview, or legal advice.`

## CHILD replacements

| REVIEW | CHILD |
|---|---|
| WRAP review banner | No banner |
| Grown-up Guide button | Gated Fire Tablet setup button |
| Attorney and social-worker introductions | Trusted Grown-up and My Grown-up |
| `HEAR INTRO` | `HEAR NAME` |
| `Counselor` support block | Omitted |
| 191 narration phrases | 186 child-safe narration phrases |

## Verification completed

- CHILD: 10 quest modules, 112 pixel icons, 186 narration files, and zero network requests after the first online load.
- REVIEW: 10 quest modules, 112 pixel icons, 191 narration files, and zero network requests after the first online load.
- Both manifests, edition markers, narration indexes, file sets, and service-worker readiness responses are checked automatically.
