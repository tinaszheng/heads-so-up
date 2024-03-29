import { Category, Difficulty } from "@/utils";
import { useState } from "react";
import CategorySuggestions from "./CategorySuggestions";

export default function CreatePrompt({
  onSuccess,
}: {
  onSuccess: (category: Category) => void;
}) {
  const [prompt, setPrompt] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Medium);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (prompt: string, difficulty: Difficulty) => {
    setLoading(true);

    try {
      const res = await fetch("https://api.categorysoup.com/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          difficulty: difficulty.toLowerCase(),
          prompt,
        }),
      });

      const clues = (await res.json()).clues;
      if (!clues.length) {
        throw new Error("No clues?");
      }

      onSuccess({ prompt, difficulty, clues });
    } catch (e) {
      setError("There was an error D:");
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

  const onSelectCategorySuggestion = (
    promptAndDifficulty: Omit<Category, "clues">
  ) => {
    onSubmit(promptAndDifficulty.prompt, promptAndDifficulty.difficulty);
  };

  return (
    <div className="font-madimiOne flex flex-col w-full text-2xl">
      <div className="flex flex-col items-center p-2 gap-4">
        <div className="text-lg text-center">
          🍜 WELCOME TO CATEGORY SOUP 🍲
        </div>
        <div className="text-center">Enter your prompt:</div>
        <textarea
          placeholder="e.g. 'Game of Thrones'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          maxLength={500}
          className="w-3/4 border-4 border-indigo-300 p-1 rounded-lg focus:outline-none focus:ring focus:ring-indigo-400"
        />
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
        <button
          disabled={!prompt}
          onClick={() => onSubmit(prompt, difficulty)}
          className={`text-white rounded-full p-2 text-4xl px-20 border-4 border-none ${
            !prompt ? "bg-slate-200" : "bg-indigo-300"
          }`}
        >
          Let's go!
        </button>
        <CategorySuggestions onSelect={onSelectCategorySuggestion} />
      </div>
    </div>
  );
}
