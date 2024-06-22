import viaje_comunModel from "../models/viaje_comun.model.mjs";
import db from "./../models/loader.mjs"; // Asegúrate de ajustar la ruta al archivo loader
import { crudControllerFactory } from "./crudControllerFactory.mjs";
import { sendMessage } from "./../../whatsappService.mjs"; // Asegúrate de que la ruta sea correcta
import TransportistaController from "./transportista.controller.mjs"; // Importa el controlador de Transportista

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

    // Enviar mensaje a todos los transportistas
    const transportistas = await db.Transportista.findAll({
      attributes: ["telefono"], // Solo recuperar el teléfono para enviar mensajes
    });

    const message = `
         Nuevo viaje disponible:
         Origen: ${primerViaje.Origen.ciudad} - ${primerViaje.Origen.direccion}
         Destino: ${primerViaje.Destino.ciudad} - ${primerViaje.Destino.direccion}
         Especie: ${primerViaje.Especie.nombre}
         Tarifa: ${primerViaje.valor_tarifa}`;

    transportistas.forEach((transportista) => {
      if (transportista.telefono) {
        sendMessage(transportista.telefono, message).catch((error) => {
          console.error(
            `Failed to send message to ${transportista.telefono}`,
            error
          );
        });
      }
    });

    await t.commit(); // Commit de la transacción si todo va bien

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
  const { viajeId, transportistaId, choferId, camionId, acopladoId } = req.body;

  const t = await db.sequelize.transaction(); // Inicia una transacción

  try {
    // Validar la existencia del transportista
    const transportista = await db.Transportista.findByPk(transportistaId, { transaction: t });
    if (!transportista) {
      return res.status(404).send({ message: 'Transportista no encontrado' });
    }

    // Validar la existencia del chofer y que pertenezca al transportista
    const chofer = await db.Chofer.findOne({
      where: { id: choferId, id_transportista: transportistaId },
      transaction: t,
    });
    if (!chofer) {
      return res.status(404).send({ message: 'Chofer no encontrado o no pertenece al transportista' });
    }

    // Validar la existencia del camión y que pertenezca al transportista
    const camion = await db.Camion.findOne({
      where: { id: camionId, id_transportista: transportistaId },
      transaction: t,
    });
    if (!camion) {
      return res.status(404).send({ message: 'Camión no encontrado o no pertenece al transportista' });
    }

    // Validar la existencia del acoplado y que pertenezca al transportista
    const acoplado = await db.Acoplado.findOne({
      where: { id: acopladoId, id_transportista: transportistaId },
      transaction: t,
    });
    if (!acoplado) {
      return res.status(404).send({ message: 'Acoplado no encontrado o no pertenece al transportista' });
    }

    // Validar que el viaje no esté tomado por otro transportista
    const viaje = await db.ViajeComun.findByPk(viajeId, { transaction: t });
    if (!viaje) {
      return res.status(404).send({ message: 'Viaje no encontrado' });
    }
    if (viaje.id_chofer) {
      return res.status(400).send({ message: 'El viaje ya ha sido tomado por otro transportista' });
    }

    // Actualizar el viaje con los detalles del chofer, camión y acoplado
    await viaje.update(
      {
        id_chofer: chofer.id,
        id_camion: camion.id,
        id_acoplado: acoplado.id,
        id_estado: 2, // Asume que 2 es el estado de "tomado" o "en progreso"
      },
      { transaction: t }
    );

    await t.commit(); // Commit de la transacción si todo va bien

    res.status(200).send({ message: 'Viaje tomado exitosamente' });
  } catch (error) {
    await t.rollback(); // Rollback de la transacción en caso de error
    res.status(400).send(error);
  }
};


ViajeComunController = {
  ...ViajeComunController,
};

export { ViajeComunController };
