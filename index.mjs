import express from 'express';
import db from './src/models/loader.mjs';
import cors from 'cors';
import categoriaRoutes from './src/routes/categorias.route.mjs';
import productoRoutes from './src/routes/productos.route.mjs';

import { readdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// import producto from './src/routes/productos.routes.mjs'; // Asegúrate de que el path sea correcto y usa .mjs
// import orden from './src/routes/ordenes.routes.mjs'; // Asegúrate de que el path sea correcto y usa .mjs

const app = express();
const port = 4000;

const __dirname = dirname(fileURLToPath(import.meta.url)); // Obtiene __dirname en ES6
const routesDirectory = join(__dirname, 'src/routes');

// Habilitar CORS para todos los orígenes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/categorias', categoriaRoutes);
// app.use('/productos', productoRoutes);

await cargarRutas(routesDirectory);

// Sincroniza la base de datos y luego inicia el servidors
db.sequelize.sync({ force: true}).then(() => {
   app.listen(port, () => {
     console.log(`Listening on port ${port}`);
   });
 });


 async function cargarRutas(dir) {
  try {
    const files = await readdir(dir);
    for (const file of files) {
      if (file.endsWith('.mjs')) {
        const filePath = join(dir, file);
        const route = await import(`file://${filePath}`);
        const routePath = `/${file.replace('.route.mjs', '')}`;
        app.use(routePath, route.default);
      }
    }
  } catch (err) {
    console.error('Error al cargar las rutas:', err);
  }
}