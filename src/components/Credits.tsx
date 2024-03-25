import Link from "next/link";

export default function Credits() {
  return (
    <div className="text-xs text-slate-500 mt-12">
      This game is brought to you with ❤️ by{" "}
      <Link href="https://twitter.com/MarkToda">@marktoda</Link> and
      <Link href="https://twitter.com/patagucci_girl">@patagucci_girl</Link>.
      We'd appreciate donations to help with ChatGPT costs at
      hellopanda.uni.eth. Optimism or Base USDC preferred :D
    </div>
  );
}
