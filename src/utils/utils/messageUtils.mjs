// utils/messageUtils.mjs
import db from './../../models/loader.mjs';
import { sendMessage } from './../../../whatsappService.mjs'; // Ajusta la ruta según sea necesario
import { EncryptionService } from './encryption.service.mjs'; // Ajusta la ruta según sea necesario

const encryptionService = new EncryptionService(); // Instancia el servicio de encriptación

const enviarMensajesTransportistas = async (primerViaje) => {
  try {
    const transportistas = await db.Transportista.findAll({
      attributes: ["telefono", "id"], // Recuperar teléfono e ID para generar la URL
    });

    const messageBase = `
      Nuevo viaje disponible:
      Origen: ${primerViaje.Origen.ciudad} - ${primerViaje.Origen.direccion}
      Destino: ${primerViaje.Destino.ciudad} - ${primerViaje.Destino.direccion}
      Especie: ${primerViaje.Especie.nombre}
      Tarifa: ${primerViaje.valor_tarifa}
      Tomar viaje: `;

    transportistas.forEach((transportista) => {
      if (transportista.telefono) {
        const id_transportista = transportista.id;
        const encryptedTransportistaId = encryptionService.encrypt(transportista.id.toString());
        const encryptedViajeId = encryptionService.encrypt(primerViaje.id.toString());
        const url = `http://www.localhost:4200/transportista/${id_transportista}/asignar-viaje?transportista=${encryptedTransportistaId}&viaje=${encryptedViajeId}`;
        const message = `${messageBase} ${url}`;

        sendMessage(transportista.telefono, message).catch((error) => {
          console.error(
            `Failed to send message to ${transportista.telefono}`,
            error
          );
        });
      }
    });
  } catch (error) {
    console.error('Error sending messages to transportistas', error);
  }
};

export { enviarMensajesTransportistas };
