import { createFileRoute } from "@tanstack/react-router";
import { HistoryTable } from "@/components/HistoryTable";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Historia" },
      { name: "description", content: "Pełna historia przejazdów do akademii." },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl sm:text-4xl uppercase tracking-widest">
        Dziennik <span className="text-amber">przejazdów</span>
      </h1>
      <HistoryTable />
    </div>
  );
}
