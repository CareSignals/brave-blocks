export type EditionPerson = {
  icon: string;
  name: string;
  line: string;
  spoken: string;
};

export type GuideCard = {
  icon: string;
  title: string;
  body: string;
};

export type EditionContent = {
  supportBlocks: Array<{ icon: string; label: string }>;
  meeting: {
    kicker: string;
    heading: string;
    people: EditionPerson[];
    listenLabel: string;
    note: string | null;
  };
  installLink: string;
  installPrivacy: string;
  grownupRouteSpeech: string;
  grownupGateName: string;
  grownupButtonAriaLabel: string;
  grownupButtonTarget: "guide" | "install";
  reviewBanner: { title: string; subtitle: string } | null;
  grownupGuide: {
    title: string;
    subtitle: string;
    kicker: string;
    heading: string;
    checklist: string[];
    checklistNote: string;
    cards: GuideCard[];
    noticeLead: string;
    noticeBody: string;
  } | null;
};
