import type { EditionContent } from "./edition-content.types";

const content: EditionContent = {
  supportBlocks: [],
  meeting: {
    kicker: "MEET THE HELPERS",
    heading: "Pick who can help",
    people: [
      {
        icon: "💛",
        name: "TRUSTED GROWN-UP",
        line: "A grown-up who listens.",
        spoken: "Trusted grown-up",
      },
      {
        icon: "🧑",
        name: "MY GROWN-UP",
        line: "A grown-up who helps me.",
        spoken: "My grown-up",
      },
    ],
    listenLabel: "HEAR NAME",
    note: null,
  },
  installLink: "Open the Brave Blocks link.",
  installPrivacy: "Brave Blocks does not save or send the player’s game choices.",
  grownupRouteSpeech: "Grown-up setup.",
  grownupGateName: "Fire Tablet Setup",
  grownupButtonAriaLabel: "Grown-ups: open Fire Tablet setup",
  grownupButtonTarget: "install",
  reviewBanner: null,
  grownupGuide: null,
};

export default content;
