# Nitro Academy Logbook — Convex

## Pierwsze uruchomienie

1. Uruchom `npx convex dev`.
2. Jeśli CLI pyta o logowanie, wybierz `Login or create an account` i zaloguj się w przeglądarce.
3. Wybierz istniejący projekt Convex albo utwórz nowy deployment dev.
4. Skopiuj wygenerowany adres deploymentu do `.env.local` jako `VITE_CONVEX_URL`.
5. W drugim terminalu uruchom `npx convex run seed:defaults`.
6. Uruchom aplikację przez `npm run dev`.

## Zmienne środowiskowe

```bash
VITE_CONVEX_URL=https://your-deployment.convex.cloud
```

Projekt akceptuje też `NEXT_PUBLIC_CONVEX_URL`, ale dla Vite/TanStack Start zalecane jest
`VITE_CONVEX_URL`.

## Deployment production

Convex ma osobne zmienne dla każdego deploymentu. Dla produkcji ustaw analogiczny adres produkcyjnego
deploymentu w hostingu frontendu jako `VITE_CONVEX_URL`. Jeśli później dodasz sekrety backendowe,
ustawiaj je per deployment przez Convex Dashboard albo `npx convex env set NAZWA WARTOSC`.
