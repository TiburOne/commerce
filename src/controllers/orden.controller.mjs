// Importa db desde tu loader de modelos
import db from "./../models/loader.mjs"; // Asegúrate de ajustar la ruta al archivo loader

const { Orden } = db;

export const ordenController = {
  crearOrden: async (req, res) => {
    try {
      const orden = await Orden.create(req.body);
      res.status(201).send(orden);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  listarOrdenes: async (req, res) => {
    try {
      const ordenes = await Orden.findAll();
      res.status(200).send(ordenes);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  obtenerOrdenPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const orden = await Orden.findByPk(id, {
        include: ["cliente", "estado", "detalles"], // Asegúrate de que estos alias coincidan con los definidos en tus asociaciones
      });
      if (!orden) {
        return res.status(404).send({ message: "Orden no encontrada." });
      }
      res.status(200).send(orden);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  actualizarOrden: async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await Orden.update(req.body, { where: { id } });
      if (updated) {
        const updatedOrden = await Orden.findByPk(id);
        res.status(200).send(updatedOrden);
      } else {
        throw new Error("Orden no encontrada");
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },

  eliminarOrden: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Orden.destroy({ where: { id } });
      if (deleted) {
        res.status(204).send("Orden eliminada");
      } else {
        throw new Error("Orden no encontrada");
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },

  obtenerOrdenes: async (req, res) => {
    try {
      const { ids } = req.query; // Suponiendo que los IDs vienen como un string de query params, por ejemplo: ?ids=1,2,3
      const opciones = req.query;

      let consultaOpciones = {};
      if (ids) {
        const arrayIds = ids.split(",").map((id) => parseInt(id));
        consultaOpciones.where = { id: arrayIds };
      }

      if (opciones.incluirDetalle === "true") {
        consultaOpciones.include = consultaOpciones.include || [];
        consultaOpciones.include.push({
          association: "detalles",
        });
      }

      if (opciones.incluirPagos === "true") {
        consultaOpciones.include = consultaOpciones.include || [];
        consultaOpciones.include.push({
          association: "pagos",
        });
      }

      const ordenes = await Orden.findAll(consultaOpciones);

       if (!ordenes || ordenes.length === 0) {
           return res.status(404).send({ message: 'Ordenes no encontradas.' });
       }

       res.status(200).send(ordenes);

    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Error al obtener las ordenes.", error: error });
    }
  },
};
