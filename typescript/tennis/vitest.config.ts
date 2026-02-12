import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/*.test.ts"], // adjust to your folder
    globals: true,
  },
});
