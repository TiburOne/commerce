import db from "./../models/loader.mjs"; // Asegúrate de ajustar la ruta al archivo loader
import { crudControllerFactory } from "./crudControllerFactory.mjs";

// Usar la fábrica para crear las funciones CRUD básicas
let UbicacionController = crudControllerFactory(db.Ubicacion);

UbicacionController = {
   ...UbicacionController,
}


export { UbicacionController }