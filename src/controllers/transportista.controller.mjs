import db from "./../models/loader.mjs"; // Asegúrate de ajustar la ruta al archivo loader
import { crudControllerFactory } from "./crudControllerFactory.mjs";

const { Transportista } = db;

// Usar la fábrica para crear las funciones CRUD básicas
let TransportistaController = crudControllerFactory(db.Transportista);

TransportistaController = {
   ... TransportistaController,

   obtenerTransportista: async (req, res) => {
      const { ids } = req.query; // Suponiendo que los IDs vienen como un string de query params, por ejemplo: ?ids=1,2,3
      const opciones = req.query;

      let consultaOpciones = {};

      if (ids) {
        const arrayIds = ids.split(",").map((id) => parseInt(id));
        consultaOpciones.where = { id: arrayIds };
      }

      if (opciones.incluirCamiones === "true") {
         consultaOpciones.include = consultaOpciones.include || [];
         consultaOpciones.include.push({
           model: Camiones,
           as: 'Camiones' // Asumiendo 'Camiones' es el alias correcto si se ha definido en el modelo
         });
       }
 
       if (opciones.incluirChoferes === "true") {
         consultaOpciones.include = consultaOpciones.include || [];
         consultaOpciones.include.push({
           model: Choferes,
           as: 'Choferes' // Asumiendo 'Choferes' es el alias correcto si se ha definido en el modelo
         });
       }

       try {
         const resultados = await Transportista.findAll(consultaOpciones);
         res.status(200).send(resultados);
       } catch (error) {
         res.status(400).send(error);
       }
   }
}