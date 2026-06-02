import { useState } from "react";
import { MapPin, Plus, Route as RouteIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/lib/store";

export function RoutePanel() {
  const { routes, selectedRouteId, routeDistance, selectRoute, addRoute, removeRoute, trips } =
    useStore();

  const [name, setName] = useState("");
  const [distance, setDistance] = useState("");

  const onAddRoute = async () => {
    const trimmedName = name.trim();
    const parsedDistance = Number(distance);

    if (trimmedName.length < 2) {
      toast.error("Podaj nazwę trasy", {
        description: "Nazwa powinna mieć minimum 2 znaki.",
      });
      return;
    }

    if (!Number.isFinite(parsedDistance) || parsedDistance <= 0) {
      toast.error("Podaj poprawną długość trasy", {
        description: "Długość musi być większa od 0 km.",
      });
      return;
    }

    try {
      const route = await addRoute({
        name: trimmedName,
        distance: parsedDistance,
      });

      setName("");
      setDistance("");

      toast.success("Trasa dodana", {
        description: `${route.name} • ${route.distance.toFixed(1)} km`,
      });
    } catch (error) {
      toast.error("Nie udało się dodać trasy", {
        description: (error as Error).message,
      });
    }
  };

  return (
    <section className="glass rounded-sm p-5" aria-labelledby="route-panel-title">
      <header className="flex items-center gap-2 mb-4">
        <RouteIcon className="h-4 w-4 text-blood" aria-hidden />
        <h3 id="route-panel-title" className="font-display text-lg uppercase tracking-widest">
          Trasy
        </h3>
      </header>

      <div className="grid gap-4">
        <div className="rounded-sm border border-border bg-secondary/20 p-4">
          <div className="grid gap-3 sm:grid-cols-[1fr_140px_auto]">
            <label className="flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                Nazwa trasy
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="np. Dom → Uczelnia"
                className="h-11 rounded-sm bg-input border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Nazwa nowej trasy"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                Długość
              </span>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  placeholder="0"
                  className="h-11 w-full rounded-sm bg-input border border-border px-3 pr-10 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="Długość nowej trasy w kilometrach"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  km
                </span>
              </div>
            </label>

            <button
              type="button"
              onClick={onAddRoute}
              className="h-11 mt-auto inline-flex items-center justify-center gap-2 rounded-sm px-4 font-display text-base uppercase tracking-[0.16em] bg-primary text-primary-foreground hover:brightness-110 active:brightness-95 transition"
            >
              <Plus className="h-4 w-4" aria-hidden />
              Dodaj
            </button>
          </div>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Zapisane trasy
            </p>
            <p className="text-[11px] text-muted-foreground">
              Aktualnie:{" "}
              <span className="font-mono text-foreground">{routeDistance.toFixed(1)} km</span>
            </p>
          </div>

          {routes.length === 0 ? (
            <div className="rounded-sm border border-dashed border-border p-4 text-sm text-muted-foreground">
              Nie masz jeszcze zapisanych tras.
            </div>
          ) : (
            <ul className="grid gap-2">
              {routes.map((route) => {
                const isSelected = selectedRouteId === route.id;
                const isDefaultRoute = route.id.startsWith("r") && !route.id.startsWith("r_");

                return (
                  <li
                    key={route.id}
                    className="flex items-center justify-between gap-3 rounded-sm border border-border bg-secondary/20 px-3 py-2"
                  >
                    <button
                      type="button"
                      onClick={() => selectRoute(route.id)}
                      className="min-w-0 flex flex-1 items-center gap-2 text-left"
                      aria-label={`Wybierz trasę ${route.name}`}
                    >
                      <MapPin
                        className={`h-4 w-4 shrink-0 ${isSelected ? "text-amber" : "text-muted-foreground"}`}
                        aria-hidden
                      />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">{route.name}</span>
                        <span className="block text-xs text-muted-foreground font-mono">
                          {route.distance.toFixed(1)} km
                        </span>
                      </span>
                    </button>

                    <div className="flex items-center gap-2">
                      {isSelected && (
                        <span className="rounded-sm bg-amber/10 px-2 py-1 text-[10px] uppercase tracking-widest text-amber">
                          Wybrana
                        </span>
                      )}

                      {!isDefaultRoute && (
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              await removeRoute(route.id);
                              toast.success("Trasa usunięta", {
                                description: route.name,
                              });
                            } catch (error) {
                              toast.error("Nie udało się usunąć trasy", {
                                description: (error as Error).message,
                              });
                            }
                          }}
                          className="h-8 w-8 grid place-items-center rounded-sm border border-border hover:bg-destructive/10 hover:text-destructive transition"
                          aria-label={`Usuń trasę ${route.name}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden />
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <p className="text-[11px] text-muted-foreground">
          W panelu głównym możesz wybrać jedną z zapisanych tras albo wpisać własną długość.
          Wcześniejsze przejazdy zachowują dystans z momentu zapisu. Liczba przejazdów:{" "}
          <span className="font-mono text-foreground">{trips.length}</span>.
        </p>
      </div>
    </section>
  );
}
