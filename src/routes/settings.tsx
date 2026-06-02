import { createFileRoute } from "@tanstack/react-router";
import { FuelPanel } from "@/components/FuelPanel";
import { RoutePanel } from "@/components/RoutePanel";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Ustawienia" },
      { name: "description", content: "Ustawienia trasy, cen paliwa i spalania aut." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6 animate-[fade-in_0.4s_ease-out]">
      <h1 className="font-display text-3xl sm:text-4xl uppercase tracking-widest">
        Ustawienia <span className="text-blood">trasy i paliwa</span>
      </h1>
      <div className="grid gap-6 md:grid-cols-2">
        <RoutePanel />
        <FuelPanel />
      </div>
    </div>
  );
}
