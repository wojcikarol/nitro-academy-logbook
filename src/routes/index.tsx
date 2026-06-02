import { createFileRoute, Link } from "@tanstack/react-router";
import { Garage } from "@/components/Garage";
import { HeroStats } from "@/components/HeroStats";
import { HistoryTable } from "@/components/HistoryTable";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Przejazdy" },
      {
        name: "description",
        content: "Główny pulpit: dodaj przejazd i sprawdź najważniejsze statystyki.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="space-y-6 animate-[fade-in_0.4s_ease-out]">
      <Garage />
      <HeroStats />

      <section className="grid gap-3">
        <header className="flex items-center justify-between">
          <h2 className="font-display text-lg uppercase tracking-widest">Ostatnie</h2>
          <Link
            to="/history"
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
          >
            Pełna historia <ArrowRight className="h-3 w-3" />
          </Link>
        </header>
        <HistoryTable limit={5} />
      </section>
    </div>
  );
}
