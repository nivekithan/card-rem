export const CARD_SHAPE = {
  HEART: "HEART",
  SPADE: "SPADE",
  DIAMOND: "DIAMOND",
  CLUB: "CLUB",
} as const;

export type CardShape = typeof CARD_SHAPE[keyof typeof CARD_SHAPE];

export const CARD_NUM = [
  "ACE",
  "KING",
  "QUEEN",
  "JACK",
  "10",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
] as const;

export type CardNum = typeof CARD_NUM[number];
export type Card = { shape: CardShape; num: CardNum };
export type SpadeCard = { shape: typeof CARD_SHAPE["SPADE"]; num: CardNum };

export const convertToSpadeCard = (num: CardNum) => {
  return { shape: CARD_SHAPE.SPADE, num: num };
};

export const getSpadeCards = (): SpadeCard[] => {
  return CARD_NUM.map(convertToSpadeCard);
};

export const shuffleCards = <T>(array: T[]): T[] => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const getEmojiForShape = (
  shape: typeof CARD_SHAPE[keyof typeof CARD_SHAPE]
) => {
  switch (shape) {
    case CARD_SHAPE.HEART:
      return "♥️";
    case CARD_SHAPE.SPADE:
      return "♠️";
    case CARD_SHAPE.DIAMOND:
      return "♦️";
    case CARD_SHAPE.CLUB:
      return "♣️";
  }
};

export const rankingForCardNum = (cardNum: typeof CARD_NUM[number]) => {
  if (cardNum === "ACE") {
    return 14;
  } else if (cardNum === "KING") {
    return 13;
  } else if (cardNum === "QUEEN") {
    return 12;
  } else if (cardNum === "JACK") {
    return 11;
  } else {
    return parseInt(cardNum, 10);
  }
};

export const isCardNum = (num: string): num is CardNum => {
  return CARD_NUM.includes(num as CardNum);
};
