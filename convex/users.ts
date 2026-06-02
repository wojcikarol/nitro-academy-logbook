import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { normalizeHandle } from "./helpers";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    handle: v.string(),
    ownerId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const name = args.name.trim();
    const handle = normalizeHandle(args.handle);

    if (name.length < 2) {
      throw new ConvexError("Imię kierowcy musi mieć minimum 2 znaki.");
    }

    if (!/^@[a-zA-Z0-9_]{2,20}$/.test(handle)) {
      throw new ConvexError("Pseudonim może zawierać litery, cyfry i podkreślenia.");
    }

    const existing = await ctx.db
      .query("users")
      .withIndex("by_handle", (q) => q.eq("normalizedHandle", handle))
      .first();

    if (existing) {
      throw new ConvexError("Kierowca z takim pseudonimem już istnieje.");
    }

    const now = Date.now();
    const id = await ctx.db.insert("users", {
      name,
      handle,
      normalizedHandle: handle,
      ownerId: args.ownerId,
      createdAt: now,
      updatedAt: now,
    });

    return await ctx.db.get(id);
  },
});

export const update = mutation({
  args: {
    id: v.id("users"),
    name: v.optional(v.string()),
    handle: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);
    if (!user) throw new ConvexError("Nie znaleziono kierowcy.");

    const patch: Partial<typeof user> = {
      updatedAt: Date.now(),
    };

    if (args.name !== undefined) {
      const name = args.name.trim();
      if (name.length < 2) throw new ConvexError("Imię kierowcy musi mieć minimum 2 znaki.");
      patch.name = name;
    }

    if (args.handle !== undefined) {
      const handle = normalizeHandle(args.handle);
      if (!/^@[a-zA-Z0-9_]{2,20}$/.test(handle)) {
        throw new ConvexError("Pseudonim może zawierać litery, cyfry i podkreślenia.");
      }

      const existing = await ctx.db
        .query("users")
        .withIndex("by_handle", (q) => q.eq("normalizedHandle", handle))
        .first();

      if (existing && existing._id !== args.id) {
        throw new ConvexError("Kierowca z takim pseudonimem już istnieje.");
      }

      patch.handle = handle;
      patch.normalizedHandle = handle;
    }

    await ctx.db.patch(args.id, patch);
    return await ctx.db.get(args.id);
  },
});
