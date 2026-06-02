import { ConvexError, v } from "convex/values";
import type { MutationCtx, QueryCtx } from "./_generated/server";

export const APP_SETTINGS_KEY = "global";
export const DEFAULT_ROUTE_DISTANCE = 19.8;

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

export async function getSessionDashboard(ctx: QueryCtx | MutationCtx, sessionId: string) {
  return await ctx.db
    .query("sessionDashboards")
    .withIndex("by_session", (q) => q.eq("sessionId", sessionId))
    .unique();
}

export async function ensureSessionDashboard(ctx: MutationCtx, sessionId: string) {
  const existing = await getSessionDashboard(ctx, sessionId);
  if (existing) return existing;

  const now = Date.now();
  const globalSettings = await getSettings(ctx);
  const id = await ctx.db.insert("sessionDashboards", {
    sessionId,
    selectedCarId: globalSettings?.selectedCarId,
    selectedRouteId: globalSettings?.selectedRouteId,
    routeDistance: globalSettings?.routeDistance ?? DEFAULT_ROUTE_DISTANCE,
    createdAt: now,
    updatedAt: now,
  });

  return await ctx.db.get(id);
}
