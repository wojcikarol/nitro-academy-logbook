import { ConvexError, v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";
import { requirePositiveNumber } from "./helpers";

export const recent = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = Math.min(Math.max(args.limit ?? 20, 1), 100);
    return await ctx.db.query("trips").withIndex("by_timestamp").order("desc").take(limit);
  },
});

export const listPaginated = query({
  args: {
    paginationOpts: paginationOptsValidator,
    carId: v.optional(v.id("cars")),
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const { carId, userId } = args;

    if (carId) {
      return await ctx.db
        .query("trips")
        .withIndex("by_car_timestamp", (q) => q.eq("carId", carId))
        .order("desc")
        .paginate(args.paginationOpts);
    }

    if (userId) {
      return await ctx.db
        .query("trips")
        .withIndex("by_user_timestamp", (q) => q.eq("userId", userId))
        .order("desc")
        .paginate(args.paginationOpts);
    }

    return await ctx.db
      .query("trips")
      .withIndex("by_timestamp")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const create = mutation({
  args: {
    carId: v.id("cars"),
    distance: v.number(),
    timestamp: v.number(),
    ownerId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const car = await ctx.db.get(args.carId);
    if (!car || car.archived) throw new ConvexError("Nie znaleziono auta.");

    requirePositiveNumber(args.distance, "Dystans");

    if (!Number.isFinite(args.timestamp)) {
      throw new ConvexError("Niepoprawna data przejazdu.");
    }

    const now = Date.now();
    const id = await ctx.db.insert("trips", {
      carId: args.carId,
      userId: car.ownerUserId,
      distance: args.distance,
      timestamp: args.timestamp,
      ownerId: args.ownerId,
      createdAt: now,
      updatedAt: now,
    });

    return await ctx.db.get(id);
  },
});

export const update = mutation({
  args: {
    id: v.id("trips"),
    carId: v.optional(v.id("cars")),
    distance: v.optional(v.number()),
    timestamp: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const trip = await ctx.db.get(args.id);
    if (!trip) throw new ConvexError("Nie znaleziono przejazdu.");

    const patch: Partial<typeof trip> = {
      updatedAt: Date.now(),
    };

    if (args.carId !== undefined) {
      const car = await ctx.db.get(args.carId);
      if (!car || car.archived) throw new ConvexError("Nie znaleziono auta.");
      patch.carId = args.carId;
      patch.userId = car.ownerUserId;
    }

    if (args.distance !== undefined) {
      requirePositiveNumber(args.distance, "Dystans");
      patch.distance = args.distance;
    }

    if (args.timestamp !== undefined) {
      if (!Number.isFinite(args.timestamp)) throw new ConvexError("Niepoprawna data przejazdu.");
      patch.timestamp = args.timestamp;
    }

    await ctx.db.patch(args.id, patch);
    return await ctx.db.get(args.id);
  },
});

export const remove = mutation({
  args: {
    id: v.id("trips"),
  },
  handler: async (ctx, args) => {
    const trip = await ctx.db.get(args.id);
    if (!trip) throw new ConvexError("Nie znaleziono przejazdu.");

    await ctx.db.delete(args.id);
  },
});
