import express from 'express';
import transportistaController from '../controllers/transportista.controller.mjs'; // Asegúrate de corregir la ruta

const router = express.Router();

// Definir las rutas para las operaciones CRUD básicas
router.post('/', transportistaController.crear);
router.get('/', transportistaController.listarTodos);
router.get('/:id', transportistaController.obtenerPorId);
router.put('/:id', transportistaController.actualizar);
router.delete('/:id', transportistaController.eliminar);

// Ruta adicional para obtener transportistas con opciones detalladas
router.get('/detalles', transportistaController.obtenerTransportista);

export default router;
