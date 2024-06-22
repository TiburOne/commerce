import db from "./../models/loader.mjs"; // Asegúrate de ajustar la ruta al archivo loader
import { crudControllerFactory } from "./crudControllerFactory.mjs";

const { Camion, Transportista, ViajeComun } = db;

// Usar la fábrica para crear las funciones CRUD básicas
let CamionesController = crudControllerFactory(db.Camion);

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
          model: ViajeComun,
          as: 'camion'
        }
      ]
    };

    try {
      const camion = await Camion.findByPk(id, consultaOpciones);
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
        as: 'camion'
      }]
    };

    try {
      const camiones = await Camion.findAll(consultaOpciones);
      res.status(200).send(camiones);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  obtenerPorIdTransportista: async (req, res) => {
    const { id_transportista } = req.params;
    try {
      const camiones = await Camion.findAll({
        where: { id_transportista },
        include: [
          {
            model: Transportista,
            as: 'transportista'
          },
          {
            model: ViajeComun,
            as: 'camion'
          }
        ]
      });
      if (camiones.length === 0) {
        return res.status(404).send({ message: "No se encontraron camiones para este transportista." });
      }
      res.status(200).send(camiones);
    } catch (error) {
      res.status(400).send(error);
    }
  }
};

export default CamionesController;
