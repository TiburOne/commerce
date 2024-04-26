import db from "./../models/loader.mjs"; // Asegúrate de ajustar la ruta al archivo loader
import { crudControllerFactory } from "./crudControllerFactory.mjs";

const { Especie } = db;

// Usar la fábrica para crear las funciones CRUD básicas
let EspeciesController = crudControllerFactory(db.Especie);

EspeciesController = {
   ...EspeciesController,
}


export { EspeciesController}