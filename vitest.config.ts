import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    env: loadEnv('', process.cwd(), ''),
    setupFiles: ['./vitest.setup.tsx'],
    resolveSnapshotPath: (testPath, snapshotExtension) => {
      return testPath.replace(/\/src\/__tests__\//, '/src/__snapshots__/') + snapshotExtension;
    },
    server: {
      deps: {
        inline: ['next-intl'], // https://github.com/vercel/next.js/issues/77200
      },
    },
  },
});
