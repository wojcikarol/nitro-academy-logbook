import { Fuel } from "lucide-react";
import { useStore } from "@/lib/store";

export function FuelPanel() {
  const { fuelPrices, setFuelPrice, cars, setConsumption, routeDistance } = useStore();
  return (
    <section className="glass rounded-xl p-5" aria-labelledby="fuel-title">
      <header className="flex items-center gap-2 mb-4">
        <Fuel className="h-4 w-4 text-amber" aria-hidden />
        <h3 id="fuel-title" className="font-display text-lg uppercase tracking-widest">
          Panel paliwa
        </h3>
      </header>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <PriceField
          label="Benzyna PB95"
          value={fuelPrices.benzyna}
          onChange={(v) => setFuelPrice("benzyna", v)}
        />
        <PriceField
          label="Diesel ON"
          value={fuelPrices.diesel}
          onChange={(v) => setFuelPrice("diesel", v)}
        />
      </div>

      <div className="space-y-2">
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
          Spalanie aut (l/100km)
        </div>
        {cars.map((c) => {
          const inputId = `cons-${c.id}`;
          return (
            <div key={c.id} className="flex items-center gap-3">
              <label htmlFor={inputId} className="flex-1 text-sm truncate cursor-pointer">
                {c.name}
              </label>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground w-14">
                {c.fuel}
              </span>
              <input
                id={inputId}
                type="number"
                step="0.1"
                min="0"
                value={c.consumption}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (Number.isFinite(value) && value > 0) {
                    setConsumption(c.id, value);
                  }
                }}
                className="w-20 h-9 rounded-md bg-input/80 border border-border px-2 text-right font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-[11px] text-muted-foreground">
        Koszt = (spalanie / 100) × {routeDistance.toFixed(1)} km × cena.
      </p>
    </section>
  );
}

function PriceField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="relative">
        <input
          type="number"
          step="0.01"
          min="0"
          value={value}
          onChange={(e) => onChange(Math.max(0, parseFloat(e.target.value) || 0))}
          className="w-full h-10 rounded-md bg-input/80 border border-border px-3 pr-10 font-mono focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
          zł/l
        </span>
      </div>
    </label>
  );
}
