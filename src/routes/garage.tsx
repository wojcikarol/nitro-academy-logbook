import { createFileRoute } from "@tanstack/react-router";
import { CarFront, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { CarForm } from "@/components/CarForm";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/garage")({
  head: () => ({
    meta: [
      { title: "Garaż" },
      { name: "description", content: "Twoja kolekcja aut. Dodawaj, usuwaj i oznaczaj ulubione." },
    ],
  }),
  component: GaragePage,
});

function GaragePage() {
  const { cars, users, toggleFavorite, isFavorite, removeCar, selectCar, trips } = useStore();

  const handleRemoveCar = async (id: string, name: string) => {
    if (cars.length <= 1) {
      toast.error("Zostaw przynajmniej jedno auto", {
        description: "Pulpit potrzebuje auta do zapisywania przejazdów.",
      });
      return;
    }

    const confirmed = window.confirm(
      `Czy na pewno chcesz usunąć pojazd "${name}"?\n\nTej operacji nie da się cofnąć.`,
    );

    if (!confirmed) return;

    try {
      await removeCar(id);

      toast.success("Auto usunięte", {
        description: name,
      });
    } catch (error) {
      toast.error("Nie udało się usunąć auta", {
        description: (error as Error).message,
      });
    }
  };

  return (
    <div className="space-y-6 animate-[fade-in_0.4s_ease-out]">
      <h1 className="font-display text-3xl sm:text-4xl uppercase tracking-widest">
        Twój <span className="text-blood">garaż</span>
      </h1>

      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
        <CarForm />

        <section className="glass rounded-sm p-5" aria-labelledby="garage-list-title">
          <header className="flex items-center gap-2 mb-4">
            <CarFront className="h-4 w-4 text-amber" aria-hidden />

            <h3 id="garage-list-title" className="font-display text-lg uppercase tracking-widest">
              Kolekcja
            </h3>

            <span className="ml-auto text-xs text-muted-foreground font-mono">
              {cars.length} aut
            </span>
          </header>

          {cars.length === 0 ? (
            <div className="rounded-sm border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              Brak aut w garażu. Dodaj nowe auto formularzem po lewej stronie.
            </div>
          ) : (
            <ul className="grid gap-2.5">
              {cars.map((c) => {
                const owner = users.find((u) => u.id === c.ownerId);
                const count = trips.filter((t) => t.carId === c.id).length;
                const fav = isFavorite(c.id);

                return (
                  <li
                    key={c.id}
                    className="group relative flex items-center gap-3 rounded-sm border border-border/70 bg-secondary/30 hover:bg-secondary/55 px-3 py-2 transition-all hover:translate-x-0.5"
                  >
                    <button
                      type="button"
                      onClick={() => selectCar(c.id)}
                      className="flex items-center gap-3 flex-1 text-left min-w-0"
                      aria-label={`Wybierz ${c.name}`}
                    >
                      <img
                        src={c.image}
                        alt=""
                        width={64}
                        height={36}
                        loading="lazy"
                        className="h-10 w-16 object-contain drop-shadow-[0_6px_8px_oklch(0_0_0/0.5)]"
                      />

                      <div className="min-w-0">
                        <div className="font-medium truncate">{c.name}</div>

                        <div className="text-[11px] text-muted-foreground truncate">
                          {owner?.name ?? "—"} • {c.fuel} • {c.consumption} l/100km • {count} przej.
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(c.id)}
                      aria-label={fav ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
                      aria-pressed={fav}
                      className="h-9 w-9 grid place-items-center rounded-sm border border-border hover:bg-secondary/70 transition active:scale-95"
                    >
                      <Star
                        className={`h-4 w-4 transition ${
                          fav ? "fill-amber text-amber" : "text-steel"
                        }`}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemoveCar(c.id, c.name)}
                      aria-label={`Usuń ${c.name}`}
                      className="h-9 w-9 grid place-items-center rounded-sm border border-destructive/40 text-destructive hover:bg-destructive/15 transition active:scale-95"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <p className="mt-4 text-[11px] text-muted-foreground">
            Ulubione auta trafiają na początek karuzeli na pulpicie. Kliknij kosz, aby usunąć pojazd
            z kolekcji. Ostatnie auto zostaje w garażu.
          </p>
        </section>
      </div>
    </div>
  );
}
