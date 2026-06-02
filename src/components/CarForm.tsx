import { useMemo, useState } from "react";
import { CarFront, ImagePlus, Plus, UserPlus, X } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/lib/store";
import type { FuelType } from "@/lib/data";

type OwnerMode = "existing" | "new";

export function CarForm() {
  const { users, addUser, addCar } = useStore();

  const [name, setName] = useState("");
  const [ownerMode, setOwnerMode] = useState<OwnerMode>("existing");
  const [ownerId, setOwnerId] = useState(users[0]?.id ?? "");
  const [newOwnerName, setNewOwnerName] = useState("");
  const [newOwnerHandle, setNewOwnerHandle] = useState("");
  const [fuel, setFuel] = useState<FuelType>("benzyna");
  const [consumption, setConsumption] = useState("7");
  const [image, setImage] = useState<string>("");

  const selectedOwnerId = useMemo(() => {
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

  const handleImageChange = (file: File | undefined) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Wybierz plik graficzny", {
        description: "Obsługiwane są np. PNG, JPG, WEBP.",
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const parsedConsumption = Number(consumption);

    if (trimmedName.length < 2) {
      toast.error("Podaj nazwę auta", {
        description: "Nazwa powinna mieć minimum 2 znaki.",
      });
      return;
    }

    if (!Number.isFinite(parsedConsumption) || parsedConsumption <= 0) {
      toast.error("Podaj poprawne spalanie", {
        description: "Spalanie musi być większe od 0.",
      });
      return;
    }

    let finalOwnerId = selectedOwnerId;

    if (ownerMode === "new") {
      const trimmedOwnerName = newOwnerName.trim();
      const trimmedOwnerHandle = newOwnerHandle.trim();

      if (trimmedOwnerName.length < 2) {
        toast.error("Podaj imię właściciela", {
          description: "Imię powinno mieć minimum 2 znaki.",
        });
        return;
      }

      const user = await addUser({
        name: trimmedOwnerName,
        handle: trimmedOwnerHandle || trimmedOwnerName.toLowerCase().replaceAll(" ", ""),
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
        image: image || undefined,
      });

      toast.success("Auto dodane", {
        description: car.name,
      });

      resetForm();
    } catch (error) {
      toast.error("Nie udało się dodać auta", {
        description: (error as Error).message,
      });
    }
  };

  return (
    <section className="glass rounded-sm p-5" aria-labelledby="car-form-title">
      <header className="flex items-center gap-2 mb-5">
        <CarFront className="h-4 w-4 text-blood" aria-hidden />

        <h3 id="car-form-title" className="font-display text-lg uppercase tracking-widest">
          Dodaj auto
        </h3>
      </header>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="grid gap-1">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
            Nazwa / model
          </span>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="np. Honda Civic Type R"
            className="h-11 rounded-sm bg-input border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Nazwa auta"
          />
        </label>

        <div className="grid gap-2">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
            Właściciel
          </span>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setOwnerMode("existing")}
              className={[
                "h-10 rounded-sm border px-3 text-sm transition",
                ownerMode === "existing"
                  ? "border-amber bg-amber/10 text-amber"
                  : "border-border bg-input hover:bg-secondary/60",
              ].join(" ")}
            >
              Wybierz
            </button>

            <button
              type="button"
              onClick={() => setOwnerMode("new")}
              className={[
                "h-10 rounded-sm border px-3 text-sm transition inline-flex items-center justify-center gap-2",
                ownerMode === "new"
                  ? "border-amber bg-amber/10 text-amber"
                  : "border-border bg-input hover:bg-secondary/60",
              ].join(" ")}
            >
              <UserPlus className="h-4 w-4" />
              Wpisz nowego
            </button>
          </div>

          {ownerMode === "existing" ? (
            <select
              value={selectedOwnerId}
              onChange={(e) => setOwnerId(e.target.value)}
              className="h-11 rounded-sm bg-input border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Wybierz właściciela"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} {user.handle}
                </option>
              ))}
            </select>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Imię właściciela
                </span>

                <input
                  type="text"
                  value={newOwnerName}
                  onChange={(e) => setNewOwnerName(e.target.value)}
                  placeholder="np. Michał"
                  className="h-11 rounded-sm bg-input border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="Imię nowego właściciela"
                />
              </label>

              <label className="grid gap-1">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Nick / handle
                </span>

                <input
                  type="text"
                  value={newOwnerHandle}
                  onChange={(e) => setNewOwnerHandle(e.target.value)}
                  placeholder="@michal"
                  className="h-11 rounded-sm bg-input border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="Nick nowego właściciela"
                />
              </label>
            </div>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Paliwo
            </span>

            <select
              value={fuel}
              onChange={(e) => setFuel(e.target.value as FuelType)}
              className="h-11 rounded-sm bg-input border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Rodzaj paliwa"
            >
              <option value="benzyna">Benzyna</option>
              <option value="diesel">Diesel</option>
            </select>
          </label>

          <label className="grid gap-1">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Spalanie l/100km
            </span>

            <input
              type="number"
              min="0.1"
              step="0.1"
              value={consumption}
              onChange={(e) => setConsumption(e.target.value)}
              className="h-11 rounded-sm bg-input border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Spalanie auta"
            />
          </label>
        </div>

        <div className="grid gap-2">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
            Zdjęcie samochodu
          </span>

          {image ? (
            <div className="relative rounded-sm border border-border bg-secondary/30 p-3">
              <img
                src={image}
                alt="Podgląd zdjęcia samochodu"
                className="mx-auto h-28 w-full object-contain"
              />

              <button
                type="button"
                onClick={() => setImage("")}
                className="absolute right-2 top-2 h-8 w-8 grid place-items-center rounded-sm border border-border bg-background/80 hover:bg-destructive/15 hover:text-destructive transition"
                aria-label="Usuń wybrane zdjęcie"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-border bg-secondary/20 hover:bg-secondary/40 transition">
              <ImagePlus className="h-6 w-6 text-muted-foreground" aria-hidden />

              <span className="text-sm text-muted-foreground">Kliknij, aby dodać zdjęcie</span>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files?.[0])}
                className="sr-only"
                aria-label="Dodaj zdjęcie samochodu"
              />
            </label>
          )}
        </div>

        <button
          type="submit"
          className="h-12 inline-flex items-center justify-center gap-2 rounded-sm px-6 font-display text-lg uppercase tracking-[0.2em] bg-primary text-primary-foreground hover:brightness-110 active:brightness-95 transition plate"
        >
          <CarFront className="h-4 w-4" aria-hidden />
          Dodaj auto
        </button>
      </form>
    </section>
  );
}
