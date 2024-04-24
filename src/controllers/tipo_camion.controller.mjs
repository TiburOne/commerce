import db from "./../models/loader.mjs"; // Asegúrate de ajustar la ruta al archivo loader
import { crudControllerFactory } from "./crudControllerFactory.mjs";

const { Tipo } = db;

// Usar la fábrica para crear las funciones CRUD básicas
const EspeciesController = crudControllerFactory(db.Especies);

export default EspeciesController;