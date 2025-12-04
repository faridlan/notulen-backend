import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../common/upload/multer.config';

@Controller('upload')
export class UploadController {
  @Post('images')
  @UseInterceptors(FilesInterceptor('files', 10, multerConfig))
  uploadMultipleImages(@UploadedFiles() files: Express.Multer.File[]) {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3001';
    return files.map((file) => ({
      url: `${baseUrl}/uploads/meeting-images/${file.filename}`,
      filename: file.filename,
    }));
  }
}
