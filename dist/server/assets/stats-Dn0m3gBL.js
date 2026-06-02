import { W as jsxRuntimeExports } from "./server-CdExPFI1.js";
import { u as useStore, T as Trophy } from "./router-C6ta74Ce.js";
import { A as Activity, C as Clock, a as Calendar, r as rankDrivers } from "./ranking-B4_EqbzT.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const DAY = 24 * 60 * 60 * 1e3;
function StatsPanel() {
  const { trips, cars, users, costOfTrip, status } = useStore();
  const now = Date.now();
  const dayCount = trips.filter((t) => now - t.timestamp < DAY).length;
  const weekCount = trips.filter((t) => now - t.timestamp < 7 * DAY).length;
  const monthCount = trips.filter((t) => now - t.timestamp < 30 * DAY).length;
  const totalKm = trips.reduce((s, t) => s + t.distance, 0);
  const totalCost = trips.reduce((sum, t) => sum + costOfTrip(t.carId, t.distance), 0);
  const last = trips[0];
  const lastCar = last ? cars.find((c) => c.id === last.carId) : void 0;
  if (status === "loading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass rounded-xl p-6 text-center text-muted-foreground", "aria-busy": "true", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-5 w-5 rounded-full border-2 border-current border-t-transparent animate-spin mr-2 align-middle" }),
      "Wczytywanie statystyk…"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4", "aria-labelledby": "stats-title", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4 text-amber", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { id: "stats-title", className: "font-display text-lg uppercase tracking-widest", children: "Statystyki" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BigStat, { label: "Wszystkich", value: trips.length.toString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BigStat, { label: "Łącznie km", value: totalKm.toFixed(1) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BigStat, { label: "Łączny koszt", value: `${totalCost.toFixed(2)} zł` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BigStat,
        {
          label: "Średnio /szt.",
          value: trips.length ? `${(totalCost / trips.length).toFixed(2)} zł` : "—"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BigStat,
        {
          label: "Dziś",
          value: dayCount.toString(),
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
          small: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BigStat,
        {
          label: "7 dni",
          value: weekCount.toString(),
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
          small: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BigStat,
        {
          label: "30 dni",
          value: monthCount.toString(),
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
          small: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-widest text-muted-foreground mb-1", children: "Ostatni przejazd" }),
      last && lastCar ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg", children: lastCar.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: users.find((u) => u.id === last.userId)?.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm text-amber", children: new Date(last.timestamp).toLocaleString("pl-PL") })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-sm", children: "Brak przejazdów. Dodaj pierwszy w garażu." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Rankings, {})
  ] });
}
function Rankings() {
  const { trips, users, cars } = useStore();
  const userKm = rankDrivers(users, trips);
  const carRank = cars.map((c) => {
    const ts = trips.filter((t) => t.carId === c.id);
    const km = ts.reduce((s, t) => s + t.distance, 0);
    return { car: c, count: ts.length, km };
  }).sort((a, b) => b.count - a.count);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4 text-amber" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-base uppercase tracking-widest", children: "Ranking kierowców" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: userKm.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `font-display w-6 text-center text-lg ${i === 0 ? "text-amber" : "text-muted-foreground"}`,
            children: i + 1
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm font-medium", children: row.user.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          row.count,
          " przej."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-sm", children: [
          row.km.toFixed(1),
          " km"
        ] })
      ] }, row.user.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4 text-steel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-base uppercase tracking-widest", children: "Ranking aut" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: carRank.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `font-display w-6 text-center text-lg ${i === 0 ? "text-amber" : "text-muted-foreground"}`,
            children: i + 1
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm font-medium truncate", children: row.car.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          row.km.toFixed(0),
          " km"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-sm", children: [
          row.count,
          "×"
        ] })
      ] }, row.car.id)) })
    ] })
  ] });
}
function BigStat({
  label,
  value,
  icon,
  small
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl px-3 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground", children: [
      icon,
      " ",
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-display text-foreground ${small ? "text-xl" : "text-2xl"} mt-1`, children: value })
  ] });
}
function StatsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-[fade-in_0.4s_ease-out]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl sm:text-4xl uppercase tracking-widest", children: [
      "Centrum ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blood", children: "statystyk" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatsPanel, {})
  ] });
}
export {
  StatsPage as component
};
