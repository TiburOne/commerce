// cliente.controller.mjs
import db from './../models/loader.mjs'; // Ajusta la ruta al archivo loader según sea necesario

const { Cliente } = db;

export const clienteController = {
  crearCliente: async (req, res) => {
    try {
      const cliente = await Cliente.create(req.body);
      res.status(201).send(cliente);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  listarClientes: async (req, res) => {
    try {
      const clientes = await Cliente.findAll();
      res.status(200).send(clientes);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  obtenerCliente: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByPk(id);
      if (cliente) {
        res.status(200).send(cliente);
      } else {
        throw new Error('Cliente no encontrado');
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },

  actualizarCliente: async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await Cliente.update(req.body, { where: { id } });
      if (updated) {
        const updatedCliente = await Cliente.findByPk(id);
        res.status(200).send(updatedCliente);
      } else {
        throw new Error('Cliente no encontrado');
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },

  eliminarCliente: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Cliente.destroy({ where: { id } });
      if (deleted) {
        res.status(204).send("Cliente eliminado");
      } else {
        throw new Error('Cliente no encontrado');
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
};
