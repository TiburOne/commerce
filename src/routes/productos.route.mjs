import express from 'express';
import { productoController } from '../controllers/producto.controller.mjs'; // Asegúrate de corregir la ruta

const router = express.Router();

router.post('/', productoController.crear);
router.get('/', productoController.obtenerProductos);
router.put('/:id', productoController.actualizar);
router.delete('/:id', productoController.eliminar);

export default router;
