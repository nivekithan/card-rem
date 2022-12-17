import React from "react";
import { CARD_NUM, getEmojiForShape, isCardNum } from "./cards";
import { useGame } from "./game";
import "./index.css";

function App() {
  const { activeCard, nextCard, checkWinningCard, resetGame, gameState } =
    useGame();

  const onNextButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    nextCard();
  };

  const onResetButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    resetGame();
  };

  return (
    <main className="flex flex-col min-h-screen justify-between py-3">
      <div className="grid place-items-center flex-grow">
        {activeCard ? (
          <h1 className="text-xl font-bold tracking-wide">{`${getEmojiForShape(
            activeCard.shape
          )} ${activeCard.num}`}</h1>
        ) : null}
      </div>
      <div className="flex gap-x-8">
        <button
          className="bg-slate-700 text-white px-6 py-2 rounded-md text-lg"
          onClick={onNextButtonClick}
        >
          Next
        </button>
        <button
          className="bg-gray-700 text-white px-6 py-2 rounded-md text-lg"
          onClick={onResetButtonClick}
        >
          Reset
        </button>
        <form
          className="flex gap-x-8 items-center"
          onSubmit={(e) => {
            e.preventDefault();
            const chosenCard = (e.currentTarget[0] as HTMLSelectElement).value;
            const isValidCard = isCardNum(chosenCard);

            if (isValidCard) {
              checkWinningCard({ shape: "SPADE", num: chosenCard });
            }
          }}
        >
          <select className="px-3 py-2 h-full rounded-md">
            {CARD_NUM.map((num) => {
              return (
                <option key={num} value={num}>
                  {num}
                </option>
              );
            })}
          </select>
          <button className="bg-purple-700 text-white px-4 py-2 rounded-md">
            Check
          </button>
          {gameState === "WIN" ? (
            <h2>Correct!</h2>
          ) : gameState === "LOSE" ? (
            <h2>Wrong!</h2>
          ) : null}
        </form>
      </div>
    </main>
  );
}

export default App;
