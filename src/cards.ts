// Suko o Shot — card deck
// All copy is ORIGINAL. Inspired by the Pinoy "tagay" party-card format,
// reworded from scratch so nothing is lifted verbatim from any existing deck.

export type Category =
  | "pili" // pick / vote someone
  | "ikaw" // you drink
  | "grupo" // a group drinks
  | "laro" // mini-game
  | "quiz" // trivia
  | "wild"; // twists & power cards

export interface Card {
  id: number;
  category: Category;
  title: string;
  body: string;
}

export const CATEGORY_META: Record<
  Category,
  { label: string; color: string; emoji: string }
> = {
  pili: { label: "Pili", color: "#a78bfa", emoji: "👈" },
  ikaw: { label: "Ikaw", color: "#fb7185", emoji: "🥃" },
  grupo: { label: "Grupo", color: "#fbbf24", emoji: "🍻" },
  laro: { label: "Laro", color: "#34d399", emoji: "🎲" },
  quiz: { label: "Quiz", color: "#60a5fa", emoji: "🧠" },
  wild: { label: "Wild", color: "#f472b6", emoji: "⚡" },
};

export const CARDS: Card[] = [
  // ---- PILI (pick / vote) ----
  {
    id: 1,
    category: "pili",
    title: "Halalan ng Puso",
    body: "Iboto ng buong grupo kung sino ang pinaka-malas sa lovelife. Ang panalo, may karapatang pumili ng isang kainuman. Misery loves company.",
  },
  {
    id: 2,
    category: "pili",
    title: "Spotlight",
    body: "Ituro ang pinaka-tahimik ngayong gabi. Magkwento ka ng isang kalokohan mo — o tagay.",
  },
  {
    id: 3,
    category: "pili",
    title: "Karamay",
    body: "Swerte ka, ligtas ka this round! Pero pumili ka ng isang tao na sasalo ng tagay para sa'yo.",
  },
  {
    id: 4,
    category: "pili",
    title: "Pinaka-Cute Rule",
    body: "Laitan lang, walang personalan: iboto kung sino ang pinakamaliit ang tindig. Inom ka, pero cute ka naman.",
  },

  // ---- IKAW (you drink) ----
  {
    id: 5,
    category: "ikaw",
    title: "Plot Twist",
    body: "Akala mo wala? Meron. Solong shot, para sa'yo lang, this round.",
  },
  {
    id: 6,
    category: "ikaw",
    title: "Huli ka, Batang Late",
    body: "Lahat: itaas ang kamay ngayon na. Ang huling tumaas, tagay.",
  },
  {
    id: 7,
    category: "ikaw",
    title: "Bangkrap Check",
    body: "I-check ang pitaka. Walang barya o cash sa loob? Inom para sa kahirapan.",
  },
  {
    id: 8,
    category: "ikaw",
    title: "Last One Standing",
    body: "Tumayo lahat. Ang huling makaupo, shot.",
  },

  // ---- GRUPO (group drinks) ----
  {
    id: 9,
    category: "grupo",
    title: "Boys' Round",
    body: "Lahat ng lalaki sa table — sabay-sabay na tagay. Wala kayong choice.",
  },
  {
    id: 10,
    category: "grupo",
    title: "Girls Run This",
    body: "Lahat ng babae — isang shot para sa girl power.",
  },
  {
    id: 11,
    category: "grupo",
    title: "Solo Squad",
    body: "Lahat ng walang ka-relasyon ngayon, uminom para sa kalayaan.",
  },
  {
    id: 12,
    category: "grupo",
    title: "Naka-cellphone? Inom.",
    body: "Sino mang nakahawak ng phone this exact moment, sabay-sabay na tagay. Bilis tago, gago.",
  },

  // ---- LARO (mini-games) ----
  {
    id: 13,
    category: "laro",
    title: "Alak Alphabet",
    body: "Magbigay ng isang klaseng inumin. Susunod ang katabi, walang ulitan. Sino ang ma-blanko o mag-doble, shot.",
  },
  {
    id: 14,
    category: "laro",
    title: "Word Chain",
    body: "Magsimula sa kahit anong salita. Susunod gamit ang huling letra. Pag na-stuck ka, tagay.",
  },
  {
    id: 15,
    category: "laro",
    title: "Bawal Tumawa",
    body: "Mula ngayon, freeze — bawal ngumiti o tumawa. Unang sumablay, shot.",
  },
  {
    id: 16,
    category: "laro",
    title: "Categories",
    body: "Pumili ng topic (hal. brand ng beer). Paikot, walang ulitan. Sino ang ma-blanko, inom.",
  },
  {
    id: 17,
    category: "laro",
    title: "Thumb Master",
    body: "Kahit kailan ngayong gabi, basta ilagay mo ang hinlalaki sa table. Ang huling gumaya, shot — hangga't may kaya kang lokohin.",
  },

  // ---- QUIZ ----
  {
    id: 18,
    category: "quiz",
    title: "Pop Quiz",
    body: "Sino ang pambansang bayani ng Pilipinas? Tama? Sila ang inom. Mali? Ikaw. Wala kang alam? Doble — at i-Google mo, gago.",
  },
  {
    id: 19,
    category: "quiz",
    title: "Trivia Trap",
    body: "Sino ang nagsabi ng pamosong 'I Shall Return'? Tama, ligtas. Mali o tagal sumagot, shot.",
  },
  {
    id: 20,
    category: "quiz",
    title: "Math Mong Lasing",
    body: "7 x 8 = ? Mali o lagpas 5 segundo, inom. Walang calculator, lasing ka pa.",
  },

  // ---- WILD ----
  {
    id: 21,
    category: "wild",
    title: "Jack en Poy",
    body: "Pumili ng kalaban. Best of three. Ang talo, tagay. Ang panalo, pwedeng mang-asar.",
  },
  {
    id: 22,
    category: "wild",
    title: "Truth Serum",
    body: "Sagutin ng totoo: kailan huli kang nag-text ng ex? Ayaw mong sagutin? Shot.",
  },
  {
    id: 23,
    category: "wild",
    title: "Power Trip",
    body: "Ikaw ang bahala mag-utos ng tagay sa susunod na 2 rounds. Gamitin ng tama ang kapangyarihan.",
  },
  {
    id: 24,
    category: "wild",
    title: "Waterfall",
    body: "Sabay simula ng inom, ikaw ang una. Walang puwedeng huminto hangga't 'di ka tumitigil. Habaan mo, kontrabida.",
  },
  {
    id: 25,
    category: "wild",
    title: "Most Likely To",
    body: "'Most likely to ma-blackout ngayong gabi.' Sabay turo. Pinaka-maraming turo, inom.",
  },
  {
    id: 26,
    category: "wild",
    title: "Never Have I Ever",
    body: "Magsabi ng bagay na 'di mo pa nagagawa. Sino mang nakagawa na, inom. Pag wala, ikaw ang lasing.",
  },
];
