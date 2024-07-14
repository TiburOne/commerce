import viaje_comunModel from "../models/viaje_comun.model.mjs";
import db from "./../models/loader.mjs"; // Asegúrate de ajustar la ruta al archivo loader
import { crudControllerFactory } from "./crudControllerFactory.mjs";
import { sendMessage } from "./../../whatsappService.mjs"; // Asegúrate de que la ruta sea correcta
import TransportistaController from "./transportista.controller.mjs"; // Importa el controlador de Transportista
import { enviarMensajesTransportistas } from '../utils/utils/messageUtils.mjs';

// Usar la fábrica para crear las funciones CRUD básicas
let ViajeComunController = crudControllerFactory(db.ViajeComun);

ViajeComunController.crear = async (req, res) => {
  const t = await db.sequelize.transaction(); // Inicia una transacción
  try {
    const { cantidad, TiposAcoplados, ...dataSinTiposAcoplados } = req.body;

    // Crear el primer ViajeComun sin id_creador
    const primerViaje = await db.ViajeComun.create(dataSinTiposAcoplados, {
      transaction: t,
    });

    // Actualizar el primer viaje con su propio id como id_creador
    await primerViaje.update({ id_creador: primerViaje.id }, { transaction: t });

    await primerViaje.reload({
      include: [
        { model: db.Ubicacion, as: "Origen" },
        { model: db.Ubicacion, as: "Destino" },
        { model: db.Especie },
      ],
      transaction: t,
    });

    // Asociar TiposAcoplados si existen
    if (TiposAcoplados && TiposAcoplados.length) {
      await primerViaje.setTiposAcoplados(TiposAcoplados, { transaction: t });
    }

    const viajesCreados = [primerViaje];

    // Crear los viajes restantes con id_creador
    for (let i = 1; i < cantidad; i++) {
      const viajeComun = await db.ViajeComun.create(
        {
          ...dataSinTiposAcoplados,
          id_creador: primerViaje.id, // Establecer id_creador al id del primer viaje creado
        },
        { transaction: t }
      );

      if (TiposAcoplados && TiposAcoplados.length) {
        await viajeComun.setTiposAcoplados(TiposAcoplados, { transaction: t });
      }

      viajesCreados.push(viajeComun);
    }
    
    await t.commit(); // Commit de la transacción si todo va bien

    // Llamar a la función para enviar mensajes de manera asíncrona
    enviarMensajesTransportistas(primerViaje);

    res.status(201).send(viajesCreados);
  } catch (error) {
    await t.rollback(); // Rollback de la transacción en caso de error
    res.status(400).send(error);
  }
};

// Sobreescritura del método para incluir las relaciones y paginación
ViajeComunController.listarTodos = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

    const items = await db.ViajeComun.findAndCountAll({
      include: [
        { model: db.Ubicacion, as: "Origen" },
        { model: db.Ubicacion, as: "Destino" },
        { model: db.Especie },
        { model: db.TipoAcoplado, as: "TiposAcoplados" },
        { model: db.EstadoViaje },
      ],
      offset,
      limit,
    });

    res.status(200).send({
      data: items.rows,
      total: items.count,
      page: parseInt(page),
      pageSize: limit,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Método para listar viajes pendientes con paginación
ViajeComunController.listarPendientes = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

    const items = await db.ViajeComun.findAndCountAll({
      where: { id_estado: 1 },
      include: [
        { model: db.Ubicacion, as: "Origen" },
        { model: db.Ubicacion, as: "Destino" },
        { model: db.Especie },
        { model: db.TipoAcoplado, as: "TiposAcoplados" },
        { model: db.EstadoViaje },
      ],
      offset,
      limit,
    });

    res.status(200).send({
      data: items.rows,
      total: items.count,
      page: parseInt(page),
      pageSize: limit,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

ViajeComunController.listarViajes = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, id_estado } = req.query;
    const offset = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

    // Construir el objeto de condiciones 'where'
    let whereConditions = {};
    if (id_estado) {
      // Si id_estado está presente, convertirlo en un arreglo si no lo es
      const estados = Array.isArray(id_estado) ? id_estado : [id_estado];
      whereConditions.id_estado = estados;
    }

    const items = await db.ViajeComun.findAndCountAll({
      where: whereConditions,
      include: [
        { model: db.Ubicacion, as: "Origen" },
        { model: db.Ubicacion, as: "Destino" },
        { model: db.Especie },
        { model: db.TipoAcoplado, as: "TiposAcoplados" },
        { model: db.EstadoViaje },
      ],
      offset,
      limit,
    });

    res.status(200).send({
      data: items.rows,
      total: items.count,
      page: parseInt(page),
      pageSize: limit,
    });
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
        { model: db.TipoAcoplado, as: "TiposAcoplados" },
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

ViajeComunController.tomarViaje = async (req, res) => {
  const { viajeId, choferId, camionId, acopladoId } = req.body;

  const t = await db.sequelize.transaction(); // Inicia una transacción

  try {
    // Encontrar el viaje por ID
    const viaje = await db.ViajeComun.findByPk(viajeId, { transaction: t });
    if (!viaje) {
      return res.status(404).send({ message: 'Viaje no encontrado' });
    }

    // Si el viaje ya está tomado, buscar otro viaje disponible con el mismo id_creador
    let viajeDisponible = viaje;
    if (viaje.id_chofer) {
      viajeDisponible = await db.ViajeComun.findOne({
        where: {
          id_creador: viaje.id_creador || viaje.id,
          id_chofer: null
        },
        transaction: t,
      });

      if (!viajeDisponible) {
        return res.status(400).send({ message: 'No hay viajes disponibles para el id_creador especificado' });
      }
    }

    // Actualizar el viaje con los detalles del chofer, camión y acoplado
    await viajeDisponible.update(
      {
        id_chofer: choferId,
        id_camion: camionId,
        id_acoplado: acopladoId,
        id_estado: 2, // Asume que 2 es el estado de "tomado" o "en progreso"
      },
      { transaction: t }
    );

    await t.commit(); // Commit de la transacción si todo va bien

    res.status(200).send({ message: 'Viaje tomado exitosamente', viaje: viajeDisponible });
  } catch (error) {
    await t.rollback(); // Rollback de la transacción en caso de error
    res.status(400).send(error);
  }
};

ViajeComunController.reenviarMensajes = async (req, res) => {
  const { id_viaje } = req.body;

  try {
    // Buscar el primer viaje relacionado por el id_viaje proporcionado
    const viaje = await db.ViajeComun.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { id: id_viaje },
          { id_creador: id_viaje }
        ]
      },
      include: [
        { model: db.Ubicacion, as: "Origen" },
        { model: db.Ubicacion, as: "Destino" },
        { model: db.Especie }
      ]
    });

    if (!viaje) {
      return res.status(404).send({ message: 'Viaje no encontrado' });
    }

    // Llamar a la función para enviar mensajes
    enviarMensajesTransportistas(viaje);

    res.status(200).send({ message: 'Mensajes reenviados exitosamente' });
  } catch (error) {
    res.status(400).send({ message: 'Error al reenviar mensajes', error });
  }
};



ViajeComunController = {
  ...ViajeComunController,
};

export { ViajeComunController };
