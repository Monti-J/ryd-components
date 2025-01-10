# ryd-component

Probar en local:
npm install
npm run dev

Instalar en proyecto:
npm install ryd-components
import { rydDropdown } from 'ryd-components';
app.component('ryd-dropdown', rydDropdown);

En el vite.conf.ts agregar esto:
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
      vue: 'vue/dist/vue.esm-bundler.js',
      'ryd-components': path.resolve(__dirname, 'node_modules/ryd-components/dist/index.es.js'),
    },
    dedupe: ['vue']
  }
