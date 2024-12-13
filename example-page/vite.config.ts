import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',// para los componenets
      '#': '/core',// para el core
      vue: 'vue/dist/vue.esm-bundler.js',
      'ryd-components': path.resolve(__dirname, 'node_modules/ryd-components/dist/index.es.js'),
    },
    dedupe: ['vue']
  }
})
