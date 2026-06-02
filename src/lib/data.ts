import car1 from "@/assets/car-1.png";
import car2 from "@/assets/car-2.png";
import car3 from "@/assets/car-3.png";
import car4 from "@/assets/car-4.png";

export const ROUTE_DISTANCE_KM = 19.8;
export const ROUTE_NAME = "Akademia";

export type FuelType = "benzyna" | "diesel";

export interface User {
  id: string;
  name: string;
  handle: string;
}

export interface Car {
  id: string;
  name: string;
  ownerId: string;
  fuel: FuelType;
  consumption: number; // l/100km
  image: string;
  favorite?: boolean;
}

export interface Trip {
  id: string;
  carId: string;
  userId: string;
  distance: number;
  timestamp: number;
}

export interface RoutePreset {
  id: string;
  name: string;
  distance: number;
}

export const DEFAULT_USERS: User[] = [
  { id: "u1", name: "Kamil", handle: "@kamils5" },
  { id: "u2", name: "Dawid", handle: "@dawidek" },
  { id: "u3", name: "Daniel", handle: "@damazy" },
  { id: "u4", name: "Karol", handle: "@karol" },
];

export const DEFAULT_CARS: Car[] = [
  {
    id: "c1",
    name: "Audi S5 Sportback",
    ownerId: "u1",
    fuel: "benzyna",
    consumption: 14.5,
    image: car1,
  },
  {
    id: "c2",
    name: "Renault Thalia",
    ownerId: "u2",
    fuel: "benzyna",
    consumption: 7.0,
    image: car2,
  },
  {
    id: "c3",
    name: "BMW e91 320d",
    ownerId: "u3",
    fuel: "diesel",
    consumption: 7.0,
    image: car3,
  },
  {
    id: "c4",
    name: "Volvo S40",
    ownerId: "u4",
    fuel: "benzyna",
    consumption: 9.1,
    image: car4,
  },
];

export const DEFAULT_ROUTES: RoutePreset[] = [
  {
    id: "r1",
    name: ROUTE_NAME,
    distance: ROUTE_DISTANCE_KM,
  },
];

export const DEFAULT_FUEL_PRICES = { benzyna: 6.49, diesel: 6.79 };

export const DEFAULT_CAR_IMAGES: Record<string, string> = {
  "default:car1": car1,
  "default:car2": car2,
  "default:car3": car3,
  "default:car4": car4,
};

export function resolveCarImage(image: string | undefined) {
  if (!image) return car1;
  return DEFAULT_CAR_IMAGES[image] ?? image;
}
