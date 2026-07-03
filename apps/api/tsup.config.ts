import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src'],
  splitting: false,
  sourcemap: true,
  format: ['cjs', 'esm'],
  shims: true,
  clean: true,
  noExternal: ['@saas/auth', '@saas/env'],
})
