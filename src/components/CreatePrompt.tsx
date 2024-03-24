import { useState } from "react";

enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

export default function CreatePrompt({
  onSuccess,
}: {
  onSuccess: (prompt: string, clues: string[]) => void;
}) {
  const [prompt, setPrompt] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Medium);
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 5000);

    // submit prompt and difficulty to API
    const clues = ["Clue 1", "Clue 2", "Clue 3", "Clue 4", "Clue 5", "Clue 6"];
    onSuccess(prompt, clues);
  };

  if (loading) {
    return (
      <div className="flex flex-col flex-1 justify-center">
        <div
          style={{ height: 200, width: 200 }}
          className="text-center animate-bounce text-white font-madimiOne flex items-center justify-center rounded-full bg-indigo-300 p-24"
        >
          Generating clues
        </div>
      </div>
    );
  }

  return (
    <div className="font-madimiOne">
      <div className="text-4xl text-center">HEADS SO UP</div>
      <div className="flex flex-col items-center p-2">
        Enter your prompt:
        <textarea
          placeholder="e.g. 'Game of Thrones'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          maxLength={500}
          className="w-3/4 border-4 border-indigo-300 p-1 rounded-lg focus:outline-none focus:ring focus:ring-indigo-400"
        />
        <br />
        Select your difficulty:
        <div className="flex gap-2">
          {Object.values(Difficulty).map((diff) => (
            <button
              key={diff}
              className={`${
                diff === difficulty ? `bg-indigo-300 text-white` : ""
              } rounded-full p-2 px-6 border-4 border-indigo-300`}
              onClick={() => setDifficulty(diff)}
            >
              {diff}
            </button>
          ))}
        </div>
        <br />
        <button
          disabled={!prompt}
          onClick={onSubmit}
          className={`text-white rounded-full p-2 px-20 border-4 text-2xl border-none ${
            !prompt ? "bg-slate-200" : "bg-indigo-300"
          }`}
        >
          Let's go!
        </button>
      </div>
    </div>
  );
}
