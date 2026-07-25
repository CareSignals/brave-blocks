# Brave Blocks Offline Readiness — Prompt 6

**Date:** July 24, 2026  
**Target:** One online load followed by complete offline play

## Finding

The prior service worker did not guarantee first-load offline readiness.

It cached the home document, manifest, app icons, pixel-icon pack, and narration pack during installation. However, the hashed Next.js JavaScript and CSS files had already loaded before the new worker controlled the page. Those files were only added later by the runtime fetch handler, which explains why the Fire Tablet instructions said to open the game twice.

The prior worker also used `Promise.allSettled` and caught icon/narration failures. This allowed installation to finish even if required narration or icons were missing, so there was no trustworthy point at which the UI could say the game was fully ready.

## Changes applied

1. The service-worker cache moved to `brave-blocks-wrap-review-v9`.
2. On its first installation, the worker now fetches the home document and discovers every same-origin JavaScript, CSS, manifest, image, and preload URL in the generated page.
3. It scans cached stylesheets for local nested assets, including font files if the design adds any later.
4. It strictly caches every indexed pixel icon and every unique indexed narration MP3 in small batches.
5. Any required-asset failure now fails the new worker installation and removes its incomplete cache. The previous working worker remains available.
6. A readiness marker is written only after the complete pack succeeds.
7. The app asks the active worker for that marker and shows the result only inside the adult-gated Grown-Up Guide and Fire Tablet Setup.
8. The Fire instructions now say to open once and wait for **Ready for offline play**, replacing the old “open twice” guidance.
9. GitHub Pages now runs both offline coverage and first-load lifecycle tests before deployment.

## Readiness states

- **Saving offline pack…** — the first online cache is still being built.
- **Ready for offline play** — all required assets are present in the versioned cache.
- **Offline pack needs Wi-Fi** — caching failed or was interrupted; reconnect and reopen.
- **Offline play is unavailable** — the browser does not support service workers.

These messages are not shown on the child-facing Quest Map or minigames.

## Verified asset inventory

| Asset group | Verified result |
|---|---:|
| Generated app-shell assets discovered from HTML | 37 |
| Pixel icons | 112 of 112 |
| Narration phrases/files | 191 of 191 |
| Child-facing quest modules in the single app bundle | 10 |
| HEAR IT instruction clips checked | 11, including the adult guide |
| Pause Portal narration clips checked | 4 |
| Network-dependent fonts | 0 |

The design uses device-local system font stacks. There is no Google Fonts request or other external font dependency. The service worker’s stylesheet discovery will include local font files automatically if one is added in a future build.

## First-load to offline lifecycle test

The automated lifecycle harness:

1. Starts with an empty Cache Storage implementation.
2. Runs one service-worker install with the network available.
3. Confirms that the worker returns the `ready` marker.
4. Disables the network completely.
5. Reloads the root navigation from cache.
6. Requests every generated app-shell asset, all 112 pixel icons, and all 191 narration files.
7. Checks all 10 quest modules, every QuestShell HEAR IT instruction, and all narrated Pause Portal choices.
8. Confirms built-in feedback and Beat Lab sounds use the on-device Web Audio API.
9. Fails if any request reaches the network after the offline switch.

**Result:** 349 requests completed during the single online installation; every checked interaction then resolved with **zero offline network requests**.

## Post-deployment device check

The build environment does not permit opening a local listening port, so the automated lifecycle test is the repeatable release gate. After deployment, complete this final hardware check on the Fire tablet:

1. Open Brave Blocks once while online.
2. Open the adult-gated Fire Tablet Setup and wait for **Ready for offline play**.
3. Turn on Airplane Mode or disable Wi-Fi.
4. Close and reopen Brave Blocks.
5. Open each quest, use at least one HEAR IT button, and open the Pause Portal with sound enabled.

If the ready indicator does not appear, keep the tablet online, reopen the game, and do not rely on offline play until it reports ready.
