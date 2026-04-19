import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const serverDir = path.join(distDir, "server");

const seoPages = JSON.parse(fs.readFileSync(path.join(rootDir, "src/data/seoPages.json"), "utf-8"));
const toolsData = JSON.parse(fs.readFileSync(path.join(rootDir, "src/data/tools.json"), "utf-8"));

const BASE_URL = "https://civictools.app";
const OG_IMAGE = `${BASE_URL}/og-image.png`;

// Build route → { title, description } map
const routeMeta = {
  "/": {
    title: "CivicTools — Simple Tools for Public Data",
    description: "Fast, free estimates for permits, property tax, and more — using public data from California cities.",
  },
};
for (const tool of toolsData.tools) {
  routeMeta[tool.path] = { title: tool.pageTitle, description: tool.meta };
}
for (const page of seoPages) {
  routeMeta[page.slug] = { title: page.title, description: page.meta };
}

const routes = Object.keys(routeMeta);

// Read the client-build template
const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");

// Import SSR render function from the server build
const serverEntry = pathToFileURL(path.join(serverDir, "entry-server.js")).href;
const { render } = await import(serverEntry);

function escAttr(s) {
  return s.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildHeadTags(route, meta) {
  const url = `${BASE_URL}${route}`;
  const t = escAttr(meta.title);
  const d = escAttr(meta.description);
  return [
    `<title>${meta.title}</title>`,
    `<meta name="description" content="${d}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:url" content="${escAttr(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<link rel="canonical" href="${escAttr(url)}" />`,
  ].join("\n    ");
}

// Strip the static head tags Vite baked into index.html
function stripStaticHead(html) {
  return html
    .replace(/<title>[^<]*<\/title>/, "")
    .replace(/<meta name="description"[^/]*/g, "")
    .replace(/<meta property="og:[^/]*/g, "")
    .replace(/<meta name="twitter:[^/]*/g, "")
    .replace(/<link rel="canonical"[^/]*/g, "");
}

let count = 0;

for (const route of routes) {
  const meta = routeMeta[route];

  let appHtml = "";
  try {
    appHtml = render(route);
  } catch (err) {
    console.warn(`  ⚠  render failed for ${route}: ${err.message}`);
  }

  const html = stripStaticHead(template)
    .replace("<head>", `<head>\n    ${buildHeadTags(route, meta)}`)
    .replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`);

  const outPath = route === "/" ? distDir : path.join(distDir, route);
  fs.mkdirSync(outPath, { recursive: true });
  fs.writeFileSync(path.join(outPath, "index.html"), html);

  count++;
  console.log(`  ✓  ${route}`);
}

console.log(`\nPre-rendered ${count} routes.`);
