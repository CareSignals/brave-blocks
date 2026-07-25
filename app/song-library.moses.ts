import type { PowerNeedId, SongLibrary, SongTrack } from "./song-library.types";

const approvedFavorite = {
  title: "Better Is One Day",
  artist: "Boston Church",
  url: "https://www.youtube.com/watch?v=ILEdpepg7D0",
  icon: "🎵",
} as const;

function favoriteFor(category: PowerNeedId, prompt: string): SongTrack {
  return {
    ...approvedFavorite,
    id: `better-is-one-day-${category}`,
    category,
    prompt,
  };
}

// PLACEHOLDER SLOTS: the known family-approved favorite is intentionally
// available in every lane until more of Moses's approved links are added.
const songs: SongLibrary = {
  calm: [favoriteFor("calm", "You can take one slow breath during the chorus.")],
  brave: [favoriteFor("brave", "You can stand tall like a brave warrior.")],
  comfort: [favoriteFor("comfort", "You can sit close to a trusted grown-up.")],
  joy: [favoriteFor("joy", "You can do a tiny Jesus-song wiggle.")],
  sleep: [favoriteFor("sleep", "You can let your shoulders drop while you listen.")],
};

export default songs;
