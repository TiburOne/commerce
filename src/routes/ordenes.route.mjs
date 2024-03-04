// Importa express y el controlador de órdenes
import express from 'express';
import { ordenController } from '../controllers/orden.controller.mjs';

const router = express.Router();

router.post('/ordenes', ordenController.crearOrden);
router.get('/ordenes', ordenController.listarOrdenes);
router.get('/ordenes/:id', ordenController.obtenerOrdenPorId);
router.put('/ordenes/:id', ordenController.actualizarOrden);
router.delete('/ordenes/:id', ordenController.eliminarOrden);

export default router;
