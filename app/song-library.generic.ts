import type { PowerNeedId, SongLibrary, SongTrack } from "./song-library.types";

const approvedExample = {
  title: "Better Is One Day",
  artist: "Boston Church",
  url: "https://www.youtube.com/watch?v=ILEdpepg7D0",
  icon: "🎵",
} as const;

function exampleFor(category: PowerNeedId, prompt: string): SongTrack {
  return {
    ...approvedExample,
    id: `approved-example-${category}`,
    category,
    prompt,
  };
}

// PLACEHOLDER SLOTS: replace or add family-approved links for a generic child.
const songs: SongLibrary = {
  calm: [exampleFor("calm", "You can take one slow breath during the chorus.")],
  brave: [exampleFor("brave", "You can stand tall like a brave warrior.")],
  comfort: [exampleFor("comfort", "You can sit close to a trusted grown-up.")],
  joy: [exampleFor("joy", "You can shake out your hands while you listen.")],
  sleep: [exampleFor("sleep", "You can let your shoulders drop while you listen.")],
};

export default songs;
