import db from "./../models/loader.mjs"; // Asegúrate de ajustar la ruta al archivo loader
import { crudControllerFactory } from "./crudControllerFactory.mjs";

const { Camiones, Transportista, TipoCamion, ViajeComun } = db;

// Usar la fábrica para crear las funciones CRUD básicas
let CamionesController = crudControllerFactory(db.Camiones);

CamionesController = {
   ...CamionesController,

   obtenerCamion: async (req, res) => {
      const { id } = req.params; // Suponiendo que el ID viene como un parámetro de ruta, por ejemplo: /camiones/:id
      let consultaOpciones = {
        include: [
          {
            model: Transportista,
            as: 'transportista'
          },
          {
            model: TipoCamion,
            as: 'tipo_camion'
          },
          {
            model: ViajeComun,
            as: 'viajes_comunes'
          }
        ]
      };

      try {
        const camion = await Camiones.findByPk(id, consultaOpciones);
        if (!camion) {
          return res.status(404).send({ message: 'Camión no encontrado.' });
        }
        res.status(200).send(camion);
      } catch (error) {
        res.status(400).send(error);
      }
   },

   listarCamionesConViajes: async (req, res) => {
      let consultaOpciones = {
        include: [{
          model: ViajeComun,
          as: 'viajes_comunes'
        }]
      };

      try {
        const camiones = await Camiones.findAll(consultaOpciones);
        res.status(200).send(camiones);
      } catch (error) {
        res.status(400).send(error);
      }
   }
};

export default CamionesController;
