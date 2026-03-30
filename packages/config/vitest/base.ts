import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    passWithNoTests: false,
    coverage: {
      reporter: ["text", "html"]
    }
  }
});
