import { query } from "./_generated/server";
import { v } from "convex/values";
import { getSessionDashboard, getSettings } from "./helpers";

export const getAppData = query({
  args: {
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const [users, cars, routes, trips, settings, dashboard] = await Promise.all([
      ctx.db.query("users").collect(),
      ctx.db
        .query("cars")
        .withIndex("by_archived", (q) => q.eq("archived", false))
        .collect(),
      ctx.db.query("routes").collect(),
      ctx.db.query("trips").withIndex("by_timestamp").order("desc").collect(),
      getSettings(ctx),
      getSessionDashboard(ctx, args.sessionId),
    ]);

    return {
      users,
      cars,
      routes,
      trips,
      settings,
      dashboard,
    };
  },
});
