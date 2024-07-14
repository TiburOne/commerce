// utils/encryption.service.mjs
import pkg from 'crypto-js';

const { AES, enc } = pkg;

class EncryptionService {
  constructor() {
    this.secretKey = 'your-secret-key';
    if (!this.secretKey) {
      throw new Error('Secret key is not defined');
    }
  }

  encrypt(value) {
    if (!value) {
      throw new Error('Value to encrypt is not defined');
    }
    const encrypted = AES.encrypt(enc.Utf8.parse(value), this.secretKey).toString();
    return encodeURIComponent(encrypted);
  }

  decrypt(textToDecrypt) {
    if (!textToDecrypt) {
      throw new Error('Text to decrypt is not defined');
    }
    const decoded = decodeURIComponent(textToDecrypt);
    return AES.decrypt(decoded, this.secretKey).toString(enc.Utf8);
  }
}

export { EncryptionService };
