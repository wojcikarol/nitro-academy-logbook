import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { Id } from "./_generated/dataModel";
import type { MutationCtx } from "./_generated/server";
import { fuelValidator, requirePositiveNumber } from "./helpers";

export const list = query({
  args: {
    includeArchived: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    if (args.includeArchived) {
      return await ctx.db.query("cars").collect();
    }

    return await ctx.db
      .query("cars")
      .withIndex("by_archived", (q) => q.eq("archived", false))
      .collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    ownerUserId: v.id("users"),
    fuel: fuelValidator,
    consumption: v.number(),
    image: v.optional(v.string()),
    ownerId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const name = args.name.trim();
    if (name.length < 2) throw new ConvexError("Nazwa auta musi mieć minimum 2 znaki.");

    const owner = await ctx.db.get(args.ownerUserId);
    if (!owner) throw new ConvexError("Nie znaleziono właściciela auta.");

    requirePositiveNumber(args.consumption, "Spalanie");

    const now = Date.now();
    const id = await ctx.db.insert("cars", {
      name,
      ownerUserId: args.ownerUserId,
      fuel: args.fuel,
      consumption: args.consumption,
      image: args.image?.trim() || "default:car1",
      favorite: false,
      archived: false,
      ownerId: args.ownerId,
      createdAt: now,
      updatedAt: now,
    });

    await setSelectedCar(ctx, id);
    return await ctx.db.get(id);
  },
});

export const update = mutation({
  args: {
    id: v.id("cars"),
    name: v.optional(v.string()),
    ownerUserId: v.optional(v.id("users")),
    fuel: v.optional(fuelValidator),
    consumption: v.optional(v.number()),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const car = await ctx.db.get(args.id);
    if (!car || car.archived) throw new ConvexError("Nie znaleziono auta.");

    const patch: Partial<typeof car> = {
      updatedAt: Date.now(),
    };

    if (args.name !== undefined) {
      const name = args.name.trim();
      if (name.length < 2) throw new ConvexError("Nazwa auta musi mieć minimum 2 znaki.");
      patch.name = name;
    }

    if (args.ownerUserId !== undefined) {
      const owner = await ctx.db.get(args.ownerUserId);
      if (!owner) throw new ConvexError("Nie znaleziono właściciela auta.");
      patch.ownerUserId = args.ownerUserId;
    }

    if (args.fuel !== undefined) patch.fuel = args.fuel;

    if (args.consumption !== undefined) {
      requirePositiveNumber(args.consumption, "Spalanie");
      patch.consumption = args.consumption;
    }

    if (args.image !== undefined) patch.image = args.image.trim() || "default:car1";

    await ctx.db.patch(args.id, patch);
    return await ctx.db.get(args.id);
  },
});

export const remove = mutation({
  args: {
    id: v.id("cars"),
  },
  handler: async (ctx, args) => {
    const activeCars = await ctx.db
      .query("cars")
      .withIndex("by_archived", (q) => q.eq("archived", false))
      .collect();

    if (activeCars.length <= 1) {
      throw new ConvexError("Zostaw przynajmniej jedno auto.");
    }

    const car = activeCars.find((item) => item._id === args.id);
    if (!car) throw new ConvexError("Nie znaleziono auta.");

    await ctx.db.patch(args.id, {
      archived: true,
      favorite: false,
      updatedAt: Date.now(),
    });

    const settings = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "global"))
      .unique();

    if (settings?.selectedCarId === args.id) {
      const nextCar = activeCars.find((item) => item._id !== args.id);
      if (nextCar) {
        await ctx.db.patch(settings._id, {
          selectedCarId: nextCar._id,
          updatedAt: Date.now(),
        });
      }
    }
  },
});

export const toggleFavorite = mutation({
  args: {
    id: v.id("cars"),
  },
  handler: async (ctx, args) => {
    const car = await ctx.db.get(args.id);
    if (!car || car.archived) throw new ConvexError("Nie znaleziono auta.");

    await ctx.db.patch(args.id, {
      favorite: !car.favorite,
      updatedAt: Date.now(),
    });
  },
});

async function setSelectedCar(ctx: MutationCtx, id: Id<"cars">) {
  const settings = await ctx.db
    .query("settings")
    .withIndex("by_key", (q) => q.eq("key", "global"))
    .unique();

  if (settings) {
    await ctx.db.patch(settings._id, {
      selectedCarId: id,
      updatedAt: Date.now(),
    });
  }
}
