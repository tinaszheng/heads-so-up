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
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-8`}
    >
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
