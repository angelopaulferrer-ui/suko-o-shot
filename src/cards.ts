// Suko o Shot — card deck
// All copy is ORIGINAL. Inspired by the Pinoy "tagay" party-card format,
// every concept reworded from scratch so nothing is lifted verbatim from any
// existing deck. No real song lyrics, brand names, or third-party hashtags.

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
  /** Keepable token card (e.g. Free Pass): claimed by a player to spend later. */
  keep?: boolean;
}

export interface CategoryMeta {
  id: Category;
  label: string;
  emoji: string;
  color: string; // neon glow / accent
  deep: string; // deeper shade for gradients
  tag: string; // small uppercase tag shown on the card
}

export const CATEGORIES: Record<Category, CategoryMeta> = {
  pili: { id: "pili", label: "Pili", emoji: "👈", color: "#a78bfa", deep: "#6d28d9", tag: "Iboto" },
  ikaw: { id: "ikaw", label: "Ikaw", emoji: "🥃", color: "#ff6b6b", deep: "#b91c1c", tag: "Solo" },
  grupo: { id: "grupo", label: "Grupo", emoji: "🍻", color: "#fbbf24", deep: "#b45309", tag: "Lahat" },
  laro: { id: "laro", label: "Laro", emoji: "🎲", color: "#34d399", deep: "#047857", tag: "Hamon" },
  quiz: { id: "quiz", label: "Quiz", emoji: "🧠", color: "#60a5fa", deep: "#1d4ed8", tag: "Sagot" },
  wild: { id: "wild", label: "Wild", emoji: "⚡", color: "#f472b6", deep: "#be185d", tag: "Twist" },
};

// Back-compat alias for any older imports.
export const CATEGORY_META = CATEGORIES;

export const CARDS: Card[] = [
  // ============ PILI (vote / pick someone) ============
  {
    id: 1,
    category: "pili",
    title: "Halalan ng Puso",
    body: "Iboto ng buong grupo kung sino ang pinaka-malas sa pag-ibig. Ang nahalal, mamili ng isang kasama sa tagay. Misery loves company.",
  },
  {
    id: 2,
    category: "pili",
    title: "Selfie Royalty",
    body: "Iboto kung sino ang 'di makapag-gym nang walang mirror selfie o vlog. Shot ang nahalal.",
  },
  {
    id: 3,
    category: "pili",
    title: "Magdadiet Ako",
    body: "Iboto kung sino ang laging nagsasabing magdidiet pero hanggang caption lang. Inom siya.",
  },
  {
    id: 4,
    category: "pili",
    title: "New Year, New Me",
    body: "Iboto kung sino ang nangakong mag-gym 'bukas'… limang taon na. Tagay para sa pangarap.",
  },
  {
    id: 5,
    category: "pili",
    title: "Bigatin",
    body: "Iboto kung sino ang pinaka-bibo magpa-cute. Siya ang pipili kung sino ang iinom.",
  },
  {
    id: 6,
    category: "pili",
    title: "Takawan",
    body: "Iboto ang pinaka-matakaw sa table. Lahat iinom maliban sa kanya — panalo siya, this round.",
  },
  {
    id: 7,
    category: "pili",
    title: "Foodie Lord",
    body: "Iboto ang pinaka-mahilig sa bulalo at mga pampataba. Shot siya, bilang parangal.",
  },
  {
    id: 8,
    category: "pili",
    title: "Maliit pero Cute",
    body: "Laitan lang, walang personalan: iboto ang pinakamaliit ang tindig. Inom — pero gwapo/ganda ka naman.",
  },
  {
    id: 9,
    category: "pili",
    title: "Spotlight",
    body: "Ituro ang pinaka-tahimik ngayong gabi. Magkwento ng isang kalokohan mo — o tagay.",
  },
  {
    id: 10,
    category: "pili",
    title: "Kaladkarin",
    body: "Pumili ng isang tropa na sasama sa'yo magshot ngayon. Wala silang choice.",
  },

  // ============ IKAW (you drink) ============
  {
    id: 11,
    category: "ikaw",
    title: "Plot Twist",
    body: "Akala mo ligtas ka? Meron pala. Solong shot, para sa'yo lang.",
  },
  {
    id: 12,
    category: "ikaw",
    title: "That's My Boy",
    body: "Ikaw ang bida this round, idol. Shot ka.",
  },
  {
    id: 13,
    category: "ikaw",
    title: "Showtime",
    body: "This is your show, this is your time — magpasikat ka. Shot na!",
  },
  {
    id: 14,
    category: "ikaw",
    title: "Comfort Room Tax",
    body: "Kung sino ang unang mag-CR, yosi, o vape break — pagbalik, may abang na shot.",
  },
  {
    id: 15,
    category: "ikaw",
    title: "OTW Daw",
    body: "Shot ang pinaka-huling dumating sa inuman. Traffic daw, sus.",
  },
  {
    id: 16,
    category: "ikaw",
    title: "First to Bail",
    body: "Kung sino ang unang umalis ngayong gabi, dalawang shot bago umuwi.",
  },
  {
    id: 17,
    category: "ikaw",
    title: "Paulit-ulit",
    body: "Kung sino ang huling uminom, uminom ulit. Oo, ikaw 'yon.",
  },
  {
    id: 18,
    category: "ikaw",
    title: "May Nagtext",
    body: "May nag-message daw sa'yo. Inom ka muna habang bina-basa.",
  },
  {
    id: 19,
    category: "ikaw",
    title: "Mukhang Uhaw",
    body: "Parang tuyo na ang labi mo, friend. Inom ka muna.",
  },
  {
    id: 20,
    category: "ikaw",
    title: "Bangkrap Check",
    body: "Buksan ang pitaka. Walang cash o barya sa loob? Tagay para sa kahirapan.",
  },
  {
    id: 21,
    category: "ikaw",
    title: "Advanced Mag-isip",
    body: "Sobrang layo na ng plano mo sa buhay. Relax muna. Shot ka.",
  },
  {
    id: 22,
    category: "ikaw",
    title: "Ayaw Ka Naming Suko",
    body: "Susuko ka na? Hindi pwede. Kaya nga — shot ka pa.",
  },
  {
    id: 23,
    category: "ikaw",
    title: "Bagong Birthday",
    body: "Shot ang pinaka-huling nag-celebrate ng birthday. Belated tagay.",
  },

  // ============ GRUPO (a group drinks) ============
  {
    id: 24,
    category: "grupo",
    title: "Boys' Round",
    body: "Lahat ng lalaki sa table, sabay-sabay na tagay. Walang palya.",
  },
  {
    id: 25,
    category: "grupo",
    title: "Girls Run This",
    body: "Lahat ng babae, isang shot para sa girl power. Yeah!",
  },
  {
    id: 26,
    category: "grupo",
    title: "Forever Alone",
    body: "Lahat ng walang jowa, asawa, o ka-date, shot sa pagiging malaya.",
  },
  {
    id: 27,
    category: "grupo",
    title: "May Forever (Daw)",
    body: "Lahat naman ngayon ng may ka-relasyon, shot. Flex tax 'yan.",
  },
  {
    id: 28,
    category: "grupo",
    title: "Networking Night",
    body: "Lahat ng na-recruit na sa 'negosyo', shot — tapos isigaw ang 'PAAAWER!'",
  },
  {
    id: 29,
    category: "grupo",
    title: "MOBA Legends",
    body: "Lahat ng may ranked grind tuwing gabi, shot. Imbes na cheers, sabihin: 'LEGENDARY!'",
  },
  {
    id: 30,
    category: "grupo",
    title: "Phone Patrol",
    body: "Sino mang hawak ang phone exactly ngayon, sabay tagay. Bilis tago — huli na kayo.",
  },
  {
    id: 31,
    category: "grupo",
    title: "Pimple Check",
    body: "Lahat ng may pimple ngayong gabi, iinom. Stress at puyat din 'yan.",
  },
  {
    id: 32,
    category: "grupo",
    title: "Ok ka, Lungs?",
    body: "Lahat ng naninigarilyo o nagva-vape, shot. Patago man o hindi.",
  },
  {
    id: 33,
    category: "grupo",
    title: "Pendong Squad",
    body: "Lahat ng kalbo, panot, o nauubusan na ng buhok, shot. Aerodynamic kayo.",
  },
  {
    id: 34,
    category: "grupo",
    title: "Balbon Alert",
    body: "Lahat ng may bigote, balbas, o balbon, iinom.",
  },
  {
    id: 35,
    category: "grupo",
    title: "Pride Shot",
    body: "Lahat ng LGBTQ+, shot. Slay, mga bading.",
  },
  {
    id: 36,
    category: "grupo",
    title: "Pangalan Match",
    body: "Sino mang may pangalang nagsisimula sa letrang 'J', shot. Walang J? Korni — kaya lahat na lang shot.",
  },

  // ============ LARO (mini-games) ============
  {
    id: 37,
    category: "laro",
    title: "Alak Alphabet",
    body: "Magbigay ng klase ng inumin, susunod ang katabi, walang ulitan. Ma-blanko o mag-doble, shot.",
  },
  {
    id: 38,
    category: "laro",
    title: "Probinsya Mo",
    body: "Pabilisang magbigay ng probinsya sa Pilipinas, paikot. Ma-stuck o umulit, shot.",
  },
  {
    id: 39,
    category: "laro",
    title: "Brand Wars",
    body: "Pumili ng kategorya (kotse, milktea, sapatos). Paikot, walang ulit. Ma-blanko, inom.",
  },
  {
    id: 40,
    category: "laro",
    title: "Hayop na 'To",
    body: "Magbigay ng hayop, paikot — maliban sa ex mo. Ma-stuck o umulit, shot.",
  },
  {
    id: 41,
    category: "laro",
    title: "Estasyon",
    body: "Magpangalan ng MRT o LRT station, paikot. Mali o ma-blanko, tagay.",
  },
  {
    id: 42,
    category: "laro",
    title: "Bahay Kubo",
    body: "Isa-isang magbigay ng gulay mula sa kantang Bahay Kubo, paikot. Unang ma-stuck o umulit, shot.",
  },
  {
    id: 43,
    category: "laro",
    title: "Word Chain",
    body: "Susunod na salita gamit ang huling letra ng nauna. Pag na-stuck ka, tagay.",
  },
  {
    id: 44,
    category: "laro",
    title: "Acronym Lang",
    body: "Magbigay ng acronym at kahulugan nito (hal. 'GG = Good Game'), susunod paikot. Ma-blanko, shot.",
  },
  {
    id: 45,
    category: "laro",
    title: "Dila Twister",
    body: "Sabihin ng pitong beses, mabilis at walang basa: 'Pitumpung putik sa putikan.' Nautal, shot.",
  },
  {
    id: 46,
    category: "laro",
    title: "Bawal Tumawa",
    body: "Freeze mode — bawal ngumiti o tumawa. Unang sumablay, shot.",
  },
  {
    id: 47,
    category: "laro",
    title: "Thumb Master",
    body: "Kahit kailan ngayong gabi, basta ilagay mo ang hinlalaki sa table. Ang huling gumaya, shot.",
  },
  {
    id: 48,
    category: "laro",
    title: "Hum That Tune",
    body: "Humuni ng isang kanta (walang lyrics, melody lang). Sino makahula ng title, pipili ng iinom. Walang nakahula? Ikaw — 3 tries lang.",
  },
  {
    id: 49,
    category: "laro",
    title: "Lip Sync Battle",
    body: "Pumili ng kalaban. Sampung segundong lip sync bawat isa, boohan ng grupo. Ang talo, shot.",
  },
  {
    id: 50,
    category: "laro",
    title: "Titigan",
    body: "Pumili ng kalaban at makipag-titigan. Ang unang kumurap, shot.",
  },
  {
    id: 51,
    category: "laro",
    title: "Budots Break",
    body: "Sumayaw ng budots hanggang umikot ulit sa'yo ang turn. Tumigil ka o ayaw mong gawin, shot.",
  },
  {
    id: 52,
    category: "laro",
    title: "Unggoy Mode",
    body: "Lahat mag-arte parang unggoy. Ang pinaka-walang-kwentang gumalaw, shot. Ayaw sumali kahit isa? Lahat shot.",
  },
  {
    id: 53,
    category: "laro",
    title: "English Only",
    body: "Mula ngayon, English lang hanggang sa turn mo ulit. Ang ma-Tagalog, shot.",
  },
  {
    id: 54,
    category: "laro",
    title: "Hep Hep Hooray",
    body: "Ikaw ang host. Tumayo lahat, gawin ang galaw. Unang magkamali, 'bigyan ng shot!'",
  },
  {
    id: 55,
    category: "laro",
    title: "Tongue Twister 2",
    body: "Pitong beses, walang basa: 'Pitong puting tupa.' Nautal o mali, shot.",
  },

  // ============ QUIZ ============
  {
    id: 56,
    category: "quiz",
    title: "Pop Quiz: Bayani",
    body: "Sino ang pambansang bayani ng Pilipinas? Tama? Sila ang inom. Mali? Ikaw. Wala kang alam? Doble — at i-Google mo, gago.",
  },
  {
    id: 57,
    category: "quiz",
    title: "Trivia: Ako'y Babalik",
    body: "Sino ang nagsabi ng pamosong 'I Shall Return'? Tama, ligtas. Mali o tagal sumagot, shot.",
  },
  {
    id: 58,
    category: "quiz",
    title: "Trivia: Lola Basyang",
    body: "Sino ang tunay na manunulat sa likod ng 'Mga Kuwento ni Lola Basyang'? Mali, shot. (Di mo alam? Google.)",
  },
  {
    id: 59,
    category: "quiz",
    title: "Trivia: Bulkang Mayon",
    body: "Saang probinsya matatagpuan ang Bulkang Mayon? Mali, inom. Tama, ligtas.",
  },
  {
    id: 60,
    category: "quiz",
    title: "Math Mong Lasing",
    body: "7 × 8 = ? Lagpas 5 segundo o mali, inom. Walang calculator — lasing ka pa.",
  },

  // ============ WILD (twists & power cards) ============
  {
    id: 61,
    category: "wild",
    title: "Jack en Poy",
    body: "Pumili ng kalaban, best of three. Ang talo, tagay. Ang panalo, libre mang-asar.",
  },
  {
    id: 62,
    category: "wild",
    title: "Truth Serum",
    body: "Sagutin ng totoo: kailan ka huling nag-stalk ng ex? Ayaw mong sagutin? Shot.",
  },
  {
    id: 63,
    category: "wild",
    title: "Power Trip",
    body: "Gumawa ng bagong batas para sa gabi. Kung sino ang unang lumabag, shot — habang aktibo ang baraha.",
  },
  {
    id: 64,
    category: "wild",
    title: "Waterfall",
    body: "Sabay simula ng inom, ikaw ang una. Walang puwedeng huminto hangga't 'di ka tumitigil. Habaan mo, kontrabida.",
  },
  {
    id: 65,
    category: "wild",
    title: "Most Likely To",
    body: "'Most likely to ma-blackout ngayong gabi.' Sabay turo. Pinaka-maraming turo, inom.",
  },
  {
    id: 66,
    category: "wild",
    title: "Never Have I Ever",
    body: "Magsabi ng bagay na 'di mo pa nagagawa. Sino mang nakagawa na, inom. Pag wala, ikaw ang lasing.",
  },
  {
    id: 67,
    category: "wild",
    title: "Free Pass",
    body: "Gusto kong happy ka. Kunin ang baraha — pwede mong gamitin para iwasan ang isang shot, kahit kailan ngayong gabi.",
    keep: true,
  },
  {
    id: 68,
    category: "wild",
    title: "Hindi pa Suko",
    body: "Mukhang susuko ka na? Kunin 'to. I-save bilang pang-iwas pag pinilit kang uminom mamaya.",
    keep: true,
  },
  {
    id: 69,
    category: "wild",
    title: "Baliktad",
    body: "Baligtarin ang ikot ng bunutan. Ang direksyon niyo, ako na ang bahala.",
  },
  {
    id: 70,
    category: "wild",
    title: "Ipasa ang Sakit",
    body: "Ipasa ang shot mo sa pangatlong tao mula sa'yo. Goodluck sa kanya.",
  },
  {
    id: 71,
    category: "wild",
    title: "Phone Tower",
    body: "Patong-patungin lahat ng phone sa gitna. Unang humawak habang naglalaro, dalawang shot.",
  },
  {
    id: 72,
    category: "wild",
    title: "Iwan Mo Na",
    body: "Kung sino ang unang magpaalam na uuwi, tatlong shot bago umalis. Meeting daw bukas.",
  },
  {
    id: 73,
    category: "wild",
    title: "Nomination Night",
    body: "Mag-nominate ng dalawang tao para sa tig-isang shot. Bahala ka na sa konsensya mo.",
  },
  {
    id: 74,
    category: "wild",
    title: "Post Mo 'Yan",
    body: "Mag-post ng story sa socials na may hashtag #SukoOShot. 'Di mo ginawa? Shot.",
  },
  {
    id: 75,
    category: "wild",
    title: "Ding, Ang Baso",
    body: "Sumigaw sa kasama mong nagsasalin: 'Ding, ang baso… SHOT NA!' Ngayon na, bago ka mahiya.",
  },

  // ============ EXPANSION (cards 76–100) ============

  // ---- PILI ----
  {
    id: 76,
    category: "pili",
    title: "Lagi Late",
    body: "Iboto kung sino ang laging huli sa lakad. Shot — on time ka naman sana sa tagay.",
  },
  {
    id: 77,
    category: "pili",
    title: "Seenzone King",
    body: "Iboto kung sino ang hari ng seenzone at ghosting. Shot siya — walang reply, walang awa.",
  },
  {
    id: 78,
    category: "pili",
    title: "Lasing Drama",
    body: "Iboto kung sino ang pinaka-OA o iyakin kapag lasing. Siya ang pipili kung sino ang iinom.",
  },
  {
    id: 79,
    category: "pili",
    title: "Mababaw Matawa",
    body: "Iboto kung sino ang natatawa kahit walang katuturan. Inom, para may dahilan man lang.",
  },
  {
    id: 80,
    category: "pili",
    title: "Lightweight",
    body: "Iboto kung sino ang pinaka-mahina uminom. Isang shot — go lang, kaya mo 'yan, baby.",
  },

  // ---- IKAW ----
  {
    id: 81,
    category: "ikaw",
    title: "Huling Nag-post",
    body: "Kung sino ang pinaka-huling nag-post sa socials, shot. Active user tax 'yan.",
  },
  {
    id: 82,
    category: "ikaw",
    title: "Low Bat",
    body: "Tingnan ang phone. Sino mang pinaka-mababa ang baterya, shot. Tapos charge ka na.",
  },
  {
    id: 83,
    category: "ikaw",
    title: "Naka-Tsinelas",
    body: "Naka-tsinelas o sandals ka ba ngayon? Kung oo, shot. Sobrang casual mo, pre.",
  },
  {
    id: 84,
    category: "ikaw",
    title: "Ex sa Contacts",
    body: "Naka-save pa ba ang number ng ex mo? Kung oo, shot. Kung deleted na, respect — ligtas ka.",
  },

  // ---- GRUPO ----
  {
    id: 85,
    category: "grupo",
    title: "May Utang",
    body: "Lahat ng may utang sa kasama ngayong gabi, shot. Bayad muna sa konsensya.",
  },
  {
    id: 86,
    category: "grupo",
    title: "Team Itim",
    body: "Lahat ng naka-itim na damit ngayon, shot. Edgy kayo, idol.",
  },
  {
    id: 87,
    category: "grupo",
    title: "Inked",
    body: "Lahat ng may tattoo, shot. Pakita niyo 'yan mamaya, pang-story.",
  },
  {
    id: 88,
    category: "grupo",
    title: "Heartbreak 'Yan",
    body: "Lahat ng nasaktan sa pag-ibig ngayong taon, shot. Cheers sa healing journey.",
  },
  {
    id: 89,
    category: "grupo",
    title: "Working Student",
    body: "Lahat ng working student o nag-aaral pa, shot. Laban lang, future boss.",
  },

  // ---- LARO ----
  {
    id: 90,
    category: "laro",
    title: "Beer Categories",
    body: "Pumili ng kategorya (hal. brand ng beer). Paikot, walang ulit. Ma-blanko, shot.",
  },
  {
    id: 91,
    category: "laro",
    title: "Clap Rhythm",
    body: "Sundan ang clap pattern ng host, dagdagan ng isa paikot. Unang masira ang ritmo, shot.",
  },
  {
    id: 92,
    category: "laro",
    title: "Charades",
    body: "Mag-act ng pelikula o kanta sa loob ng 15 segundo, bawal magsalita. Walang maka-guess, shot ka.",
  },
  {
    id: 93,
    category: "laro",
    title: "Artista Chain",
    body: "Magpalitan ng pangalan ng artista gamit ang huling letra ng nauna. Ma-stuck o umulit, tagay.",
  },

  // ---- QUIZ ----
  {
    id: 94,
    category: "quiz",
    title: "Trivia: Pulo-Pulo",
    body: "Ilang isla mayroon ang Pilipinas? Lapit ka man lang. Sobrang layo ng sagot, shot.",
  },
  {
    id: 95,
    category: "quiz",
    title: "Trivia: Kabisera",
    body: "Ano ang kabisera ng rehiyon ng Bicol? Mali, inom. Tama, ligtas ka.",
  },
  {
    id: 96,
    category: "quiz",
    title: "Spelling Bee",
    body: "I-spell ng tama, walang basa: 'entablado'. Mali, shot. Bonus round: 'kwarentena'.",
  },

  // ---- WILD ----
  {
    id: 97,
    category: "wild",
    title: "Double or Nothing",
    body: "Mag-toss ng barya kasama ng isang kalaban. Ang talo, dalawang shot. Panalo, ligtas pareho.",
  },
  {
    id: 98,
    category: "wild",
    title: "Magpalit Upuan",
    body: "Lahat lumipat ng upuan ngayon na. Ang huling makaupo, shot.",
  },
  {
    id: 99,
    category: "wild",
    title: "Buddy System",
    body: "Pumili ng partner. Hanggang matapos ang susunod na 3 baraha, pareho kayong iinom kapag isa sa inyo ang nabunot.",
  },
  {
    id: 100,
    category: "wild",
    title: "Sabay Tagay",
    body: "Walang pinili, walang pinatawad. Lahat tayo, isang shot. Cheers — Suko o Shot!",
  },
];
