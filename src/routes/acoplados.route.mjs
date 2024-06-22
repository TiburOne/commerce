import express from 'express';
import { AcopladosController  } from '../controllers/acoplados.controller.mjs'; // Ajusta la importación según la ubicación de tus controladores

const router = express.Router();

router.post('/', AcopladosController.crear);
router.get('/', AcopladosController.listarTodos);
router.get('/:id', AcopladosController.obtenerPorId);
router.put('/:id', AcopladosController.actualizar);
router.delete('/:id', AcopladosController.eliminar);

// Ruta para obtener los acoplados por id_transportista
router.get('/transportista/:id_transportista', AcopladosController.obtenerPorIdTransportista);

export default router;