import { defineConfig } from "@playwright/test";
const baseURL = process.env.PW_BASE_URL ?? "http://localhost:7010";
const basePath = process.env.PW_BASE_PATH; // e.g. "/factuio-portal", matches NEXT_PUBLIC_BASE_PATH

const { origin, port } = new URL(baseURL);

// Servidor standalone de Next (output: "standalone"); respeta el basePath del build.
const serveCommand = `PORT=${port} node scripts/serve-standalone.mjs`;
const resolvedBaseURL = basePath ? `${origin}${basePath}/` : baseURL;

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
