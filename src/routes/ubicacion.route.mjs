import express from 'express';
import { UbicacionController } from '../controllers/ubicacion.controller.mjs'; // Ajusta la importación según la ubicación de tus controladores

const router = express.Router();

router.post('/', UbicacionController.crear);
router.get('/', UbicacionController.listarTodos);
router.get('/:id', UbicacionController.obtenerPorId);
router.put('/:id', UbicacionController.actualizar);
router.delete('/:id', UbicacionController.eliminar);

export default router;
