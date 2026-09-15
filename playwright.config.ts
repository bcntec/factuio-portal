import { defineConfig } from "@playwright/test";
import { existsSync, mkdirSync, cpSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const baseURL = process.env.PW_BASE_URL ?? "http://localhost:7010";
const basePath = process.env.PW_BASE_PATH; // e.g. "/factuio-portal", matches NEXT_PUBLIC_BASE_PATH

const { origin, port } = new URL(baseURL);

let serveCommand = `npx serve out -l ${port}`;
let resolvedBaseURL = baseURL;

if (basePath) {
  // `serve` can't mount a directory under a subpath, so emulate GitHub Pages'
  // project-site routing by nesting the export under a folder named after
  // the base path and serving that folder's parent as the webroot.
  const pwServeDir = path.resolve(__dirname, ".pw-serve");
  const nestedDir = path.join(pwServeDir, basePath.replace(/^\/+/, ""));
  if (existsSync(pwServeDir)) rmSync(pwServeDir, { recursive: true, force: true });
  mkdirSync(nestedDir, { recursive: true });
  cpSync(path.resolve(__dirname, "out"), nestedDir, { recursive: true });
  // An empty `serve.json` (rather than /dev/null, which `serve` fails to
  // parse as JSON) keeps `serve` from picking up any other serve.json.
  const configPath = path.join(pwServeDir, "serve.json");
  writeFileSync(configPath, "{}");
  resolvedBaseURL = `${origin}${basePath}/`;
  serveCommand = `npx serve --config ${configPath} -l ${port} ${pwServeDir}`;
}

export default defineConfig({
  testDir: "./tests/e2e",
  workers: 1,
  reporter: "list",
  retries: process.env.CI ? 1 : 0,
  forbidOnly: !!process.env.CI,
  use: { baseURL: resolvedBaseURL, screenshot: "only-on-failure" },
  webServer: {
    command: serveCommand,
    url: resolvedBaseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
});
