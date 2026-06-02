import { ConvexReactClient } from "convex/react";

const env = import.meta.env as ImportMetaEnv & {
  readonly NEXT_PUBLIC_CONVEX_URL?: string;
};

export const convexUrl = env.VITE_CONVEX_URL ?? env.NEXT_PUBLIC_CONVEX_URL ?? "";
export const isConvexConfigured = convexUrl.length > 0;

if (!isConvexConfigured && typeof window !== "undefined") {
  console.warn("Brakuje VITE_CONVEX_URL albo NEXT_PUBLIC_CONVEX_URL w .env.local.");
}

export const convex = new ConvexReactClient(
  isConvexConfigured ? convexUrl : "https://example.convex.cloud",
);
