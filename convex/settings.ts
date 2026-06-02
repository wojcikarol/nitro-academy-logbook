import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";
import { APP_SETTINGS_KEY, fuelValidator, requirePositiveNumber } from "./helpers";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", APP_SETTINGS_KEY))
      .unique();
  },
});

export const setFuelPrice = mutation({
  args: {
    fuel: fuelValidator,
    price: v.number(),
  },
  handler: async (ctx, args) => {
    if (!Number.isFinite(args.price) || args.price < 0) {
      throw new ConvexError("Cena paliwa musi być liczbą równą lub większą od 0.");
    }
    const settings = await requireSettings(ctx);

    await ctx.db.patch(settings._id, {
      fuelPrices: {
        ...settings.fuelPrices,
        [args.fuel]: args.price,
      },
      updatedAt: Date.now(),
    });
  },
});

export const setSelectedCar = mutation({
  args: {
    carId: v.id("cars"),
  },
  handler: async (ctx, args) => {
    const car = await ctx.db.get(args.carId);
    if (!car || car.archived) throw new ConvexError("Nie znaleziono auta.");

    const settings = await requireSettings(ctx);
    await ctx.db.patch(settings._id, {
      selectedCarId: args.carId,
      updatedAt: Date.now(),
    });
  },
});

export const setRouteDistance = mutation({
  args: {
    distance: v.number(),
  },
  handler: async (ctx, args) => {
    requirePositiveNumber(args.distance, "Dystans");
    const settings = await requireSettings(ctx);

    await ctx.db.patch(settings._id, {
      routeDistance: clampDistance(args.distance),
      selectedRouteId: undefined,
      updatedAt: Date.now(),
    });
  },
});

export const selectRoute = mutation({
  args: {
    routeId: v.optional(v.id("routes")),
  },
  handler: async (ctx, args) => {
    const settings = await requireSettings(ctx);

    if (!args.routeId) {
      await ctx.db.patch(settings._id, {
        selectedRouteId: undefined,
        updatedAt: Date.now(),
      });
      return;
    }

    const route = await ctx.db.get(args.routeId);
    if (!route) throw new ConvexError("Nie znaleziono trasy.");

    await ctx.db.patch(settings._id, {
      selectedRouteId: args.routeId,
      routeDistance: route.distance,
      updatedAt: Date.now(),
    });
  },
});

async function requireSettings(ctx: MutationCtx) {
  const settings = await ctx.db
    .query("settings")
    .withIndex("by_key", (q) => q.eq("key", APP_SETTINGS_KEY))
    .unique();

  if (!settings) {
    throw new ConvexError("Brakuje ustawień aplikacji. Uruchom seed danych.");
  }

  return settings;
}

function clampDistance(km: number) {
  return Math.max(0.1, Math.min(999, km));
}
