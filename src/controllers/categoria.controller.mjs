import db from './../models/loader.mjs'; // Asegúrate de ajustar la ruta al archivo loader

const { Categoria } = db;

export const categoriaController = {
  crearCategoria: async (req, res) => {º
    try {
      const categoria = await Categoria.create(req.body);
      res.status(201).send(categoria);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  listarCategorias: async (req, res) => {
    try {
      const categorias = await Categoria.findAll();
      res.status(200).send(categorias);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  actualizarCategoria: async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await Categoria.update(req.body, { where: { id } });
      if (updated) {
        const updatedCategoria = await Categoria.findOne({ where: { id } });
        res.status(200).send(updatedCategoria);
      } else {
        throw new Error('Categoría no encontrada');
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },

  eliminarCategoria: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Categoria.destroy({ where: { id } });
      if (deleted) {
        res.status(204).send("Categoría eliminada");
      } else {
        throw new Error('Categoría no encontrada');
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
};
