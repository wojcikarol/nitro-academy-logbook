import { r as reactExports, W as jsxRuntimeExports } from "./server-UNqwmoql.js";
import { c as createLucideIcon, u as useStore, G as Gauge, t as toast, T as Trophy, L as Link } from "./router-C1HWRFUk.js";
import { M as MapPin, P as Plus, F as Fuel } from "./plus-CLitVwxQ.js";
import { X, S as Star } from "./x-BFbMlB8L.js";
import { r as rankDrivers, A as Activity, C as Clock, a as Calendar } from "./ranking-DYE9dbug.js";
import { H as HistoryTable } from "./HistoryTable--mpS54kE.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./trash-2-BWej_0mc.js";
const __iconNode$6 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$6);
const __iconNode$5 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$5);
const __iconNode$4 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$4);
const __iconNode$3 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$3);
const __iconNode$2 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M13.744 17.736a6 6 0 1 1-7.48-7.48", key: "bq4yh3" }],
  ["path", { d: "M15 6h1v4", key: "11y1tn" }],
  ["path", { d: "m6.134 14.768.866-.5 2 3.464", key: "17snzx" }],
  ["circle", { cx: "16", cy: "8", r: "6", key: "14bfc9" }]
];
const Coins = createLucideIcon("coins", __iconNode$1);
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
const QUICK_DISTANCES = [5, 10, 20, 25, 50];
function toLocalInput(d) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}
function Garage() {
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
    isFavorite
  } = useStore();
  const [animKey, setAnimKey] = reactExports.useState(0);
  const [flash, setFlash] = reactExports.useState(false);
  const [tripDate, setTripDate] = reactExports.useState(() => toLocalInput(/* @__PURE__ */ new Date()));
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [distanceOpen, setDistanceOpen] = reactExports.useState(false);
  const [customDistance, setCustomDistance] = reactExports.useState(String(routeDistance));
  reactExports.useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [selectedCar.id]);
  reactExports.useEffect(() => {
    setCustomDistance(String(routeDistance));
  }, [routeDistance]);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      const target = e.target;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT")) {
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
  const routeLabel = isCustomRoute ? "Własny dystans" : selectedRoute?.name ?? "Trasa";
  const chooseQuickDistance = (km) => {
    setRouteDistance(km);
    setCustomDistance(String(km));
    setDistanceOpen(false);
    toast.success("Dystans ustawiony", {
      description: `${km.toFixed(1)} km`
    });
  };
  const saveCustomDistance = () => {
    const km = Number(customDistance);
    if (!Number.isFinite(km) || km <= 0) {
      toast.error("Podaj poprawny dystans", {
        description: "Dystans musi być większy od 0 km."
      });
      return;
    }
    setRouteDistance(km);
    setDistanceOpen(false);
    toast.success("Własny dystans ustawiony", {
      description: `${km.toFixed(1)} km`
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
        description: "Dystans musi być większy od 0 km."
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
        description: `${selectedCar.name} • ${routeLabel} • +${routeDistance.toFixed(1)} km`
      });
    } catch {
      toast.error("Nie udało się zapisać przejazdu", {
        description: "Sprawdź połączenie z Convex i konfigurację .env.local"
      });
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative", "aria-labelledby": "garage-title", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-0 overflow-hidden rounded-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "speed-line top-[28%] w-full", style: { animationDelay: "0s" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "speed-line top-[72%] w-full", style: { animationDelay: "1.2s" } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass relative rounded-md p-4 sm:p-7 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 grid gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 text-blood", "aria-hidden": true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Trasa" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold normal-case tracking-normal", children: routeLabel })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setDistanceOpen((v) => !v),
              "aria-expanded": distanceOpen,
              className: "inline-flex items-center gap-2 rounded-sm border border-border bg-secondary/40 px-3 py-2 font-mono text-sm hover:bg-secondary/70 transition",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "DYSTANS" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber font-semibold", children: [
                  routeDistance.toFixed(1),
                  " km"
                ] }),
                distanceOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5 text-muted-foreground" })
              ]
            }
          )
        ] }),
        distanceOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-sm border border-border bg-secondary/25 p-3 grid gap-3", children: [
          routes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "grid gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-widest text-muted-foreground", children: "Wybierz zapisaną trasę" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: selectedRouteId,
                onChange: (e) => {
                  selectRoute(e.target.value);
                  setDistanceOpen(false);
                },
                className: "h-10 rounded-sm bg-input border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                "aria-label": "Wybierz zapisaną trasę",
                children: [
                  routes.map((route) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: route.id, children: [
                    route.name,
                    " — ",
                    route.distance.toFixed(1),
                    " km"
                  ] }, route.id)),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "custom", children: "Własny dystans" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-widest text-muted-foreground", children: "Szybkie opcje" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: QUICK_DISTANCES.map((km) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => chooseQuickDistance(km),
                className: [
                  "rounded-sm border px-3 py-2 font-mono text-sm transition",
                  Math.abs(routeDistance - km) < 0.01 ? "border-amber bg-amber/10 text-amber" : "border-border bg-input hover:bg-secondary/70"
                ].join(" "),
                children: [
                  km.toFixed(km % 1 === 0 ? 0 : 1),
                  " km"
                ]
              },
              km
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-widest text-muted-foreground", children: "Wpisz ręcznie" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_auto] gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "number",
                    step: "0.1",
                    min: "0.1",
                    value: customDistance,
                    onChange: (e) => setCustomDistance(e.target.value),
                    onKeyDown: (e) => {
                      if (e.key === "Enter") saveCustomDistance();
                    },
                    className: "h-10 w-full rounded-sm bg-input border border-border px-3 pr-10 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                    "aria-label": "Wpisz własny dystans w kilometrach",
                    placeholder: "np. 12.5"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground", children: "km" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: saveCustomDistance,
                  className: "h-10 inline-flex items-center justify-center gap-2 rounded-sm px-4 bg-primary text-primary-foreground hover:brightness-110 active:brightness-95 transition",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
                    "Ustaw"
                  ]
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: "garage-title", className: "sr-only", children: "Garaż" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => cycleCar(-1),
            "aria-label": "Poprzednie auto",
            className: "group h-14 w-10 sm:h-20 sm:w-14 grid place-items-center rounded-sm chrome-border bg-secondary/40 hover:bg-secondary/70 transition active:scale-95",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5 text-steel group-hover:text-foreground transition" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/9] w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-x-6 bottom-2 h-6 rounded-[50%] bg-black/55 blur-xl pointer-events-none",
              "aria-hidden": true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 grid place-items-center",
              style: { animation: "var(--animate-slide-in)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: selectedCar.image,
                  alt: selectedCar.name,
                  width: 1024,
                  height: 576,
                  className: "max-h-full w-auto object-contain drop-shadow-[0_24px_18px_oklch(0_0_0/0.55)] transition-transform duration-300 hover:scale-[1.03]"
                }
              )
            },
            animKey
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => toggleFavorite(selectedCar.id),
              "aria-label": isFavorite(selectedCar.id) ? "Usuń z ulubionych" : "Dodaj do ulubionych",
              "aria-pressed": isFavorite(selectedCar.id),
              className: "absolute top-2 right-2 h-9 w-9 grid place-items-center rounded-sm chrome-border bg-secondary/60 hover:bg-secondary/90 transition active:scale-95",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Star,
                {
                  className: `h-4 w-4 transition ${isFavorite(selectedCar.id) ? "fill-amber text-amber" : "text-steel"}`
                }
              )
            }
          ),
          flash && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 grid place-items-center pointer-events-none",
              style: { animation: "var(--animate-flash)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-3xl sm:text-5xl text-amber tracking-widest", children: [
                "+",
                routeDistance.toFixed(1),
                " KM"
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => cycleCar(1),
            "aria-label": "Następne auto",
            className: "group h-14 w-10 sm:h-20 sm:w-14 grid place-items-center rounded-sm chrome-border bg-secondary/40 hover:bg-secondary/70 transition active:scale-95",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5 text-steel group-hover:text-foreground transition" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl sm:text-4xl uppercase text-foreground", children: selectedCar.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 inline-flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5", "aria-hidden": true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Kierowca:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: selectedUser.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-steel", children: selectedUser.handle })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-6 grid gap-2 sm:grid-cols-3 sm:gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Przejazdy", value: String(carTripCount), Icon: Gauge }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Kilometry", value: `${carKm.toFixed(1)}`, suffix: "km", Icon: MapPin }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Wydatki", value: totalCost.toFixed(2), suffix: "zł", Icon: Fuel })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: (e) => {
            e.preventDefault();
            onAdd();
          },
          className: "mt-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]",
          "aria-label": "Dodaj przejazd",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3 w-3" }),
                " Data i godzina"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "datetime-local",
                  value: tripDate,
                  onChange: (e) => setTripDate(e.target.value),
                  className: "h-12 rounded-sm bg-input border border-border px-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                  "aria-label": "Data przejazdu",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "submit",
                disabled: submitting || status !== "success",
                className: "h-12 mt-auto inline-flex items-center justify-center gap-2 rounded-sm px-6 font-display text-xl uppercase tracking-[0.2em] bg-primary text-primary-foreground hover:brightness-110 active:brightness-95 transition disabled:opacity-60 disabled:cursor-not-allowed plate",
                children: [
                  submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin",
                      "aria-hidden": true
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: submitting ? "Zapisuję…" : "Dodaj przejazd" })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "mt-5 flex items-center justify-center gap-2.5",
          role: "tablist",
          "aria-label": "Wybór auta",
          children: cars.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": c.id === selectedCar.id,
              onClick: () => selectCar(c.id),
              "aria-label": `Wybierz ${c.name}${isFavorite(c.id) ? " (ulubione)" : ""}`,
              className: [
                "h-2 rounded-full transition-all",
                c.id === selectedCar.id ? "w-8 bg-blood" : isFavorite(c.id) ? "w-3 bg-amber/80 hover:bg-amber" : "w-2 bg-muted hover:bg-muted-foreground"
              ].join(" ")
            },
            c.id
          ))
        }
      )
    ] })
  ] });
}
function Stat({
  label,
  value,
  suffix,
  Icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-sm px-3 py-3 sm:px-4 sm:py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3 w-3" }),
      " ",
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-2xl sm:text-3xl mt-1 min-w-0 truncate text-foreground", children: [
      value,
      suffix && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs sm:text-sm ml-1 text-muted-foreground", children: suffix })
    ] })
  ] });
}
const DAY = 24 * 60 * 60 * 1e3;
function HeroStats() {
  const { trips, costOfTrip, users, status, routeDistance, selectedRoute, isCustomRoute } = useStore();
  const now = Date.now();
  const dayCount = trips.filter((t) => now - t.timestamp < DAY).length;
  const weekCount = trips.filter((t) => now - t.timestamp < 7 * DAY).length;
  const totalKm = trips.reduce((s, t) => s + t.distance, 0);
  const totalCost = trips.reduce((s, t) => s + costOfTrip(t.carId, t.distance), 0);
  const top = rankDrivers(users, trips)[0];
  const routeName = isCustomRoute ? "Własna trasa" : selectedRoute?.name ?? "Trasa";
  if (status === "loading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass rounded-sm p-6 text-center text-muted-foreground", "aria-busy": "true", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-5 w-5 rounded-full border-2 border-current border-t-transparent animate-spin mr-2 align-middle" }),
      "Wczytywanie statystyk…"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-labelledby": "hero-stats-title", className: "grid gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4 text-blood", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: "hero-stats-title", className: "font-display text-lg uppercase tracking-widest", children: "Pulpit" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto max-w-[55%] truncate text-right text-[11px] text-muted-foreground font-mono sm:max-w-none", children: [
        routeName,
        ": ",
        routeDistance.toFixed(1),
        " km"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Big,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3.5 w-3.5" }),
          label: "Wszystkich",
          value: String(trips.length),
          accent: "amber"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Big,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
          label: "Łącznie km",
          value: totalKm.toFixed(1),
          suffix: "km",
          accent: "amber"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Big,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "h-3.5 w-3.5" }),
          label: "Wydatki",
          value: totalCost.toFixed(2),
          suffix: "zł",
          accent: "blood"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Big,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3.5 w-3.5" }),
          label: "Lider",
          value: top?.user?.name ?? "—",
          suffix: top?.count ? `${top.count}×` : "",
          accent: "amber"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Big, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }), label: "Dziś", value: String(dayCount), small: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Big,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
          label: "7 dni",
          value: String(weekCount),
          small: true
        }
      )
    ] })
  ] });
}
function Big({
  icon,
  label,
  value,
  suffix,
  accent,
  small
}) {
  const tone = accent === "blood" ? "text-blood" : accent === "amber" ? "text-amber" : "text-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-sm px-4 py-3.5 hairline", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground", children: [
      icon,
      " ",
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `font-display ${small ? "text-2xl" : "text-2xl sm:text-3xl"} mt-1 min-w-0 truncate ${tone}`,
        title: value,
        children: [
          value,
          suffix && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs ml-1.5 text-muted-foreground font-sans", children: suffix })
        ]
      }
    )
  ] });
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-[fade-in_0.4s_ease-out]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Garage, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroStats, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg uppercase tracking-widest", children: "Ostatnie" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/history", className: "text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground inline-flex items-center gap-1", children: [
          "Pełna historia ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HistoryTable, { limit: 5 })
    ] })
  ] });
}
export {
  Index as component
};
