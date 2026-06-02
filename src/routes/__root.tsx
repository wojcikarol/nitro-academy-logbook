import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";
import { ConvexProvider } from "convex/react";

import appCss from "../styles.css?url";
import { convex } from "@/lib/convex";
import { StoreProvider } from "@/lib/store";
import { Header } from "@/components/Header";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center glass rounded-2xl p-8">
        <h1 className="font-display text-7xl text-amber">404</h1>
        <h2 className="mt-4 font-display text-xl uppercase tracking-widest">Pusta trasa</h2>
        <p className="mt-2 text-sm text-muted-foreground">Nie ma takiego ekranu w garażu.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-md chrome-border px-4 py-2 text-sm font-semibold uppercase tracking-widest hover:bg-secondary/40"
        >
          Wróć do garażu
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center glass rounded-2xl p-8">
        <h1 className="font-display text-xl uppercase tracking-widest">Spalony silnik</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 inline-flex items-center justify-center rounded-md chrome-border px-4 py-2 text-sm font-semibold uppercase tracking-widest hover:bg-secondary/40"
        >
          Restart
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Academy Street Tracker — NFS Underground Garage" },
      {
        name: "description",
        content:
          "Śledź przejazdy do akademii w stylu NFS Underground. Statystyki, ranking, koszty paliwa.",
      },
      { name: "theme-color", content: "#0b0a16" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ConvexProvider client={convex}>
        <StoreProvider>
          <div className="relative min-h-screen">
            <Header />
            <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-10">
              <Outlet />
            </main>
            <Toaster
              theme="dark"
              position="top-center"
              toastOptions={{
                className: "!font-display !uppercase !tracking-widest",
                style: {
                  background: "oklch(0.2 0.008 240 / 0.96)",
                  border: "1px solid oklch(0.4 0.006 240)",
                  color: "oklch(0.94 0.005 90)",
                  boxShadow: "0 8px 24px -10px oklch(0 0 0 / 0.6)",
                },
              }}
            />
          </div>
        </StoreProvider>
      </ConvexProvider>
    </QueryClientProvider>
  );
}
