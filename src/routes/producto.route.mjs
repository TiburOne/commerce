import express from 'express';
import { productoController } from '../controllers/producto.controller.mjs'; // Asegúrate de corregir la ruta

const router = express.Router();

router.post('/', productoController.crearProducto);
router.get('/', productoController.listarProductos);
router.put('/:id', productoController.actualizarProducto);
router.delete('/:id', productoController.eliminarProducto);

export default router;
