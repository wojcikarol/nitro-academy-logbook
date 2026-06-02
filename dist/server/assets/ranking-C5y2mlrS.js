import { c as createLucideIcon } from "./router-DJR9hsiu.js";
const __iconNode$2 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]
];
const Clock = createLucideIcon("clock", __iconNode);
function rankDrivers(users, trips) {
  return users.map((user) => {
    const userTrips = trips.filter((trip) => trip.userId === user.id);
    return {
      user,
      count: userTrips.length,
      km: userTrips.reduce((sum, trip) => sum + trip.distance, 0)
    };
  }).sort((a, b) => {
    const tripDiff = b.count - a.count;
    if (tripDiff !== 0) return tripDiff;
    const kmDiff = b.km - a.km;
    if (kmDiff !== 0) return kmDiff;
    return a.user.name.localeCompare(b.user.name, "pl") || a.user.id.localeCompare(b.user.id);
  });
}
export {
  Activity as A,
  Clock as C,
  Calendar as a,
  rankDrivers as r
};
