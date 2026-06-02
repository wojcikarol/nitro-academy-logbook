import type { Trip, User } from "./data";

export interface DriverRankingRow {
  user: User;
  count: number;
  km: number;
}

export function rankDrivers(users: User[], trips: Trip[]): DriverRankingRow[] {
  return users
    .map((user) => {
      const userTrips = trips.filter((trip) => trip.userId === user.id);
      return {
        user,
        count: userTrips.length,
        km: userTrips.reduce((sum, trip) => sum + trip.distance, 0),
      };
    })
    .sort((a, b) => {
      const tripDiff = b.count - a.count;
      if (tripDiff !== 0) return tripDiff;

      const kmDiff = b.km - a.km;
      if (kmDiff !== 0) return kmDiff;

      return a.user.name.localeCompare(b.user.name, "pl") || a.user.id.localeCompare(b.user.id);
    });
}
