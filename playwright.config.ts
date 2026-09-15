import { defineConfig } from "@playwright/test";

const baseURL = process.env.PW_BASE_URL ?? "http://localhost:7010";

export default defineConfig({
  testDir: "./tests/e2e",
  workers: 1,
  reporter: "list",
  use: { baseURL, screenshot: "only-on-failure" },
  webServer: {
    command: `npx serve out -l ${new URL(baseURL).port}`,
    url: baseURL,
    reuseExistingServer: true,
    timeout: 30_000,
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
});
