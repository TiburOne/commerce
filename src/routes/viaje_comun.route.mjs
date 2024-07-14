import express from 'express';
import {  ViajeComunController } from '../controllers/viaje_comun.controller.mjs'; // Ajusta la importación según la ubicación de tus controladores
import validarTomaViaje from '../middlewares/validarTomaViaje.mjs';

const router = express.Router();

// Otras rutas...
router.get('/pendientes', ViajeComunController.listarPendientes);
router.get('/listar-viajes', ViajeComunController.listarViajes);

// Rutas CRUD básica
router.post('/', ViajeComunController.crear);
router.get('/', ViajeComunController.listarTodos);
router.get('/:id', ViajeComunController.obtenerPorId);
router.put('/:id', ViajeComunController.actualizar);
router.delete('/:id', ViajeComunController.eliminar);

// Nueva ruta para tomar un viaje
router.post('/tomar-viaje', validarTomaViaje, ViajeComunController.tomarViaje);
router.post('/reenviar-mensajes', ViajeComunController.reenviarMensajes)

export default router;
