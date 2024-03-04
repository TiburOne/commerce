import db from './../models/loader.mjs'; // Asegúrate de ajustar la ruta al archivo loader

const { Producto } = db;

export const productoController = {
  crearProducto: async (req, res) => {
    try {
      const producto = await Producto.create(req.body);
      res.status(201).send(producto);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  listarProductos: async (req, res) => {
    try {
      const productos = await Producto.findAll();
      res.status(200).send(productos);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  actualizarProducto: async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await Producto.update(req.body, { where: { id } });
      if (updated) {
        const updatedProducto = await Producto.findOne({ where: { id } });
        res.status(200).send(updatedProducto);
      } else {
        throw new Error('Producto no encontrado');
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },

  eliminarProducto: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Producto.destroy({ where: { id } });
      if (deleted) {
        res.status(204).send("Producto eliminado");
      } else {
        throw new Error('Producto no encontrado');
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
};