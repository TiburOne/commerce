// Importa express y el controlador de descuentos
import express from 'express';
import { descuentoController } from '../controllers/descuento.controller.mjs';

const router = express.Router();

router.post('/descuentos', descuentoController.crearDescuento);
router.get('/descuentos', descuentoController.listarDescuentos);
router.get('/descuentos/:id', descuentoController.obtenerDescuentoPorId);
router.put('/descuentos/:id', descuentoController.actualizarDescuento);
router.delete('/descuentos/:id', descuentoController.eliminarDescuento);

export default router;
