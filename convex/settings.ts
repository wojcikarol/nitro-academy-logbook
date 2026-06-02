import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";
import {
  APP_SETTINGS_KEY,
  ensureSessionDashboard,
  fuelValidator,
  requirePositiveNumber,
} from "./helpers";

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
    sessionId: v.string(),
    carId: v.id("cars"),
  },
  handler: async (ctx, args) => {
    const car = await ctx.db.get(args.carId);
    if (!car || car.archived) throw new ConvexError("Nie znaleziono auta.");

    const dashboard = await requireSessionDashboard(ctx, args.sessionId);
    await ctx.db.patch(dashboard._id, {
      selectedCarId: args.carId,
      updatedAt: Date.now(),
    });
  },
});

export const setRouteDistance = mutation({
  args: {
    sessionId: v.string(),
    distance: v.number(),
  },
  handler: async (ctx, args) => {
    requirePositiveNumber(args.distance, "Dystans");
    const dashboard = await requireSessionDashboard(ctx, args.sessionId);

    await ctx.db.patch(dashboard._id, {
      routeDistance: clampDistance(args.distance),
      selectedRouteId: undefined,
      updatedAt: Date.now(),
    });
  },
});

export const selectRoute = mutation({
  args: {
    sessionId: v.string(),
    routeId: v.optional(v.id("routes")),
  },
  handler: async (ctx, args) => {
    const dashboard = await requireSessionDashboard(ctx, args.sessionId);

    if (!args.routeId) {
      await ctx.db.patch(dashboard._id, {
        selectedRouteId: undefined,
        updatedAt: Date.now(),
      });
      return;
    }

    const route = await ctx.db.get(args.routeId);
    if (!route) throw new ConvexError("Nie znaleziono trasy.");

    await ctx.db.patch(dashboard._id, {
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

async function requireSessionDashboard(ctx: MutationCtx, sessionId: string) {
  const dashboard = await ensureSessionDashboard(ctx, sessionId);

  if (!dashboard) {
    throw new ConvexError("Nie udało się utworzyć pulpitu sesji.");
  }

  return dashboard;
}

function clampDistance(km: number) {
  return Math.max(0.1, Math.min(999, km));
}
