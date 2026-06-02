import { createFileRoute } from "@tanstack/react-router";
import { StatsPanel } from "@/components/StatsPanel";

export const Route = createFileRoute("/stats")({
  head: () => ({
    meta: [
      { title: "Statystyki" },
      { name: "description", content: "Pełne statystyki, rankingi kierowców i aut." },
    ],
  }),
  component: StatsPage,
});

function StatsPage() {
  return (
    <div className="space-y-6 animate-[fade-in_0.4s_ease-out]">
      <h1 className="font-display text-3xl sm:text-4xl uppercase tracking-widest">
        Centrum <span className="text-blood">statystyk</span>
      </h1>
      <StatsPanel />
    </div>
  );
}
