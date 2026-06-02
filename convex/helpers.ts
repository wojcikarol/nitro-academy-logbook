import { ConvexError, v } from "convex/values";
import type { MutationCtx, QueryCtx } from "./_generated/server";

export const APP_SETTINGS_KEY = "global";

export const fuelValidator = v.union(v.literal("benzyna"), v.literal("diesel"));

export function normalizeHandle(handle: string) {
  const trimmed = handle.trim();
  const prefixed = trimmed.startsWith("@") ? trimmed : `@${trimmed}`;
  return prefixed.toLowerCase();
}

export function requirePositiveNumber(value: number, fieldName: string) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new ConvexError(`${fieldName} musi być liczbą większą od 0.`);
  }
}

export async function getSettings(ctx: QueryCtx | MutationCtx) {
  return await ctx.db
    .query("settings")
    .withIndex("by_key", (q) => q.eq("key", APP_SETTINGS_KEY))
    .unique();
}
