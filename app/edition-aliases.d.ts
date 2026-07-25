declare module "@edition-narration" {
  const narrationIndex: Record<string, string>;
  export default narrationIndex;
}

declare module "@edition-content" {
  const content: import("./edition-content.types").EditionContent;
  export default content;
}
