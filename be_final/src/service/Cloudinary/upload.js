import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './index.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'subboard_backgrounds',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  }
});

const upload = multer({ storage });
export default upload;
