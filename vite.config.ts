import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.{test,spec}.{ts,tsx}",
        "src/**/__tests__/**",
        "src/setupTests.ts",
        "src/testUtils/**",
        "src/**/__fixtures__/**",
        "src/**/*.d.ts",
        "src/**/__generated__/**",
        "src/**/*.generated.{ts,tsx}",
      ],
      reporter: ["text", "text-summary", "html", "json", "json-summary"],
      reportsDirectory: "./coverage",
      reportOnFailure: true,
      // Portfolio minimums allow headroom below the measured baseline; see README.md.
      thresholds: {
        lines: 90,
        statements: 90,
        functions: 90,
        branches: 85,
      },
    },
  },
});
