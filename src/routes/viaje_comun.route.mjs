import express from 'express';
import {  ViajeComunController } from '../controllers/viaje_comun.controller.mjs'; // Ajusta la importación según la ubicación de tus controladores

const router = express.Router();

router.post('/', ViajeComunController.crear);
router.get('/', ViajeComunController.listarTodos);
router.get('/:id', ViajeComunController.obtenerPorId);
router.put('/:id', ViajeComunController.actualizar);
router.delete('/:id', ViajeComunController.eliminar);

export default router;
