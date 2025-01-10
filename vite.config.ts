import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import dts from "rollup-plugin-dts";

export default defineConfig(({ mode }) => {
  if (mode === "development") {
    // Configuración para el playground
    return {
      plugins: [vue()],
      root: "playground", // Carpeta raíz para el playground
      resolve: {
        alias: {
          vue: "vue/dist/vue.esm-bundler.js",
        },
      },
      server: {
        port: 5173, // Cambiar si el puerto está ocupado
      },
    };
  }

  // Configuración para construir la librería
  return {
    plugins: [
      vue({
        script: {
          defineModel: true,
        },
      }),
      dts({
        outputDir: "dist",
        entryRoot: "src",
        exclude: ['node_modules', 'playground'],
      }),
    ],
    resolve: {
      alias: {
        vue: "vue/dist/vue.esm-bundler.js",
      },
      preserveSymlinks: true,
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "RYDComponent",
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: {
            vue: "Vue",
          },
          exports: "named",
        },
      },
    },
  };
});
