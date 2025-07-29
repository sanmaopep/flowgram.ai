import { defineConfig } from 'tsup';

export default defineConfig({
  // https://tsup.egoist.dev/#inject-cjs-and-esm-shims
  shims: true,
});
