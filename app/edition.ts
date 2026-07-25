export type BraveBlocksEdition = "REVIEW" | "CHILD";

const requestedEdition = process.env.NEXT_PUBLIC_BRAVE_BLOCKS_EDITION?.trim().toUpperCase() || "REVIEW";

if (requestedEdition !== "REVIEW" && requestedEdition !== "CHILD") {
  throw new Error(`NEXT_PUBLIC_BRAVE_BLOCKS_EDITION must be REVIEW or CHILD, received "${requestedEdition}".`);
}

export const BRAVE_BLOCKS_EDITION = requestedEdition as BraveBlocksEdition;
export const IS_REVIEW_EDITION = BRAVE_BLOCKS_EDITION === "REVIEW";
