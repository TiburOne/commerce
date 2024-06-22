import express from 'express';
import choferController from '../controllers/chofer.controller.mjs';

const router = express.Router();

router.get('/por-transportista', choferController.obtenerChoferesPorTransportista);
// Rutas CRUD básicas
router.get('/obtenerChoferConTransportista/:id', choferController.obtenerChoferConTransportista)
router.post('/', choferController.crear); // Crea un nuevo chofer
router.get('/', choferController.listarTodos); // Lista todos los choferes
router.get('/:id', choferController.obtenerPorId); // Obtiene un chofer por su ID
router.put('/:id', choferController.actualizar); // Actualiza un chofer por su ID
router.delete('/:id', choferController.eliminar); // Elimina un chofer por su ID

// Ruta para obtener choferes por el ID de transportista usando query parameters

export default router;
