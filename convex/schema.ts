import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const fuelType = v.union(v.literal("benzyna"), v.literal("diesel"));

export default defineSchema({
  users: defineTable({
    name: v.string(),
    handle: v.string(),
    normalizedHandle: v.string(),
    ownerId: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_handle", ["normalizedHandle"])
    .index("by_owner", ["ownerId"]),

  cars: defineTable({
    name: v.string(),
    ownerUserId: v.id("users"),
    fuel: fuelType,
    consumption: v.number(),
    image: v.string(),
    favorite: v.boolean(),
    archived: v.boolean(),
    ownerId: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_owner_user", ["ownerUserId"])
    .index("by_archived", ["archived"])
    .index("by_favorite", ["favorite"])
    .index("by_owner", ["ownerId"]),

  routes: defineTable({
    name: v.string(),
    distance: v.number(),
    isDefault: v.boolean(),
    ownerId: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_default", ["isDefault"])
    .index("by_owner", ["ownerId"]),

  trips: defineTable({
    carId: v.id("cars"),
    userId: v.id("users"),
    distance: v.number(),
    timestamp: v.number(),
    ownerId: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_timestamp", ["timestamp"])
    .index("by_car_timestamp", ["carId", "timestamp"])
    .index("by_user_timestamp", ["userId", "timestamp"])
    .index("by_owner_timestamp", ["ownerId", "timestamp"]),

  settings: defineTable({
    key: v.string(),
    fuelPrices: v.object({
      benzyna: v.number(),
      diesel: v.number(),
    }),
    // Legacy global dashboard fields. New code stores these per browser session
    // in sessionDashboards; keeping them optional avoids breaking existing data.
    selectedCarId: v.optional(v.id("cars")),
    selectedRouteId: v.optional(v.id("routes")),
    routeDistance: v.number(),
    ownerId: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_key", ["key"])
    .index("by_owner", ["ownerId"]),

  sessionDashboards: defineTable({
    sessionId: v.string(),
    selectedCarId: v.optional(v.id("cars")),
    selectedRouteId: v.optional(v.id("routes")),
    routeDistance: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_session", ["sessionId"]),
});
