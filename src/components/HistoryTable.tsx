import { useState } from "react";
import { History, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/lib/store";

export function HistoryTable({ limit }: { limit?: number }) {
  const { trips, cars, users, removeTrip, costOfTrip, status } = useStore();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const rows = limit ? trips.slice(0, limit) : trips;

  const handleRemoveTrip = async (id: string, timestamp: number) => {
    try {
      setDeletingId(id);

      await removeTrip(id);

      toast.success("Przejazd usunięty", {
        description: new Date(timestamp).toLocaleString("pl-PL"),
      });
    } catch {
      toast.error("Nie udało się usunąć przejazdu", {
        description: "Sprawdź połączenie z Convex i konfigurację .env.local",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="glass rounded-xl p-4 sm:p-5" aria-labelledby="history-title">
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-amber" />
          <h3 id="history-title" className="font-display text-lg uppercase tracking-widest">
            Historia przejazdów
          </h3>
        </div>

        <span className="text-xs text-muted-foreground">{trips.length} wpis(ów)</span>
      </header>

      {status === "loading" ? (
        <div className="py-10 text-center text-muted-foreground text-sm" aria-busy="true">
          Wczytywanie…
        </div>
      ) : rows.length === 0 ? (
        <div className="py-10 text-center text-muted-foreground text-sm">
          Brak przejazdów. Po dodaniu pojawią się tutaj.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <caption className="sr-only">Lista przejazdów</caption>

            <thead>
              <tr className="text-left text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
                <th scope="col" className="py-2 pr-3">
                  Data
                </th>
                <th scope="col" className="py-2 pr-3">
                  Auto
                </th>
                <th scope="col" className="py-2 pr-3">
                  Kierowca
                </th>
                <th scope="col" className="py-2 pr-3 text-right">
                  KM
                </th>
                <th scope="col" className="py-2 pr-3 text-right">
                  Koszt
                </th>
                <th scope="col" className="py-2 w-10">
                  <span className="sr-only">Akcje</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((t) => {
                const car = cars.find((c) => c.id === t.carId);
                const user = users.find((u) => u.id === t.userId);
                const isDeleting = deletingId === t.id;

                return (
                  <tr
                    key={t.id}
                    className="border-b border-border/40 hover:bg-secondary/40 transition-colors"
                  >
                    <td className="py-2 pr-3 font-mono text-xs sm:text-sm">
                      {new Date(t.timestamp).toLocaleString("pl-PL")}
                    </td>

                    <td className="py-2 pr-3 font-medium">{car?.name ?? "—"}</td>

                    <td className="py-2 pr-3 text-muted-foreground">{user?.name ?? "—"}</td>

                    <td className="py-2 pr-3 text-right font-mono">{t.distance.toFixed(1)}</td>

                    <td className="py-2 pr-3 text-right font-mono text-amber">
                      {costOfTrip(t.carId, t.distance).toFixed(2)} zł
                    </td>

                    <td className="py-2 text-right">
                      <button
                        type="button"
                        onClick={() => handleRemoveTrip(t.id, t.timestamp)}
                        disabled={isDeleting}
                        aria-label={`Usuń przejazd z ${new Date(t.timestamp).toLocaleString(
                          "pl-PL",
                        )}`}
                        className="h-8 w-8 inline-grid place-items-center rounded-md border border-destructive/40 text-destructive hover:bg-destructive/15 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isDeleting ? (
                          <span
                            className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
                            aria-hidden
                          />
                        ) : (
                          <Trash2 className="h-4 w-4" aria-hidden />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
