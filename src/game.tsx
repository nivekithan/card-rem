import { useState, useCallback, useRef, MutableRefObject } from "react";
import {
  shuffleCards,
  getSpadeCards,
  SpadeCard,
  rankingForCardNum,
} from "./cards";

export const useGame = () => {
  const spadeCardsRef = useSpadeCards();

  const [activeCard, setActiveCard] = useState<SpadeCard | null>(null);
  const [gameState, setGameState] = useState<"PLAYING" | "WIN" | "LOSE">(
    "PLAYING"
  );
  const [cardsPlayed, setCardsPlayed] = useState(0);

  const nextCard = () => {
    const nextActiveCard = spadeCardsRef.current.pop();
    setActiveCard(nextActiveCard ?? null);
    setCardsPlayed(cardsPlayed + 1);
  };

  const resetGame = () => {
    spadeCardsRef.current = shuffleCards(getSpadeCards());
    setGameState("PLAYING");
    setActiveCard(null);
    setCardsPlayed(0);
  };

  const checkWinningCard = (card: SpadeCard) => {
    const winningCardRank = rankingForCardNum(card.num);

    const maxRank = spadeCardsRef.current.reduce((acc, cur) => {
      const curRank = rankingForCardNum(cur.num);
      if (curRank > acc) {
        return curRank;
      }
      return acc;
    }, 0);

    const isCorrect = winningCardRank === maxRank;

    if (isCorrect) {
      setGameState("WIN");
    } else {
      setGameState("LOSE");
    }
  };

  return {
    activeCard,
    nextCard,
    resetGame,
    checkWinningCard,
    gameState,
    cardsPlayed,
  };
};

export const useSpadeCards = () => {
  const spadeCards = useRef<SpadeCard[] | null>(null);

  if (spadeCards.current === null) {
    spadeCards.current = shuffleCards(getSpadeCards());
    return spadeCards as MutableRefObject<SpadeCard[]>;
  }

  return spadeCards as MutableRefObject<SpadeCard[]>;
};
