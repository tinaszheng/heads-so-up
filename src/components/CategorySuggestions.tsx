import { Category, Difficulty } from "@/utils";
import { useEffect, useState } from "react";

type PromptAndDifficulty = Omit<Category, "clues">;

type CategoryResult = {
  category: PromptAndDifficulty;
  emoji: string;
  played: number;
};

export default function CategorySuggestions({
  onSelect,
}: {
  onSelect: (category: PromptAndDifficulty) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryResult[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("https://api.categorysoup.com/categories", {
        method: "GET",
      });

      const results = await res.json();
      setCategories(results);
      setLoading(false);
    }

    fetchCategories();
  }, []);

  if (loading) return <div>...</div>;

  return (
    <div className="flex text-center flex-col self-stretch gap-4">
      <div className="text-sm">
        Check out categories other users have created:
      </div>
      <div className="flex gap-4 justify-center flex-wrap">
        {categories.map(({ category, emoji }) => (
          <CategoryBox
            emoji={emoji}
            prompt={category.prompt}
            difficulty={category.difficulty}
            key={`${category.difficulty}-${category.prompt}`}
            onClick={() => onSelect(category)}
          />
        ))}
      </div>
    </div>
  );
}

function CategoryBox({
  emoji,
  prompt,
  difficulty,
  onClick,
}: {
  emoji: string;
  prompt: string;
  difficulty: Difficulty;
  onClick: () => void;
}) {
  return (
    <div className="grow border-2 rounded-md p-2 border-indigo-300 flex flex-col gap-2">
      <div className="text-2xl">{emoji} {prompt}</div>
      <DifficultyLabel difficulty={difficulty} />
      <button className="text-lg" onClick={onClick}>
        Play
      </button>
    </div>
  );
}

const DIFF_TO_COLOR = {
  [Difficulty.Easy]: "bg-green-100",
  [Difficulty.Medium]: "bg-yellow-100",
  [Difficulty.Hard]: "bg-indigo-100",
};

function DifficultyLabel({ difficulty }: { difficulty: Difficulty }) {
  return (
    <div
      className={`p-1 text-xs text-center rounded-md ${DIFF_TO_COLOR[difficulty]}`}
    >
      {difficulty}
    </div>
  );
}
