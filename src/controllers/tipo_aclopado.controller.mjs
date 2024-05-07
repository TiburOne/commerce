import db from "../models/loader.mjs"; // Asegúrate de ajustar la ruta al archivo loader
import { crudControllerFactory } from "./crudControllerFactory.mjs";


// Usar la fábrica para crear las funciones CRUD básicas
const TipoAcopladoController = crudControllerFactory(db.TipoAcoplado);

export { TipoAcopladoController} ;