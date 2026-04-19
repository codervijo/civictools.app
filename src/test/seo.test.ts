import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { spawn, execSync, spawnSync, type ChildProcess } from "node:child_process";
import * as net from "node:net";

const PORT = 4173;
const BASE = `http://localhost:${PORT}`;
let preview: ChildProcess;

function waitForPort(port: number, retries = 40, delayMs = 500): Promise<void> {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const tryConnect = () => {
      const sock = net.createConnection({ port, host: "127.0.0.1" });
      sock.on("connect", () => { sock.destroy(); resolve(); });
      sock.on("error", () => {
        sock.destroy();
        if (++attempts >= retries) return reject(new Error(`Port ${port} not open after ${retries} attempts`));
        setTimeout(tryConnect, delayMs);
      });
    };
    tryConnect();
  });
}

function wget(url: string): { ok: boolean; status: number; body: string; stderr: string } {
  // wget exits 0 on success, 8 on server error (4xx/5xx), non-zero on network error
  const result = spawnSync("wget", ["-q", "-S", "-O", "-", url], { encoding: "utf8" });
  const stderr = result.stderr ?? "";
  const body = result.stdout ?? "";
  const statusMatch = stderr.match(/HTTP\/[\d.]+ (\d{3})/);
  const status = statusMatch ? parseInt(statusMatch[1], 10) : (result.status === 0 ? 200 : 0);
  return { ok: result.status === 0, status, body, stderr };
}

beforeAll(async () => {
  execSync("pnpm build", { cwd: process.cwd(), stdio: "inherit" });

  preview = spawn("pnpm", ["preview", "--port", String(PORT), "--host", "127.0.0.1"], {
    cwd: process.cwd(),
    stdio: "ignore",
    detached: false,
  });

  await waitForPort(PORT);
});

afterAll(() => {
  preview?.kill("SIGTERM");
});

describe("SEO static files", () => {
  it("serves /sitemap.xml via wget", () => {
    const { ok, body } = wget(`${BASE}/sitemap.xml`);
    expect(ok, "wget should exit 0 (HTTP 200)").toBe(true);
    expect(body).toContain('<?xml version="1.0"');
    expect(body).toContain("<urlset");
    expect(body).toContain("https://civictools.app/");
    expect(body).toContain("/permit");
    expect(body).toContain("/property-tax");
  });

  it("serves /robots.txt via wget", () => {
    const { ok, body } = wget(`${BASE}/robots.txt`);
    expect(ok, "wget should exit 0 (HTTP 200)").toBe(true);
    expect(body).toContain("User-agent: *");
    expect(body).toContain("Allow: /");
    expect(body).toContain("Sitemap: https://civictools.app/sitemap.xml");
  });
});
