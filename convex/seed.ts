import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import type { Id } from "./_generated/dataModel";
import { APP_SETTINGS_KEY } from "./helpers";

const defaultUsers = [
  { key: "u1", name: "Kamil", handle: "@kamils5" },
  { key: "u2", name: "Dawid", handle: "@dawidek" },
  { key: "u3", name: "Daniel", handle: "@damazy" },
  { key: "u4", name: "Karol", handle: "@karol" },
] as const;

const defaultCars = [
  {
    name: "Audi S5 Sportback",
    ownerKey: "u1",
    fuel: "benzyna",
    consumption: 14.5,
    image: "default:car1",
  },
  {
    name: "Renault Thalia",
    ownerKey: "u2",
    fuel: "benzyna",
    consumption: 7,
    image: "default:car2",
  },
  {
    name: "BMW e91 320d",
    ownerKey: "u3",
    fuel: "diesel",
    consumption: 7,
    image: "default:car3",
  },
  {
    name: "Volvo S40",
    ownerKey: "u4",
    fuel: "benzyna",
    consumption: 9.1,
    image: "default:car4",
  },
] as const;

export const defaults = mutation({
  args: {
    reset: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const existingUsers = await ctx.db.query("users").take(1);

    if (existingUsers.length > 0 && !args.reset) {
      throw new ConvexError(
        "Seed został już wykonany. Użyj { reset: true }, jeśli chcesz wyczyścić dane.",
      );
    }

    if (args.reset) {
      for (const doc of await ctx.db.query("trips").collect()) {
        await ctx.db.delete(doc._id);
      }
      for (const doc of await ctx.db.query("cars").collect()) {
        await ctx.db.delete(doc._id);
      }
      for (const doc of await ctx.db.query("routes").collect()) {
        await ctx.db.delete(doc._id);
      }
      for (const doc of await ctx.db.query("users").collect()) {
        await ctx.db.delete(doc._id);
      }
      for (const doc of await ctx.db.query("settings").collect()) {
        await ctx.db.delete(doc._id);
      }
      for (const doc of await ctx.db.query("sessionDashboards").collect()) {
        await ctx.db.delete(doc._id);
      }
    }

    const now = Date.now();
    const userIds = new Map<string, Id<"users">>();

    for (const user of defaultUsers) {
      const id = await ctx.db.insert("users", {
        name: user.name,
        handle: user.handle,
        normalizedHandle: user.handle.toLowerCase(),
        createdAt: now,
        updatedAt: now,
      });
      userIds.set(user.key, id);
    }

    let firstCarId: Id<"cars"> | undefined;

    for (const car of defaultCars) {
      const ownerUserId = userIds.get(car.ownerKey);
      if (!ownerUserId) throw new ConvexError("Błąd seed: brakuje właściciela auta.");

      const id = await ctx.db.insert("cars", {
        name: car.name,
        ownerUserId,
        fuel: car.fuel,
        consumption: car.consumption,
        image: car.image,
        favorite: false,
        archived: false,
        createdAt: now,
        updatedAt: now,
      });

      firstCarId ??= id;
    }

    const routeId = await ctx.db.insert("routes", {
      name: "Akademia",
      distance: 19.8,
      isDefault: true,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("settings", {
      key: APP_SETTINGS_KEY,
      fuelPrices: {
        benzyna: 6.49,
        diesel: 6.79,
      },
      selectedCarId: firstCarId,
      selectedRouteId: routeId,
      routeDistance: 19.8,
      createdAt: now,
      updatedAt: now,
    });

    return {
      users: defaultUsers.length,
      cars: defaultCars.length,
      routes: 1,
    };
  },
});
