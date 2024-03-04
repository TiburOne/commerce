import db from "./../models/loader.mjs"; // Asegúrate de ajustar la ruta al archivo loader
import { crudControllerFactory } from "./crudControllerFactory.mjs";

const { Producto } = db;

// Usar la fábrica para crear las funciones CRUD básicas
let productoController = crudControllerFactory(db.Producto);

productoController = {
  ...productoController,

  obtenerProductos: async (req, res) => {
    try {
      const { ids } = req.query; // Suponiendo que los IDs vienen como un string de query params, por ejemplo: ?ids=1,2,3
      const opciones = req.query;

      let consultaOpciones = {};
      if (ids) {
        const arrayIds = ids.split(",").map((id) => parseInt(id));
        consultaOpciones.where = { id: arrayIds };
      }

      if (opciones.incluirCategoria === "true") {
        consultaOpciones.include = consultaOpciones.include || [];
        consultaOpciones.include.push({
          association: "categoria",
        });
      }

      if (opciones.incluirImpuestos === "true") {
        consultaOpciones.include = consultaOpciones.include || [];
        consultaOpciones.include.push({
          association: "impuestos",
        });
      }

      const productos = await Producto.findAll(consultaOpciones);

      if (!productos || productos.length === 0) {
        return res.status(404).send({ message: "Productos no encontrados." });
      }

      res.status(200).send(productos);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al obtener los productos." });
    }
  },
};
export { productoController}
// export const productoController = {
//   crearProducto: async (req, res) => {
//     try {
//       const producto = await Producto.create(req.body);
//       res.status(201).send(producto);
//     } catch (error) {
//       res.status(400).send(error);
//     }
//   },

//   listarProductos: async (req, res) => {
//     try {
//       const productos = await Producto.findAll();
//       res.status(200).send(productos);
//     } catch (error) {
//       res.status(400).send(error);
//     }
//   },

//   actualizarProducto: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const [updated] = await Producto.update(req.body, { where: { id } });
//       if (updated) {
//         const updatedProducto = await Producto.findOne({ where: { id } });
//         res.status(200).send(updatedProducto);
//       } else {
//         throw new Error('Producto no encontrado');
//       }
//     } catch (error) {
//       res.status(400).send(error);
//     }
//   },

//   eliminarProducto: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const deleted = await Producto.destroy({ where: { id } });
//       if (deleted) {
//         res.status(204).send("Producto eliminado");
//       } else {
//         throw new Error('Producto no encontrado');
//       }
//     } catch (error) {
//       res.status(400).send(error);
//     }
//   },

//   obtenerProductos: async (req, res) => {
//    try {
//        const { ids } = req.query; // Suponiendo que los IDs vienen como un string de query params, por ejemplo: ?ids=1,2,3
//        const opciones = req.query;

//        let consultaOpciones = {};
//        if (ids) {
//            const arrayIds = ids.split(',').map(id => parseInt(id));
//            consultaOpciones.where = { id: arrayIds };
//        }

//        if (opciones.incluirCategoria === 'true') {
//            consultaOpciones.include = consultaOpciones.include || [];
//            consultaOpciones.include.push({
//                association: 'categoria'
//            });
//        }

//        if (opciones.incluirImpuestos === 'true') {
//            consultaOpciones.include = consultaOpciones.include || [];
//            consultaOpciones.include.push({
//                association: 'impuestos'
//            });
//        }

//        const productos = await Producto.findAll(consultaOpciones);

//        if (!productos || productos.length === 0) {
//            return res.status(404).send({ message: 'Productos no encontrados.' });
//        }

//        res.status(200).send(productos);
//    } catch (error) {
//        console.error(error);
//        res.status(500).send({ message: 'Error al obtener los productos.' });
//    }
// }

// };
