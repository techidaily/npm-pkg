import { defineConfig  } from 'tsup';
import common from "./tsup.config";

export default defineConfig({
  ...common,
  entry: {
    cli: "src/cli.ts"
  },
  target: "esnext",
  format: ["esm", "cjs"],
  outDir: "dist",
});
