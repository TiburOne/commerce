import db from "./../models/loader.mjs"; // Asegúrate de ajustar la ruta al archivo loader
import { crudControllerFactory } from "./crudControllerFactory.mjs";

const { Acoplado, TipoAcoplado } = db;

let AcopladosController = crudControllerFactory(db.Acoplado);

AcopladosController.listarTodos = async (req, res) => {

   try {
      const items = await db.Acoplado.findAll({
         include: [           
           { model: db.TipoAcoplado, as: "tipo_acoplado" },  
         ],
       });
       res.status(200).send(items);
   } catch (error) {
      res.status(400).send(error);
   }

}

AcopladosController.obtenerPorIdTransportista = async (req, res) => {
   const { id_transportista } = req.params;
   try {
     const acoplados = await db.Acoplado.findAll({
       where: { id_transportista },
       include: [
         { model: db.TipoAcoplado, as: "tipo_acoplado" },
       ],
     });
     if (acoplados.length === 0) {
       return res.status(404).send({ message: "No se encontraron acoplados para este transportista." });
     }
     res.status(200).send(acoplados);
   } catch (error) {
     res.status(400).send(error);
   }
 };

export { AcopladosController };