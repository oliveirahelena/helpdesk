import { defineConfig } from "@playwright/test";

import baseConfig from "./packages/config/playwright/base";

export default defineConfig({
  ...baseConfig,
  testDir: "./apps/web/e2e",
  webServer: {
    command: "bun run --cwd apps/web dev --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173/dashboard",
    reuseExistingServer: true
  }
});
