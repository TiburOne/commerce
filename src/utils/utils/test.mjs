import { EncryptionService } from './encryption.service.mjs';

const encryptionService = new EncryptionService();

const encrypted = encryptionService.encrypt('1');
console.log('Encrypted (Backend):', encrypted);

const decrypted = encryptionService.decrypt(encrypted);
console.log('Decrypted (Backend):', decrypted);

const frontDecrypted = encryptionService.decrypt('U2FsdGVkX1%2BIPIg%2BrhBMazr9pRNLsAvf%2F%2Fr2i1pXTh0%3D')
console.log('Decrypted (FrontEnd):', frontDecrypted);
