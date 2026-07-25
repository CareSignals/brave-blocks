const avatars = ["Axo Maxxo", "Capy Bappy", "Dumpling Supreme", "DJ Glorp", "Dragon Bro", "Beat Bot"];

const crew = [
  ["AXO MAXXO", "Glow-mode: ON"],
  ["CAPY BAPPY", "Chill aura: ELITE"],
  ["DUMPLING SUPREME", "Snack-sized courage"],
  ["DJ GLORP", "Slime beat unlocked"],
];

const feelings = [
  ["Happy", "light + bouncy"],
  ["Sad", "heavy + slow"],
  ["Mad", "hot + stompy"],
  ["Worried", "jumpy + buzzy"],
  ["Scared", "shaky + fast"],
  ["Confused", "foggy + unsure"],
  ["Loved", "warm + safe"],
  ["Mixed", "a whole combo"],
];

const bodySpots = [
  ["Head", ["busy", "foggy", "achy"]],
  ["Face", ["hot", "teary", "tight"]],
  ["Chest", ["fast", "tight", "fluttery"]],
  ["Belly", ["butterflies", "achy", "wobbly"]],
  ["Hands", ["fists", "sweaty", "shaky"]],
  ["Legs", ["stompy", "jumpy", "heavy"]],
];

const meetingMoves = [
  "I feel...",
  "I don’t get it.",
  "I need a break.",
  "I don’t know.",
  "Who will you tell?",
  "Not ready yet.",
];

const supportBlocks = [
  "Home",
  "Trusted grown-up",
  "My grown-up",
  "Cozy thing",
  "Animal",
  "School helper",
  "Counselor",
  "My person",
];

const safetyMoves = [
  "Squeeze a pillow",
  "Push the wall",
  "Hold something soft",
  "Build with blocks",
  "Bear walk",
  "Dance break",
  "Shake, then freeze",
  "Walk with a grown-up",
  "Space, please",
  "I need help",
  "Break, please",
  "I am super mad",
  "Get my grown-up",
  "Check for hurts",
  "Help fix it",
  "Try again later",
];

const loot = [
  "Pixel Prism",
  "Pause Wand",
  "Mixed-Feels Potion",
  "No-Cap Shield",
  "Body Compass",
  "Home-Base Buddy",
  "Axo Glow Bubbles",
  "Capy Chill Crown",
  "Dumpling Boost",
  "Glorp Beat Blob",
  "Gentle Hands Glow",
];

const questIntroductions = [
  ["Vibe Mixer", "Tap your whole feeling squad."],
  ["Body Radar", "Your body drops clues. Scan them."],
  ["Dragon Battle", "Slow breath = max shield power."],
  ["Meeting Loadout", "Pack choices. Keep your own words."],
  ["Talk Power-Up", "Boss-level meeting? Choose your move."],
  ["Build Mode", "Stack your support squad."],
  ["Safety Power-Ups", "Huge feeling. Safe body. Both can be true."],
  ["Pixel Parkour", "Jump slime. Grab snacks. Get the W."],
  ["Faith Campfire", "Tap a story. Find a hope gem."],
  ["Grown-up Guide", "Keep the fun child-led and the child’s answers their own."],
];

const pageReadouts = [
  "Welcome back, player. Pick your character. Then pick your next W.",
  "Vibe Mixer. Tap every feeling in your mix.",
  "Body Radar. Tap a place. Then scan a clue.",
  "Dragon Battle. Slow breaths power your shield.",
  "Meeting Loadout. Pack a cozy, choose a signal, and pick how you want to answer.",
  "Talk Power Up. Pick any words that tell the grown-up what you need.",
  "Build Mode. Tap your support blocks.",
  "Safety Power Ups. Pick a safe mission for your hands, body, words, and repairs.",
  "Pixel Parkour. Tap jump before slime or blocks. Then tap go.",
  "Faith Campfire. Tap a Bible story to find a hope gem.",
  "Grown-up guide.",
];

const pauseMoves = [
  "AXO BUBBLES. Slow in. Longer out. No rush.",
  "WALL POWER. Push the wall with safe hands.",
  "GET MY GROWN-UP. Go to your safe grown-up now. You do not have to explain first.",
];

const loadoutLabels = [
  "Soft thing",
  "Slime",
  "Headphones",
  "Drink",
  "Near door",
  "My chair",
  "Near my person",
  "More space",
  "Hand up",
  "Yellow card",
  "Say pause",
  "Look at my person",
];

const people = [
  "ATTORNEY. My job is to listen and explain my role. Ask me what I keep private and what I may share.",
  "SOCIAL WORKER. My job is to check how things are going. Ask me what I write down or share.",
];

const meetingRounds = [
  "Hi! My job is to listen. How are you feeling?",
  "Your brain feels foggy. What move could help?",
  "You want more time. Pick your power move.",
];

const coOpMissions = [
  "Make a feeling face. The other player guesses.",
  "Each player picks one safe move to try.",
  "Build a tiny blanket or pillow base together.",
  "Take turns saying one thing that helps on a hard day.",
  "Do a ten-second freeze dance, then both get cozy.",
];

const stories = [
  ["Jesus + Children", "Jesus made time for children. He showed them they matter and belong.", "I matter."],
  ["The Lost Sheep", "The shepherd looked for one little sheep. Every single one mattered.", "I am worth finding."],
  ["David + Goliath", "David was small. His courage and God’s help were bigger than his fear.", "Small can be brave."],
  ["Noah’s Rainbow", "After a long storm, the rainbow was a sign of hope.", "Hard times can end."],
];

const lines = [
  "Yo, Brave Builder! New quest unlocked. Every feeling is allowed—even the giant, messy ones. You can say it, point, draw, or pass. Gentle hands stay equipped, and your safe grown-ups are on your team. No rush. Choose your next power-up when you’re ready.",
  ...pageReadouts,
  ...questIntroductions.map(([title, subtitle]) => `${title}. ${subtitle}`),
  ...avatars.map((name) => `${name} selected`),
  ...crew.map(([name, line]) => `${name}. ${line}`),
  ...pauseMoves,
  ...feelings.map(([name, clue]) => `${name}. ${clue}.`),
  ...feelings.map(([name]) => name),
  "Wiggle mode. Shake, then freeze.",
  "Cozy mode. Hold something soft.",
  "Pass unlocked. No explaining needed.",
  ...bodySpots.map(([label]) => label),
  ...bodySpots.flatMap(([label, sensations]) => [
    ...sensations.map((sensation) => `${label}: ${sensation}. Clue found.`),
    `${label}: something else. Clue found.`,
  ]),
  "BREATHE IN",
  "HOLD",
  "BLOW OUT",
  "RESET",
  "SHIELD MAXED!",
  "Shield maxed. Huge W.",
  ...loadoutLabels,
  ...people,
  "SAY IT unlocked.",
  "POINT unlocked.",
  "DRAW unlocked.",
  "PASS unlocked.",
  ...meetingMoves,
  "I want to pass for now.",
  "Snack landing pad.",
  "Music landing pad.",
  "Cozy landing pad.",
  "Move landing pad.",
  "Prayer landing pad.",
  ...meetingRounds,
  ...meetingMoves.map((words) => `${words}. Nice move. Your own words have power.`),
  ...supportBlocks,
  "Player turn.",
  "Grown-up turn.",
  ...coOpMissions,
  ...safetyMoves.map((words) => `${words}. Safe move. Huge W.`),
  "Jump ready!",
  "Boink! Tap jump first.",
  "Parkour W. You made it!",
  "Jesus loves me. I am loved on easy days and hard days.",
  ...stories.flatMap(([title, story, gem]) => [
    `${title}. ${story} ${gem}`,
    `${story} ${gem}`,
  ]),
  ...loot.map((name) => `Quest W. You unlocked ${name}.`),
  "Mystery block cracked. Plus twenty five X P. Huge W.",
  "Brave Blocks installed. Huge W.",
];

export const narrationLines = [...new Set(lines)];
