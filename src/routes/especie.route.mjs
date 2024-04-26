import express from 'express';
import { EspeciesController } from '../controllers/especies.controller.mjs'; // Ajusta la importación según la ubicación de tus controladores

const router = express.Router();

router.post('/', EspeciesController.crear);
router.get('/', EspeciesController.listarTodos);
router.get('/:id', EspeciesController.obtenerPorId);
router.put('/:id', EspeciesController.actualizar);
router.delete('/:id', EspeciesController.eliminar);

export default router;
