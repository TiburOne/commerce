// Importa db desde tu loader de modelos
import db from './../models/loader.mjs'; // Asegúrate de ajustar la ruta al archivo loader

const { Descuento } = db;

export const descuentoController = {
  crearDescuento: async (req, res) => {
    try {
      const descuento = await Descuento.create(req.body);
      res.status(201).send(descuento);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  listarDescuentos: async (req, res) => {
    try {
      const descuentos = await Descuento.findAll();
      res.status(200).send(descuentos);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  obtenerDescuentoPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const descuento = await Descuento.findByPk(id);
      if (!descuento) {
        return res.status(404).send({ message: 'Descuento no encontrado.' });
      }
      res.status(200).send(descuento);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  actualizarDescuento: async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await Descuento.update(req.body, { where: { id } });
      if (updated) {
        const updatedDescuento = await Descuento.findByPk(id);
        res.status(200).send(updatedDescuento);
      } else {
        throw new Error('Descuento no encontrado');
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },

  eliminarDescuento: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Descuento.destroy({ where: { id } });
      if (deleted) {
        res.status(204).send("Descuento eliminado");
      } else {
        throw new Error('Descuento no encontrado');
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
};
