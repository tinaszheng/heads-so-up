import { shuffleArray } from "@/utils";
import { useEffect, useRef, useState } from "react";

type Props = {
  prompt: string;
  clues: string[];
  onReset: () => void;
};

type Result = {
  clue: string;
  success: boolean;
}[];

const DEFAULT_GAME_TIME = 60; // 1 minute

export default function Game({ prompt, clues, onReset }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_GAME_TIME);
  const [scrambledClues, setScrambledClues] = useState(clues);
  const [clueIndex, setClueIndex] = useState(0);
  const countdown = useRef<NodeJS.Timeout>();
  const [hasStarted, setHasStarted] = useState(false);
  const [result, setResult] = useState<Result>([]);
  const [previousClueSuccess, setPreviousClueSuccess] = useState<boolean>();

  const onNextClue = (success: boolean) => {
    const currClue = scrambledClues[clueIndex];
    setPreviousClueSuccess(success);
    setResult((prev) => [...prev, { clue: currClue, success }]);
    setClueIndex(clueIndex + 1);
  };

  const startGame = () => {
    setHasStarted(true);
    const interval = setInterval(() => {
      setSecondsLeft((left) => left - 1);
    }, 1000);
    countdown.current = interval;
  };

  useEffect(() => {
    if (secondsLeft === 0 || clueIndex === scrambledClues.length) {
      window.navigator.vibrate(100);
      clearInterval(countdown.current);
    }
  }, [secondsLeft, clueIndex, scrambledClues]);

  useEffect(() => {
    // for animating the skip/success color out
    setTimeout(() => setPreviousClueSuccess(undefined), 400);
  }, [previousClueSuccess]);

  const onPlayAgain = () => {
    setSecondsLeft(DEFAULT_GAME_TIME);
    setResult([]);
    setClueIndex(0);
    const newClues = [...scrambledClues];
    shuffleArray(newClues);
    setScrambledClues(newClues);
    setHasStarted(false);
    setPreviousClueSuccess(undefined);
  };

  if (secondsLeft === 0) {
    return (
      <div className="flex flex-col p-4 text-center gap-2">
        <div>TIME'S UP!</div>
        <GameResult result={result} />
        <div className="flex gap-4">
          <button onClick={onPlayAgain}>Play again</button>
          <button onClick={onReset}>New prompt</button>
        </div>
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <button
        className="text-indigo-300 absolute h-screen w-screen top-0 left-0"
        onClick={startGame}
      >
        Click anywhere to start!
      </button>
    );
  }

  if (clueIndex === scrambledClues.length) {
    return (
      <div className="flex flex-col text-center gap-2">
        <div>No more clues :(</div>
        <GameResult result={result} />
        <div className="flex gap-4">
          <button
            className="text-white rounded-full p-2 px-8 border-4 border-none bg-indigo-300"
            onClick={onPlayAgain}
          >
            Play again
          </button>
          <button
            className="text-white rounded-full p-2 px-8 border-4 border-none bg-indigo-300"
            onClick={onReset}
          >
            New prompt
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="self-center">Time left: {secondsLeft}</div>
      <div className="text-4xl flex-1 self-center flex flex-row items-center">
        {scrambledClues[clueIndex]}
      </div>
      <div className="flex justify-between">
        <div
          className={`-z-50 absolute left-0 top-0 w-1/2 h-screen flex bg-yellow-100 ${
            previousClueSuccess === false ? "opacity-100" : "opacity-0"
          }`}
        />
        <button
          className={`absolute left-0 top-0 w-1/2 h-screen flex`}
          onClick={() => onNextClue(false)}
        >
          <div className="self-end p-12">Skip</div>
        </button>
        <div
          className={`-z-50 absolute right-0 top-0 w-1/2 h-screen flex bg-green-100 ${
            previousClueSuccess === true ? "opacity-100" : "opacity-0"
          }`}
        />
        <button
          className={`absolute right-0 top-0 w-1/2 h-screen flex`}
          onClick={() => onNextClue(true)}
        >
          <div className="p-12 flex-1 self-end text-right">Success</div>
        </button>
      </div>
    </div>
  );
}

function pluralize(points: number) {
  return points === 1 ? "1 point" : `${points} points`;
}

function GameResult({ result }: { result: Result }) {
  const numPoints = result.filter((res) => res.success).length;
  return (
    <div className="flex flex-col gap-2 align-center">
      <div>You scored {pluralize(numPoints)}!</div>
      <div className="text-center">
        {result.map((res) => {
          return (
            <div
              key={res.clue}
              className={`${
                res.success ? "text-indigo-300" : "text-slate-300"
              } text-2xl`}
            >
              {res.clue}
            </div>
          );
        })}
      </div>
    </div>
  );
}
