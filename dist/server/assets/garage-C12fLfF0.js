import { r as reactExports, W as jsxRuntimeExports } from "./server-CdExPFI1.js";
import { c as createLucideIcon, u as useStore, C as CarFront, t as toast } from "./router-C6ta74Ce.js";
import { U as UserPlus } from "./user-plus-DX6r2ATT.js";
import { X, S as Star } from "./x-nGZJXzeC.js";
import { T as Trash2 } from "./trash-2-CC-fahBd.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }],
  ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
];
const ImagePlus = createLucideIcon("image-plus", __iconNode);
function CarForm() {
  const { users, addUser, addCar } = useStore();
  const [name, setName] = reactExports.useState("");
  const [ownerMode, setOwnerMode] = reactExports.useState("existing");
  const [ownerId, setOwnerId] = reactExports.useState(users[0]?.id ?? "");
  const [newOwnerName, setNewOwnerName] = reactExports.useState("");
  const [newOwnerHandle, setNewOwnerHandle] = reactExports.useState("");
  const [fuel, setFuel] = reactExports.useState("benzyna");
  const [consumption, setConsumption] = reactExports.useState("7");
  const [image, setImage] = reactExports.useState("");
  const selectedOwnerId = reactExports.useMemo(() => {
    if (ownerId) return ownerId;
    return users[0]?.id ?? "";
  }, [ownerId, users]);
  const resetForm = () => {
    setName("");
    setOwnerMode("existing");
    setOwnerId(users[0]?.id ?? "");
    setNewOwnerName("");
    setNewOwnerHandle("");
    setFuel("benzyna");
    setConsumption("7");
    setImage("");
  };
  const handleImageChange = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Wybierz plik graficzny", {
        description: "Obsługiwane są np. PNG, JPG, WEBP."
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
      }
    };
    reader.onerror = () => {
      toast.error("Nie udało się wczytać zdjęcia");
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const parsedConsumption = Number(consumption);
    if (trimmedName.length < 2) {
      toast.error("Podaj nazwę auta", {
        description: "Nazwa powinna mieć minimum 2 znaki."
      });
      return;
    }
    if (!Number.isFinite(parsedConsumption) || parsedConsumption <= 0) {
      toast.error("Podaj poprawne spalanie", {
        description: "Spalanie musi być większe od 0."
      });
      return;
    }
    let finalOwnerId = selectedOwnerId;
    if (ownerMode === "new") {
      const trimmedOwnerName = newOwnerName.trim();
      const trimmedOwnerHandle = newOwnerHandle.trim();
      if (trimmedOwnerName.length < 2) {
        toast.error("Podaj imię właściciela", {
          description: "Imię powinno mieć minimum 2 znaki."
        });
        return;
      }
      const user = await addUser({
        name: trimmedOwnerName,
        handle: trimmedOwnerHandle || trimmedOwnerName.toLowerCase().replaceAll(" ", "")
      });
      finalOwnerId = user.id;
    }
    if (!finalOwnerId) {
      toast.error("Wybierz albo dodaj właściciela auta");
      return;
    }
    try {
      const car = await addCar({
        name: trimmedName,
        ownerId: finalOwnerId,
        fuel,
        consumption: parsedConsumption,
        image: image || void 0
      });
      toast.success("Auto dodane", {
        description: car.name
      });
      resetForm();
    } catch (error) {
      toast.error("Nie udało się dodać auta", {
        description: error.message
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass rounded-sm p-5", "aria-labelledby": "car-form-title", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center gap-2 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CarFront, { className: "h-4 w-4 text-blood", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { id: "car-form-title", className: "font-display text-lg uppercase tracking-widest", children: "Dodaj auto" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "grid gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "grid gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-widest text-muted-foreground", children: "Nazwa / model" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
            placeholder: "np. Honda Civic Type R",
            className: "h-11 rounded-sm bg-input border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
            "aria-label": "Nazwa auta"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-widest text-muted-foreground", children: "Właściciel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setOwnerMode("existing"),
              className: [
                "h-10 rounded-sm border px-3 text-sm transition",
                ownerMode === "existing" ? "border-amber bg-amber/10 text-amber" : "border-border bg-input hover:bg-secondary/60"
              ].join(" "),
              children: "Wybierz"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setOwnerMode("new"),
              className: [
                "h-10 rounded-sm border px-3 text-sm transition inline-flex items-center justify-center gap-2",
                ownerMode === "new" ? "border-amber bg-amber/10 text-amber" : "border-border bg-input hover:bg-secondary/60"
              ].join(" "),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4" }),
                "Wpisz nowego"
              ]
            }
          )
        ] }),
        ownerMode === "existing" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: selectedOwnerId,
            onChange: (e) => setOwnerId(e.target.value),
            className: "h-11 rounded-sm bg-input border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
            "aria-label": "Wybierz właściciela",
            children: users.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: user.id, children: [
              user.name,
              " ",
              user.handle
            ] }, user.id))
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "grid gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Imię właściciela" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: newOwnerName,
                onChange: (e) => setNewOwnerName(e.target.value),
                placeholder: "np. Michał",
                className: "h-11 rounded-sm bg-input border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                "aria-label": "Imię nowego właściciela"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "grid gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Nick / handle" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: newOwnerHandle,
                onChange: (e) => setNewOwnerHandle(e.target.value),
                placeholder: "@michal",
                className: "h-11 rounded-sm bg-input border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                "aria-label": "Nick nowego właściciela"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "grid gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-widest text-muted-foreground", children: "Paliwo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: fuel,
              onChange: (e) => setFuel(e.target.value),
              className: "h-11 rounded-sm bg-input border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
              "aria-label": "Rodzaj paliwa",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "benzyna", children: "Benzyna" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "diesel", children: "Diesel" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "grid gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-widest text-muted-foreground", children: "Spalanie l/100km" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              min: "0.1",
              step: "0.1",
              value: consumption,
              onChange: (e) => setConsumption(e.target.value),
              className: "h-11 rounded-sm bg-input border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
              "aria-label": "Spalanie auta"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-widest text-muted-foreground", children: "Zdjęcie samochodu" }),
        image ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-sm border border-border bg-secondary/30 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: image,
              alt: "Podgląd zdjęcia samochodu",
              className: "mx-auto h-28 w-full object-contain"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setImage(""),
              className: "absolute right-2 top-2 h-8 w-8 grid place-items-center rounded-sm border border-border bg-background/80 hover:bg-destructive/15 hover:text-destructive transition",
              "aria-label": "Usuń wybrane zdjęcie",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-border bg-secondary/20 hover:bg-secondary/40 transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-6 w-6 text-muted-foreground", "aria-hidden": true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Kliknij, aby dodać zdjęcie" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "file",
              accept: "image/*",
              onChange: (e) => handleImageChange(e.target.files?.[0]),
              className: "sr-only",
              "aria-label": "Dodaj zdjęcie samochodu"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "submit",
          className: "h-12 inline-flex items-center justify-center gap-2 rounded-sm px-6 font-display text-lg uppercase tracking-[0.2em] bg-primary text-primary-foreground hover:brightness-110 active:brightness-95 transition plate",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CarFront, { className: "h-4 w-4", "aria-hidden": true }),
            "Dodaj auto"
          ]
        }
      )
    ] })
  ] });
}
function GaragePage() {
  const {
    cars,
    users,
    toggleFavorite,
    isFavorite,
    removeCar,
    selectCar,
    trips
  } = useStore();
  const handleRemoveCar = async (id, name) => {
    if (cars.length <= 1) {
      toast.error("Zostaw przynajmniej jedno auto", {
        description: "Pulpit potrzebuje auta do zapisywania przejazdów."
      });
      return;
    }
    const confirmed = window.confirm(`Czy na pewno chcesz usunąć pojazd "${name}"?

Tej operacji nie da się cofnąć.`);
    if (!confirmed) return;
    try {
      await removeCar(id);
      toast.success("Auto usunięte", {
        description: name
      });
    } catch (error) {
      toast.error("Nie udało się usunąć auta", {
        description: error.message
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-[fade-in_0.4s_ease-out]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl sm:text-4xl uppercase tracking-widest", children: [
      "Twój ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blood", children: "garaż" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-[1fr_1.2fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CarForm, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "glass rounded-sm p-5", "aria-labelledby": "garage-list-title", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CarFront, { className: "h-4 w-4 text-amber", "aria-hidden": true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { id: "garage-list-title", className: "font-display text-lg uppercase tracking-widest", children: "Kolekcja" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-muted-foreground font-mono", children: [
            cars.length,
            " aut"
          ] })
        ] }),
        cars.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-sm border border-dashed border-border p-6 text-center text-sm text-muted-foreground", children: "Brak aut w garażu. Dodaj nowe auto formularzem po lewej stronie." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-2.5", children: cars.map((c) => {
          const owner = users.find((u) => u.id === c.ownerId);
          const count = trips.filter((t) => t.carId === c.id).length;
          const fav = isFavorite(c.id);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "group relative flex items-center gap-3 rounded-sm border border-border/70 bg-secondary/30 hover:bg-secondary/55 px-3 py-2 transition-all hover:translate-x-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => selectCar(c.id), className: "flex items-center gap-3 flex-1 text-left min-w-0", "aria-label": `Wybierz ${c.name}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.image, alt: "", width: 64, height: 36, loading: "lazy", className: "h-10 w-16 object-contain drop-shadow-[0_6px_8px_oklch(0_0_0/0.5)]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium truncate", children: c.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground truncate", children: [
                  owner?.name ?? "—",
                  " • ",
                  c.fuel,
                  " • ",
                  c.consumption,
                  " l/100km • ",
                  count,
                  " przej."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => toggleFavorite(c.id), "aria-label": fav ? "Usuń z ulubionych" : "Dodaj do ulubionych", "aria-pressed": fav, className: "h-9 w-9 grid place-items-center rounded-sm border border-border hover:bg-secondary/70 transition active:scale-95", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-4 w-4 transition ${fav ? "fill-amber text-amber" : "text-steel"}` }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => handleRemoveCar(c.id, c.name), "aria-label": `Usuń ${c.name}`, className: "h-9 w-9 grid place-items-center rounded-sm border border-destructive/40 text-destructive hover:bg-destructive/15 transition active:scale-95", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4", "aria-hidden": true }) })
          ] }, c.id);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[11px] text-muted-foreground", children: "Ulubione auta trafiają na początek karuzeli na pulpicie. Kliknij kosz, aby usunąć pojazd z kolekcji. Ostatnie auto zostaje w garażu." })
      ] })
    ] })
  ] });
}
export {
  GaragePage as component
};
