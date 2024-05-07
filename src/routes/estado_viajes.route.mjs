import express from 'express';
import { EstadosViajesController } from '../controllers/estados_viajes.controller.mjs'; // Ajusta la importación según la ubicación de tus controladores

const router = express.Router();

router.post('/', EstadosViajesController.crear);
router.get('/', EstadosViajesController.listarTodos);
router.get('/:id', EstadosViajesController.obtenerPorId);
router.put('/:id', EstadosViajesController.actualizar);
router.delete('/:id', EstadosViajesController.eliminar);

export default router;
