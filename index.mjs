import express from "express";
import db from "./src/models/loader.mjs";
import cors from "cors";
import http from "http";
import initializeSocket from "./socketService.mjs";
import { initializeWhatsApp } from "./whatsappService.mjs";

import { readdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// import producto from './src/routes/productos.routes.mjs'; // Asegúrate de que el path sea correcto y usa .mjs
// import orden from './src/routes/ordenes.routes.mjs'; // Asegúrate de que el path sea correcto y usa .mjs

const app = express();
app.use(cors());

const port = 4000;
// Habilitar CORS para todos los orígenes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de transporte!!!");
});

const __dirname = dirname(fileURLToPath(import.meta.url)); // Obtiene __dirname en ES6
const routesDirectory = join(__dirname, "src/routes");

// app.use('/categorias', categoriaRoutes);
// app.use('/productos', productoRoutes);

await cargarRutas(routesDirectory);

// Sincroniza la base de datos y luego inicia el servidors
db.sequelize
  .sync({
    //force: true
    //alter: true,
  })
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
    //const server = http.createServer(app);
    const io = initializeSocket(server);

    initializeWhatsApp(io);
  });

async function cargarRutas(dir) {
  try {
    const files = await readdir(dir);
    for (const file of files) {
      if (file.endsWith(".mjs")) {
        const filePath = join(dir, file);
        const route = await import(`file://${filePath}`);
        const routePath = `/api/${file.replace(".route.mjs", "")}`;
        app.use(routePath, route.default);
      }
    }
  } catch (err) {
    console.error("Error al cargar las rutas:", err);
  }
}
