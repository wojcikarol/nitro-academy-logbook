import { query } from "./_generated/server";
import { getSettings } from "./helpers";

export const getAppData = query({
  args: {},
  handler: async (ctx) => {
    const [users, cars, routes, trips, settings] = await Promise.all([
      ctx.db.query("users").collect(),
      ctx.db
        .query("cars")
        .withIndex("by_archived", (q) => q.eq("archived", false))
        .collect(),
      ctx.db.query("routes").collect(),
      ctx.db.query("trips").withIndex("by_timestamp").order("desc").collect(),
      getSettings(ctx),
    ]);

    return {
      users,
      cars,
      routes,
      trips,
      settings,
    };
  },
});
