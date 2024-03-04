import express from 'express';
import { categoriaController } from '../controllers/categoria.controller.mjs'; // Ajusta la importación según la ubicación de tus controladores

const router = express.Router();

router.post('/', categoriaController.crearCategoria);
router.get('/', categoriaController.listarCategorias);
router.put('/:id', categoriaController.actualizarCategoria);
router.delete('/:id', categoriaController.eliminarCategoria);

export default router;
