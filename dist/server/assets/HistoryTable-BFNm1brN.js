import { r as reactExports, W as jsxRuntimeExports } from "./server-CdExPFI1.js";
import { u as useStore, H as History, t as toast } from "./router-C6ta74Ce.js";
import { T as Trash2 } from "./trash-2-CC-fahBd.js";
function HistoryTable({ limit }) {
  const { trips, cars, users, removeTrip, costOfTrip, status } = useStore();
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const rows = limit ? trips.slice(0, limit) : trips;
  const handleRemoveTrip = async (id, timestamp) => {
    try {
      setDeletingId(id);
      await removeTrip(id);
      toast.success("Przejazd usunięty", {
        description: new Date(timestamp).toLocaleString("pl-PL")
      });
    } catch {
      toast.error("Nie udało się usunąć przejazdu", {
        description: "Sprawdź połączenie z Convex i konfigurację .env.local"
      });
    } finally {
      setDeletingId(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass rounded-xl p-4 sm:p-5", "aria-labelledby": "history-title", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-4 w-4 text-amber" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { id: "history-title", className: "font-display text-lg uppercase tracking-widest", children: "Historia przejazdów" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
        trips.length,
        " wpis(ów)"
      ] })
    ] }),
    status === "loading" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-10 text-center text-muted-foreground text-sm", "aria-busy": "true", children: "Wczytywanie…" }) : rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-10 text-center text-muted-foreground text-sm", children: "Brak przejazdów. Po dodaniu pojawią się tutaj." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[720px] text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("caption", { className: "sr-only", children: "Lista przejazdów" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "py-2 pr-3", children: "Data" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "py-2 pr-3", children: "Auto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "py-2 pr-3", children: "Kierowca" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "py-2 pr-3 text-right", children: "KM" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "py-2 pr-3 text-right", children: "Koszt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "py-2 w-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Akcje" }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((t) => {
        const car = cars.find((c) => c.id === t.carId);
        const user = users.find((u) => u.id === t.userId);
        const isDeleting = deletingId === t.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border/40 hover:bg-secondary/40 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-mono text-xs sm:text-sm", children: new Date(t.timestamp).toLocaleString("pl-PL") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 font-medium", children: car?.name ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-muted-foreground", children: user?.name ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-right font-mono", children: t.distance.toFixed(1) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 pr-3 text-right font-mono text-amber", children: [
                costOfTrip(t.carId, t.distance).toFixed(2),
                " zł"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleRemoveTrip(t.id, t.timestamp),
                  disabled: isDeleting,
                  "aria-label": `Usuń przejazd z ${new Date(t.timestamp).toLocaleString(
                    "pl-PL"
                  )}`,
                  className: "h-8 w-8 inline-grid place-items-center rounded-md border border-destructive/40 text-destructive hover:bg-destructive/15 transition disabled:opacity-50 disabled:cursor-not-allowed",
                  children: isDeleting ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin",
                      "aria-hidden": true
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4", "aria-hidden": true })
                }
              ) })
            ]
          },
          t.id
        );
      }) })
    ] }) })
  ] });
}
export {
  HistoryTable as H
};
