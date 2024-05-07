import express from 'express';
import { TipoAcopladoController } from '../controllers/tipo_aclopado.controller.mjs'; // Ajusta la importación según la ubicación de tus controladores

const router = express.Router();

router.post('/', TipoAcopladoController.crear);
router.get('/', TipoAcopladoController.listarTodos);
router.get('/:id', TipoAcopladoController.obtenerPorId);
router.put('/:id', TipoAcopladoController.actualizar);
router.delete('/:id', TipoAcopladoController.eliminar);

export default router;
