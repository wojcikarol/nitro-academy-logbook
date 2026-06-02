import { W as jsxRuntimeExports, r as reactExports } from "./server-CdExPFI1.js";
import { c as createLucideIcon, u as useStore, t as toast } from "./router-C6ta74Ce.js";
import { F as Fuel, P as Plus, M as MapPin } from "./plus-B-qxtCqG.js";
import { T as Trash2 } from "./trash-2-CC-fahBd.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["circle", { cx: "6", cy: "19", r: "3", key: "1kj8tv" }],
  ["path", { d: "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15", key: "1d8sl" }],
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }]
];
const Route = createLucideIcon("route", __iconNode);
function FuelPanel() {
  const { fuelPrices, setFuelPrice, cars, setConsumption, routeDistance } = useStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass rounded-xl p-5", "aria-labelledby": "fuel-title", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center gap-2 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Fuel, { className: "h-4 w-4 text-amber", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { id: "fuel-title", className: "font-display text-lg uppercase tracking-widest", children: "Panel paliwa" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PriceField,
        {
          label: "Benzyna PB95",
          value: fuelPrices.benzyna,
          onChange: (v) => setFuelPrice("benzyna", v)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PriceField,
        {
          label: "Diesel ON",
          value: fuelPrices.diesel,
          onChange: (v) => setFuelPrice("diesel", v)
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-widest text-muted-foreground", children: "Spalanie aut (l/100km)" }),
      cars.map((c) => {
        const inputId = `cons-${c.id}`;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: inputId, className: "flex-1 text-sm truncate cursor-pointer", children: c.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground w-14", children: c.fuel }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: inputId,
              type: "number",
              step: "0.1",
              min: "0",
              value: c.consumption,
              onChange: (e) => {
                const value = parseFloat(e.target.value);
                if (Number.isFinite(value) && value > 0) {
                  setConsumption(c.id, value);
                }
              },
              className: "w-20 h-9 rounded-md bg-input/80 border border-border px-2 text-right font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            }
          )
        ] }, c.id);
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-[11px] text-muted-foreground", children: [
      "Koszt = (spalanie / 100) × ",
      routeDistance.toFixed(1),
      " km × cena."
    ] })
  ] });
}
function PriceField({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "number",
          step: "0.01",
          min: "0",
          value,
          onChange: (e) => onChange(Math.max(0, parseFloat(e.target.value) || 0)),
          className: "w-full h-10 rounded-md bg-input/80 border border-border px-3 pr-10 font-mono focus:outline-none focus:ring-2 focus:ring-ring"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground", children: "zł/l" })
    ] })
  ] });
}
function RoutePanel() {
  const { routes, selectedRouteId, routeDistance, selectRoute, addRoute, removeRoute, trips } = useStore();
  const [name, setName] = reactExports.useState("");
  const [distance, setDistance] = reactExports.useState("");
  const onAddRoute = async () => {
    const trimmedName = name.trim();
    const parsedDistance = Number(distance);
    if (trimmedName.length < 2) {
      toast.error("Podaj nazwę trasy", {
        description: "Nazwa powinna mieć minimum 2 znaki."
      });
      return;
    }
    if (!Number.isFinite(parsedDistance) || parsedDistance <= 0) {
      toast.error("Podaj poprawną długość trasy", {
        description: "Długość musi być większa od 0 km."
      });
      return;
    }
    try {
      const route = await addRoute({
        name: trimmedName,
        distance: parsedDistance
      });
      setName("");
      setDistance("");
      toast.success("Trasa dodana", {
        description: `${route.name} • ${route.distance.toFixed(1)} km`
      });
    } catch (error) {
      toast.error("Nie udało się dodać trasy", {
        description: error.message
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass rounded-sm p-5", "aria-labelledby": "route-panel-title", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center gap-2 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { className: "h-4 w-4 text-blood", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { id: "route-panel-title", className: "font-display text-lg uppercase tracking-widest", children: "Trasy" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-sm border border-border bg-secondary/20 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-[1fr_140px_auto]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-widest text-muted-foreground", children: "Nazwa trasy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "np. Dom → Uczelnia",
              className: "h-11 rounded-sm bg-input border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
              "aria-label": "Nazwa nowej trasy"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-widest text-muted-foreground", children: "Długość" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                step: "0.1",
                min: "0.1",
                value: distance,
                onChange: (e) => setDistance(e.target.value),
                placeholder: "0",
                className: "h-11 w-full rounded-sm bg-input border border-border px-3 pr-10 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring",
                "aria-label": "Długość nowej trasy w kilometrach"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground", children: "km" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onAddRoute,
            className: "h-11 mt-auto inline-flex items-center justify-center gap-2 rounded-sm px-4 font-display text-base uppercase tracking-[0.16em] bg-primary text-primary-foreground hover:brightness-110 active:brightness-95 transition",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4", "aria-hidden": true }),
              "Dodaj"
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-widest text-muted-foreground", children: "Zapisane trasy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
            "Aktualnie:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground", children: [
              routeDistance.toFixed(1),
              " km"
            ] })
          ] })
        ] }),
        routes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-sm border border-dashed border-border p-4 text-sm text-muted-foreground", children: "Nie masz jeszcze zapisanych tras." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-2", children: routes.map((route) => {
          const isSelected = selectedRouteId === route.id;
          const isDefaultRoute = route.id.startsWith("r") && !route.id.startsWith("r_");
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "flex items-center justify-between gap-3 rounded-sm border border-border bg-secondary/20 px-3 py-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => selectRoute(route.id),
                    className: "min-w-0 flex flex-1 items-center gap-2 text-left",
                    "aria-label": `Wybierz trasę ${route.name}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        MapPin,
                        {
                          className: `h-4 w-4 shrink-0 ${isSelected ? "text-amber" : "text-muted-foreground"}`,
                          "aria-hidden": true
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-sm font-medium", children: route.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-xs text-muted-foreground font-mono", children: [
                          route.distance.toFixed(1),
                          " km"
                        ] })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-sm bg-amber/10 px-2 py-1 text-[10px] uppercase tracking-widest text-amber", children: "Wybrana" }),
                  !isDefaultRoute && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: async () => {
                        try {
                          await removeRoute(route.id);
                          toast.success("Trasa usunięta", {
                            description: route.name
                          });
                        } catch (error) {
                          toast.error("Nie udało się usunąć trasy", {
                            description: error.message
                          });
                        }
                      },
                      className: "h-8 w-8 grid place-items-center rounded-sm border border-border hover:bg-destructive/10 hover:text-destructive transition",
                      "aria-label": `Usuń trasę ${route.name}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5", "aria-hidden": true })
                    }
                  )
                ] })
              ]
            },
            route.id
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
        "W panelu głównym możesz wybrać jedną z zapisanych tras albo wpisać własną długość. Wcześniejsze przejazdy zachowują dystans z momentu zapisu. Liczba przejazdów:",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: trips.length }),
        "."
      ] })
    ] })
  ] });
}
function SettingsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-[fade-in_0.4s_ease-out]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl sm:text-4xl uppercase tracking-widest", children: [
      "Ustawienia ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blood", children: "trasy i paliwa" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RoutePanel, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FuelPanel, {})
    ] })
  ] });
}
export {
  SettingsPage as component
};
