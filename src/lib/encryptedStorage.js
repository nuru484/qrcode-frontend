import { EncryptStorage } from 'encrypt-storage';

const getEncryptionKey = async () => {
  return import.meta.env.VITE_STORAGE_ENCRYPTION_KEY;
};

const initializeEncryptStorage = async () => {
  const encryptionKey = await getEncryptionKey();
  if (!encryptionKey) {
    throw new Error('Encryption key is not available.');
  }

  return new EncryptStorage(encryptionKey);
};

const encryptStorage = await initializeEncryptStorage();

export default encryptStorage;
