import db from "../models/loader.mjs"; // Asegúrate de que la ruta sea correcta
import { crudControllerFactory } from "./crudControllerFactory.mjs"; // Importa la fábrica de controladores CRUD

const { Chofer } = db;

// Crea las funciones CRUD básicas para el modelo Chofer usando la fábrica
let ChoferController = crudControllerFactory(Chofer);

// Puedes añadir métodos adicionales o modificar los existentes si es necesario
ChoferController = {
  ...ChoferController,

  // Método adicional para obtener choferes con detalles del transportista
  obtenerChoferConTransportista: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: 'El ID del transportista es necesario para la consulta.' });
    }
 
    try {
      const choferes = await Chofer.findAll({
        where: {
          id_transportista: id
        }
      });
 
      if (choferes.length === 0) {
       return res.status(404).send({ message: "No se encontraron choferes para este transportista." });
     }
     res.status(200).send(choferes);
     
    } catch (error) {
      console.error('Error al obtener los choferes:', error);
      res.status(500).send(error);
    }
  },
  // Método para obtener choferes de un transportista específico
  obtenerChoferesPorTransportista: async (req, res) => {
   const id_transportista = req.query.id_transportista; // Obtenemos el ID del transportista desde la consulta

   if (!id_transportista) {
     return res.status(400).send({ message: 'El ID del transportista es necesario para la consulta.' });
   }

   try {
     const choferes = await Chofer.findAll({
       where: {
         id_transportista: id_transportista
       }
     });

     if (choferes.length === 0) {
      return res.status(404).send({ message: "No se encontraron choferes para este transportista." });
    }
    res.status(200).send(choferes);

   } catch (error) {
     console.error('Error al obtener los choferes:', error);
     res.status(500).send(error);
   }
 }
};

export default ChoferController;
