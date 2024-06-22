import express from 'express';
import camionesController from '../controllers/camiones.controller.mjs'; // Asegúrate de corregir la ruta si es necesario

const router = express.Router();

// Definir las rutas para las operaciones CRUD básicas
router.post('/', camionesController.crear);
router.get('/', camionesController.listarTodos);
router.get('/:id', camionesController.obtenerPorId);
router.put('/:id', camionesController.actualizar);
router.delete('/:id', camionesController.eliminar);

// Rutas adicionales específicas para los camiones
router.get('/detalle/:id', camionesController.obtenerCamion);
router.get('/con-viajes', camionesController.listarCamionesConViajes);
// Ruta para obtener los camiones por id_transportista
router.get('/transportista/:id_transportista', camionesController.obtenerPorIdTransportista);


export default router;
