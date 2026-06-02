/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import {
  DEFAULT_CARS,
  DEFAULT_FUEL_PRICES,
  DEFAULT_ROUTES,
  DEFAULT_USERS,
  ROUTE_DISTANCE_KM,
  resolveCarImage,
  type Car,
  type FuelType,
  type RoutePreset,
  type Trip,
  type User,
} from "./data";
import { isConvexConfigured } from "./convex";

const CUSTOM_ROUTE_ID = "custom";
const SESSION_STORAGE_KEY = "nitro-academy-logbook:session-id";

export type LoadStatus = "idle" | "loading" | "success" | "error";

interface StoreCtx {
  status: LoadStatus;
  error: string | null;

  trips: Trip[];
  fuelPrices: { benzyna: number; diesel: number };
  selectedCarId: string;
  consumptionOverrides: Record<string, number>;
  extraUsers: User[];
  extraCars: Car[];
  routeDistance: number;
  favoriteCarIds: string[];
  extraRoutes: RoutePreset[];
  selectedRouteId: string;
  removedCarIds: string[];

  users: User[];
  cars: Car[];
  routes: RoutePreset[];

  selectedCar: Car;
  selectedUser: User;
  selectedRoute: RoutePreset | null;
  isCustomRoute: boolean;

  selectCar: (id: string) => void;
  cycleCar: (dir: 1 | -1) => void;

  addTrip: (opts?: { timestamp?: number; carId?: string }) => Promise<Trip>;
  removeTrip: (id: string) => Promise<void>;

  setFuelPrice: (fuel: FuelType, price: number) => void;
  setConsumption: (carId: string, value: number) => void;

  addUser: (input: { name: string; handle: string }) => Promise<User>;

  addCar: (input: {
    name: string;
    ownerId: string;
    fuel: FuelType;
    consumption: number;
    image?: string;
  }) => Promise<Car>;

  removeCar: (id: string) => Promise<void>;

  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  setRouteDistance: (km: number) => void;
  selectRoute: (id: string) => void;
  addRoute: (input: { name: string; distance: number }) => Promise<RoutePreset>;
  removeRoute: (id: string) => Promise<void>;

  costOfTrip: (carId: string, distance?: number) => number;
}

const Ctx = createContext<StoreCtx | null>(null);

function createSessionId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  if (!globalThis.crypto?.getRandomValues) {
    throw new Error("Secure random UUID generation is not available in this browser.");
  }

  const bytes = new Uint8Array(16);
  globalThis.crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, "0"));
  return [
    hex.slice(0, 4).join(""),
    hex.slice(4, 6).join(""),
    hex.slice(6, 8).join(""),
    hex.slice(8, 10).join(""),
    hex.slice(10, 16).join(""),
  ].join("-");
}

function getStoredSessionId() {
  if (typeof window === "undefined") return null;

  const existing = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) return existing;

  const sessionId = createSessionId();
  window.localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  return sessionId;
}

function clampDistance(km: number) {
  return Math.max(0.1, Math.min(999, km));
}

function toUser(doc: { _id: Id<"users">; name: string; handle: string }): User {
  return {
    id: doc._id,
    name: doc.name,
    handle: doc.handle,
  };
}

function toCar(doc: {
  _id: Id<"cars">;
  name: string;
  ownerUserId: Id<"users">;
  fuel: FuelType;
  consumption: number;
  image: string;
  favorite: boolean;
}): Car {
  return {
    id: doc._id,
    name: doc.name,
    ownerId: doc.ownerUserId,
    fuel: doc.fuel,
    consumption: doc.consumption,
    image: resolveCarImage(doc.image),
    favorite: doc.favorite,
  };
}

function toRoute(doc: { _id: Id<"routes">; name: string; distance: number }): RoutePreset {
  return {
    id: doc._id,
    name: doc.name,
    distance: doc.distance,
  };
}

function toTrip(doc: {
  _id: Id<"trips">;
  carId: Id<"cars">;
  userId: Id<"users">;
  distance: number;
  timestamp: number;
}): Trip {
  return {
    id: doc._id,
    carId: doc.carId,
    userId: doc.userId,
    distance: doc.distance,
    timestamp: doc.timestamp,
  };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [localError, setLocalError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(() => getStoredSessionId());

  useEffect(() => {
    setSessionId((current) => current ?? getStoredSessionId());
  }, []);

  const appData = useQuery(
    api.app.getAppData,
    isConvexConfigured && sessionId ? { sessionId } : "skip",
  );

  const createUser = useMutation(api.users.create);
  const createCar = useMutation(api.cars.create);
  const updateCar = useMutation(api.cars.update);
  const removeCarMutation = useMutation(api.cars.remove);
  const toggleFavoriteMutation = useMutation(api.cars.toggleFavorite);
  const createRoute = useMutation(api.routes.create);
  const removeRouteMutation = useMutation(api.routes.remove);
  const createTrip = useMutation(api.trips.create);
  const removeTripMutation = useMutation(api.trips.remove);
  const setFuelPriceMutation = useMutation(api.settings.setFuelPrice);
  const setSelectedCarMutation = useMutation(api.settings.setSelectedCar);
  const setRouteDistanceMutation = useMutation(api.settings.setRouteDistance);
  const selectRouteMutation = useMutation(api.settings.selectRoute);

  const users = useMemo(() => appData?.users.map(toUser) ?? DEFAULT_USERS, [appData]);

  const cars = useMemo(() => {
    const remoteCars = appData?.cars.map(toCar) ?? [];
    const source = remoteCars.length > 0 ? remoteCars : DEFAULT_CARS;

    return [...source].sort((a, b) => Number(!!b.favorite) - Number(!!a.favorite));
  }, [appData]);

  const routes = useMemo(() => {
    const remoteRoutes = appData?.routes.map(toRoute) ?? [];
    return remoteRoutes.length > 0 ? remoteRoutes : DEFAULT_ROUTES;
  }, [appData]);

  const trips = useMemo(() => appData?.trips.map(toTrip) ?? [], [appData]);

  const settings = appData?.settings;
  const dashboard = appData?.dashboard;
  const fuelPrices = settings?.fuelPrices ?? DEFAULT_FUEL_PRICES;
  const selectedCarId = dashboard?.selectedCarId ?? cars[0]?.id ?? DEFAULT_CARS[0].id;
  const selectedRouteId = dashboard?.selectedRouteId ?? routes[0]?.id ?? CUSTOM_ROUTE_ID;
  const routeDistance = dashboard?.routeDistance ?? routes[0]?.distance ?? ROUTE_DISTANCE_KM;
  const favoriteCarIds = cars.filter((car) => car.favorite).map((car) => car.id);

  const selectedCar = cars.find((c) => c.id === selectedCarId) ?? cars[0] ?? DEFAULT_CARS[0];
  const selectedUser =
    users.find((u) => u.id === selectedCar.ownerId) ?? users[0] ?? DEFAULT_USERS[0];
  const selectedRoute =
    selectedRouteId === CUSTOM_ROUTE_ID
      ? null
      : (routes.find((route) => route.id === selectedRouteId) ?? routes[0] ?? null);
  const isCustomRoute = selectedRouteId === CUSTOM_ROUTE_ID || !dashboard?.selectedRouteId;

  const seeded =
    !!appData?.settings && (appData?.users.length ?? 0) > 0 && (appData?.cars.length ?? 0) > 0;
  const status: LoadStatus = !isConvexConfigured
    ? "error"
    : !sessionId || appData === undefined
      ? "loading"
      : seeded
        ? "success"
        : "error";

  const error =
    localError ??
    (!isConvexConfigured
      ? "Brakuje VITE_CONVEX_URL albo NEXT_PUBLIC_CONVEX_URL w .env.local."
      : appData !== undefined && !seeded
        ? "Baza Convex jest pusta. Uruchom seed: npx convex run seed:defaults."
        : null);

  const run = async <T,>(action: () => Promise<T>, message: string) => {
    try {
      const result = await action();
      setLocalError(null);
      return result;
    } catch (error) {
      console.error(message, error);
      setLocalError(message);
      throw error;
    }
  };

  const value: StoreCtx = {
    status,
    error,

    trips,
    fuelPrices,
    selectedCarId,
    consumptionOverrides: {},
    extraUsers: [],
    extraCars: [],
    routeDistance,
    favoriteCarIds,
    extraRoutes: [],
    selectedRouteId,
    removedCarIds: [],

    users,
    cars,
    routes,

    selectedCar,
    selectedUser,
    selectedRoute,
    isCustomRoute,

    selectCar: (id) => {
      if (!isConvexConfigured || !sessionId) return;
      setSelectedCarMutation({ sessionId, carId: id as Id<"cars"> }).catch((error) => {
        console.error("Nie udało się wybrać auta w Convex", error);
        setLocalError("Nie udało się wybrać auta w Convex.");
      });
    },

    cycleCar: (dir) => {
      if (cars.length === 0) return;

      const idx = cars.findIndex((c) => c.id === selectedCar.id);
      const safeIdx = idx === -1 ? 0 : idx;
      const next = (safeIdx + dir + cars.length) % cars.length;
      const nextCar = cars[next];

      if (nextCar && sessionId) {
        setSelectedCarMutation({ sessionId, carId: nextCar.id as Id<"cars"> }).catch((error) => {
          console.error("Nie udało się zmienić auta w Convex", error);
          setLocalError("Nie udało się zmienić auta w Convex.");
        });
      }
    },

    addTrip: async (opts) => {
      const carId = (opts?.carId ?? selectedCar.id) as Id<"cars">;
      const savedTrip = await run(
        async () =>
          await createTrip({
            carId,
            distance: routeDistance,
            timestamp: opts?.timestamp ?? Date.now(),
          }),
        "Nie udało się zapisać przejazdu w Convex.",
      );

      if (!savedTrip) throw new Error("Convex nie zwrócił zapisanego przejazdu.");
      return toTrip(savedTrip);
    },

    removeTrip: async (id) => {
      await run(
        async () => await removeTripMutation({ id: id as Id<"trips"> }),
        "Nie udało się usunąć przejazdu w Convex.",
      );
    },

    setFuelPrice: (fuel, price) => {
      if (!isConvexConfigured) return;
      setFuelPriceMutation({ fuel, price }).catch((error) => {
        console.error("Nie udało się zapisać ceny paliwa w Convex", error);
        setLocalError("Nie udało się zapisać ceny paliwa w Convex.");
      });
    },

    setConsumption: (carId, consumption) => {
      if (!isConvexConfigured) return;
      updateCar({ id: carId as Id<"cars">, consumption }).catch((error) => {
        console.error("Nie udało się zapisać spalania auta w Convex", error);
        setLocalError("Nie udało się zapisać spalania auta w Convex.");
      });
    },

    addUser: async ({ name, handle }) => {
      const user = await run(
        async () => await createUser({ name, handle }),
        "Nie udało się dodać kierowcy w Convex.",
      );

      if (!user) throw new Error("Convex nie zwrócił dodanego kierowcy.");
      return toUser(user);
    },

    addCar: async ({ name, ownerId, fuel, consumption, image }) => {
      const car = await run(
        async () =>
          await createCar({
            name,
            ownerUserId: ownerId as Id<"users">,
            fuel,
            consumption,
            image,
            sessionId: sessionId ?? undefined,
          }),
        "Nie udało się dodać auta w Convex.",
      );

      if (!car) throw new Error("Convex nie zwrócił dodanego auta.");
      return toCar(car);
    },

    removeCar: async (id) => {
      await run(
        async () => await removeCarMutation({ id: id as Id<"cars"> }),
        "Nie udało się usunąć auta w Convex.",
      );
    },

    toggleFavorite: (id) => {
      if (!isConvexConfigured) return;
      toggleFavoriteMutation({ id: id as Id<"cars"> }).catch((error) => {
        console.error("Nie udało się zmienić ulubionego auta w Convex", error);
        setLocalError("Nie udało się zmienić ulubionego auta w Convex.");
      });
    },

    isFavorite: (id) => favoriteCarIds.includes(id),

    setRouteDistance: (km) => {
      if (!isConvexConfigured || !sessionId) return;
      setRouteDistanceMutation({ sessionId, distance: clampDistance(km) }).catch((error) => {
        console.error("Nie udało się zapisać dystansu w Convex", error);
        setLocalError("Nie udało się zapisać dystansu w Convex.");
      });
    },

    selectRoute: (id) => {
      if (!isConvexConfigured || !sessionId) return;
      selectRouteMutation({
        sessionId,
        routeId: id === CUSTOM_ROUTE_ID ? undefined : (id as Id<"routes">),
      }).catch((error) => {
        console.error("Nie udało się wybrać trasy w Convex", error);
        setLocalError("Nie udało się wybrać trasy w Convex.");
      });
    },

    addRoute: async ({ name, distance }) => {
      const route = await run(
        async () => await createRoute({ name, distance: clampDistance(distance) }),
        "Nie udało się dodać trasy w Convex.",
      );

      if (!route) throw new Error("Convex nie zwrócił dodanej trasy.");
      return toRoute(route);
    },

    removeRoute: async (id) => {
      await run(
        async () => await removeRouteMutation({ id: id as Id<"routes"> }),
        "Nie udało się usunąć trasy w Convex.",
      );
    },

    costOfTrip: (carId, distance = routeDistance) => {
      const car = cars.find((c) => c.id === carId);
      if (!car) return 0;

      const litres = (car.consumption / 100) * distance;
      return litres * fuelPrices[car.fuel];
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
