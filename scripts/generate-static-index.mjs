import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");
const clientDir = path.join(distDir, "client");
const assetsDir = path.join(clientDir, "assets");

const assetFiles = await readdir(assetsDir);
const jsFiles = assetFiles.filter((file) => file.endsWith(".js"));
const cssFiles = assetFiles.filter((file) => file.endsWith(".css")).sort();

let entryFile;
for (const file of jsFiles) {
  const code = await readFile(path.join(assetsDir, file), "utf8");
  if (code.includes("hydrateRoot(document") || code.includes(".hydrateRoot(document")) {
    entryFile = file;
    break;
  }
}

if (!entryFile) {
  throw new Error("Could not find the client entry bundle in dist/client/assets.");
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
  <body></body>
</html>
`;

await mkdir(clientDir, { recursive: true });
await writeFile(path.join(clientDir, "index.html"), html);
await writeFile(path.join(distDir, "index.html"), html);

console.log(`Generated dist/index.html and dist/client/index.html using ${entryFile}`);
