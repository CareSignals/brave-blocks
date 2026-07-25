import type { BraveBlocksProfile } from "./profile.types";

const profile: BraveBlocksProfile = {
  id: "moses",
  modeLabel: "MOSES MODE",
  playerLabel: "MOSES",
  displayName: "Moses",
  avatarIcon: "🐲",
  avatarName: "Dragon Bro",
  stationTitle: "Praise Power-Up",
  stationSubtitle: "Jesus Song Station",
  musicName: "Jesus song",
  stationIntro: "DJ Glorp found power tracks in the galaxy. Moses calls them Jesus songs.",
  favoriteColors: ["#6ef3ff", "#a96fff"],
  favoriteComfortTools: [
    { id: "jesus-songs", icon: "🎵", label: "Jesus songs" },
    { id: "soft-blanket", icon: "🧸", label: "Soft blanket" },
    { id: "pottery", icon: "🎨", label: "Pottery or clay" },
    { id: "snack-water", icon: "🥤", label: "Snack or water" },
    { id: "rock-swing", icon: "🕺", label: "Rock or swing" },
    { id: "near-grownup", icon: "💛", label: "Near my grown-up" },
  ],
  trustedGrownupLabels: ["My grown-up", "My safe person"],
  preferredPhrases: ["I need a minute, bro.", "Not yet is a real answer."],
  animalCompanion: { icon: "🐹", name: "Capy Bappy" },
  easterEggs: [
    { id: "corgi-block", icon: "🐾", title: "RARE CORGI BLOCK", line: "Snuggle buff equipped." },
    { id: "courage-cup", icon: "🏆", title: "LOPSIDED COURAGE CUP", line: "Wobbly cup. Solid courage." },
    { id: "dance-broccoli", icon: "🕺", title: "BROCCOLI GOT MOVES", line: "Tiny veggie. Huge groove." },
  ],
};

export default profile;
