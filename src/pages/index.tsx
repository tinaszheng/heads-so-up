import CreatePrompt from "@/components/CreatePrompt";
import Game from "@/components/Game";
import { Category } from "@/utils";
import { useState } from "react";

export default function Home() {
  const [category, setCategory] = useState<Category>();

  return (
    <main className={`flex min-h-screen flex-col items-center p-8 gap-2`}>
      <div className="landscape:hidden text-center p-2 bg-yellow-100">
        This game is best experienced in landscape mode! Turn your phone
        sideways pls.
      </div>
      {!category && <CreatePrompt onSuccess={setCategory} />}
      {category && (
        <Game category={category} onReset={() => setCategory(undefined)} />
      )}
    </main>
  );
}
