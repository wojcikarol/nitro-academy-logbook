import { createFileRoute } from "@tanstack/react-router";
import { DriverForm } from "@/components/DriverForm";
import { useStore } from "@/lib/store";
import { Users } from "lucide-react";

export const Route = createFileRoute("/drivers")({
  head: () => ({
    meta: [
      { title: "Kierowcy" },
      { name: "description", content: "Lista kierowców i formularz dodawania nowego." },
    ],
  }),
  component: DriversPage,
});

function DriversPage() {
  const { users, trips } = useStore();
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1fr] animate-[fade-in_0.4s_ease-out]">
      <DriverForm />
      <section className="glass rounded-xl p-5" aria-labelledby="drivers-list-title">
        <header className="flex items-center gap-2 mb-4">
          <Users className="h-4 w-4 text-amber" aria-hidden />
          <h3 id="drivers-list-title" className="font-display text-lg uppercase tracking-widest">
            Kierowcy
          </h3>
        </header>
        <ul className="divide-y divide-border/60">
          {users.map((u) => {
            const count = trips.filter((t) => t.userId === u.id).length;
            return (
              <li key={u.id} className="flex items-center justify-between py-2.5">
                <div>
                  <div className="font-medium">{u.name}</div>
                  <div className="text-xs text-muted-foreground">{u.handle}</div>
                </div>
                <div className="font-mono text-sm text-amber">{count} przej.</div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
