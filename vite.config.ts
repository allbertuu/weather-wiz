/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
// TODO: corrigir o erro do plugin do React abaixo
// import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest-setup.ts',
  },
});
