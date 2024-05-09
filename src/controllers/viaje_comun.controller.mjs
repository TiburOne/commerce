import viaje_comunModel from "../models/viaje_comun.model.mjs";
import db from "./../models/loader.mjs"; // Asegúrate de ajustar la ruta al archivo loader
import { crudControllerFactory } from "./crudControllerFactory.mjs";

// Usar la fábrica para crear las funciones CRUD básicas
let ViajeComunController = crudControllerFactory(db.ViajeComun);

//sobreescritura del metodo para incluir las relaciones
ViajeComunController.listarTodos = async (req, res) => {
   try {
      const items = await db.ViajeComun.findAll({
          include: [
              { model: db.Ubicacion, as: 'Origen' },
              { model: db.Ubicacion, as: 'Destino' },
              { model: db.Especie },
              { model: db.TipoAcoplado }
          ]
      });
      res.status(200).send(items);
  } catch (error) {
      res.status(400).send(error);
  }
}

ViajeComunController.obtenerPorId =  async (req, res) => {
   try {
      const item = await db.ViajeComun.findByPk(req.params.id, {
          include: [
              { model: db.Ubicacion, as: 'Origen' },
              { model: db.Ubicacion, as: 'Destino' },
              { model: db.Especie },
              { model: db.TipoAcoplado }
          ]
      });
      if (!item) {
          return res.status(404).send({ message: 'Item no encontrado.' });
      }
      res.status(200).send(item);
  } catch (error) {
      res.status(400).send(error);
  }
}

ViajeComunController = {
   ...ViajeComunController,
}


export { ViajeComunController }