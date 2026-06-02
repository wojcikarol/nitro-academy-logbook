import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requirePositiveNumber } from "./helpers";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("routes").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    distance: v.number(),
    ownerId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const name = args.name.trim();
    if (name.length < 2) throw new ConvexError("Nazwa trasy musi mieć minimum 2 znaki.");
    requirePositiveNumber(args.distance, "Długość trasy");

    const now = Date.now();
    const id = await ctx.db.insert("routes", {
      name,
      distance: clampDistance(args.distance),
      isDefault: false,
      ownerId: args.ownerId,
      createdAt: now,
      updatedAt: now,
    });

    return await ctx.db.get(id);
  },
});

export const remove = mutation({
  args: {
    id: v.id("routes"),
  },
  handler: async (ctx, args) => {
    const route = await ctx.db.get(args.id);
    if (!route) throw new ConvexError("Nie znaleziono trasy.");
    if (route.isDefault) throw new ConvexError("Nie można usunąć domyślnej trasy.");

    await ctx.db.delete(args.id);

    const settings = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "global"))
      .unique();

    if (settings?.selectedRouteId === args.id) {
      await ctx.db.patch(settings._id, {
        selectedRouteId: undefined,
        updatedAt: Date.now(),
      });
    }
  },
});

function clampDistance(km: number) {
  return Math.max(0.1, Math.min(999, km));
}
