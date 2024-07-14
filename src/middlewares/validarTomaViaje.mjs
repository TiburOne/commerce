import db from './../models/loader.mjs';

const validarTomaViaje = async (req, res, next) => {
  const { transportistaId, choferId, camionId, acopladoId, viajeId } = req.body;

  try {
    // Validar la existencia del transportista
    const transportista = await db.Transportista.findByPk(transportistaId);
    if (!transportista) {
      return res.status(404).send({ message: 'Transportista no encontrado' });
    }

    // Validar la existencia del chofer y que pertenezca al transportista
    const chofer = await db.Chofer.findOne({
      where: { id: choferId, id_transportista: transportistaId },
    });
    if (!chofer) {
      return res.status(404).send({ message: 'Chofer no encontrado o no pertenece al transportista' });
    }

    // Validar la existencia del camión y que pertenezca al transportista
    const camion = await db.Camion.findOne({
      where: { id: camionId, id_transportista: transportistaId },
    });
    if (!camion) {
      return res.status(404).send({ message: 'Camión no encontrado o no pertenece al transportista' });
    }

    // Validar la existencia del acoplado y que pertenezca al transportista
    const acoplado = await db.Acoplado.findOne({
      where: { id: acopladoId, id_transportista: transportistaId },
    });
    if (!acoplado) {
      return res.status(404).send({ message: 'Acoplado no encontrado o no pertenece al transportista' });
    }

    // Encontrar el viaje por ID para validar id_creador
    const viaje = await db.ViajeComun.findByPk(viajeId);
    if (!viaje) {
      return res.status(404).send({ message: 'Viaje no encontrado' });
    }

    // Validar que el camión no esté asignado a otro viaje con el mismo id_creador y id_estado 2 o 3
    const camionAsignado = await db.ViajeComun.findOne({
      where: {
        id_camion: camionId,
        id_creador: viaje.id_creador || viaje.id,
        id_estado: [2, 3]
      }
    });
    if (camionAsignado) {
      return res.status(400).send({ message: 'El camión ya está asignado a otro viaje con el mismo origen y destino' });
    }

    // Validar que el chofer no esté asignado a otro viaje con el mismo id_creador y id_estado 2 o 3
    const choferAsignado = await db.ViajeComun.findOne({
      where: {
        id_chofer: choferId,
        id_creador: viaje.id_creador || viaje.id,
        id_estado: [2, 3]
      }
    });
    if (choferAsignado) {
      return res.status(400).send({ message: 'El chofer ya está asignado a otro viaje con el mismo origen y destino' });
    }

    // Validar que el acoplado no esté asignado a otro viaje con el mismo id_creador y id_estado 2 o 3
    const acopladoAsignado = await db.ViajeComun.findOne({
      where: {
        id_acoplado: acopladoId,
        id_creador: viaje.id_creador || viaje.id,
        id_estado: [2, 3]
      }
    });
    if (acopladoAsignado) {
      return res.status(400).send({ message: 'El acoplado ya está asignado a otro viaje con el mismo origen y destino' });
    }

    // Si todas las validaciones pasan, continuar con el siguiente middleware/controlador
    next();
  } catch (error) {
    return res.status(500).send({ message: 'Error en la validación', error });
  }
};

export default validarTomaViaje;
