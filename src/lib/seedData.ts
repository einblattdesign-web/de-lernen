import type { PrismaClient } from "@prisma/client";

const CATEGORIES = [
  {
    key: "b1b2_general",
    name: "B1-B2 一般語彙",
    description: "B1〜B2レベルの一般的な単語・語彙",
  },
  {
    key: "art_design",
    name: "美術・デザイン語彙",
    description: "美術・デザイン関係の語彙",
  },
];

const WORDS: Array<{
  category: string;
  german: string;
  englishGloss: string;
  japaneseGloss: string;
  partOfSpeech: string;
  gender?: string;
  pluralForm?: string;
  definition: string;
  examples: Array<{ german: string; englishGloss: string }>;
}> = [
  {
    category: "b1b2_general",
    german: "Erfahrung",
    englishGloss: "experience",
    japaneseGloss: "経験",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Erfahrungen",
    definition: "etwas, das man selbst erlebt oder getan hat und dadurch gelernt hat",
    examples: [
      {
        german: "Sie hat viel Erfahrung in ihrem Beruf.",
        englishGloss: "She has a lot of experience in her profession.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "beeinflussen",
    englishGloss: "to influence",
    japaneseGloss: "影響を与える",
    partOfSpeech: "Verb",
    definition: "eine Wirkung auf jemanden oder etwas haben",
    examples: [
      {
        german: "Das Wetter beeinflusst unsere Stimmung.",
        englishGloss: "The weather influences our mood.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Entscheidung",
    englishGloss: "decision",
    japaneseGloss: "決断、決定",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Entscheidungen",
    definition: "das Ergebnis, wenn man sich zwischen mehreren Möglichkeiten festlegt",
    examples: [
      {
        german: "Das war eine schwierige Entscheidung.",
        englishGloss: "That was a difficult decision.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "sich vorstellen",
    englishGloss: "to imagine / to introduce oneself",
    japaneseGloss: "想像する／自己紹介する",
    partOfSpeech: "Verb (reflexiv)",
    definition: "sich ein Bild von etwas machen, oder sich einer Person bekannt machen",
    examples: [
      {
        german: "Ich kann mir das nicht vorstellen.",
        englishGloss: "I can't imagine that.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Umwelt",
    englishGloss: "environment",
    japaneseGloss: "環境",
    partOfSpeech: "Nomen",
    gender: "die",
    definition: "die Natur und alles, was uns umgibt",
    examples: [
      {
        german: "Wir müssen die Umwelt schützen.",
        englishGloss: "We have to protect the environment.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "vermeiden",
    englishGloss: "to avoid",
    japaneseGloss: "避ける",
    partOfSpeech: "Verb",
    definition: "dafür sorgen, dass etwas nicht passiert",
    examples: [
      {
        german: "Ich versuche, Stress zu vermeiden.",
        englishGloss: "I try to avoid stress.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Entwurf",
    englishGloss: "draft / design",
    japaneseGloss: "下書き、デザイン案",
    partOfSpeech: "Nomen",
    gender: "der",
    pluralForm: "die Entwürfe",
    definition: "eine erste, meist noch nicht fertige Version eines Werkes oder Plans",
    examples: [
      {
        german: "Der Designer zeigte uns seinen ersten Entwurf.",
        englishGloss: "The designer showed us his first draft.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Ausstellung",
    englishGloss: "exhibition",
    japaneseGloss: "展覧会",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Ausstellungen",
    definition: "eine öffentliche Präsentation von Kunstwerken oder Objekten",
    examples: [
      {
        german: "Die Ausstellung zeigt moderne Kunst.",
        englishGloss: "The exhibition shows modern art.",
      },
    ],
  },
  {
    category: "art_design",
    german: "gestalten",
    englishGloss: "to design / to shape",
    japaneseGloss: "デザインする、形作る",
    partOfSpeech: "Verb",
    definition: "etwas nach einem bestimmten Plan formen oder kreativ entwickeln",
    examples: [
      {
        german: "Sie gestaltet das Plakat für die Ausstellung.",
        englishGloss: "She is designing the poster for the exhibition.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Farbgebung",
    englishGloss: "coloring / color scheme",
    japaneseGloss: "配色",
    partOfSpeech: "Nomen",
    gender: "die",
    definition: "die Art und Weise, wie Farben in einem Werk verwendet werden",
    examples: [
      {
        german: "Die Farbgebung des Gemäldes ist sehr kontrastreich.",
        englishGloss: "The painting's color scheme is very high-contrast.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Kunstwerk",
    englishGloss: "artwork",
    japaneseGloss: "美術作品",
    partOfSpeech: "Nomen",
    gender: "das",
    pluralForm: "die Kunstwerke",
    definition: "ein Werk der bildenden Kunst",
    examples: [
      {
        german: "Dieses Kunstwerk stammt aus dem 19. Jahrhundert.",
        englishGloss: "This artwork is from the 19th century.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Schriftart",
    englishGloss: "typeface / font",
    japaneseGloss: "書体、フォント",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Schriftarten",
    definition: "die einheitliche gestalterische Form von Buchstaben",
    examples: [
      {
        german: "Welche Schriftart passt am besten zu diesem Logo?",
        englishGloss: "Which typeface fits this logo best?",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Verantwortung",
    englishGloss: "responsibility",
    japaneseGloss: "責任",
    partOfSpeech: "Nomen",
    gender: "die",
    definition: "die Pflicht, für etwas einzustehen oder es zu erledigen",
    examples: [
      {
        german: "Er trägt die Verantwortung für das ganze Projekt.",
        englishGloss: "He bears responsibility for the whole project.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Möglichkeit",
    englishGloss: "possibility",
    japaneseGloss: "可能性、方法",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Möglichkeiten",
    definition: "eine Chance oder ein Weg, etwas zu tun",
    examples: [
      {
        german: "Es gibt viele Möglichkeiten, Deutsch zu lernen.",
        englishGloss: "There are many ways to learn German.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "bedeuten",
    englishGloss: "to mean",
    japaneseGloss: "意味する",
    partOfSpeech: "Verb",
    definition: "einen bestimmten Sinn haben",
    examples: [
      {
        german: "Was bedeutet dieses Wort?",
        englishGloss: "What does this word mean?",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "sich beschäftigen",
    englishGloss: "to occupy oneself with, deal with",
    japaneseGloss: "取り組む、携わる",
    partOfSpeech: "Verb (reflexiv)",
    definition: "sich mit einem Thema oder einer Aufgabe befassen",
    examples: [
      {
        german: "Sie beschäftigt sich seit Jahren mit moderner Kunst.",
        englishGloss: "She has been dealing with modern art for years.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Gesellschaft",
    englishGloss: "society",
    japaneseGloss: "社会",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Gesellschaften",
    definition: "die Gemeinschaft aller Menschen in einem Land oder einer Gruppe",
    examples: [
      {
        german: "Die Gesellschaft verändert sich ständig.",
        englishGloss: "Society is constantly changing.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "erreichen",
    englishGloss: "to achieve, to reach",
    japaneseGloss: "達成する、到達する",
    partOfSpeech: "Verb",
    definition: "ein Ziel erfolgreich erlangen",
    examples: [
      {
        german: "Er hat sein Ziel erreicht.",
        englishGloss: "He achieved his goal.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Herausforderung",
    englishGloss: "challenge",
    japaneseGloss: "課題、難関",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Herausforderungen",
    definition: "eine schwierige Aufgabe, die Mut oder Können erfordert",
    examples: [
      {
        german: "Das war eine große Herausforderung für uns.",
        englishGloss: "That was a big challenge for us.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "sich engagieren",
    englishGloss: "to get involved, to be committed",
    japaneseGloss: "積極的に関わる",
    partOfSpeech: "Verb (reflexiv)",
    definition: "sich aktiv für eine Sache einsetzen",
    examples: [
      {
        german: "Viele Jugendliche engagieren sich für den Klimaschutz.",
        englishGloss: "Many young people are committed to climate protection.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Beziehung",
    englishGloss: "relationship",
    japaneseGloss: "関係",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Beziehungen",
    definition: "die Verbindung zwischen zwei oder mehr Personen",
    examples: [
      {
        german: "Sie haben eine enge Beziehung zueinander.",
        englishGloss: "They have a close relationship with each other.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "verlangen",
    englishGloss: "to demand, to require",
    japaneseGloss: "要求する",
    partOfSpeech: "Verb",
    definition: "etwas fordern oder erwarten",
    examples: [
      {
        german: "Der Job verlangt viel Geduld.",
        englishGloss: "The job requires a lot of patience.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Absicht",
    englishGloss: "intention",
    japaneseGloss: "意図",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Absichten",
    definition: "das, was jemand vorhat zu tun",
    examples: [
      {
        german: "Ich habe nicht die Absicht, umzuziehen.",
        englishGloss: "I have no intention of moving.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "sich auswirken",
    englishGloss: "to have an effect on, to impact",
    japaneseGloss: "影響を及ぼす",
    partOfSpeech: "Verb (reflexiv)",
    definition: "eine Folge oder Wirkung auf etwas haben",
    examples: [
      {
        german: "Stress wirkt sich negativ auf die Gesundheit aus.",
        englishGloss: "Stress has a negative effect on health.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Wahrnehmung",
    englishGloss: "perception",
    japaneseGloss: "知覚、認識",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Wahrnehmungen",
    definition: "die Art, wie man etwas mit den Sinnen erfasst",
    examples: [
      {
        german: "Die Wahrnehmung von Farben ist bei jedem Menschen unterschiedlich.",
        englishGloss: "The perception of colors differs from person to person.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "begründen",
    englishGloss: "to justify, to give reasons for",
    japaneseGloss: "根拠を示す、理由づける",
    partOfSpeech: "Verb",
    definition: "einen Grund für etwas angeben",
    examples: [
      {
        german: "Kannst du deine Entscheidung begründen?",
        englishGloss: "Can you justify your decision?",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Voraussetzung",
    englishGloss: "precondition, requirement",
    japaneseGloss: "前提条件",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Voraussetzungen",
    definition: "etwas, das erfüllt sein muss, damit etwas anderes möglich ist",
    examples: [
      {
        german: "Gute Deutschkenntnisse sind eine Voraussetzung für den Kurs.",
        englishGloss: "Good German skills are a prerequisite for the course.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "überzeugen",
    englishGloss: "to convince",
    japaneseGloss: "納得させる",
    partOfSpeech: "Verb",
    definition: "jemanden durch Argumente von etwas überzeugen",
    examples: [
      {
        german: "Er konnte mich von seinem Plan überzeugen.",
        englishGloss: "He was able to convince me of his plan.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Zusammenhang",
    englishGloss: "context, connection",
    japaneseGloss: "関連、脈絡",
    partOfSpeech: "Nomen",
    gender: "der",
    pluralForm: "die Zusammenhänge",
    definition: "die Verbindung zwischen verschiedenen Dingen oder Ereignissen",
    examples: [
      {
        german: "Ich verstehe den Zusammenhang nicht.",
        englishGloss: "I don't understand the connection.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "sich vorbereiten",
    englishGloss: "to prepare oneself for",
    japaneseGloss: "準備する",
    partOfSpeech: "Verb (reflexiv)",
    definition: "sich auf etwas Kommendes einstellen",
    examples: [
      {
        german: "Sie bereitet sich auf die Prüfung vor.",
        englishGloss: "She is preparing for the exam.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Wirkung",
    englishGloss: "effect",
    japaneseGloss: "効果、作用",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Wirkungen",
    definition: "das Ergebnis, das etwas verursacht",
    examples: [
      {
        german: "Die Medizin zeigt schnell ihre Wirkung.",
        englishGloss: "The medicine shows its effect quickly.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "verzichten",
    englishGloss: "to do without, to forgo",
    japaneseGloss: "断念する、諦める",
    partOfSpeech: "Verb",
    definition: "bewusst auf etwas nicht zurückgreifen",
    examples: [
      {
        german: "Ich verzichte heute auf Fleisch.",
        englishGloss: "I'm doing without meat today.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Einstellung",
    englishGloss: "attitude",
    japaneseGloss: "考え方、態度",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Einstellungen",
    definition: "die persönliche Haltung gegenüber etwas",
    examples: [
      {
        german: "Seine Einstellung zur Arbeit hat sich verändert.",
        englishGloss: "His attitude towards work has changed.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "betreffen",
    englishGloss: "to concern, to affect",
    japaneseGloss: "関わる、影響する",
    partOfSpeech: "Verb",
    definition: "mit jemandem oder etwas zu tun haben",
    examples: [
      {
        german: "Diese Regel betrifft alle Mitarbeiter.",
        englishGloss: "This rule concerns all employees.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Bedingung",
    englishGloss: "condition",
    japaneseGloss: "条件",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Bedingungen",
    definition: "etwas, das erfüllt sein muss",
    examples: [
      {
        german: "Unter dieser Bedingung stimme ich zu.",
        englishGloss: "I agree under this condition.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "sich anpassen",
    englishGloss: "to adapt to",
    japaneseGloss: "適応する",
    partOfSpeech: "Verb (reflexiv)",
    definition: "sich auf neue Umstände einstellen",
    examples: [
      {
        german: "Man muss sich an das neue Klima anpassen.",
        englishGloss: "One has to adapt to the new climate.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Entwicklung",
    englishGloss: "development",
    japaneseGloss: "発展、発達",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Entwicklungen",
    definition: "der Prozess, durch den sich etwas verändert oder wächst",
    examples: [
      {
        german: "Die technische Entwicklung geht sehr schnell.",
        englishGloss: "Technical development is happening very fast.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "behaupten",
    englishGloss: "to claim, to assert",
    japaneseGloss: "主張する",
    partOfSpeech: "Verb",
    definition: "etwas als wahr darstellen, ohne es zu beweisen",
    examples: [
      {
        german: "Er behauptet, die Wahrheit zu sagen.",
        englishGloss: "He claims to be telling the truth.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Ursache",
    englishGloss: "cause",
    japaneseGloss: "原因",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Ursachen",
    definition: "der Grund, warum etwas passiert",
    examples: [
      {
        german: "Die Ursache des Problems ist noch unklar.",
        englishGloss: "The cause of the problem is still unclear.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "sich verhalten",
    englishGloss: "to behave",
    japaneseGloss: "振る舞う",
    partOfSpeech: "Verb (reflexiv)",
    definition: "sich in einer bestimmten Weise benehmen",
    examples: [
      {
        german: "Er hat sich sehr höflich verhalten.",
        englishGloss: "He behaved very politely.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Auswahl",
    englishGloss: "selection, choice",
    japaneseGloss: "選択(肢)",
    partOfSpeech: "Nomen",
    gender: "die",
    definition: "die Möglichkeit, aus mehreren Dingen zu wählen",
    examples: [
      {
        german: "Der Laden bietet eine große Auswahl an Büchern.",
        englishGloss: "The store offers a large selection of books.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "gelten",
    englishGloss: "to be regarded as, to count as",
    japaneseGloss: "見なされる、通用する",
    partOfSpeech: "Verb",
    definition: "als etwas Bestimmtes angesehen werden",
    examples: [
      {
        german: "Er gilt als einer der besten Ärzte der Stadt.",
        englishGloss: "He is regarded as one of the best doctors in the city.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Perspektive",
    englishGloss: "perspective",
    japaneseGloss: "遠近法、視点",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Perspektiven",
    definition: "die Art, wie ein Raum oder Objekt auf einer Fläche dargestellt wird",
    examples: [
      {
        german: "Der Maler nutzt die Perspektive, um Tiefe zu erzeugen.",
        englishGloss: "The painter uses perspective to create depth.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Komposition",
    englishGloss: "composition",
    japaneseGloss: "構図",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Kompositionen",
    definition: "die Anordnung der Elemente in einem Kunstwerk",
    examples: [
      {
        german: "Die Komposition des Bildes wirkt sehr harmonisch.",
        englishGloss: "The composition of the painting seems very harmonious.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Kontrast",
    englishGloss: "contrast",
    japaneseGloss: "対比、コントラスト",
    partOfSpeech: "Nomen",
    gender: "der",
    pluralForm: "die Kontraste",
    definition: "ein deutlicher Unterschied zwischen zwei Elementen",
    examples: [
      {
        german: "Der Kontrast zwischen Licht und Schatten ist stark.",
        englishGloss: "The contrast between light and shadow is strong.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Skizze",
    englishGloss: "sketch",
    japaneseGloss: "スケッチ、下絵",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Skizzen",
    definition: "eine schnell gezeichnete, vorläufige Darstellung",
    examples: [
      {
        german: "Zuerst macht sie eine Skizze auf Papier.",
        englishGloss: "First she makes a sketch on paper.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Layout",
    englishGloss: "layout",
    japaneseGloss: "レイアウト",
    partOfSpeech: "Nomen",
    gender: "das",
    pluralForm: "die Layouts",
    definition: "die Anordnung von Text und Bildern auf einer Seite",
    examples: [
      {
        german: "Das Layout der Broschüre muss noch überarbeitet werden.",
        englishGloss: "The layout of the brochure still needs to be revised.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Ausdruck",
    englishGloss: "expression",
    japaneseGloss: "表現",
    partOfSpeech: "Nomen",
    gender: "der",
    pluralForm: "die Ausdrücke",
    definition: "die Art, wie ein Gefühl oder eine Idee gezeigt wird",
    examples: [
      {
        german: "Das Gemälde ist ein Ausdruck seiner inneren Gefühle.",
        englishGloss: "The painting is an expression of his inner feelings.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Struktur",
    englishGloss: "structure",
    japaneseGloss: "構造",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Strukturen",
    definition: "der innere Aufbau von etwas",
    examples: [
      {
        german: "Die Struktur des Gebäudes ist sehr modern.",
        englishGloss: "The structure of the building is very modern.",
      },
    ],
  },
  {
    category: "art_design",
    german: "abstrakt",
    englishGloss: "abstract",
    japaneseGloss: "抽象的な",
    partOfSpeech: "Adjektiv",
    definition: "nicht gegenständlich, ohne klare reale Form",
    examples: [
      {
        german: "Sein neuestes Werk ist völlig abstrakt.",
        englishGloss: "His newest work is completely abstract.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Technik",
    englishGloss: "technique",
    japaneseGloss: "技法、技術",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Techniken",
    definition: "die Methode, mit der ein Kunstwerk hergestellt wird",
    examples: [
      {
        german: "Er beherrscht verschiedene Techniken der Malerei.",
        englishGloss: "He masters various painting techniques.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Material",
    englishGloss: "material",
    japaneseGloss: "素材、材料",
    partOfSpeech: "Nomen",
    gender: "das",
    pluralForm: "die Materialien",
    definition: "der Stoff, aus dem etwas hergestellt wird",
    examples: [
      {
        german: "Für die Skulptur wurde ungewöhnliches Material verwendet.",
        englishGloss: "Unusual material was used for the sculpture.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Galerie",
    englishGloss: "gallery",
    japaneseGloss: "画廊、ギャラリー",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Galerien",
    definition: "ein Ort, an dem Kunstwerke ausgestellt und verkauft werden",
    examples: [
      {
        german: "Die Galerie zeigt Werke junger Künstler.",
        englishGloss: "The gallery shows works by young artists.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Rahmen",
    englishGloss: "frame",
    japaneseGloss: "額縁、枠",
    partOfSpeech: "Nomen",
    gender: "der",
    pluralForm: "die Rahmen",
    definition: "die Umrandung, die ein Bild einfasst",
    examples: [
      {
        german: "Der Rahmen passt perfekt zum Gemälde.",
        englishGloss: "The frame fits the painting perfectly.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Oberfläche",
    englishGloss: "surface",
    japaneseGloss: "表面",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Oberflächen",
    definition: "die äußere Schicht eines Objekts",
    examples: [
      {
        german: "Die Oberfläche der Skulptur fühlt sich glatt an.",
        englishGloss: "The surface of the sculpture feels smooth.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Muster",
    englishGloss: "pattern",
    japaneseGloss: "模様、パターン",
    partOfSpeech: "Nomen",
    gender: "das",
    pluralForm: "die Muster",
    definition: "eine sich wiederholende Anordnung von Formen oder Farben",
    examples: [
      {
        german: "Der Stoff hat ein auffälliges Muster.",
        englishGloss: "The fabric has a striking pattern.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Symmetrie",
    englishGloss: "symmetry",
    japaneseGloss: "対称性",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Symmetrien",
    definition: "die gleichmäßige Anordnung von Formen auf beiden Seiten",
    examples: [
      {
        german: "Die Symmetrie der Fassade beeindruckt viele Besucher.",
        englishGloss: "The symmetry of the facade impresses many visitors.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Illustration",
    englishGloss: "illustration",
    japaneseGloss: "イラスト、挿絵",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Illustrationen",
    definition: "ein Bild, das einen Text ergänzt oder erklärt",
    examples: [
      {
        german: "Das Kinderbuch enthält viele bunte Illustrationen.",
        englishGloss: "The children's book contains many colorful illustrations.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Motiv",
    englishGloss: "motif, subject",
    japaneseGloss: "モチーフ、題材",
    partOfSpeech: "Nomen",
    gender: "das",
    pluralForm: "die Motive",
    definition: "das zentrale Thema oder Bildelement eines Kunstwerks",
    examples: [
      {
        german: "Blumen sind ein beliebtes Motiv in der Malerei.",
        englishGloss: "Flowers are a popular motif in painting.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Ästhetik",
    englishGloss: "aesthetics",
    japaneseGloss: "美学",
    partOfSpeech: "Nomen",
    gender: "die",
    definition: "die Lehre vom Schönen, oder das Empfinden für Schönheit",
    examples: [
      {
        german: "Die Ästhetik des Produkts spielt eine große Rolle.",
        englishGloss: "The aesthetics of the product play a major role.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Betrachter",
    englishGloss: "viewer, observer",
    japaneseGloss: "鑑賞者、観察者",
    partOfSpeech: "Nomen",
    gender: "der",
    pluralForm: "die Betrachter",
    definition: "eine Person, die ein Kunstwerk anschaut",
    examples: [
      {
        german: "Das Gemälde lädt den Betrachter zum Nachdenken ein.",
        englishGloss: "The painting invites the viewer to reflect.",
      },
    ],
  },
  {
    category: "art_design",
    german: "skizzieren",
    englishGloss: "to sketch",
    japaneseGloss: "スケッチする、下描きする",
    partOfSpeech: "Verb",
    definition: "eine erste, einfache Zeichnung von etwas machen",
    examples: [
      {
        german: "Der Architekt skizziert seine Ideen auf Papier.",
        englishGloss: "The architect sketches his ideas on paper.",
      },
    ],
  },
  {
    category: "art_design",
    german: "inspirieren",
    englishGloss: "to inspire",
    japaneseGloss: "インスピレーションを与える",
    partOfSpeech: "Verb",
    definition: "jemanden zu einer kreativen Idee anregen",
    examples: [
      {
        german: "Die Natur inspiriert viele Künstler.",
        englishGloss: "Nature inspires many artists.",
      },
    ],
  },
  {
    category: "art_design",
    german: "entwerfen",
    englishGloss: "to design, to draft",
    japaneseGloss: "デザインする、設計する",
    partOfSpeech: "Verb",
    definition: "einen Plan oder eine erste Version von etwas erstellen",
    examples: [
      {
        german: "Sie entwirft Kleidung für eine bekannte Marke.",
        englishGloss: "She designs clothing for a well-known brand.",
      },
    ],
  },
  {
    category: "art_design",
    german: "anordnen",
    englishGloss: "to arrange",
    japaneseGloss: "配置する",
    partOfSpeech: "Verb",
    definition: "Dinge in eine bestimmte Ordnung bringen",
    examples: [
      {
        german: "Der Designer ordnet die Elemente neu an.",
        englishGloss: "The designer rearranges the elements.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Blickfang",
    englishGloss: "eye-catcher",
    japaneseGloss: "目を引くもの",
    partOfSpeech: "Nomen",
    gender: "der",
    pluralForm: "die Blickfänge",
    definition: "etwas, das sofort die Aufmerksamkeit auf sich zieht",
    examples: [
      {
        german: "Die rote Tür ist der Blickfang der Fassade.",
        englishGloss: "The red door is the eye-catcher of the facade.",
      },
    ],
  },
  {
    category: "art_design",
    german: "harmonisch",
    englishGloss: "harmonious",
    japaneseGloss: "調和のとれた",
    partOfSpeech: "Adjektiv",
    definition: "angenehm und ausgewogen wirkend",
    examples: [
      {
        german: "Die Farben wirken sehr harmonisch zusammen.",
        englishGloss: "The colors look very harmonious together.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Stil",
    englishGloss: "style",
    japaneseGloss: "様式、スタイル",
    partOfSpeech: "Nomen",
    gender: "der",
    pluralForm: "die Stile",
    definition: "die charakteristische Art, wie etwas gestaltet ist",
    examples: [
      {
        german: "Der Stil dieses Gebäudes ist typisch für die 1920er Jahre.",
        englishGloss: "The style of this building is typical of the 1920s.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Vorbild",
    englishGloss: "role model, template",
    japaneseGloss: "手本、模範",
    partOfSpeech: "Nomen",
    gender: "das",
    pluralForm: "die Vorbilder",
    definition: "etwas oder jemand, an dem man sich orientiert",
    examples: [
      {
        german: "Alte Meister dienen ihm als Vorbild.",
        englishGloss: "Old masters serve as his role model.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Textur",
    englishGloss: "texture",
    japaneseGloss: "質感、テクスチャ",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Texturen",
    definition: "die fühlbare oder sichtbare Beschaffenheit einer Oberfläche",
    examples: [
      {
        german: "Die Textur der Leinwand ist grob.",
        englishGloss: "The texture of the canvas is rough.",
      },
    ],
  },
  {
    category: "art_design",
    german: "zeitgenössisch",
    englishGloss: "contemporary",
    japaneseGloss: "現代の、同時代の",
    partOfSpeech: "Adjektiv",
    definition: "der Gegenwart entsprechend, modern",
    examples: [
      {
        german: "Das Museum sammelt zeitgenössische Kunst.",
        englishGloss: "The museum collects contemporary art.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Fähigkeit",
    englishGloss: "ability, skill",
    japaneseGloss: "能力",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Fähigkeiten",
    definition: "die Kompetenz, etwas gut zu können",
    examples: [
      {
        german: "Er hat die Fähigkeit, gut zuzuhören.",
        englishGloss: "He has the ability to listen well.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "sich bemühen",
    englishGloss: "to make an effort, to try hard",
    japaneseGloss: "努力する",
    partOfSpeech: "Verb (reflexiv)",
    definition: "sich anstrengen, um ein Ziel zu erreichen",
    examples: [
      {
        german: "Sie bemüht sich, pünktlich zu sein.",
        englishGloss: "She makes an effort to be on time.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Rücksicht",
    englishGloss: "consideration, regard",
    japaneseGloss: "配慮",
    partOfSpeech: "Nomen",
    gender: "die",
    definition: "das Verhalten, andere nicht zu stören oder zu verletzen",
    examples: [
      {
        german: "Man sollte auf ältere Menschen Rücksicht nehmen.",
        englishGloss: "One should show consideration for older people.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "beeindrucken",
    englishGloss: "to impress",
    japaneseGloss: "感銘を与える",
    partOfSpeech: "Verb",
    definition: "einen starken positiven Eindruck hinterlassen",
    examples: [
      {
        german: "Der Vortrag hat alle beeindruckt.",
        englishGloss: "The talk impressed everyone.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Neugier",
    englishGloss: "curiosity",
    japaneseGloss: "好奇心",
    partOfSpeech: "Nomen",
    gender: "die",
    definition: "der Wunsch, etwas Neues zu erfahren",
    examples: [
      {
        german: "Kinder haben oft große Neugier.",
        englishGloss: "Children often have great curiosity.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "vertrauen",
    englishGloss: "to trust",
    japaneseGloss: "信頼する",
    partOfSpeech: "Verb",
    definition: "fest davon überzeugt sein, dass jemand ehrlich ist",
    examples: [
      {
        german: "Ich vertraue meinen Freunden vollkommen.",
        englishGloss: "I trust my friends completely.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Erwartung",
    englishGloss: "expectation",
    japaneseGloss: "期待",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Erwartungen",
    definition: "das, was man von etwas oder jemandem erhofft",
    examples: [
      {
        german: "Das Konzert hat meine Erwartungen übertroffen.",
        englishGloss: "The concert exceeded my expectations.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "sich lohnen",
    englishGloss: "to be worth it",
    japaneseGloss: "割に合う、価値がある",
    partOfSpeech: "Verb (reflexiv)",
    definition: "einen positiven Nutzen bringen, der die Mühe wert ist",
    examples: [
      {
        german: "Es lohnt sich, früh aufzustehen.",
        englishGloss: "It's worth getting up early.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Belastung",
    englishGloss: "burden, strain",
    japaneseGloss: "負担",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Belastungen",
    definition: "etwas, das körperlich oder seelisch anstrengend ist",
    examples: [
      {
        german: "Die Arbeit ist eine große Belastung für ihn.",
        englishGloss: "The work is a great burden for him.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "verfügen",
    englishGloss: "to have at one's disposal",
    japaneseGloss: "有する、持ち合わせる",
    partOfSpeech: "Verb",
    definition: "etwas besitzen oder zur Verfügung haben",
    examples: [
      {
        german: "Sie verfügt über viel Erfahrung im Ausland.",
        englishGloss: "She has a lot of experience abroad at her disposal.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Gewohnheit",
    englishGloss: "habit",
    japaneseGloss: "習慣",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Gewohnheiten",
    definition: "etwas, das man regelmäßig und automatisch tut",
    examples: [
      {
        german: "Rauchen ist eine schwer zu ändernde Gewohnheit.",
        englishGloss: "Smoking is a habit that's hard to change.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "nachvollziehen",
    englishGloss: "to comprehend, to understand",
    japaneseGloss: "理解する、納得する",
    partOfSpeech: "Verb",
    definition: "die Gedanken oder Handlungen eines anderen verstehen können",
    examples: [
      {
        german: "Ich kann seine Entscheidung nicht nachvollziehen.",
        englishGloss: "I can't comprehend his decision.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Grundlage",
    englishGloss: "basis, foundation",
    japaneseGloss: "基盤、基礎",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Grundlagen",
    definition: "das, worauf etwas aufgebaut ist",
    examples: [
      {
        german: "Vertrauen ist die Grundlage jeder Beziehung.",
        englishGloss: "Trust is the foundation of every relationship.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "verzögern",
    englishGloss: "to delay",
    japaneseGloss: "遅らせる",
    partOfSpeech: "Verb",
    definition: "etwas später als geplant stattfinden lassen",
    examples: [
      {
        german: "Der Flug hat sich um zwei Stunden verzögert.",
        englishGloss: "The flight was delayed by two hours.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Vielfalt",
    englishGloss: "diversity, variety",
    japaneseGloss: "多様性",
    partOfSpeech: "Nomen",
    gender: "die",
    definition: "das Vorhandensein vieler unterschiedlicher Arten",
    examples: [
      {
        german: "Die Vielfalt der Kulturen macht die Stadt interessant.",
        englishGloss: "The diversity of cultures makes the city interesting.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "sich weigern",
    englishGloss: "to refuse",
    japaneseGloss: "拒否する",
    partOfSpeech: "Verb (reflexiv)",
    definition: "etwas nicht tun wollen",
    examples: [
      {
        german: "Er weigert sich, die Regeln zu akzeptieren.",
        englishGloss: "He refuses to accept the rules.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Vorteil",
    englishGloss: "advantage",
    japaneseGloss: "利点",
    partOfSpeech: "Nomen",
    gender: "der",
    pluralForm: "die Vorteile",
    definition: "ein positiver Aspekt gegenüber anderen Möglichkeiten",
    examples: [
      {
        german: "Homeoffice hat viele Vorteile.",
        englishGloss: "Working from home has many advantages.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Nachteil",
    englishGloss: "disadvantage",
    japaneseGloss: "欠点",
    partOfSpeech: "Nomen",
    gender: "der",
    pluralForm: "die Nachteile",
    definition: "ein negativer Aspekt gegenüber anderen Möglichkeiten",
    examples: [
      {
        german: "Jede Lösung hat auch Nachteile.",
        englishGloss: "Every solution also has disadvantages.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "sich einigen",
    englishGloss: "to reach an agreement",
    japaneseGloss: "合意する",
    partOfSpeech: "Verb (reflexiv)",
    definition: "nach einer Diskussion zu einer gemeinsamen Entscheidung kommen",
    examples: [
      {
        german: "Die beiden Firmen haben sich auf einen Preis geeinigt.",
        englishGloss: "The two companies agreed on a price.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Ausnahme",
    englishGloss: "exception",
    japaneseGloss: "例外",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Ausnahmen",
    definition: "ein Fall, der von der Regel abweicht",
    examples: [
      {
        german: "Diese Regel hat keine Ausnahme.",
        englishGloss: "This rule has no exception.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "bevorzugen",
    englishGloss: "to prefer",
    japaneseGloss: "好む",
    partOfSpeech: "Verb",
    definition: "etwas lieber mögen als etwas anderes",
    examples: [
      {
        german: "Ich bevorzuge Tee gegenüber Kaffee.",
        englishGloss: "I prefer tea over coffee.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Toleranz",
    englishGloss: "tolerance",
    japaneseGloss: "寛容",
    partOfSpeech: "Nomen",
    gender: "die",
    definition: "die Bereitschaft, andere Meinungen oder Lebensweisen zu akzeptieren",
    examples: [
      {
        german: "Toleranz ist wichtig für ein friedliches Zusammenleben.",
        englishGloss: "Tolerance is important for peaceful coexistence.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "sich beklagen",
    englishGloss: "to complain about",
    japaneseGloss: "不満を言う",
    partOfSpeech: "Verb (reflexiv)",
    definition: "seine Unzufriedenheit über etwas ausdrücken",
    examples: [
      {
        german: "Er beklagt sich ständig über das Wetter.",
        englishGloss: "He constantly complains about the weather.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Erleichterung",
    englishGloss: "relief",
    japaneseGloss: "安心、安堵",
    partOfSpeech: "Nomen",
    gender: "die",
    definition: "das Gefühl, wenn eine Belastung wegfällt",
    examples: [
      {
        german: "Nach der Prüfung spürte sie große Erleichterung.",
        englishGloss: "After the exam she felt great relief.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "sich widersprechen",
    englishGloss: "to contradict oneself, to contradict each other",
    japaneseGloss: "矛盾する",
    partOfSpeech: "Verb (reflexiv)",
    definition: "etwas sagen, das im Gegensatz zu etwas anderem steht",
    examples: [
      {
        german: "Seine Aussagen widersprechen sich.",
        englishGloss: "His statements contradict each other.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Konsequenz",
    englishGloss: "consequence",
    japaneseGloss: "結果、影響",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Konsequenzen",
    definition: "die Folge einer Handlung oder Entscheidung",
    examples: [
      {
        german: "Jede Entscheidung hat Konsequenzen.",
        englishGloss: "Every decision has consequences.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "andeuten",
    englishGloss: "to hint, to imply",
    japaneseGloss: "ほのめかす",
    partOfSpeech: "Verb",
    definition: "etwas indirekt zu verstehen geben",
    examples: [
      {
        german: "Sie deutete an, dass sie kündigen möchte.",
        englishGloss: "She hinted that she wants to quit.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Erkenntnis",
    englishGloss: "insight, realization",
    japaneseGloss: "認識、洞察",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Erkenntnisse",
    definition: "neues Wissen oder Verständnis, das man gewonnen hat",
    examples: [
      {
        german: "Diese Erkenntnis hat sein Leben verändert.",
        englishGloss: "This insight changed his life.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "verzeihen",
    englishGloss: "to forgive",
    japaneseGloss: "許す",
    partOfSpeech: "Verb",
    definition: "jemandem einen Fehler nicht mehr übelnehmen",
    examples: [
      {
        german: "Ich habe ihm seinen Fehler längst verziehen.",
        englishGloss: "I forgave him for his mistake long ago.",
      },
    ],
  },
  {
    category: "b1b2_general",
    german: "Selbstständigkeit",
    englishGloss: "independence, self-reliance",
    japaneseGloss: "自立",
    partOfSpeech: "Nomen",
    gender: "die",
    definition: "die Fähigkeit, ohne Hilfe anderer zurechtzukommen",
    examples: [
      {
        german: "Kinder lernen früh Selbstständigkeit.",
        englishGloss: "Children learn independence early.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Farbpalette",
    englishGloss: "color palette",
    japaneseGloss: "配色、カラーパレット",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Farbpaletten",
    definition: "die Auswahl an Farben, die in einem Werk verwendet werden",
    examples: [
      {
        german: "Die Farbpalette des Films wirkt sehr warm.",
        englishGloss: "The film's color palette feels very warm.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Pinsel",
    englishGloss: "paintbrush",
    japaneseGloss: "筆、ブラシ",
    partOfSpeech: "Nomen",
    gender: "der",
    pluralForm: "die Pinsel",
    definition: "ein Werkzeug zum Auftragen von Farbe",
    examples: [
      {
        german: "Sie reinigt ihre Pinsel nach jeder Sitzung.",
        englishGloss: "She cleans her brushes after every session.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Leinwand",
    englishGloss: "canvas",
    japaneseGloss: "キャンバス",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Leinwände",
    definition: "der Stoff, auf dem ein Gemälde gemalt wird",
    examples: [
      {
        german: "Der Künstler spannt eine neue Leinwand auf.",
        englishGloss: "The artist stretches a new canvas.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Bildhauer",
    englishGloss: "sculptor",
    japaneseGloss: "彫刻家",
    partOfSpeech: "Nomen",
    gender: "der",
    pluralForm: "die Bildhauer",
    definition: "ein Künstler, der Skulpturen herstellt",
    examples: [
      {
        german: "Der Bildhauer arbeitet seit Wochen an der Statue.",
        englishGloss: "The sculptor has been working on the statue for weeks.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Skulptur",
    englishGloss: "sculpture",
    japaneseGloss: "彫刻",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Skulpturen",
    definition: "ein dreidimensionales Kunstwerk",
    examples: [
      {
        german: "Die Skulptur steht mitten im Park.",
        englishGloss: "The sculpture stands in the middle of the park.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Handwerk",
    englishGloss: "craft, craftsmanship",
    japaneseGloss: "手工芸、職人技",
    partOfSpeech: "Nomen",
    gender: "das",
    definition: "eine praktische, oft manuelle Fertigkeit",
    examples: [
      {
        german: "Möbelbau ist ein traditionelles Handwerk.",
        englishGloss: "Furniture making is a traditional craft.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Vorlage",
    englishGloss: "template, model",
    japaneseGloss: "ひな形、テンプレート",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Vorlagen",
    definition: "ein Muster, nach dem etwas gestaltet wird",
    examples: [
      {
        german: "Der Designer nutzt eine Vorlage für das Cover.",
        englishGloss: "The designer uses a template for the cover.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Konzept",
    englishGloss: "concept",
    japaneseGloss: "コンセプト",
    partOfSpeech: "Nomen",
    gender: "das",
    pluralForm: "die Konzepte",
    definition: "die grundlegende Idee hinter einem Projekt",
    examples: [
      {
        german: "Das Konzept der Ausstellung ist noch nicht fertig.",
        englishGloss: "The concept for the exhibition isn't finished yet.",
      },
    ],
  },
  {
    category: "art_design",
    german: "verfeinern",
    englishGloss: "to refine",
    japaneseGloss: "洗練させる",
    partOfSpeech: "Verb",
    definition: "etwas durch kleine Änderungen verbessern",
    examples: [
      {
        german: "Sie verfeinert ihre Technik von Jahr zu Jahr.",
        englishGloss: "She refines her technique year by year.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Anordnung",
    englishGloss: "arrangement",
    japaneseGloss: "配置",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Anordnungen",
    definition: "die Art, wie Elemente platziert sind",
    examples: [
      {
        german: "Die Anordnung der Möbel wirkt sehr durchdacht.",
        englishGloss: "The arrangement of the furniture seems very thought-out.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Kreativität",
    englishGloss: "creativity",
    japaneseGloss: "創造性",
    partOfSpeech: "Nomen",
    gender: "die",
    definition: "die Fähigkeit, neue und originelle Ideen zu entwickeln",
    examples: [
      {
        german: "Dieser Beruf erfordert viel Kreativität.",
        englishGloss: "This profession requires a lot of creativity.",
      },
    ],
  },
  {
    category: "art_design",
    german: "originell",
    englishGloss: "original",
    japaneseGloss: "独創的な",
    partOfSpeech: "Adjektiv",
    definition: "neu und einzigartig, nicht kopiert",
    examples: [
      {
        german: "Ihre Idee ist wirklich originell.",
        englishGloss: "Her idea is really original.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Formgebung",
    englishGloss: "shaping, design of form",
    japaneseGloss: "造形",
    partOfSpeech: "Nomen",
    gender: "die",
    definition: "die Art, wie einem Objekt seine Form gegeben wird",
    examples: [
      {
        german: "Die Formgebung der Vase ist sehr ungewöhnlich.",
        englishGloss: "The shaping of the vase is very unusual.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Eindruck",
    englishGloss: "impression",
    japaneseGloss: "印象",
    partOfSpeech: "Nomen",
    gender: "der",
    pluralForm: "die Eindrücke",
    definition: "die Wirkung, die etwas auf jemanden hat",
    examples: [
      {
        german: "Das Bild hinterlässt einen starken Eindruck.",
        englishGloss: "The picture leaves a strong impression.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Farbverlauf",
    englishGloss: "gradient",
    japaneseGloss: "グラデーション",
    partOfSpeech: "Nomen",
    gender: "der",
    pluralForm: "die Farbverläufe",
    definition: "ein weicher Übergang zwischen mehreren Farben",
    examples: [
      {
        german: "Das Poster hat einen bunten Farbverlauf.",
        englishGloss: "The poster has a colorful gradient.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Hintergrund",
    englishGloss: "background",
    japaneseGloss: "背景",
    partOfSpeech: "Nomen",
    gender: "der",
    pluralForm: "die Hintergründe",
    definition: "der hintere Teil eines Bildes, hinter dem Hauptmotiv",
    examples: [
      {
        german: "Der Hintergrund des Fotos ist unscharf.",
        englishGloss: "The background of the photo is blurred.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Vordergrund",
    englishGloss: "foreground",
    japaneseGloss: "前景",
    partOfSpeech: "Nomen",
    gender: "der",
    pluralForm: "die Vordergründe",
    definition: "der vordere, meist wichtigste Teil eines Bildes",
    examples: [
      {
        german: "Im Vordergrund sieht man eine alte Kirche.",
        englishGloss: "In the foreground you can see an old church.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Ornament",
    englishGloss: "ornament, decorative pattern",
    japaneseGloss: "装飾模様",
    partOfSpeech: "Nomen",
    gender: "das",
    pluralForm: "die Ornamente",
    definition: "ein dekoratives Muster ohne praktischen Zweck",
    examples: [
      {
        german: "Die Fassade ist mit filigranen Ornamenten verziert.",
        englishGloss: "The facade is decorated with delicate ornaments.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Proportion",
    englishGloss: "proportion",
    japaneseGloss: "比率、プロポーション",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Proportionen",
    definition: "das Größenverhältnis zwischen einzelnen Teilen",
    examples: [
      {
        german: "Die Proportionen der Figur wirken realistisch.",
        englishGloss: "The proportions of the figure look realistic.",
      },
    ],
  },
  {
    category: "art_design",
    german: "plastisch",
    englishGloss: "three-dimensional, plastic (in the artistic sense)",
    japaneseGloss: "立体的な",
    partOfSpeech: "Adjektiv",
    definition: "räumlich wirkend, wie eine Skulptur",
    examples: [
      {
        german: "Das Relief wirkt sehr plastisch.",
        englishGloss: "The relief looks very three-dimensional.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Feinschliff",
    englishGloss: "finishing touches",
    japaneseGloss: "仕上げ",
    partOfSpeech: "Nomen",
    gender: "der",
    definition: "die letzten, sorgfältigen Verbesserungen an einem Werk",
    examples: [
      {
        german: "Das Projekt braucht noch etwas Feinschliff.",
        englishGloss: "The project still needs some finishing touches.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Werkzeug",
    englishGloss: "tool",
    japaneseGloss: "道具",
    partOfSpeech: "Nomen",
    gender: "das",
    pluralForm: "die Werkzeuge",
    definition: "ein Gegenstand, der zum Arbeiten benutzt wird",
    examples: [
      {
        german: "Jeder Handwerker hat sein eigenes Werkzeug.",
        englishGloss: "Every craftsman has his own tools.",
      },
    ],
  },
  {
    category: "art_design",
    german: "anfertigen",
    englishGloss: "to produce, to make",
    japaneseGloss: "製作する",
    partOfSpeech: "Verb",
    definition: "etwas sorgfältig herstellen",
    examples: [
      {
        german: "Der Schmied fertigt jedes Stück von Hand an.",
        englishGloss: "The blacksmith produces every piece by hand.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Vision",
    englishGloss: "vision",
    japaneseGloss: "ビジョン、構想",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Visionen",
    definition: "eine kreative Idee oder Vorstellung von der Zukunft",
    examples: [
      {
        german: "Der Architekt hat eine klare Vision für das Gebäude.",
        englishGloss: "The architect has a clear vision for the building.",
      },
    ],
  },
  {
    category: "art_design",
    german: "umsetzen",
    englishGloss: "to implement, to realize",
    japaneseGloss: "実現する",
    partOfSpeech: "Verb",
    definition: "eine Idee in die Praxis bringen",
    examples: [
      {
        german: "Es war schwierig, die Idee umzusetzen.",
        englishGloss: "It was difficult to implement the idea.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Blickwinkel",
    englishGloss: "point of view, angle",
    japaneseGloss: "視点、アングル",
    partOfSpeech: "Nomen",
    gender: "der",
    pluralForm: "die Blickwinkel",
    definition: "die Perspektive, aus der man etwas betrachtet",
    examples: [
      {
        german: "Aus diesem Blickwinkel sieht das Gebäude anders aus.",
        englishGloss: "From this angle the building looks different.",
      },
    ],
  },
  {
    category: "art_design",
    german: "minimalistisch",
    englishGloss: "minimalist",
    japaneseGloss: "ミニマルな",
    partOfSpeech: "Adjektiv",
    definition: "auf das Wesentliche reduziert, schlicht",
    examples: [
      {
        german: "Ihr Wohnzimmer ist sehr minimalistisch eingerichtet.",
        englishGloss: "Her living room is furnished in a very minimalist way.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Verzierung",
    englishGloss: "decoration, embellishment",
    japaneseGloss: "装飾",
    partOfSpeech: "Nomen",
    gender: "die",
    pluralForm: "die Verzierungen",
    definition: "ein zusätzliches Element, das etwas schmückt",
    examples: [
      {
        german: "Die Torte hat aufwendige Verzierungen.",
        englishGloss: "The cake has elaborate decorations.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Farbton",
    englishGloss: "shade, hue",
    japaneseGloss: "色合い",
    partOfSpeech: "Nomen",
    gender: "der",
    pluralForm: "die Farbtöne",
    definition: "eine bestimmte Variante einer Farbe",
    examples: [
      {
        german: "Sie mischt den perfekten Farbton für die Wand.",
        englishGloss: "She mixes the perfect shade for the wall.",
      },
    ],
  },
  {
    category: "art_design",
    german: "Handwerkskunst",
    englishGloss: "craftsmanship",
    japaneseGloss: "職人芸",
    partOfSpeech: "Nomen",
    gender: "die",
    definition: "die hohe Kunstfertigkeit eines Handwerkers",
    examples: [
      {
        german: "Die Handwerkskunst der alten Meister ist beeindruckend.",
        englishGloss: "The craftsmanship of the old masters is impressive.",
      },
    ],
  },
];

const EXERCISES: Array<{ category: string; english: string; german: string; hint?: string }> = [
  {
    category: "b1b2_general",
    english: "She has a lot of experience in her profession.",
    german: "Sie hat viel Erfahrung in ihrem Beruf.",
  },
  {
    category: "b1b2_general",
    english: "The weather influences our mood.",
    german: "Das Wetter beeinflusst unsere Stimmung.",
  },
  {
    category: "b1b2_general",
    english: "That was a difficult decision.",
    german: "Das war eine schwierige Entscheidung.",
  },
  {
    category: "b1b2_general",
    english: "We have to protect the environment.",
    german: "Wir müssen die Umwelt schützen.",
  },
  {
    category: "b1b2_general",
    english: "I try to avoid stress.",
    german: "Ich versuche, Stress zu vermeiden.",
  },
  {
    category: "b1b2_general",
    english: "I can't imagine that.",
    german: "Ich kann mir das nicht vorstellen.",
    hint: "sich vorstellen",
  },
  {
    category: "art_design",
    english: "The designer showed us his first draft.",
    german: "Der Designer zeigte uns seinen ersten Entwurf.",
  },
  {
    category: "art_design",
    english: "The exhibition shows modern art.",
    german: "Die Ausstellung zeigt moderne Kunst.",
  },
  {
    category: "art_design",
    english: "She is designing the poster for the exhibition.",
    german: "Sie gestaltet das Plakat für die Ausstellung.",
  },
  {
    category: "art_design",
    english: "The painting's color scheme is very high-contrast.",
    german: "Die Farbgebung des Gemäldes ist sehr kontrastreich.",
  },
  {
    category: "art_design",
    english: "This artwork is from the 19th century.",
    german: "Dieses Kunstwerk stammt aus dem 19. Jahrhundert.",
  },
  {
    category: "art_design",
    english: "Which typeface fits this logo best?",
    german: "Welche Schriftart passt am besten zu diesem Logo?",
  },
  {
    category: "b1b2_general",
    english: "He bears responsibility for the whole project.",
    german: "Er trägt die Verantwortung für das ganze Projekt.",
  },
  {
    category: "b1b2_general",
    english: "There are many ways to learn German.",
    german: "Es gibt viele Möglichkeiten, Deutsch zu lernen.",
  },
  {
    category: "b1b2_general",
    english: "What does this word mean?",
    german: "Was bedeutet dieses Wort?",
  },
  {
    category: "b1b2_general",
    english: "She has been dealing with modern art for years.",
    german: "Sie beschäftigt sich seit Jahren mit moderner Kunst.",
    hint: "sich beschäftigen",
  },
  {
    category: "b1b2_general",
    english: "Society is constantly changing.",
    german: "Die Gesellschaft verändert sich ständig.",
  },
  {
    category: "b1b2_general",
    english: "He achieved his goal.",
    german: "Er hat sein Ziel erreicht.",
  },
  {
    category: "b1b2_general",
    english: "That was a big challenge for us.",
    german: "Das war eine große Herausforderung für uns.",
  },
  {
    category: "b1b2_general",
    english: "Many young people are committed to climate protection.",
    german: "Viele Jugendliche engagieren sich für den Klimaschutz.",
    hint: "sich engagieren",
  },
  {
    category: "b1b2_general",
    english: "They have a close relationship with each other.",
    german: "Sie haben eine enge Beziehung zueinander.",
  },
  {
    category: "b1b2_general",
    english: "The job requires a lot of patience.",
    german: "Der Job verlangt viel Geduld.",
  },
  {
    category: "b1b2_general",
    english: "I have no intention of moving.",
    german: "Ich habe nicht die Absicht, umzuziehen.",
  },
  {
    category: "b1b2_general",
    english: "Stress has a negative effect on health.",
    german: "Stress wirkt sich negativ auf die Gesundheit aus.",
    hint: "sich auswirken",
  },
  {
    category: "b1b2_general",
    english: "The perception of colors differs from person to person.",
    german: "Die Wahrnehmung von Farben ist bei jedem Menschen unterschiedlich.",
  },
  {
    category: "b1b2_general",
    english: "Can you justify your decision?",
    german: "Kannst du deine Entscheidung begründen?",
  },
  {
    category: "b1b2_general",
    english: "Good German skills are a prerequisite for the course.",
    german: "Gute Deutschkenntnisse sind eine Voraussetzung für den Kurs.",
  },
  {
    category: "b1b2_general",
    english: "He was able to convince me of his plan.",
    german: "Er konnte mich von seinem Plan überzeugen.",
  },
  {
    category: "b1b2_general",
    english: "I don't understand the connection.",
    german: "Ich verstehe den Zusammenhang nicht.",
  },
  {
    category: "b1b2_general",
    english: "She is preparing for the exam.",
    german: "Sie bereitet sich auf die Prüfung vor.",
    hint: "sich vorbereiten",
  },
  {
    category: "b1b2_general",
    english: "The medicine shows its effect quickly.",
    german: "Die Medizin zeigt schnell ihre Wirkung.",
  },
  {
    category: "b1b2_general",
    english: "I'm doing without meat today.",
    german: "Ich verzichte heute auf Fleisch.",
  },
  {
    category: "b1b2_general",
    english: "His attitude towards work has changed.",
    german: "Seine Einstellung zur Arbeit hat sich verändert.",
  },
  {
    category: "b1b2_general",
    english: "This rule concerns all employees.",
    german: "Diese Regel betrifft alle Mitarbeiter.",
  },
  {
    category: "b1b2_general",
    english: "I agree under this condition.",
    german: "Unter dieser Bedingung stimme ich zu.",
  },
  {
    category: "b1b2_general",
    english: "One has to adapt to the new climate.",
    german: "Man muss sich an das neue Klima anpassen.",
    hint: "sich anpassen",
  },
  {
    category: "b1b2_general",
    english: "Technical development is happening very fast.",
    german: "Die technische Entwicklung geht sehr schnell.",
  },
  {
    category: "b1b2_general",
    english: "He claims to be telling the truth.",
    german: "Er behauptet, die Wahrheit zu sagen.",
  },
  {
    category: "b1b2_general",
    english: "The cause of the problem is still unclear.",
    german: "Die Ursache des Problems ist noch unklar.",
  },
  {
    category: "b1b2_general",
    english: "He behaved very politely.",
    german: "Er hat sich sehr höflich verhalten.",
    hint: "sich verhalten",
  },
  {
    category: "b1b2_general",
    english: "The store offers a large selection of books.",
    german: "Der Laden bietet eine große Auswahl an Büchern.",
  },
  {
    category: "b1b2_general",
    english: "He is regarded as one of the best doctors in the city.",
    german: "Er gilt als einer der besten Ärzte der Stadt.",
  },
  {
    category: "art_design",
    english: "The painter uses perspective to create depth.",
    german: "Der Maler nutzt die Perspektive, um Tiefe zu erzeugen.",
  },
  {
    category: "art_design",
    english: "The composition of the painting seems very harmonious.",
    german: "Die Komposition des Bildes wirkt sehr harmonisch.",
  },
  {
    category: "art_design",
    english: "The contrast between light and shadow is strong.",
    german: "Der Kontrast zwischen Licht und Schatten ist stark.",
  },
  {
    category: "art_design",
    english: "First she makes a sketch on paper.",
    german: "Zuerst macht sie eine Skizze auf Papier.",
  },
  {
    category: "art_design",
    english: "The layout of the brochure still needs to be revised.",
    german: "Das Layout der Broschüre muss noch überarbeitet werden.",
  },
  {
    category: "art_design",
    english: "The painting is an expression of his inner feelings.",
    german: "Das Gemälde ist ein Ausdruck seiner inneren Gefühle.",
  },
  {
    category: "art_design",
    english: "The structure of the building is very modern.",
    german: "Die Struktur des Gebäudes ist sehr modern.",
  },
  {
    category: "art_design",
    english: "His newest work is completely abstract.",
    german: "Sein neuestes Werk ist völlig abstrakt.",
  },
  {
    category: "art_design",
    english: "He masters various painting techniques.",
    german: "Er beherrscht verschiedene Techniken der Malerei.",
  },
  {
    category: "art_design",
    english: "Unusual material was used for the sculpture.",
    german: "Für die Skulptur wurde ungewöhnliches Material verwendet.",
  },
  {
    category: "art_design",
    english: "The gallery shows works by young artists.",
    german: "Die Galerie zeigt Werke junger Künstler.",
  },
  {
    category: "art_design",
    english: "The frame fits the painting perfectly.",
    german: "Der Rahmen passt perfekt zum Gemälde.",
  },
  {
    category: "art_design",
    english: "The surface of the sculpture feels smooth.",
    german: "Die Oberfläche der Skulptur fühlt sich glatt an.",
  },
  {
    category: "art_design",
    english: "The fabric has a striking pattern.",
    german: "Der Stoff hat ein auffälliges Muster.",
  },
  {
    category: "art_design",
    english: "The symmetry of the facade impresses many visitors.",
    german: "Die Symmetrie der Fassade beeindruckt viele Besucher.",
  },
  {
    category: "art_design",
    english: "The children's book contains many colorful illustrations.",
    german: "Das Kinderbuch enthält viele bunte Illustrationen.",
  },
  {
    category: "art_design",
    english: "Flowers are a popular motif in painting.",
    german: "Blumen sind ein beliebtes Motiv in der Malerei.",
  },
  {
    category: "art_design",
    english: "The aesthetics of the product play a major role.",
    german: "Die Ästhetik des Produkts spielt eine große Rolle.",
  },
  {
    category: "art_design",
    english: "The painting invites the viewer to reflect.",
    german: "Das Gemälde lädt den Betrachter zum Nachdenken ein.",
  },
  {
    category: "art_design",
    english: "The architect sketches his ideas on paper.",
    german: "Der Architekt skizziert seine Ideen auf Papier.",
  },
  {
    category: "art_design",
    english: "Nature inspires many artists.",
    german: "Die Natur inspiriert viele Künstler.",
  },
  {
    category: "art_design",
    english: "She designs clothing for a well-known brand.",
    german: "Sie entwirft Kleidung für eine bekannte Marke.",
  },
  {
    category: "art_design",
    english: "The designer rearranges the elements.",
    german: "Der Designer ordnet die Elemente neu an.",
  },
  {
    category: "art_design",
    english: "The red door is the eye-catcher of the facade.",
    german: "Die rote Tür ist der Blickfang der Fassade.",
  },
  {
    category: "art_design",
    english: "The colors look very harmonious together.",
    german: "Die Farben wirken sehr harmonisch zusammen.",
  },
  {
    category: "art_design",
    english: "The style of this building is typical of the 1920s.",
    german: "Der Stil dieses Gebäudes ist typisch für die 1920er Jahre.",
  },
  {
    category: "art_design",
    english: "Old masters serve as his role model.",
    german: "Alte Meister dienen ihm als Vorbild.",
  },
  {
    category: "art_design",
    english: "The texture of the canvas is rough.",
    german: "Die Textur der Leinwand ist grob.",
  },
  {
    category: "art_design",
    english: "The museum collects contemporary art.",
    german: "Das Museum sammelt zeitgenössische Kunst.",
  },
  {
    category: "b1b2_general",
    english: "He has the ability to listen well.",
    german: "Er hat die Fähigkeit, gut zuzuhören.",
  },
  {
    category: "b1b2_general",
    english: "She makes an effort to be on time.",
    german: "Sie bemüht sich, pünktlich zu sein.",
    hint: "sich bemühen",
  },
  {
    category: "b1b2_general",
    english: "One should show consideration for older people.",
    german: "Man sollte auf ältere Menschen Rücksicht nehmen.",
  },
  {
    category: "b1b2_general",
    english: "The talk impressed everyone.",
    german: "Der Vortrag hat alle beeindruckt.",
  },
  {
    category: "b1b2_general",
    english: "Children often have great curiosity.",
    german: "Kinder haben oft große Neugier.",
  },
  {
    category: "b1b2_general",
    english: "I trust my friends completely.",
    german: "Ich vertraue meinen Freunden vollkommen.",
  },
  {
    category: "b1b2_general",
    english: "The concert exceeded my expectations.",
    german: "Das Konzert hat meine Erwartungen übertroffen.",
  },
  {
    category: "b1b2_general",
    english: "It's worth getting up early.",
    german: "Es lohnt sich, früh aufzustehen.",
    hint: "sich lohnen",
  },
  {
    category: "b1b2_general",
    english: "The work is a great burden for him.",
    german: "Die Arbeit ist eine große Belastung für ihn.",
  },
  {
    category: "b1b2_general",
    english: "She has a lot of experience abroad at her disposal.",
    german: "Sie verfügt über viel Erfahrung im Ausland.",
  },
  {
    category: "b1b2_general",
    english: "Smoking is a habit that's hard to change.",
    german: "Rauchen ist eine schwer zu ändernde Gewohnheit.",
  },
  {
    category: "b1b2_general",
    english: "I can't comprehend his decision.",
    german: "Ich kann seine Entscheidung nicht nachvollziehen.",
  },
  {
    category: "b1b2_general",
    english: "Trust is the foundation of every relationship.",
    german: "Vertrauen ist die Grundlage jeder Beziehung.",
  },
  {
    category: "b1b2_general",
    english: "The flight was delayed by two hours.",
    german: "Der Flug hat sich um zwei Stunden verzögert.",
  },
  {
    category: "b1b2_general",
    english: "The diversity of cultures makes the city interesting.",
    german: "Die Vielfalt der Kulturen macht die Stadt interessant.",
  },
  {
    category: "b1b2_general",
    english: "He refuses to accept the rules.",
    german: "Er weigert sich, die Regeln zu akzeptieren.",
    hint: "sich weigern",
  },
  {
    category: "b1b2_general",
    english: "Working from home has many advantages.",
    german: "Homeoffice hat viele Vorteile.",
  },
  {
    category: "b1b2_general",
    english: "Every solution also has disadvantages.",
    german: "Jede Lösung hat auch Nachteile.",
  },
  {
    category: "b1b2_general",
    english: "The two companies agreed on a price.",
    german: "Die beiden Firmen haben sich auf einen Preis geeinigt.",
    hint: "sich einigen",
  },
  {
    category: "b1b2_general",
    english: "This rule has no exception.",
    german: "Diese Regel hat keine Ausnahme.",
  },
  {
    category: "b1b2_general",
    english: "I prefer tea over coffee.",
    german: "Ich bevorzuge Tee gegenüber Kaffee.",
  },
  {
    category: "b1b2_general",
    english: "Tolerance is important for peaceful coexistence.",
    german: "Toleranz ist wichtig für ein friedliches Zusammenleben.",
  },
  {
    category: "b1b2_general",
    english: "He constantly complains about the weather.",
    german: "Er beklagt sich ständig über das Wetter.",
    hint: "sich beklagen",
  },
  {
    category: "b1b2_general",
    english: "After the exam she felt great relief.",
    german: "Nach der Prüfung spürte sie große Erleichterung.",
  },
  {
    category: "b1b2_general",
    english: "His statements contradict each other.",
    german: "Seine Aussagen widersprechen sich.",
    hint: "sich widersprechen",
  },
  {
    category: "b1b2_general",
    english: "Every decision has consequences.",
    german: "Jede Entscheidung hat Konsequenzen.",
  },
  {
    category: "b1b2_general",
    english: "She hinted that she wants to quit.",
    german: "Sie deutete an, dass sie kündigen möchte.",
  },
  {
    category: "b1b2_general",
    english: "This insight changed his life.",
    german: "Diese Erkenntnis hat sein Leben verändert.",
  },
  {
    category: "b1b2_general",
    english: "I forgave him for his mistake long ago.",
    german: "Ich habe ihm seinen Fehler längst verziehen.",
  },
  {
    category: "b1b2_general",
    english: "Children learn independence early.",
    german: "Kinder lernen früh Selbstständigkeit.",
  },
  {
    category: "art_design",
    english: "The film's color palette feels very warm.",
    german: "Die Farbpalette des Films wirkt sehr warm.",
  },
  {
    category: "art_design",
    english: "She cleans her brushes after every session.",
    german: "Sie reinigt ihre Pinsel nach jeder Sitzung.",
  },
  {
    category: "art_design",
    english: "The artist stretches a new canvas.",
    german: "Der Künstler spannt eine neue Leinwand auf.",
  },
  {
    category: "art_design",
    english: "The sculptor has been working on the statue for weeks.",
    german: "Der Bildhauer arbeitet seit Wochen an der Statue.",
  },
  {
    category: "art_design",
    english: "The sculpture stands in the middle of the park.",
    german: "Die Skulptur steht mitten im Park.",
  },
  {
    category: "art_design",
    english: "Furniture making is a traditional craft.",
    german: "Möbelbau ist ein traditionelles Handwerk.",
  },
  {
    category: "art_design",
    english: "The designer uses a template for the cover.",
    german: "Der Designer nutzt eine Vorlage für das Cover.",
  },
  {
    category: "art_design",
    english: "The concept for the exhibition isn't finished yet.",
    german: "Das Konzept der Ausstellung ist noch nicht fertig.",
  },
  {
    category: "art_design",
    english: "She refines her technique year by year.",
    german: "Sie verfeinert ihre Technik von Jahr zu Jahr.",
  },
  {
    category: "art_design",
    english: "The arrangement of the furniture seems very thought-out.",
    german: "Die Anordnung der Möbel wirkt sehr durchdacht.",
  },
  {
    category: "art_design",
    english: "This profession requires a lot of creativity.",
    german: "Dieser Beruf erfordert viel Kreativität.",
  },
  {
    category: "art_design",
    english: "Her idea is really original.",
    german: "Ihre Idee ist wirklich originell.",
  },
  {
    category: "art_design",
    english: "The shaping of the vase is very unusual.",
    german: "Die Formgebung der Vase ist sehr ungewöhnlich.",
  },
  {
    category: "art_design",
    english: "The picture leaves a strong impression.",
    german: "Das Bild hinterlässt einen starken Eindruck.",
  },
  {
    category: "art_design",
    english: "The poster has a colorful gradient.",
    german: "Das Poster hat einen bunten Farbverlauf.",
  },
  {
    category: "art_design",
    english: "The background of the photo is blurred.",
    german: "Der Hintergrund des Fotos ist unscharf.",
  },
  {
    category: "art_design",
    english: "In the foreground you can see an old church.",
    german: "Im Vordergrund sieht man eine alte Kirche.",
  },
  {
    category: "art_design",
    english: "The facade is decorated with delicate ornaments.",
    german: "Die Fassade ist mit filigranen Ornamenten verziert.",
  },
  {
    category: "art_design",
    english: "The proportions of the figure look realistic.",
    german: "Die Proportionen der Figur wirken realistisch.",
  },
  {
    category: "art_design",
    english: "The relief looks very three-dimensional.",
    german: "Das Relief wirkt sehr plastisch.",
  },
  {
    category: "art_design",
    english: "The project still needs some finishing touches.",
    german: "Das Projekt braucht noch etwas Feinschliff.",
  },
  {
    category: "art_design",
    english: "Every craftsman has his own tools.",
    german: "Jeder Handwerker hat sein eigenes Werkzeug.",
  },
  {
    category: "art_design",
    english: "The blacksmith produces every piece by hand.",
    german: "Der Schmied fertigt jedes Stück von Hand an.",
  },
  {
    category: "art_design",
    english: "The architect has a clear vision for the building.",
    german: "Der Architekt hat eine klare Vision für das Gebäude.",
  },
  {
    category: "art_design",
    english: "It was difficult to implement the idea.",
    german: "Es war schwierig, die Idee umzusetzen.",
  },
  {
    category: "art_design",
    english: "From this angle the building looks different.",
    german: "Aus diesem Blickwinkel sieht das Gebäude anders aus.",
  },
  {
    category: "art_design",
    english: "Her living room is furnished in a very minimalist way.",
    german: "Ihr Wohnzimmer ist sehr minimalistisch eingerichtet.",
  },
  {
    category: "art_design",
    english: "The cake has elaborate decorations.",
    german: "Die Torte hat aufwendige Verzierungen.",
  },
  {
    category: "art_design",
    english: "She mixes the perfect shade for the wall.",
    german: "Sie mischt den perfekten Farbton für die Wand.",
  },
  {
    category: "art_design",
    english: "The craftsmanship of the old masters is impressive.",
    german: "Die Handwerkskunst der alten Meister ist beeindruckend.",
  },
];

// Shared by `prisma/seed.ts` (local CLI) and the `/api/admin/seed` route
// (used to seed a deployed database whose connection string isn't directly
// accessible, e.g. a masked Vercel env var). Idempotent: safe to run more
// than once against the same database.
export async function runSeed(prisma: PrismaClient) {
  const categoryIdByKey = new Map<string, string>();
  for (const c of CATEGORIES) {
    const created = await prisma.category.upsert({
      where: { key: c.key },
      update: { name: c.name, description: c.description },
      create: c,
    });
    categoryIdByKey.set(c.key, created.id);
  }

  let wordsCreated = 0;
  for (const w of WORDS) {
    const existing = await prisma.word.findFirst({ where: { german: w.german } });
    if (existing) continue;
    await prisma.word.create({
      data: {
        german: w.german,
        englishGloss: w.englishGloss,
        japaneseGloss: w.japaneseGloss,
        partOfSpeech: w.partOfSpeech,
        gender: w.gender,
        pluralForm: w.pluralForm,
        definition: w.definition,
        categoryId: categoryIdByKey.get(w.category),
        examples: {
          create: w.examples.map((e) => ({
            german: e.german,
            englishGloss: e.englishGloss,
          })),
        },
        reviewCard: { create: {} },
      },
    });
    wordsCreated++;
  }

  let exercisesCreated = 0;
  for (const ex of EXERCISES) {
    const existing = await prisma.exercise.findFirst({
      where: { english: ex.english, german: ex.german },
    });
    if (existing) continue;
    await prisma.exercise.create({
      data: {
        english: ex.english,
        german: ex.german,
        hint: ex.hint,
        categoryId: categoryIdByKey.get(ex.category)!,
      },
    });
    exercisesCreated++;
  }

  // Carry over the Duolingo streak: 1258 consecutive days as of 2026-09-11.
  const streakEndDate = new Date(Date.UTC(2026, 8, 11)); // month is 0-indexed
  const streakDays = 1258;
  const streakStartDate = new Date(streakEndDate);
  streakStartDate.setUTCDate(streakStartDate.getUTCDate() - (streakDays - 1));

  await prisma.streakState.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      currentStreak: streakDays,
      longestStreak: streakDays,
      lastActiveDate: streakEndDate,
      streakStartDate,
      freezesAvailable: 6,
      freezesRenewedAt: streakEndDate,
    },
  });

  await prisma.appSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });

  return { categories: CATEGORIES.length, wordsCreated, exercisesCreated };
}
