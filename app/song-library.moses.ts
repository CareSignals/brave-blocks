import type { PowerNeedId, SongLibrary, SongTrack } from "./song-library.types";

const approvedPlaylist = {
  title: "Moses’ Jesus Songs",
  artist: "Parent-curated YouTube Music playlist",
  url: "https://music.youtube.com/playlist?list=PLc1GIP9de-As",
  icon: "🎵",
  launchLabel: "Play Moses’ Jesus Songs",
} as const;

function playlistFor(category: PowerNeedId, prompt: string): SongTrack {
  return {
    ...approvedPlaylist,
    id: `moses-jesus-songs-${category}`,
    category,
    prompt,
  };
}

// One parent-curated playlist supports every power lane. Brave Blocks never
// needs to know which track Moses chooses after this external link opens.
const songs: SongLibrary = {
  calm: [playlistFor("calm", "You can take one slow breath while you listen.")],
  brave: [playlistFor("brave", "You can stand tall like a brave warrior.")],
  comfort: [playlistFor("comfort", "You can sit close to a trusted grown-up.")],
  joy: [playlistFor("joy", "You can do a tiny Jesus-song wiggle.")],
  sleep: [playlistFor("sleep", "You can let your shoulders drop while you listen.")],
};

export default songs;
