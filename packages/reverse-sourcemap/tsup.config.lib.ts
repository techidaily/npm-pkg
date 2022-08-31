import { defineConfig  } from 'tsup';
import common from "./tsup.config";

export default defineConfig({
  ...common,
  entry: {
    index: "src/index.ts"
  },
  target: "esnext",
  format: ["esm", "cjs"],
  outDir: "dist",
});
