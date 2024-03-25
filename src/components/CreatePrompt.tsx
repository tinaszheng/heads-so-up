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
  const [error, setError] = useState("");

  const onSubmit = async () => {
    setLoading(true);

    try {
      const res = await fetch("https://dev-dash.dev/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          difficulty: difficulty.toLowerCase(),
          category: prompt,
        }),
      });

      console.log("res", res);
      const clues = await res.json();

      onSuccess(prompt, clues);
    } catch (e) {
      onSuccess(prompt, [
        "Clue 1",
        "Clue 2",
        "Clue 3",
        "Clue 4",
        "This is an ultra long clue with so much text that you won't be able to handle it.",
      ]);
      //   setError("There was an error D:");
    }

    setLoading(false);
  };

  if (error) {
    return (
      <div className="flex flex-col flex-1 justify-center gap-4 text-center">
        <div>{error}</div>
        <button
          disabled={!prompt}
          onClick={() => setError("")}
          className={`text-white rounded-full p-2 px-8 border-4 text-2xl border-none bg-indigo-300`}
        >
          Try again?
        </button>
      </div>
    );
  }

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
