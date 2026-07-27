# Brave Blocks Accessibility Audit — Prompt 5

**Audit date:** July 24, 2026  
**Target:** WCAG 2.1 Level AA, plus the requested 44 × 44 CSS-pixel minimum touch target check  
**Scope:** Home/Quest Map, all 11 quests, drawing pad, Pixel Parkour, Beat Lab, dialogs, rewards, and 320px-wide layouts

## Outcome

This pass found 13 accessibility issues and applied a fix for each one. The changes focus on readable contrast, screen-reader structure, complete keyboard access, understandable state announcements, and usable controls on a small tablet or phone.

The requested 44 × 44 target check is stricter than the WCAG 2.1 AA minimum: WCAG 2.1 Success Criterion 2.5.5 specifies 44 × 44 at Level AAA. Brave Blocks now uses that larger target as its small-screen design baseline.

## Issues found and fixes applied

| # | Issue found | Fix applied | Related WCAG 2.1 criterion |
|---|---|---|---|
| 1 | Text on bright gradients did not maintain AA contrast at every gradient endpoint. Examples included the install banner, Axo labels, crew cards, and quest-card copy. | Darkened decorative gradients and placed important copy on opaque, dark panels. Cyan and yellow labels now sit on contrast-safe backgrounds. | 1.4.3 Contrast (Minimum) |
| 2 | The home status strip and Home-Base Buff copy were visually placed over key art, allowing image colors to compete with the text. | Replaced translucent/image-dependent treatments with solid high-contrast panels. | 1.4.3 Contrast (Minimum), 1.4.5 Images of Text |
| 3 | The 11 quest names looked like headings but were only bold text inside buttons, so screen-reader heading navigation skipped the entire Quest Map. | Converted every card to a semantic `article` with a real `h3`. A transparent full-card button references the visible title and description with `aria-labelledby`. | 1.3.1 Info and Relationships, 2.4.6 Headings and Labels |
| 4 | Keyboard focus was difficult to see and was inconsistent across controls. | Added a high-contrast yellow-and-navy double focus ring for buttons, links, inputs, canvases, and programmatically focusable elements, including a forced-colors fallback. | 2.4.7 Focus Visible |
| 5 | Drawing on the Slime Doodle canvas depended on pointer input. | Added a native **Stamp Pixel** button as a keyboard-equivalent drawing action, keyboard-operable color controls, concise instructions, and a drawing-status announcement. | 2.1.1 Keyboard |
| 6 | Dialogs did not consistently keep keyboard focus inside, close with Escape, or return focus to the control that opened them. | Added one shared dialog-focus behavior to the Adult Gate, victory/reward screen, Voice Lab, Pause Portal, and Fire Tablet guide. It moves focus into the dialog, traps Tab/Shift+Tab, handles Escape, and restores focus on close. | 2.1.1 Keyboard, 2.4.3 Focus Order |
| 7 | XP gains, quest completion, and unlocked loot were primarily visual changes. | Added one central polite `aria-live` status region. It announces quest completion, the exact XP earned, unlocked loot, completion notes, mystery-block XP, and the new total. | 4.1.3 Status Messages |
| 8 | Selected feelings, moves, story choices, meeting options, and other toggles relied on color and shape alone. | Added `aria-pressed` to selectable controls so assistive technology receives the same selected/unselected state. | 1.3.1 Info and Relationships, 4.1.2 Name, Role, Value |
| 9 | XP, growth hearts, scanning, dragon health, shield power, and similar meters lacked machine-readable values. | Added named progressbar roles with minimum, maximum, current value, and plain-language value text. | 1.3.1 Info and Relationships, 4.1.2 Name, Role, Value |
| 10 | After changing quests, keyboard and screen-reader focus could remain on a control from the prior screen. | Made each route title programmatically focusable and moves focus to it after a route change or reward close. | 2.4.3 Focus Order, 2.4.6 Headings and Labels |
| 11 | Dynamic quest results and instructions appeared visually without a reliable announcement. | Added polite status semantics to Body Radar, Meeting Loadout, Talk Power-Up, Build Mode, Safety Power-Ups, Pixel Parkour, Beat Lab, and Faith Campfire feedback. | 4.1.3 Status Messages |
| 12 | At 320px, several controls were below the requested target size: the brand control was about 41px high, header controls about 43px wide, color swatches about 38px, dialog close buttons about 39px, and the clear control about 42px. | Established a 44px global interactive minimum, enlarged header controls to 46px at narrow widths, and explicitly enlarged swatches, close buttons, Stamp Pixel, and Clear. | Requested 44px check; 2.5.5 Target Size (Level AAA) |
| 13 | The narrow header, edge borders, negative heading margins, and control spacing were crowded at 320px and could make targets harder to distinguish. | Hid decorative brand lettering while retaining its accessible name, tightened noninteractive gaps, removed narrow-screen page-side borders, contained heading offsets, allowed drawing tools to wrap, and reduced dialog padding. | 1.4.10 Reflow, 2.5.5 Target Size (Level AAA) |

## Contrast results after fixes

The following representative foreground/background pairs were calculated after the changes. Normal-size text requires at least 4.5:1 under WCAG 2.1 AA.

| Element | Contrast ratio |
|---|---:|
| Review banner body text | 12.72:1 |
| Review banner badge | 13.74:1 |
| Hero status label | 13.65:1 |
| Hero status text | 17.50:1 |
| Home-Base Buff copy | 13.72:1 |
| Install banner body text, lowest checked gradient point | 9.96:1 |
| Install banner cyan label | 13.94:1 |
| Crew-card text | 17.56:1 |
| Quest-card title | 18.95:1 |
| Quest-card description | 17.88:1 |
| Axo cyan label | 13.20:1 |
| Axo yellow heading | 13.96:1 |
| Yellow quest-page heading | 9.45:1 |
| Cyan quest-page heading | 9.19:1 |

Before the fixes, representative failures included cyan Axo text at about 2.84:1, yellow Axo text at about 3.14:1, white crew text on bright accents as low as 1.26:1, quest text on light accents around 1.94–2.06:1, and cyan-gradient copy around 3.42:1.

## Keyboard coverage

| Area | Keyboard behavior after fixes |
|---|---|
| Quest Map | All 11 quests are full-card native buttons. Tab reaches each card; Enter or Space opens it. |
| Slime Doodle | Color choices and Clear are native buttons. Stamp Pixel supplies a keyboard-equivalent creative action and announces the result. |
| Pixel Parkour | Jump and Go are native buttons. The world has an accessible description and the HUD announces progress. |
| Beat Lab | Start/Stop and every sound pad are native buttons. The playing state is exposed with `aria-pressed`. |
| Dialogs | Tab and Shift+Tab remain inside; Escape closes; focus returns to the opener. |
| Selected options | Feelings, body clues, meeting choices, power-ups, supports, safe moves, and stories expose pressed state. |

## Screen-reader structure and announcements

- The home page has one `h1`, the Quest Map has one `h2`, and each of the 11 quest cards has a navigable `h3`.
- Each minigame has a focused `h1` after navigation.
- All dialog containers have a dialog role, accessible title, modal state, and managed focus.
- Progress meters expose meaningful names and values.
- Quest completion announces the actual reward: 100 XP for a first win or 25 XP for a replay.
- Loot unlocks and mystery-block rewards are announced without moving focus unexpectedly.
- Meaningful controls have accessible names; decorative pixel icons are kept out of redundant announcements.

## Validation performed

- TypeScript type check passed.
- ESLint passed.
- The exact production command used by the GitHub Pages workflow completed successfully.
- Generated production HTML contains exactly 11 quest `h3` headings.
- Static accessibility invariants confirmed the central live region, native quest actions, five focus-managed dialogs, Escape handling, route-title focus, keyboard drawing alternative, Parkour and Beat Lab controls, progressbar semantics, pressed states, 44px targets, 320px header compaction, and narrow-layout containment.
- Source review found no positive `tabindex` values and no click handlers placed on noninteractive `div`, `span`, `section`, `article`, or `img` elements.
- A real 320px browser inspection of the pre-fix deployment confirmed no page-level horizontal overflow but exposed the undersized header controls and missing quest headings that this pass corrects. The post-fix generated production HTML and CSS were then inspected locally.

## Recommended human verification after deployment

Automated and source-level checks cannot replace an assistive-technology review. After Prompt 5 is deployed, complete one short pass with VoiceOver on iPhone/iPad or macOS and, if available, NVDA on Windows. Confirm the spoken order of each quest card, focus containment in every dialog, the timing of XP/loot announcements, and comfortable touch operation on Moses’s Fire tablet.
