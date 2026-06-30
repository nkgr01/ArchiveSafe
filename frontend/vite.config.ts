
// import { defineConfig } from "file:///C:/laragon/www/ArchiveSafe/frontend/node_modules/vite/dist/node/index.js";
// import vue from "file:///C:/laragon/www/ArchiveSafe/frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
// import tailwindcss from "file:///C:/laragon/www/ArchiveSafe/frontend/node_modules/@tailwindcss/vite/dist/index.mjs";
// import path from "path";
// var __vite_injected_original_dirname = "C:\\laragon\\www\\ArchiveSafe\\frontend";
// var vite_config_default = defineConfig({
//   plugins: [
//     vue(),
//     tailwindcss()
//   ],

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
});
