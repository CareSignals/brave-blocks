import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { narrationLines } from "./narration-lines.mjs";
import { reviewOnlyNarrationLines } from "./edition-policy.mjs";

const VOICE_NAME = process.env.ELEVENLABS_VOICE_NAME ?? "Pixel Quest Host";
const API_ROOT = "https://api.elevenlabs.io";
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const audioDirectory = join(root, "public", "audio", "narration");
const indexPath = join(root, "app", "narration-index.json");
const publicIndexPath = join(audioDirectory, "index.json");
const childIndexPath = join(root, "app", "narration-index.child.json");
const publicChildIndexPath = join(audioDirectory, "child-index.json");
const apiKey = process.env.ELEVENLABS_API_KEY;

if (!apiKey) {
  console.error("Missing ELEVENLABS_API_KEY. Run this command from the same Terminal session:");
  console.error('read -s "ELEVENLABS_API_KEY?Paste your key (hidden): "; echo; export ELEVENLABS_API_KEY');
  process.exit(1);
}

function filenameFor(text) {
  const hash = createHash("sha256").update(text).digest("hex").slice(0, 16);
  return `${hash}.mp3`;
}

function voiceSettingsFor(text) {
  const gentle = /no rush|loved|safe grown-up|hard day|feeling|private|share|break|pass|matter|hope|alone|body/i.test(text);
  return {
    stability: gentle ? 0.52 : 0.4,
    similarity_boost: 0.78,
    style: gentle ? 0.02 : 0.08,
    use_speaker_boost: true,
    speed: gentle ? 0.94 : 1.02,
  };
}

async function api(path, options = {}) {
  const response = await fetch(`${API_ROOT}${path}`, {
    ...options,
    headers: {
      "xi-api-key": apiKey,
      ...(options.body ? { "content-type": "application/json" } : {}),
      ...options.headers,
    },
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${response.status} ${response.statusText}: ${body.slice(0, 500)}`);
  }
  return response;
}

async function findVoice() {
  const params = new URLSearchParams({
    search: VOICE_NAME,
    page_size: "100",
    voice_type: "saved",
    include_total_count: "false",
  });
  const response = await api(`/v2/voices?${params}`);
  const data = await response.json();
  const voice = data.voices?.find((item) => item.name?.trim().toLowerCase() === VOICE_NAME.toLowerCase());
  if (!voice) {
    throw new Error(`Could not find a saved voice named "${VOICE_NAME}". Check the name and the key's Voices read permission.`);
  }
  return voice;
}

async function existingIndex() {
  try {
    return JSON.parse(await readFile(indexPath, "utf8"));
  } catch {
    return {};
  }
}

async function synthesize(voiceId, text, attempt = 1) {
  const response = await api(`/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
    method: "POST",
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: voiceSettingsFor(text),
    }),
  }).catch(async (error) => {
    if (attempt >= 4 || !/429|500|502|503|504/.test(String(error))) throw error;
    const delay = 1000 * 2 ** (attempt - 1);
    console.log(`  Service busy; retrying in ${delay / 1000}s...`);
    await new Promise((resolve) => setTimeout(resolve, delay));
    return synthesize(voiceId, text, attempt + 1);
  });
  return response;
}

await mkdir(audioDirectory, { recursive: true });
const voice = await findVoice();
const index = await existingIndex();
const totalCharacters = narrationLines.reduce((sum, text) => sum + text.length, 0);

console.log(`Found voice: ${voice.name}`);
console.log(`Narration pack: ${narrationLines.length} clips, ${totalCharacters.toLocaleString()} characters`);

for (const [position, text] of narrationLines.entries()) {
  const filename = filenameFor(text);
  const outputPath = join(audioDirectory, filename);
  if (index[text] === filename) {
    console.log(`[${position + 1}/${narrationLines.length}] already generated`);
    continue;
  }

  console.log(`[${position + 1}/${narrationLines.length}] ${text.slice(0, 72)}${text.length > 72 ? "…" : ""}`);
  const response = await synthesize(voice.voice_id, text);
  const audio = Buffer.from(await response.arrayBuffer());
  await writeFile(outputPath, audio);
  index[text] = filename;
  await writeFile(indexPath, `${JSON.stringify(index, null, 2)}\n`);
  await writeFile(publicIndexPath, `${JSON.stringify(index, null, 2)}\n`);
}

const childIndex = Object.fromEntries(
  Object.entries(index).filter(([line]) => !reviewOnlyNarrationLines.has(line)),
);
const childIndexOutput = `${JSON.stringify(childIndex, null, 2)}\n`;
await writeFile(childIndexPath, childIndexOutput);
await writeFile(publicChildIndexPath, childIndexOutput);

console.log(`Done. Generated ${Object.keys(index).length} narration clips in ${audioDirectory}`);
console.log(`Child-safe narration index: ${Object.keys(childIndex).length} clips`);
