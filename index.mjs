import express from 'express';
import db from './src/models/loader.mjs';
import cors from 'cors';
import categoriaRoutes from './src/routes/categoria.route.mjs';
import productoRoutes from './src/routes/producto.route.mjs';
// import categoria from './src/routes/categorias.routes.mjs'; // Asegúrate de que el path sea correcto y usa .mjs
// import producto from './src/routes/productos.routes.mjs'; // Asegúrate de que el path sea correcto y usa .mjs
// import orden from './src/routes/ordenes.routes.mjs'; // Asegúrate de que el path sea correcto y usa .mjs

const app = express();
const port = 4000;

// Habilitar CORS para todos los orígenes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/categorias', categoriaRoutes);
app.use('/productos', productoRoutes);

// Sincroniza la base de datos y luego inicia el servidors
db.sequelize.sync({ }).then(() => {
   app.listen(port, () => {
     console.log(`Listening on port ${port}`);
   });
 });