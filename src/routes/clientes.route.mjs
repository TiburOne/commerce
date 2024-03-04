// cliente.routes.mjs
import express from 'express';
import { clienteController } from '../controllers/cliente.controller.mjs';

const router = express.Router();

router.post('/clientes', clienteController.crearCliente);
router.get('/clientes', clienteController.listarClientes);
router.get('/clientes/:id', clienteController.obtenerCliente);
router.put('/clientes/:id', clienteController.actualizarCliente);
router.delete('/clientes/:id', clienteController.eliminarCliente);

export default router;
