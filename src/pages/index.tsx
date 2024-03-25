import CreatePrompt from "@/components/CreatePrompt";
import Game from "@/components/Game";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [clues, setClues] = useState<string[]>([]);

  const onReset = () => {
    setPrompt("");
    setClues([]);
  };

  return (
    <main className={`flex min-h-screen flex-col items-center p-8 gap-2`}>
      <div className="landscape:hidden text-center p-2 bg-yellow-100">
        This game is best experienced in landscape mode! Turn your phone
        sideways pls.
      </div>
      {!prompt && (
        <CreatePrompt
          onSuccess={(prompt, clues) => {
            setPrompt(prompt);
            setClues(clues);
          }}
        />
      )}
      {prompt && <Game prompt={prompt} clues={clues} onReset={onReset} />}
    </main>
  );
}
