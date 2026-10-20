// Run after `npm run build` to check every prerendered page and its internal links.
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const site = "https://www.criegratis.com.br";
const output = path.resolve(".next/server/app");
const xml = readFileSync(path.join(output, "sitemap.xml.body"), "utf8");
const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
const problems = [];
const internalLinks = new Set();
if (new Set(paths).size !== paths.length) problems.push("Sitemap contém URLs duplicadas");

for (const route of paths) {
  const htmlFile = path.join(output, route === "/" ? "index.html" : `${route.slice(1)}.html`);
  if (!existsSync(htmlFile)) { problems.push(`${route}: página não gerada`); continue; }
  const html = readFileSync(htmlFile, "utf8");
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  const expected = `${site}${route === "/" ? "" : route}`;
  if (canonical !== expected) problems.push(`${route}: canonical ${canonical || "ausente"}`);
  if (!/<title>[^<]+<\/title>/i.test(html)) problems.push(`${route}: título ausente`);
  if (!/<meta name="description" content="[^"]+"/i.test(html)) problems.push(`${route}: descrição ausente`);
  if (!/<h1[\s>]/i.test(html)) problems.push(`${route}: H1 ausente`);
  for (const [, href] of html.matchAll(/\bhref="([^"]+)"/g)) {
    const value = href.replaceAll("&amp;", "&");
    if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/_next/")) continue;
    const target = new URL(value, site).pathname;
    if (!/\.[a-z0-9]+$/i.test(target)) internalLinks.add(target);
  }
}

for (const route of internalLinks) {
  if (paths.includes(route) || route === "/mais-usadas") continue;
  problems.push(`Link interno sem página no sitemap: ${route}`);
}

console.log(`Páginas verificadas: ${paths.length}; links internos únicos: ${internalLinks.size}; problemas: ${problems.length}`);
for (const problem of problems) console.error(problem);
if (problems.length) process.exitCode = 1;
