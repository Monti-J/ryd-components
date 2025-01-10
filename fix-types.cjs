const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

const typesPath = resolve(__dirname, 'dist', 'index.d.ts');

let content = readFileSync(typesPath, 'utf-8');

// Reemplaza las rutas de los componentes con "./index.es.js"
content = content.replace(
  /import (\w+) from "\.\/components\/\w+\.vue";/g,
  'import { $1 } from "./index.es.js";'
);

// Asegúrate de incluir la exportación de DefineComponent si no está ya presente
if (!content.includes('export type { DefineComponent };')) {
  content = `import { DefineComponent } from 'vue';\n${content}\nexport type { DefineComponent };`;
}

// Escribe el contenido modificado de vuelta al archivo
writeFileSync(typesPath, content, 'utf-8');

console.log('✅ index.d.ts modificado correctamente.');
