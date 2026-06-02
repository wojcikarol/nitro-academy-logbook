import { Activity, Calendar, Clock, Trophy } from "lucide-react";
import { useStore } from "@/lib/store";
import { rankDrivers } from "@/lib/ranking";
const DAY = 24 * 60 * 60 * 1000;

export function StatsPanel() {
  const { trips, cars, users, costOfTrip, status } = useStore();
  const now = Date.now();
  const dayCount = trips.filter((t) => now - t.timestamp < DAY).length;
  const weekCount = trips.filter((t) => now - t.timestamp < 7 * DAY).length;
  const monthCount = trips.filter((t) => now - t.timestamp < 30 * DAY).length;

  const totalKm = trips.reduce((s, t) => s + t.distance, 0);
  const totalCost = trips.reduce((sum, t) => sum + costOfTrip(t.carId, t.distance), 0);
  const last = trips[0];
  const lastCar = last ? cars.find((c) => c.id === last.carId) : undefined;

  if (status === "loading") {
    return (
      <section className="glass rounded-xl p-6 text-center text-muted-foreground" aria-busy="true">
        <span className="inline-block h-5 w-5 rounded-full border-2 border-current border-t-transparent animate-spin mr-2 align-middle" />
        Wczytywanie statystyk…
      </section>
    );
  }

  return (
    <section className="grid gap-4" aria-labelledby="stats-title">
      <header className="flex items-center gap-2">
        <Activity className="h-4 w-4 text-amber" aria-hidden />
        <h3 id="stats-title" className="font-display text-lg uppercase tracking-widest">
          Statystyki
        </h3>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <BigStat label="Wszystkich" value={trips.length.toString()} />
        <BigStat label="Łącznie km" value={totalKm.toFixed(1)} />
        <BigStat label="Łączny koszt" value={`${totalCost.toFixed(2)} zł`} />
        <BigStat
          label="Średnio /szt."
          value={trips.length ? `${(totalCost / trips.length).toFixed(2)} zł` : "—"}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <BigStat
          label="Dziś"
          value={dayCount.toString()}
          icon={<Clock className="h-3 w-3" />}
          small
        />
        <BigStat
          label="7 dni"
          value={weekCount.toString()}
          icon={<Calendar className="h-3 w-3" />}
          small
        />
        <BigStat
          label="30 dni"
          value={monthCount.toString()}
          icon={<Calendar className="h-3 w-3" />}
          small
        />
      </div>

      <div className="glass rounded-xl p-4">
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">
          Ostatni przejazd
        </div>
        {last && lastCar ? (
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <div className="font-display text-lg">{lastCar.name}</div>
              <div className="text-sm text-muted-foreground">
                {users.find((u) => u.id === last.userId)?.name}
              </div>
            </div>
            <div className="font-mono text-sm text-amber">
              {new Date(last.timestamp).toLocaleString("pl-PL")}
            </div>
          </div>
        ) : (
          <div className="text-muted-foreground text-sm">
            Brak przejazdów. Dodaj pierwszy w garażu.
          </div>
        )}
      </div>

      <Rankings />
    </section>
  );
}

function Rankings() {
  const { trips, users, cars } = useStore();
  const userKm = rankDrivers(users, trips);

  const carRank = cars
    .map((c) => {
      const ts = trips.filter((t) => t.carId === c.id);
      const km = ts.reduce((s, t) => s + t.distance, 0);
      return { car: c, count: ts.length, km };
    })
    .sort((a, b) => {
      const tripDiff = b.count - a.count;
      if (tripDiff !== 0) return tripDiff;

      const kmDiff = b.km - a.km;
      if (kmDiff !== 0) return kmDiff;

      return a.car.name.localeCompare(b.car.name, "pl") || a.car.id.localeCompare(b.car.id);
    });

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="glass rounded-xl p-4">
        <header className="flex items-center gap-2 mb-3">
          <Trophy className="h-4 w-4 text-amber" />
          <h4 className="font-display text-base uppercase tracking-widest">Ranking kierowców</h4>
        </header>
        <ul className="space-y-2">
          {userKm.map((row, i) => (
            <li key={row.user.id} className="flex items-center gap-3">
              <span
                className={`font-display w-6 text-center text-lg ${i === 0 ? "text-amber" : "text-muted-foreground"}`}
              >
                {i + 1}
              </span>
              <span className="flex-1 text-sm font-medium">{row.user.name}</span>
              <span className="text-xs text-muted-foreground">{row.count} przej.</span>
              <span className="font-mono text-sm">{row.km.toFixed(1)} km</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="glass rounded-xl p-4">
        <header className="flex items-center gap-2 mb-3">
          <Trophy className="h-4 w-4 text-steel" />
          <h4 className="font-display text-base uppercase tracking-widest">Ranking aut</h4>
        </header>
        <ul className="space-y-2">
          {carRank.map((row, i) => (
            <li key={row.car.id} className="flex items-center gap-3">
              <span
                className={`font-display w-6 text-center text-lg ${i === 0 ? "text-amber" : "text-muted-foreground"}`}
              >
                {i + 1}
              </span>
              <span className="flex-1 text-sm font-medium truncate">{row.car.name}</span>
              <span className="text-xs text-muted-foreground">{row.km.toFixed(0)} km</span>
              <span className="font-mono text-sm">{row.count}×</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function BigStat({
  label,
  value,
  icon,
  small,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  small?: boolean;
}) {
  return (
    <div className="glass rounded-xl px-3 py-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
        {icon} {label}
      </div>
      <div className={`font-display text-foreground ${small ? "text-xl" : "text-2xl"} mt-1`}>
        {value}
      </div>
    </div>
  );
}
