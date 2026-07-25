declare module "@edition-narration" {
  const narrationIndex: Record<string, string>;
  export default narrationIndex;
}

declare module "@edition-content" {
  const content: import("./edition-content.types").EditionContent;
  export default content;
}

declare module "@active-profile" {
  const profile: import("./profile.types").BraveBlocksProfile;
  export default profile;
}

declare module "@song-library" {
  const songs: import("./song-library.types").SongLibrary;
  export default songs;
}
