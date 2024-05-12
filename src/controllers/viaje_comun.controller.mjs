import viaje_comunModel from "../models/viaje_comun.model.mjs";
import db from "./../models/loader.mjs"; // Asegúrate de ajustar la ruta al archivo loader
import { crudControllerFactory } from "./crudControllerFactory.mjs";

// Usar la fábrica para crear las funciones CRUD básicas
let ViajeComunController = crudControllerFactory(db.ViajeComun);

ViajeComunController.crear = async (req, res) => {
   const t = await db.sequelize.transaction(); // Inicia una transacción
   try {
       const { cantidad, TiposAcoplados, ...dataSinTiposAcoplados } = req.body;

       // Crear el primer ViajeComun sin id_creador
       const primerViaje = await db.ViajeComun.create(dataSinTiposAcoplados, { transaction: t });

       // Asociar TiposAcoplados si existen
       if (TiposAcoplados && TiposAcoplados.length) {
           await primerViaje.setTiposAcoplados(TiposAcoplados, { transaction: t });
       }

       const viajesCreados = [primerViaje];

       // Crear los viajes restantes con id_creador
       for (let i = 1; i < cantidad; i++) {
           const viajeComun = await db.ViajeComun.create({
               ...dataSinTiposAcoplados,
               id_creador: primerViaje.id,  // Establecer id_creador al id del primer viaje creado
           }, { transaction: t });

           if (TiposAcoplados && TiposAcoplados.length) {
               await viajeComun.setTiposAcoplados(TiposAcoplados, { transaction: t });
           }

           viajesCreados.push(viajeComun);
       }

       await t.commit(); // Commit de la transacción si todo va bien
       res.status(201).send(viajesCreados);
   } catch (error) {
       await t.rollback(); // Rollback de la transacción en caso de error
       res.status(400).send(error);
   }
};


//sobreescritura del metodo para incluir las relaciones
ViajeComunController.listarTodos = async (req, res) => {
  try {
    const items = await db.ViajeComun.findAll({
      include: [
        { model: db.Ubicacion, as: "Origen" },
        { model: db.Ubicacion, as: "Destino" },
        { model: db.Especie },
        { model: db.TipoAcoplado, as: "TiposAcoplados"},
        { model: db.EstadoViaje },
      ],
    });
    res.status(200).send(items);
  } catch (error) {
    res.status(400).send(error);
  }
};

ViajeComunController.obtenerPorId = async (req, res) => {
  try {
    const item = await db.ViajeComun.findByPk(req.params.id, {
      include: [
        { model: db.Ubicacion, as: "Origen" },
        { model: db.Ubicacion, as: "Destino" },
        { model: db.Especie },
        { model: db.TipoAcoplado },
      ],
    });
    if (!item) {
      return res.status(404).send({ message: "Item no encontrado." });
    }
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};

ViajeComunController = {
  ...ViajeComunController,
};

export { ViajeComunController };
