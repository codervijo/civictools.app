import { describe, it, expect, beforeAll } from "vitest";
import { execSync } from "node:child_process";
import { readFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";

const DIST = path.resolve(process.cwd(), "dist");

// Read a file from dist/ — simulates what curl/wget returns
function distFile(route: string): string {
  const candidates = [
    path.join(DIST, route),                      // exact file (robots.txt, sitemap.xml)
    path.join(DIST, route, "index.html"),         // directory index (/, /permit, ...)
    path.join(DIST, route.replace(/^\//, ""), "index.html"),
  ];
  for (const f of candidates) {
    if (existsSync(f) && statSync(f).isFile()) return readFileSync(f, "utf-8");
  }
  throw new Error(`dist file not found for route: ${route}`);
}

beforeAll(() => {
  if (process.env.SKIP_BUILD !== "1") {
    execSync("pnpm build", { cwd: process.cwd(), stdio: "inherit" });
  }
});

// ─── Static crawler files ────────────────────────────────────────────────────

describe("SEO static files", () => {
  it("/sitemap.xml — valid XML with all routes", () => {
    const body = distFile("/sitemap.xml");
    expect(body).toContain('<?xml version="1.0"');
    expect(body).toContain("<urlset");
    expect(body).toContain("https://civictools.app/");
    expect(body).toContain("/permit");
    expect(body).toContain("/property-tax");
    expect(body).toContain("permit-cost-san-jose-deck");
    expect(body).toContain("permit-cost-los-angeles-adu");
  });

  it("/robots.txt — allows crawlers, has Sitemap directive", () => {
    const body = distFile("/robots.txt");
    expect(body).toContain("User-agent: *");
    expect(body).toContain("Allow: /");
    expect(body).toContain("Sitemap: https://civictools.app/sitemap.xml");
    expect(body).not.toContain("Disallow: /\n");
  });

  it("/llms.txt — present with tool links", () => {
    const body = distFile("/llms.txt");
    expect(body).toContain("# CivicTools");
    expect(body).toContain("civictools.app/permit");
    expect(body).toContain("civictools.app/property-tax");
  });
});

// ─── Homepage pre-render ─────────────────────────────────────────────────────

describe("Pre-rendered HTML — homepage (simulates: curl -s https://civictools.app)", () => {
  it("returns substantial HTML — not an empty shell", () => {
    const body = distFile("/");
    // curl -s https://civictools.app | wc -c
    expect(body.length).toBeGreaterThan(10_000);
    expect(body).toContain("<div id=\"root\">");
    // Must have real content inside root, not just empty div
    expect(body).not.toMatch(/<div id="root"><\/div>/);
  });

  it("grep -i description — meta description present with correct copy", () => {
    // curl -s https://civictools.app | grep -i description
    const body = distFile("/");
    const lines = body.split("\n").filter(l => /description/i.test(l));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.some(l => l.includes("Fast, free estimates"))).toBe(true);
  });

  it("grep og: — all five OG tags present with absolute URLs", () => {
    // curl -s https://civictools.app | grep -i "og:"
    const body = distFile("/");
    const ogLines = body.split("\n").filter(l => /og:/i.test(l));
    const has = (prop: string) => ogLines.some(l => l.includes(prop));
    expect(has("og:title"),       "og:title missing").toBe(true);
    expect(has("og:description"), "og:description missing").toBe(true);
    expect(has("og:url"),         "og:url missing").toBe(true);
    expect(has("og:image"),       "og:image missing").toBe(true);
    expect(has("og:type"),        "og:type missing").toBe(true);
    // All og: URLs must be absolute https://
    ogLines.filter(l => /content="https?:/.test(l)).forEach(l => {
      expect(l, `non-https URL in: ${l}`).toMatch(/content="https:\/\//);
    });
  });

  it("no stray /> fragments or broken //civictools URLs in body", () => {
    const body = distFile("/");
    // Regression test for the stripped-meta-tag bug
    expect(body).not.toMatch(/^\s*\/>\s*$/m);
    // No bare protocol-relative URLs (//civictools) — must be https://
    expect(body).not.toMatch(/"\/\/civictools/);
  });

  it("hero copy in initial HTML — not JS-only", () => {
    const body = distFile("/");
    expect(body).toContain("Simple tools for public data");
    expect(body).toContain("CivicTools");
  });

  it("twitter meta tags present", () => {
    const body = distFile("/");
    expect(body).toContain("twitter:title");
    expect(body).toContain("twitter:description");
    expect(body).toContain("twitter:card");
    expect(body).toContain("twitter:image");
  });

  it("canonical link is absolute https://", () => {
    const body = distFile("/");
    const canonicalMatch = body.match(/rel="canonical" href="([^"]+)"/);
    expect(canonicalMatch, "canonical missing").toBeTruthy();
    expect(canonicalMatch![1]).toMatch(/^https:\/\//);
  });
});

// ─── SEO page pre-render ─────────────────────────────────────────────────────

describe("Pre-rendered HTML — SEO pages", () => {
  it("/permit-cost-san-jose-deck — unique <title>", () => {
    const body = distFile("/permit-cost-san-jose-deck");
    expect(body).toContain("<title>Deck Permit Cost San Jose (2026 Estimate)</title>");
  });

  it("/permit-cost-san-jose-deck — og:url points to correct page", () => {
    const body = distFile("/permit-cost-san-jose-deck");
    expect(body).toContain("https://civictools.app/permit-cost-san-jose-deck");
  });

  it("/permit-cost-san-jose-deck — page content in initial HTML", () => {
    const body = distFile("/permit-cost-san-jose-deck");
    expect(body).toContain("Average permit cost in San Jose");
  });

  it("/permit-cost-fresno-adu — distinct title from San Jose page", () => {
    const sjBody  = distFile("/permit-cost-san-jose-deck");
    const frBody  = distFile("/permit-cost-fresno-adu");
    expect(frBody).toContain("<title>ADU Permit Cost Fresno (2026 Estimate)</title>");
    expect(frBody).not.toContain("Deck Permit Cost San Jose");
    expect(sjBody).not.toContain("ADU Permit Cost Fresno");
  });

  it("/permit-cost-los-angeles-adu — canonical points to correct URL", () => {
    const body = distFile("/permit-cost-los-angeles-adu");
    expect(body).toContain("https://civictools.app/permit-cost-los-angeles-adu");
  });

  it("each of 4 sampled SEO pages has its own distinct title", () => {
    const cases = [
      { route: "/permit-cost-san-jose-deck",    contains: "Deck Permit Cost San Jose" },
      { route: "/permit-cost-sacramento-adu",   contains: "ADU Permit Cost Sacramento" },
      { route: "/permit-cost-oakland-remodel",  contains: "Remodel Permit Cost Oakland" },
      { route: "/permit-cost-los-angeles-deck", contains: "Deck Permit Cost Los Angeles" },
    ];
    for (const { route, contains } of cases) {
      expect(distFile(route), `${route} missing title`).toContain(contains);
    }
  });

  it("no stray /> fragments on any SEO page", () => {
    const routes = [
      "/permit-cost-san-jose-adu",
      "/permit-cost-fresno-deck",
      "/permit-cost-oakland-remodel",
      "/permit-cost-los-angeles-deck",
    ];
    for (const route of routes) {
      const body = distFile(route);
      expect(body, `stray /> in ${route}`).not.toMatch(/^\s*\/>\s*$/m);
      expect(body, `bare //civictools in ${route}`).not.toMatch(/"\/\/civictools/);
    }
  });
});
