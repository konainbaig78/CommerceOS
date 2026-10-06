import {
  ArrowUp,
  Bot,
  Sparkles,
  TrendingUp,
  Users,
  PackageSearch,
} from "lucide-react";
import { useState } from "react";
import { Card } from "../components/ui/Card";

const suggestions = [
  {
    icon: TrendingUp,
    text: "Why did revenue change this week?",
  },
  {
    icon: Users,
    text: "Who are my most valuable customers?",
  },
  {
    icon: PackageSearch,
    text: "Which products are underperforming?",
  },
];

export default function AICopilot() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const askAI = (question: string) => {
    if (!question.trim()) return;

    setMessage(
      "Based on your current store data, revenue is trending upward by 12.8%. Electronics are currently your strongest category, while weekend sales are significantly outperforming weekday averages.",
    );

    setInput("");
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
          <Sparkles size={22} />
        </div>

        <p className="mt-5 text-xs uppercase tracking-[0.2em] text-cyan-500">
          Commerce Intelligence
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
          What can I help you understand?
        </h1>

        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          Ask questions about your customers, products,
          orders and business performance.
        </p>
      </div>

      {message && (
        <Card className="mx-auto max-w-3xl border-cyan-400/20 p-5">
          <div className="flex gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
              <Bot size={18} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                CommerceOS AI
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {message}
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-3 md:grid-cols-3">
        {suggestions.map((suggestion) => {
          const Icon = suggestion.icon;

          return (
            <button
              key={suggestion.text}
              onClick={() => askAI(suggestion.text)}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-cyan-400/30 dark:border-white/[0.07] dark:bg-[#111718] dark:hover:bg-white/[0.04]"
            >
              <Icon
                size={18}
                className="text-cyan-400"
              />

              <p className="mt-4 text-sm font-medium text-slate-800 dark:text-slate-200">
                {suggestion.text}
              </p>
            </button>
          );
        })}
      </div>

      <Card className="mx-auto max-w-3xl p-2">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                askAI(input);
              }
            }}
            placeholder="Ask CommerceOS anything..."
            className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
          />

          <button
            onClick={() => askAI(input)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400 text-slate-950 transition hover:bg-cyan-300"
          >
            <ArrowUp size={17} />
          </button>
        </div>
      </Card>
    </div>
  );
}