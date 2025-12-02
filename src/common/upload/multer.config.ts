/* eslint-disable */
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

export const multerConfig = {
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (_, file, cb) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      return cb(new Error('Only JPG, JPEG, PNG allowed'), false);
    }
    cb(null, true);
  },
  storage: diskStorage({
    destination: (_, __, cb) => {
      const uploadPath = join(process.cwd(), 'uploads/meeting-images');

      // 🔥 Auto-create folder if missing
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },
    filename: (_, file, cb) => {
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = extname(file.originalname);
      cb(null, `${unique}${ext}`);
    },
  }),
};
