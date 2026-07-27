const VALID_PROFILES = new Set(["MOSES", "GENERIC"]);

export function currentProfile() {
  const profile = (process.env.NEXT_PUBLIC_BRAVE_BLOCKS_PROFILE || "GENERIC").trim().toUpperCase();
  if (!VALID_PROFILES.has(profile)) {
    throw new Error(`NEXT_PUBLIC_BRAVE_BLOCKS_PROFILE must be MOSES or GENERIC, received "${profile}".`);
  }
  return profile;
}
