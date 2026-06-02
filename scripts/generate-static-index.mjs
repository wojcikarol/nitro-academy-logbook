import { cp, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { build } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

const distDir = path.resolve("dist");
const spaDir = path.join(distDir, "spa");
const clientDir = path.join(distDir, "client");
const assetsDir = path.join(spaDir, "assets");
const rootAssetsDir = path.join(distDir, "assets");

await rm(spaDir, { recursive: true, force: true });

await build({
  configFile: false,
  root: process.cwd(),
  base: "/",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    outDir: spaDir,
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve("src/spa-entry.tsx"),
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router"],
  },
});

const assetFiles = await readdir(assetsDir);
const jsFiles = assetFiles.filter((file) => file.endsWith(".js"));
const cssFiles = assetFiles.filter((file) => file.endsWith(".css")).sort();

const entryFile = jsFiles.find((file) => file.startsWith("spa-entry-"));

if (!entryFile) {
  throw new Error("Could not find the SPA entry bundle in dist/spa/assets.");
}

const cssLinks = cssFiles
  .map((file) => `    <link rel="stylesheet" href="/assets/${file}" />`)
  .join("\n");

const html = `<!doctype html>
<html lang="pl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Academy Street Tracker - NFS Underground Garage</title>
    <meta
      name="description"
      content="Sledz przejazdy do akademii w stylu NFS Underground. Statystyki, ranking, koszty paliwa."
    />
    <meta name="theme-color" content="#0b0a16" />
${cssLinks}
    <script type="module" crossorigin src="/assets/${entryFile}"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

await mkdir(clientDir, { recursive: true });
await rm(rootAssetsDir, { recursive: true, force: true });
await writeFile(path.join(clientDir, "index.html"), html);
await writeFile(path.join(distDir, "index.html"), html);
await cp(assetsDir, rootAssetsDir, { recursive: true });
await cp(assetsDir, path.join(clientDir, "assets"), { recursive: true });
await rm(spaDir, { recursive: true, force: true });

console.log(`Generated static SPA index files and assets using ${entryFile}`);
