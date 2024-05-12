// whatsappService.mjs
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const qrcode = require('qrcode');

const client = new Client({
   authStrategy: new LocalAuth({
   dataPath: "sessions",
   }),
   webVersionCache: {
   type: 'remote',
   remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
   }
});

let isClientReady = false;

export function initializeWhatsApp(io) {
    client.on('qr', qr => {
        qrcode.toDataURL(qr, (err, url) => {
            if (err) {
                console.error('Error generating QR code', err);
                return;
            }
            // Emit the QR to all connected clients
            io.emit('qr', url);
        });
    });

    client.initialize();

    client.on("ready", () => {
      console.log("WhatsApp client is ready!");
      isClientReady = true;
    });
}

// Modificar la función sendMessage para incluir un límite de intentos
export async function sendMessage(phoneNumber, textMessage) {
   return new Promise((resolve, reject) => {
       let attempts = 0;  // Contador de intentos
       const maxAttempts = 3;  // Número máximo de intentos

       const interval = setInterval(async () => {
           if (isClientReady) {
               clearInterval(interval);
               const number = `${phoneNumber}@c.us`;
               try {
                   const message = await client.sendMessage(number, textMessage);
                   console.log(`Message sent to ${phoneNumber}: ${message.body}`);
                   resolve(message);
               } catch (error) {
                   reject(error);
               }
           } else {
               attempts++;
               if (attempts >= maxAttempts) {
                   clearInterval(interval);
                   reject(new Error('Client not ready - maximum attempts reached'));
               }
           }
       }, 500); // Comprueba cada medio segundo
   });
}
