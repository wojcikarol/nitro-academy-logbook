import { useEffect, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Fuel,
  Gauge as GaugeIcon,
  MapPin,
  Plus,
  Star,
  User as UserIcon,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/lib/store";

const QUICK_DISTANCES = [5, 10, 20, 25, 50];

function toLocalInput(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");

  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
}

export function Garage() {
  const {
    selectedCar,
    selectedUser,
    cars,
    routes,
    selectedRoute,
    selectedRouteId,
    isCustomRoute,
    cycleCar,
    selectCar,
    addTrip,
    costOfTrip,
    trips,
    status,
    routeDistance,
    setRouteDistance,
    selectRoute,
    toggleFavorite,
    isFavorite,
  } = useStore();

  const [animKey, setAnimKey] = useState(0);
  const [flash, setFlash] = useState(false);
  const [tripDate, setTripDate] = useState(() => toLocalInput(new Date()));
  const [submitting, setSubmitting] = useState(false);
  const [distanceOpen, setDistanceOpen] = useState(false);
  const [customDistance, setCustomDistance] = useState(String(routeDistance));

  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [selectedCar.id]);

  useEffect(() => {
    setCustomDistance(String(routeDistance));
  }, [routeDistance]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;

      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT")
      ) {
        return;
      }

      if (e.key === "ArrowLeft") cycleCar(-1);
      if (e.key === "ArrowRight") cycleCar(1);
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [cycleCar]);

  const carTrips = trips.filter((t) => t.carId === selectedCar.id);
  const carTripCount = carTrips.length;
  const carKm = carTrips.reduce((sum, trip) => sum + trip.distance, 0);
  const totalCost = carTrips.reduce((sum, trip) => sum + costOfTrip(trip.carId, trip.distance), 0);

  const routeLabel = isCustomRoute ? "Własny dystans" : (selectedRoute?.name ?? "Trasa");

  const chooseQuickDistance = (km: number) => {
    setRouteDistance(km);
    setCustomDistance(String(km));
    setDistanceOpen(false);

    toast.success("Dystans ustawiony", {
      description: `${km.toFixed(1)} km`,
    });
  };

  const saveCustomDistance = () => {
    const km = Number(customDistance);

    if (!Number.isFinite(km) || km <= 0) {
      toast.error("Podaj poprawny dystans", {
        description: "Dystans musi być większy od 0 km.",
      });
      return;
    }

    setRouteDistance(km);
    setDistanceOpen(false);

    toast.success("Własny dystans ustawiony", {
      description: `${km.toFixed(1)} km`,
    });
  };

  const onAdd = async () => {
    setSubmitting(true);

    const ts = new Date(tripDate).getTime();

    if (Number.isNaN(ts)) {
      toast.error("Niepoprawna data przejazdu");
      setSubmitting(false);
      return;
    }

    if (!Number.isFinite(routeDistance) || routeDistance <= 0) {
      toast.error("Niepoprawna długość trasy", {
        description: "Dystans musi być większy od 0 km.",
      });
      setSubmitting(false);
      return;
    }

    try {
      await new Promise((r) => setTimeout(r, 220));

      await addTrip({ timestamp: ts });

      setFlash(true);
      setTimeout(() => setFlash(false), 700);

      toast.success("Przejazd zapisany", {
        description: `${selectedCar.name} • ${routeLabel} • +${routeDistance.toFixed(1)} km`,
      });
    } catch {
      toast.error("Nie udało się zapisać przejazdu", {
        description: "Sprawdź połączenie z Convex i konfigurację .env.local",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative" aria-labelledby="garage-title">
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-md">
        <span className="speed-line top-[28%] w-full" style={{ animationDelay: "0s" }} />
        <span className="speed-line top-[72%] w-full" style={{ animationDelay: "1.2s" }} />
      </div>

      <div className="glass relative rounded-md p-4 sm:p-7 overflow-hidden">
        <div className="mb-5 grid gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-blood" aria-hidden />
              <span>Trasa</span>
              <span className="text-foreground font-semibold normal-case tracking-normal">
                {routeLabel}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setDistanceOpen((v) => !v)}
              aria-expanded={distanceOpen}
              className="inline-flex items-center gap-2 rounded-sm border border-border bg-secondary/40 px-3 py-2 font-mono text-sm hover:bg-secondary/70 transition"
            >
              <span className="text-muted-foreground">DYSTANS</span>
              <span className="text-amber font-semibold">{routeDistance.toFixed(1)} km</span>
              {distanceOpen ? (
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              ) : (
                <Plus className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </button>
          </div>

          {distanceOpen && (
            <div className="rounded-sm border border-border bg-secondary/25 p-3 grid gap-3">
              {routes.length > 0 && (
                <label className="grid gap-1">
                  <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    Wybierz zapisaną trasę
                  </span>

                  <select
                    value={selectedRouteId}
                    onChange={(e) => {
                      selectRoute(e.target.value);
                      setDistanceOpen(false);
                    }}
                    className="h-10 rounded-sm bg-input border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    aria-label="Wybierz zapisaną trasę"
                  >
                    {routes.map((route) => (
                      <option key={route.id} value={route.id}>
                        {route.name} — {route.distance.toFixed(1)} km
                      </option>
                    ))}
                    <option value="custom">Własny dystans</option>
                  </select>
                </label>
              )}

              <div className="grid gap-1">
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  Szybkie opcje
                </span>

                <div className="flex flex-wrap gap-2">
                  {QUICK_DISTANCES.map((km) => (
                    <button
                      key={km}
                      type="button"
                      onClick={() => chooseQuickDistance(km)}
                      className={[
                        "rounded-sm border px-3 py-2 font-mono text-sm transition",
                        Math.abs(routeDistance - km) < 0.01
                          ? "border-amber bg-amber/10 text-amber"
                          : "border-border bg-input hover:bg-secondary/70",
                      ].join(" ")}
                    >
                      {km.toFixed(km % 1 === 0 ? 0 : 1)} km
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-1">
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  Wpisz ręcznie
                </span>

                <div className="grid grid-cols-[1fr_auto] gap-2">
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={customDistance}
                      onChange={(e) => setCustomDistance(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveCustomDistance();
                      }}
                      className="h-10 w-full rounded-sm bg-input border border-border px-3 pr-10 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      aria-label="Wpisz własny dystans w kilometrach"
                      placeholder="np. 12.5"
                    />

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      km
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={saveCustomDistance}
                    className="h-10 inline-flex items-center justify-center gap-2 rounded-sm px-4 bg-primary text-primary-foreground hover:brightness-110 active:brightness-95 transition"
                  >
                    <Check className="h-4 w-4" />
                    Ustaw
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <h2 id="garage-title" className="sr-only">
          Garaż
        </h2>

        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-6">
          <button
            type="button"
            onClick={() => cycleCar(-1)}
            aria-label="Poprzednie auto"
            className="group h-14 w-10 sm:h-20 sm:w-14 grid place-items-center rounded-sm chrome-border bg-secondary/40 hover:bg-secondary/70 transition active:scale-95"
          >
            <ChevronLeft className="h-5 w-5 text-steel group-hover:text-foreground transition" />
          </button>

          <div className="relative aspect-[16/9] w-full">
            <div
              className="absolute inset-x-6 bottom-2 h-6 rounded-[50%] bg-black/55 blur-xl pointer-events-none"
              aria-hidden
            />

            <div
              key={animKey}
              className="absolute inset-0 grid place-items-center"
              style={{ animation: "var(--animate-slide-in)" }}
            >
              <img
                src={selectedCar.image}
                alt={selectedCar.name}
                width={1024}
                height={576}
                className="max-h-full w-auto object-contain drop-shadow-[0_24px_18px_oklch(0_0_0/0.55)] transition-transform duration-300 hover:scale-[1.03]"
              />
            </div>

            <button
              type="button"
              onClick={() => toggleFavorite(selectedCar.id)}
              aria-label={isFavorite(selectedCar.id) ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
              aria-pressed={isFavorite(selectedCar.id)}
              className="absolute top-2 right-2 h-9 w-9 grid place-items-center rounded-sm chrome-border bg-secondary/60 hover:bg-secondary/90 transition active:scale-95"
            >
              <Star
                className={`h-4 w-4 transition ${
                  isFavorite(selectedCar.id) ? "fill-amber text-amber" : "text-steel"
                }`}
              />
            </button>

            {flash && (
              <div
                className="absolute inset-0 grid place-items-center pointer-events-none"
                style={{ animation: "var(--animate-flash)" }}
              >
                <div className="font-display text-3xl sm:text-5xl text-amber tracking-widest">
                  +{routeDistance.toFixed(1)} KM
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => cycleCar(1)}
            aria-label="Następne auto"
            className="group h-14 w-10 sm:h-20 sm:w-14 grid place-items-center rounded-sm chrome-border bg-secondary/40 hover:bg-secondary/70 transition active:scale-95"
          >
            <ChevronRight className="h-5 w-5 text-steel group-hover:text-foreground transition" />
          </button>
        </div>

        <div className="mt-4 text-center">
          <h3 className="font-display text-3xl sm:text-4xl uppercase text-foreground">
            {selectedCar.name}
          </h3>

          <div className="mt-1.5 inline-flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
            <UserIcon className="h-3.5 w-3.5" aria-hidden />
            <span>Kierowca:</span>
            <span className="text-foreground font-semibold">{selectedUser.name}</span>
            <span className="text-steel">{selectedUser.handle}</span>
          </div>
        </div>

        <dl className="mt-6 grid gap-2 sm:grid-cols-3 sm:gap-4">
          <Stat label="Przejazdy" value={String(carTripCount)} Icon={GaugeIcon} />
          <Stat label="Kilometry" value={`${carKm.toFixed(1)}`} suffix="km" Icon={MapPin} />
          <Stat label="Wydatki" value={totalCost.toFixed(2)} suffix="zł" Icon={Fuel} />
        </dl>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onAdd();
          }}
          className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]"
          aria-label="Dodaj przejazd"
        >
          <label className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5">
              <CalendarDays className="h-3 w-3" /> Data i godzina
            </span>

            <input
              type="datetime-local"
              value={tripDate}
              onChange={(e) => setTripDate(e.target.value)}
              className="h-12 rounded-sm bg-input border border-border px-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Data przejazdu"
              required
            />
          </label>

          <button
            type="submit"
            disabled={submitting || status !== "success"}
            className="h-12 mt-auto inline-flex items-center justify-center gap-2 rounded-sm px-6 font-display text-xl uppercase tracking-[0.2em] bg-primary text-primary-foreground hover:brightness-110 active:brightness-95 transition disabled:opacity-60 disabled:cursor-not-allowed plate"
          >
            {submitting ? (
              <span
                className="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
                aria-hidden
              />
            ) : (
              <Plus className="h-5 w-5" />
            )}

            <span>{submitting ? "Zapisuję…" : "Dodaj przejazd"}</span>
          </button>
        </form>

        <div
          className="mt-5 flex items-center justify-center gap-2.5"
          role="tablist"
          aria-label="Wybór auta"
        >
          {cars.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={c.id === selectedCar.id}
              onClick={() => selectCar(c.id)}
              aria-label={`Wybierz ${c.name}${isFavorite(c.id) ? " (ulubione)" : ""}`}
              className={[
                "h-2 rounded-full transition-all",
                c.id === selectedCar.id
                  ? "w-8 bg-blood"
                  : isFavorite(c.id)
                    ? "w-3 bg-amber/80 hover:bg-amber"
                    : "w-2 bg-muted hover:bg-muted-foreground",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  suffix,
  Icon,
}: {
  label: string;
  value: string;
  suffix?: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="glass rounded-sm px-3 py-3 sm:px-4 sm:py-4">
      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">
        <Icon className="h-3 w-3" /> {label}
      </div>

      <div className="font-display text-2xl sm:text-3xl mt-1 min-w-0 truncate text-foreground">
        {value}
        {suffix && <span className="text-xs sm:text-sm ml-1 text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );
}
