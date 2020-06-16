import path from 'path';
import crypto from 'crypto';

import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
export default {
  directory: tmpFolder,
  // Onde ficara armazenad as imagens dos usuarios
  storage: multer.diskStorage({
    // Caminha da pasta
    destination: tmpFolder,
    // Nome do arquivo
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName);
    },
  }),
};
