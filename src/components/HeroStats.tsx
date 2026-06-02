import { Activity, Calendar, Clock, Coins, MapPin, Trophy } from "lucide-react";
import { useStore } from "@/lib/store";

const DAY = 24 * 60 * 60 * 1000;

export function HeroStats() {
  const { trips, costOfTrip, users, status, routeDistance, selectedRoute, isCustomRoute } =
    useStore();

  const now = Date.now();

  const dayCount = trips.filter((t) => now - t.timestamp < DAY).length;
  const weekCount = trips.filter((t) => now - t.timestamp < 7 * DAY).length;
  const totalKm = trips.reduce((s, t) => s + t.distance, 0);
  const totalCost = trips.reduce((s, t) => s + costOfTrip(t.carId, t.distance), 0);

  const top = users
    .map((u) => ({
      user: u,
      count: trips.filter((t) => t.userId === u.id).length,
    }))
    .sort((a, b) => b.count - a.count)[0];

  const routeName = isCustomRoute ? "Własna trasa" : (selectedRoute?.name ?? "Trasa");

  if (status === "loading") {
    return (
      <section className="glass rounded-sm p-6 text-center text-muted-foreground" aria-busy="true">
        <span className="inline-block h-5 w-5 rounded-full border-2 border-current border-t-transparent animate-spin mr-2 align-middle" />
        Wczytywanie statystyk…
      </section>
    );
  }

  return (
    <section aria-labelledby="hero-stats-title" className="grid gap-3">
      <header className="flex items-center gap-2">
        <Activity className="h-4 w-4 text-blood" aria-hidden />

        <h2 id="hero-stats-title" className="font-display text-lg uppercase tracking-widest">
          Pulpit
        </h2>

        <span className="ml-auto max-w-[55%] truncate text-right text-[11px] text-muted-foreground font-mono sm:max-w-none">
          {routeName}: {routeDistance.toFixed(1)} km
        </span>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Big
          icon={<Activity className="h-3.5 w-3.5" />}
          label="Wszystkich"
          value={String(trips.length)}
          accent="amber"
        />

        <Big
          icon={<MapPin className="h-3.5 w-3.5" />}
          label="Łącznie km"
          value={totalKm.toFixed(1)}
          suffix="km"
          accent="amber"
        />

        <Big
          icon={<Coins className="h-3.5 w-3.5" />}
          label="Wydatki"
          value={totalCost.toFixed(2)}
          suffix="zł"
          accent="blood"
        />

        <Big
          icon={<Trophy className="h-3.5 w-3.5" />}
          label="Lider"
          value={top?.user?.name ?? "—"}
          suffix={top?.count ? `${top.count}×` : ""}
          accent="amber"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Big icon={<Clock className="h-3.5 w-3.5" />} label="Dziś" value={String(dayCount)} small />

        <Big
          icon={<Calendar className="h-3.5 w-3.5" />}
          label="7 dni"
          value={String(weekCount)}
          small
        />
      </div>
    </section>
  );
}

function Big({
  icon,
  label,
  value,
  suffix,
  accent,
  small,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  suffix?: string;
  accent?: "amber" | "blood";
  small?: boolean;
}) {
  const tone =
    accent === "blood" ? "text-blood" : accent === "amber" ? "text-amber" : "text-foreground";

  return (
    <div className="glass rounded-sm px-4 py-3.5 hairline">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
        {icon} {label}
      </div>

      <div
        className={`font-display ${small ? "text-2xl" : "text-2xl sm:text-3xl"} mt-1 min-w-0 truncate ${tone}`}
        title={value}
      >
        {value}
        {suffix && <span className="text-xs ml-1.5 text-muted-foreground font-sans">{suffix}</span>}
      </div>
    </div>
  );
}
