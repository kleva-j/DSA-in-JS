import { defineConfig } from 'vite';

import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

import { BASE_PATH } from './src/lib/constants';

// https://vite.dev/config/
export default defineConfig({
  base: `${BASE_PATH}/`,
  plugins: [tsconfigPaths(), react(), tailwindcss()],
});
