import { Link, useLocation } from "@tanstack/react-router";
import { Gauge, History, Trophy, Users, Settings, CarFront } from "lucide-react";

const NAV = [
  { to: "/", label: "Pulpit", Icon: Gauge },
  { to: "/garage", label: "Garaż", Icon: CarFront },
  { to: "/stats", label: "Statystyki", Icon: Trophy },
  { to: "/history", label: "Historia", Icon: History },
  { to: "/drivers", label: "Kierowcy", Icon: Users },
  { to: "/settings", label: "Ustawienia", Icon: Settings },
] as const;

export function Header() {
  const loc = useLocation();
  return (
    <header className="relative z-10 border-b border-border/70 backdrop-blur-md bg-background/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 grid gap-3 lg:flex lg:items-center lg:justify-between lg:gap-4">
        <Link to="/" className="flex min-w-0 items-center gap-3 group" aria-label="Strona główna">
          <div className="relative h-10 w-10 grid place-items-center rounded-sm chrome-border bg-secondary/60 plate">
            <span className="font-display text-2xl text-amber leading-none">AH</span>
          </div>
          <div className="flex min-w-0 flex-col leading-none">
            <span className="font-display text-[11px] tracking-[0.35em] text-muted-foreground">
              Licznik
            </span>
            <span className="truncate font-display text-xl sm:text-2xl text-foreground tracking-wider">
              Przejazdów <span className="text-blood">NFS</span>
            </span>
          </div>
        </Link>
        <nav
          className="-mx-1 flex items-center gap-1 overflow-x-auto px-1 pb-1 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0"
          aria-label="Główna nawigacja"
        >
          {NAV.map(({ to, label, Icon }) => {
            const active = loc.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={[
                  "shrink-0 px-2.5 sm:px-3.5 h-10 inline-flex items-center gap-2 rounded-sm text-sm font-medium uppercase tracking-wider transition",
                  active
                    ? "chrome-border text-foreground bg-secondary/70"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/40",
                ].join(" ")}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-4 w-4" aria-hidden />
                <span className="hidden md:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
