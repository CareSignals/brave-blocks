export type PowerNeedId = "calm" | "brave" | "comfort" | "joy" | "sleep";

export type SongTrack = {
  id: string;
  title: string;
  artist: string;
  url: string;
  icon?: string;
  category: PowerNeedId;
  prompt?: string;
};

export type SongLibrary = Record<PowerNeedId, readonly SongTrack[]>;
